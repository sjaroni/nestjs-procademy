import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { ScheduleModule } from '@nestjs/schedule';
import { HashtagModule } from 'src/hashtag/hashtag.module';

@Module({
  providers: [TasksService],
  imports: [ScheduleModule.forRoot(), HashtagModule],
  exports: [TasksService],
})
export class TasksModule {}
