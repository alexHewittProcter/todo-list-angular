import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Todo } from '../core/models/todo';
import { SearchTodosAction } from '../core/store/actions';
import { getTodoSearch } from '../core/store/selectors';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  todoSearchResults$: Observable<Todo[]>;

  constructor(private readonly router: Router, private readonly store: Store) {
    this.todoSearchResults$ = this.store.select(getTodoSearch);
  }

  ngOnInit() {}

  onClick() {
    this.router.navigate(['todos']);
  }

  onTodoSearch(term: string) {
    console.log('onTodoSearch');
    console.log(term);
    this.store.dispatch(new SearchTodosAction(term));
  }
}
