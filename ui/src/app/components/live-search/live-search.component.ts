import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-live-search',
  template: ` <form class="d-flex" [formGroup]="form">
    <div class="input-group">
      <div>
        <input
          formControlName="search"
          class="form-control"
          type="search"
          placeholder="Search"
          aria-label="Search"
          (focus)="onFocus($event)"
          (focusout)="focusOut($event)"
          (keyup)="onKeyUp($event)"
        />
        <div
          class="dropdown-menu"
          [ngClass]="{ 'dropdown-active': hasMadeSearch && (isFocused || dropdownHover) }"
          (mouseover)="mouseOver($event)"
          (mouseout)="mouseOut($event)"
        >
          <a
            class="dropdown-item"
            [ngClass]="{ active: currentHighlightIndex === i }"
            (click)="navigate($event, item)"
            *ngFor="let item of items; let i = index"
            >{{ item.title }}</a
          >
        </div>
      </div>
      <button class="btn btn-success input-group-text" type="submit">Search</button>
    </div>
  </form>`,
  styleUrls: ['./live-search.component.scss'],
})
export class LiveSearchComponent {
  isFocused = false;
  hasMadeSearch = false;
  dropdownHover = false;
  currentHighlightIndex = null;
  form: FormGroup;

  private destroy$: Observable<boolean> = new Subject();

  @Input()
  items: any[];

  @Output()
  onSearch: EventEmitter<String> = new EventEmitter();

  constructor(private fb: FormBuilder, private readonly router: Router) {
    this.form = this.fb.group({ search: [''] });

    this.form
      .get('search')
      .valueChanges.pipe(takeUntil(this.destroy$), debounceTime(500))
      .subscribe((v) => {
        this.search(v);
      });
  }

  reset() {
    this.hasMadeSearch = false;
    this.isFocused = false;
    this.dropdownHover = false;
  }

  search(term: string) {
    this.hasMadeSearch = true;

    this.onSearch.emit(term);
  }

  navigate(event: Event, item: any) {
    event.preventDefault();
    event.stopPropagation();
    this.reset();
    this.router.navigate(['todo', item.id]);
  }

  onFocus(_e) {
    this.isFocused = true;
  }

  focusOut(_e) {
    this.isFocused = false;
  }

  mouseOver(_e) {
    this.dropdownHover = true;
  }

  mouseOut(_e) {
    this.dropdownHover = false;
  }

  onKeyUp(e) {
    if (e.key === 'Enter') {
      this.search(this.form.get('search').value);
    }
  }
}
