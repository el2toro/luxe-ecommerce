import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  effect,
  ElementRef,
  inject,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CustomerChatService } from '@core/services/customer-chat.service';
import { ChatSignalRService } from '@core/services/signalr.service';

interface Message {
  text: string;
  isBot: boolean;
  timestamp: Date;
}
@Component({
  selector: 'app-live-stylist-chat',
  templateUrl: './live-stylist-chat.component.html',
  styleUrls: ['./live-stylist-chat.component.scss'],
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, MatIconModule, MatButtonModule],
})
export class LiveStylistChatComponent implements AfterViewInit, OnInit {
  @ViewChild('messagesContainer') messagesContainer!: ElementRef<HTMLDivElement>;
    private chatSignalRService = inject(ChatSignalRService);
    private customerChatService = inject(CustomerChatService);
    private conversationId = '';

  private formBuilder = inject(FormBuilder);
  form!: FormGroup;

  get messageList(): Message[] {
    return this.messages();
  }

  isOpen = signal(false);
  msg = '';
  messages = signal<Message[]>([
    {
      text: "Hello! I'm Sofia, your personal stylist at LUXE.",
      isBot: true,
      timestamp: new Date(),
    },
    {
      text: 'How can I help you find something extraordinary today?',
      isBot: true,
      timestamp: new Date(),
    },
  ]);

  constructor() {
    effect(() => {
      this.messages(); // trigger
      this.scrollToBottom();
    });
  }
  ngOnInit(): void {
    this.chatSignalRService.initConnection('your-auth-token'); // Replace with actual token retrieval
    this.buildForm();
  }

  ngAfterViewInit() {
    this.scrollToBottom();
  }

  buildForm() {
    this.form = this.formBuilder.group({
      message: [''],
    });
  }
  toggle() {
    this.isOpen.update((v) => !v);
  }

  close() {
    this.isOpen.set(false);
  }

  send(text?: string) {
    let formMessage = this.form.get('message')?.value;

    if (formMessage) this.msg = formMessage;
    if (text) this.msg = text;
    if (!this.msg.trim()) return;

    const id = '3FA85F64-5717-4562-B3FC-2C963F66AFA6';   
    this.chatSignalRService.joinConversation(id); // Join the conversation before sending messages
    
    const newMessage = {customerId: id, subject: 'Order', initialMessage: this.msg};
    const payload = { senderId: id, content: this.msg };

    !this.conversationId 
      ? this.startConversation(newMessage)
      : this.sendMessage(payload);
  }

  private startConversation(message: any) : void {
   this.customerChatService.startConversation(message).subscribe({
        next: (response) => {
          this.conversationId = response.id; // Store the conversation ID for future messages
          this.messages.update((msgs) => [
            ...msgs,
            { text: this.msg, isBot: false, timestamp: new Date() },
          ]);
          this.form.reset();
          console.log('Conversation started successfully:', response);
        },
        error: (err) => console.error('Error starting conversation:', err),
      });
  }

  private sendMessage(payload: any) : void {
    this.updateMessages(this.msg, false);
   this.customerChatService.sendMessage(payload, this.conversationId).subscribe({
        next: (message) => {
          this.updateMessages(message.content, true); // Add customer's message to the UI
          this.form.reset();
          console.log('Message sent successfully:', message);
        },
        error: (err) => console.error('Error sending message:', err),
      });
  }

  private updateMessages(message: any, isBot: boolean) : void {
    this.messages.update((msgs) => [
      ...msgs,
      { text: message.content, isBot: isBot, timestamp: new Date() },
    ]);
  }

  private scrollToBottom() {
    if (!this.messagesContainer?.nativeElement) return;

    const el = this.messagesContainer.nativeElement;
    
    el.scrollTop = el.scrollHeight;
  }
}
