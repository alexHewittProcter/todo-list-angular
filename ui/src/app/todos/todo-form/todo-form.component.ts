import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { TODO_FORM_CLOSE_MODAL_STATES } from 'src/app/core/models/todo-form';
import { Todo } from 'src/app/core/models/todo';
import { MODAL_DATA } from 'src/app/core/services/modal/modal.service';
import { CreateTodoAction, UpdateTodoAction } from 'src/app/core/store/actions';
import { AppState } from 'src/app/core/store/reducer';

export interface TodoFormModalData {
  editMode: boolean;
  editLocation?: 'list' | 'view';
  todo?: Todo;
}

@Component({
  selector: 'app-create-todo',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss'],
})
export class TodoFormComponent {
  form: FormGroup;

  actionText: { title: string; submitButton: string };

  constructor(
    private readonly activeModal: NgbActiveModal,
    private readonly fb: FormBuilder,
    private readonly store: Store<AppState>,
    @Inject(MODAL_DATA) private overlayData: TodoFormModalData
  ) {
    this.setActionText();
    this.setupForm();
  }

  private setActionText() {
    const editMode = this.overlayData.editMode;
    this.actionText = {
      title: editMode ? 'Edit' : 'Create',
      submitButton: editMode ? 'Update' : 'Create',
    };
  }

  private setupForm() {
    const editMode = this.overlayData.editMode;
    const todoData = this.overlayData.todo;
    this.form = this.fb.group({
      title: [editMode ? todoData.title : '', Validators.required],
      description: [editMode ? todoData.description : ''],
    });
  }

  get formValid() {
    if (this.overlayData.editMode) {
      const { title, description } = this.overlayData.todo;
      const todoData = { title, description };
      return JSON.stringify(this.form.value) === JSON.stringify(todoData);
    } else {
      return !this.form.valid;
    }
  }

  submitForm() {
    if (this.overlayData.editMode) {
      this.updateTodo();
    } else {
      this.createTodo();
    }
  }

  get formTodo() {
    const todo: Todo = {
      title: this.title.value,
      description: this.description.value,
    };
    return todo;
  }

  createTodo() {
    this.store.dispatch(new CreateTodoAction(this.formTodo));
    this.activeModal.close(TODO_FORM_CLOSE_MODAL_STATES.TODO_CREATED);
  }

  updateTodo() {
    this.store.dispatch(new UpdateTodoAction(this.overlayData.todo.id, this.formTodo));
    this.activeModal.close(TODO_FORM_CLOSE_MODAL_STATES.TODO_UPDATED);
  }

  cancelForm() {
    this.activeModal.close(TODO_FORM_CLOSE_MODAL_STATES.TODO_CANCELLED);
  }

  get title() {
    return this.form.get('title');
  }

  get description() {
    return this.form.get('description');
  }
}
