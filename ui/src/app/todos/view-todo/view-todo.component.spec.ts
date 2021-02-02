import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { LoadSelectedTodoAction } from 'src/app/core/store/actions/selected-todo';
import { getTodoDetails } from 'src/app/core/store/selectors';
import { SharedModule } from 'src/app/shared/shared.module';

import { ViewTodoComponent } from './view-todo.component';

describe('ViewTodoComponent', () => {
  let component: ViewTodoComponent;
  let fixture: ComponentFixture<ViewTodoComponent>;

  let dispatch: jasmine.Spy;
  let select: jasmine.Spy;
  beforeEach(async(() => {
    dispatch = jasmine.createSpy();
    select = jasmine.createSpy();

    TestBed.configureTestingModule({
      declarations: [ViewTodoComponent],
      imports: [SharedModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { params: { id: '1' } },
          },
        },
        { provide: Store, useValue: { dispatch, select } },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('on init', () => {
    it('should select to these selectors', () => {
      expect(select).toHaveBeenCalledWith(getTodoDetails);
    });

    it('should dispatch', () => {
      expect(dispatch).toHaveBeenCalledWith(new LoadSelectedTodoAction({ todoId: '1' }));
    });
  });
});
