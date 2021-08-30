import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { provideMockStore } from '@ngrx/store/testing';
import { LiveSearchModule } from '../components/live-search/live-search.module';
import { mockTodo1 } from '../core/mock/todos';

import { NavbarComponent } from './navbar.component';

describe('NavbarComponent', () => {
  const initialState = {
    todos: {
      todos: [mockTodo1],
    },
  };

  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  let navgiateSpy: jasmine.Spy;

  beforeEach(async(() => {
    navgiateSpy = jasmine.createSpy();
    TestBed.configureTestingModule({
      declarations: [NavbarComponent],
      providers: [
        { provide: Router, useValue: { navigate: navgiateSpy } },
        provideMockStore({ initialState }),
      ],
      imports: [LiveSearchModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to `todos` when navbar brand is clicked', () => {
    const navbarBrand = fixture.debugElement.query(By.css('.navbar-brand'));
    navbarBrand.nativeElement.click();
    fixture.detectChanges();

    expect(navgiateSpy).toHaveBeenCalledWith(['todos']);
  });
});
