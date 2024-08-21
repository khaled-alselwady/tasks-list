import { Component, computed, inject, signal } from '@angular/core';

import { TaskItemComponent } from './task-item/task-item.component';

import { TASKS_SERVICE_TOKEN } from '../../../main';
import { TASK_STATUS_OPTIONS, taskStatusOptionsProvider } from '../task.model';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-tasks-list',
  standalone: true,
  templateUrl: './tasks-list.component.html',
  styleUrl: './tasks-list.component.css',
  imports: [TaskItemComponent, NgFor],
  providers: [taskStatusOptionsProvider],
})
export class TasksListComponent {
  private selectedFilter = signal<string>('all');
  private tasksService = inject(TASKS_SERVICE_TOKEN);

  taskStatusOptions = inject(TASK_STATUS_OPTIONS);

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
