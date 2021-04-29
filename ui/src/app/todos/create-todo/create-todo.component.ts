import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { CREATE_TODO_CLOSE_MODAL_STATES } from 'src/app/core/models/create-todo';
import { Todo } from 'src/app/core/models/todo';
import { CreateTodoAction } from 'src/app/core/store/actions';
import { AppState } from 'src/app/core/store/reducer';

@Component({
  selector: 'app-create-todo',
  templateUrl: './create-todo.component.html',
  styleUrls: ['./create-todo.component.scss'],
})
export class CreateTodoComponent {
  form: FormGroup;

  constructor(
    private readonly activeModal: NgbActiveModal,
    private readonly fb: FormBuilder,
    private readonly store: Store<AppState>
  ) {
    this.form = this.fb.group({ title: ['', Validators.required], description: [''] });
  }

  createTodo() {
    const todo: Todo = {
      title: this.title.value,
      description: this.description.value,
    };

    this.store.dispatch(new CreateTodoAction(todo));
    this.activeModal.close(CREATE_TODO_CLOSE_MODAL_STATES.TODO_CREATED);
  }

  cancelCreate() {
    this.activeModal.close(CREATE_TODO_CLOSE_MODAL_STATES.TODO_CANCELLED);
  }

  get title() {
    return this.form.get('title');
  }

  get description() {
    return this.form.get('description');
  }
}
