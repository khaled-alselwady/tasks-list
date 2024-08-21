import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './app/app.component';
import { TasksService } from './app/tasks/tasks.service';
import { InjectionToken } from '@angular/core';

export const TASKS_SERVICE_TOKEN = new InjectionToken<TasksService>(
  'tasks-service-token'
);

bootstrapApplication(AppComponent, {
  providers: [{ provide: TASKS_SERVICE_TOKEN, useClass: TasksService }], // => bad practice, we should using Injectable decorators instead of using it in providers in the `bootstrapApplication`.
}).catch((err) => console.error(err));

// bootstrapApplication(AppComponent).catch((err) => console.error(err));
