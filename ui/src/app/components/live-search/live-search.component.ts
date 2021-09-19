import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { debounceTime, filter, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-live-search',
  template: ` <form class="d-flex" [formGroup]="form">
    <div class="input-group">
      <div>
        <input
          #search
          formControlName="search"
          class="form-control"
          type="search"
          placeholder="Search"
          aria-label="Search"
          (focus)="onFocus($event)"
          (focusout)="focusOut($event)"
          (keyup)="onKeyUp($event)"
          (keydown)="onKeyDown($event)"
        />
        <div
          *ngIf="items.length"
          class="dropdown-menu"
          [ngClass]="{ 'dropdown-active': hasMadeSearch && (isFocused || dropdownHover) }"
          (mouseover)="mouseOver($event)"
          (mouseout)="mouseOut($event)"
        >
          <a
            class="dropdown-item"
            [ngClass]="{ active: currentHighlightIndex === i }"
            (click)="click($event, item)"
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
export class LiveSearchComponent implements OnChanges {
  isFocused = false;
  hasMadeSearch = false;
  dropdownHover = false;
  currentHighlightIndex = -1;
  form: FormGroup;

  private destroy$: Observable<boolean> = new Subject();

  @Input()
  items: any[];

  @Output()
  onSearch: EventEmitter<String> = new EventEmitter();

  @ViewChild('search') searchEl: ElementRef;

  constructor(private fb: FormBuilder, private readonly router: Router) {
    this.form = this.fb.group({ search: [''] });

    this.form
      .get('search')
      .valueChanges.pipe(takeUntil(this.destroy$), filter(Boolean), debounceTime(200))
      .subscribe((v: string) => {
        this.search(v);
      });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['items'] && changes['items'].currentValue) {
      this.resetDropdownList();
    }
  }

  reset() {
    this.hasMadeSearch = false;
    this.isFocused = false;
    this.dropdownHover = false;
    this.resetDropdownList();
    this.form.get('search').reset();
    this.searchEl.nativeElement.blur();
  }

  resetDropdownList() {
    this.currentHighlightIndex = -1;
  }

  search(term: string) {
    this.hasMadeSearch = true;

    this.onSearch.emit(term);
  }

  click(event: Event, item: any) {
    event.preventDefault();
    event.stopPropagation();
    this.navigate(item.id);
  }

  navigate(id: number) {
    this.reset();
    this.router.navigate(['todo', id]);
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

  onKeyUp(e: KeyboardEvent) {
    if (e.key == 'Enter' && this.currentHighlightIndex >= 0) {
      this.navigate(this.items[this.currentHighlightIndex].id);
    } else if (e.key == 'ArrowDown' && this.currentHighlightIndex < this.items.length) {
      this.currentHighlightIndex++;
    } else if (e.key == 'ArrowUp' && this.currentHighlightIndex >= 0) {
      e.preventDefault();
      e.stopPropagation();
      this.currentHighlightIndex--;
    } else if (e.key === 'Enter') {
      // For searching
      this.search(this.form.get('search').value);
    }
  }

  /**
   * This method stops the input cursor in the input going to the front of the word
   */
  onKeyDown(e: KeyboardEvent) {
    if (e.key == 'ArrowUp' && this.currentHighlightIndex >= 0) {
      e.preventDefault();
      e.stopPropagation();
    }
  }
}
