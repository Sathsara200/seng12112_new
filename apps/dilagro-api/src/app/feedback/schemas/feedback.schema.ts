import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { IFeedback } from '@seng12112-new/my-lib';


@Schema({ timestamps: true })
export class Feedback implements IFeedback {
  @Prop({ type: String, required: true })
  customerId: string;

  @Prop({ type: String, required: true })
  message: string;

  @Prop({ type: Number, required: true, min: 1, max: 5 })
  rating: number;

  @Prop({ type: Date, default: Date.now })
  createdAt?: Date;
}

export const FeedbackSchema = SchemaFactory.createForClass(Feedback);
