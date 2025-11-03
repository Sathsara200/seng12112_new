import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Feedback } from '../schemas/feedback.schema';
import { IFeedback } from '@seng12112-new/my-lib';


@Injectable()
export class FeedbackRepository {
  constructor(@InjectModel(Feedback.name) private readonly feedbackModel: Model<Feedback>) {}

  async create(feedback: IFeedback): Promise<IFeedback> {
    return await this.feedbackModel.create(feedback);
  }

  async findAll(): Promise<IFeedback[]> {
    return await this.feedbackModel.find().exec();
  }

  async findOne(id: string): Promise<IFeedback> {
    return await this.feedbackModel.findById(id).exec();
  }

  async update(id: string, feedback: Partial<IFeedback>): Promise<IFeedback> {
    return await this.feedbackModel.findByIdAndUpdate(id, feedback, { new: true }).exec();
  }

  async remove(id: string): Promise<IFeedback> {
    return await this.feedbackModel.findByIdAndDelete(id).exec();
  }
}
