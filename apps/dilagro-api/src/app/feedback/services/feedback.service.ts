import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFeedbackDto } from '../dto/create-feedback.dto';
import { UpdateFeedbackDto } from '../dto/update-feedback.dto';
import { IFeedback } from '@seng12112-new/my-lib';
import { FeedbackRepository } from '../repository/feedback.repository';

@Injectable()
export class FeedbackService {
  constructor(private readonly feedbackRepository: FeedbackRepository) {}

  async create(dto: CreateFeedbackDto): Promise<IFeedback> {
    return this.feedbackRepository.create(dto);
  }

  async findAll(): Promise<IFeedback[]> {
    return this.feedbackRepository.findAll();
  }

  async findOne(id: string): Promise<IFeedback> {
    const feedback = await this.feedbackRepository.findOne(id);
    if (!feedback) throw new NotFoundException(`Feedback ${id} not found`);
    return feedback;
  }

  async update(id: string, dto: UpdateFeedbackDto): Promise<IFeedback> {
    const updated = await this.feedbackRepository.update(id, dto);
    if (!updated) throw new NotFoundException(`Feedback ${id} not found`);
    return updated;
  }

  async remove(id: string): Promise<IFeedback> {
    const removed = await this.feedbackRepository.remove(id);
    if (!removed) throw new NotFoundException(`Feedback ${id} not found`);
    return removed;
  }
}
