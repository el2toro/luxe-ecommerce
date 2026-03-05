import { Injectable, signal } from '@angular/core';
import * as signalR from '@microsoft/signalr';

@Injectable({ providedIn: 'root' })
export class ChatSignalRService {
  private hubConnection!: signalR.HubConnection;
  
  // State for the UI
  public isConnected = signal<boolean>(false);
  public latestMessage = signal<any>(null);

  public initConnection(token: string) {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:7187/hubs/chat', {
        accessTokenFactory: () => token // Required if using [Authorize]
      })
      .withAutomaticReconnect()
      .build();

    this.hubConnection.start()
      .then(() => this.isConnected.set(true))
      .catch(err => console.error('SignalR Connection Error: ', err));

    // Listen for events emitted by the backend
    this.hubConnection.on('MessageReceived', (data) => {
      this.latestMessage.set(data);
      console.log('Message received from SignalR: ', data);
    });
  }

  // Matches your Backend: JoinConversation(Guid conversationId)
  public async joinConversation(conversationId: string) {
    if (this.isConnected()) {
      await this.hubConnection.invoke('JoinConversation', conversationId);
    }
  }

  // Matches your Backend: JoinAgentsGroup()
  public async joinAgentsGroup() {
    if (this.isConnected()) {
      await this.hubConnection.invoke('JoinAgentsGroup');
    }
  }
}