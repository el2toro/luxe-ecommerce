import { CommonModule } from '@angular/common';
import {
  afterNextRender,
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

    // Add user message
    this.messages.update((msgs) => [
      ...msgs,
      {
        text: this.msg,
        isBot: false,
        timestamp: new Date(),
      },
    ]);

    const userMessage = this.msg.toLowerCase();
    this.msg = '';
    this.form.reset();

    // Simulate Sofia replying in 1–2 seconds
    setTimeout(() => {
      let reply = "I'm searching our private collection for you...";

      if (userMessage.includes('evening') || userMessage.includes('gown')) {
        reply =
          'Perfect for evening — let me show you our Dior Couture and Elie Saab pieces. Any preferred color?';
      } else if (userMessage.includes('new') || userMessage.includes('arrival')) {
        reply =
          'New in: Patek Philippe Rainbow, Hermès Birkin 25 Rose Sakura, and a rare Graff emerald suite. Which interests you?';
      } else if (userMessage.includes('under') || userMessage.includes('budget')) {
        reply =
          'Under $10k we have stunning Van Cleef pieces and Chanel J12 diamonds. Shall I send options?';
      } else if (userMessage.includes('surprise')) {
        reply =
          'Surprise coming — a one-of-one Cartier high jewelry necklace just arrived. Want to see it first?';
      }

      this.messages.update((msgs) => [
        ...msgs,
        {
          text: reply,
          isBot: true,
          timestamp: new Date(),
        },
      ]);
    }, 1200 + Math.random() * 800);
  }

  private scrollToBottom() {
    if (!this.messagesContainer?.nativeElement) return;

    const el = this.messagesContainer.nativeElement;
    
    el.scrollTop = el.scrollHeight;


  }
}
