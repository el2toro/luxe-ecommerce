import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CustomerChatService {
  private baseUrl = 'https://localhost:7187/api/conversations';
  private httpClient = inject(HttpClient);


  startConversation(payload: any) : Observable<any> {
    return this.httpClient.post<any>(`${this.baseUrl}`, payload);
  }

  sendMessage(payload: any, conversationId: string) : Observable<any> {
    return this.httpClient.post<any>(`${this.baseUrl}/${conversationId}/messages/customer`, payload);
  }

   getConversation(conversationId: string) : Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrl}/${conversationId}`);
  }

  getConversationByCustomerId(customerId: string) : Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrl}/customer/${customerId}`);
  }
}
