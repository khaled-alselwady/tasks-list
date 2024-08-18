import { Injectable, signal } from '@angular/core';
import { Task } from './task.model';

@Injectable({ providedIn: 'root' })
export class TasksService {
  private tasks = signal<Task[]>([]);

  allTasks = this.tasks.asReadonly();

  public addTask(taskData: { title: string; description: string }) {
    const newTask: Task = {
      ...taskData,
      id: Math.random().toString(),
      status: 'OPEN',
    };

    // this.tasks.set([...this.tasks(), newTask]);
    this.tasks.update((oldTasks) => [...oldTasks, newTask]);
  }

  public removeTask(id: string) {
    this.tasks.set(this.tasks().filter((task) => task.id !== id));
  }

  get getTasks() {
    return this.tasks;
  }
}
