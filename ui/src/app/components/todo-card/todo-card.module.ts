import { NgModule } from '@angular/core';
import { TodoCardComponent } from './todo-card.component';

const DECLARATIONS = [TodoCardComponent];

@NgModule({ declarations: DECLARATIONS, exports: DECLARATIONS, imports: [] })
export class TodoCardModule {}
