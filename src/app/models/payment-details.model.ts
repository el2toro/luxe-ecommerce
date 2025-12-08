import { PaymentAttemptModel } from "./payment-attempt.model";

export interface PaymentDetailsModel {
  paymentId: string;
  paymentMethod: string;
  amount: number;
  currency: string;
  status: string;
  paymentDate: string; 
  transactionId: string;
  gatewayResponse: string;
  attempts: PaymentAttemptModel[];
}
