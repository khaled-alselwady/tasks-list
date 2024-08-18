import { Component, computed, inject, signal } from '@angular/core';

import { TaskItemComponent } from './task-item/task-item.component';
import { Task } from '../task.model';
import { TasksService } from '../tasks.service';

@Component({
  selector: 'app-tasks-list',
  standalone: true,
  templateUrl: './tasks-list.component.html',
  styleUrl: './tasks-list.component.css',
  imports: [TaskItemComponent],
})
export class TasksListComponent {
  private selectedFilter = signal<string>('all');
  private tasksService = inject(TasksService);

  tasks = computed(() => {
    switch (this.selectedFilter()) {
      case 'open':
        return this.tasksService.find('OPEN');
      case 'in-progress':
        return this.tasksService.find('IN_PROGRESS');
      case 'done':
        return this.tasksService.find('DONE');
      default:
        return this.tasksService.allTasks();
    }
  });

  onChangeTasksFilter(filter: string) {
    this.selectedFilter.set(filter);
  }
}
