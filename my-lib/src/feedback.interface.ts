export interface IFeedback {
  customerId: string;
  message: string;
  rating: number; // e.g., 1-5
  createdAt?: Date;
}
