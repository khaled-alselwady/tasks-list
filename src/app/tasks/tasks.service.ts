import { inject, Injectable, signal } from '@angular/core';
import { Task, TaskStatus } from './task.model';
import { LoggingService } from '../logging.service';

@Injectable({ providedIn: 'root' })
export class TasksService {
  private tasks = signal<Task[]>([]);

  allTasks = this.tasks.asReadonly();

  private loggingService = inject(LoggingService);

  addTask(taskData: { title: string; description: string }) {
    const newTask: Task = {
      ...taskData,
      id: Math.random().toString(),
      status: 'OPEN',
    };

    // this.tasks.set([...this.tasks(), newTask]);
    this.tasks.update((oldTasks) => [...oldTasks, newTask]);

    this.loggingService.log('ADDED TASKS WITH TITLE: ' + taskData.title);
  }

  removeTask(id: string) {
    this.tasks.set(this.tasks().filter((task) => task.id !== id));
  }

  updateTaskStatus(taskId: string, newStatus: TaskStatus) {
    this.tasks.update((oldStatus) =>
      oldStatus.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );

    this.loggingService.log('CHANGE TASKS STATUS TO: ' + newStatus);
  }

  find(status: TaskStatus) {
    return this.tasks().filter((task) => task.status === status);
  }
}
