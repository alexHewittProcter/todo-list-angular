import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { mockTodos } from 'src/app/core/mock/todos';
import { Todo } from 'src/app/core/models/todo';
import { LiveSearchComponent } from './live-search.component';
import { LiveSearchModule } from './live-search.module';

@Component({
  template: `<app-live-search
    [items]="items$ | async"
    (onSearch)="onSearch($event)"
  ></app-live-search>`,
})
class TestHostComponent {
  items$: BehaviorSubject<Todo[]> = new BehaviorSubject([]);
  onSearch = jasmine.createSpy();
}

describe('LiveSearchComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let testHostComponent: TestHostComponent;
  let component: LiveSearchComponent;

  let routerSpy: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [LiveSearchModule, CommonModule],
      declarations: [TestHostComponent],
      providers: [
        {
          provide: Router,
          useValue: {
            navigate: jasmine.createSpy(),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    testHostComponent = fixture.componentInstance;
    component = fixture.debugElement.childNodes[0].componentInstance;

    routerSpy = TestBed.inject(Router);
    fixture.detectChanges();
  });

  const getInput = () => fixture.debugElement.query(By.css('input[type=search]'));
  const getDropdown = () => fixture.debugElement.query(By.css('div.dropdown-menu.dropdown-active'));
  const getDropdownItems = () => fixture.debugElement.queryAll(By.css('a.dropdown-item'));

  const loadItems = (data) => {
    testHostComponent.items$.next(data);
  };

  describe('Searching', () => {
    it('Should perform a search when a user types an input', fakeAsync(() => {
      component.form.get('search').setValue('Test');

      fixture.detectChanges();
      tick(500);

      expect(component.form.get('search').value).toEqual('Test');
      expect(testHostComponent.onSearch).toHaveBeenCalledWith('Test');
    }));

    it('Should perform a search when the user uses the Enter button', fakeAsync(() => {
      component.form.get('search').setValue('Test');
      getInput().triggerEventHandler('keyup.enter', {});

      fixture.detectChanges();
      tick(500);

      expect(testHostComponent.onSearch).toHaveBeenCalled();
    }));
  });

  describe('Displaying items', () => {
    it('Should not display items until the user has made a search', fakeAsync(() => {
      loadItems(mockTodos);
      tick(500);

      getInput().triggerEventHandler('focus', {});
      fixture.detectChanges();
      tick(500);

      component.form.get('search').setValue('Test');
      tick(500);
      fixture.detectChanges();

      expect(getDropdown().nativeElement).toBeTruthy();
      expect(testHostComponent.onSearch).toHaveBeenCalled();
    }));

    it('Should display the items when a search has been made', fakeAsync(() => {
      loadItems(mockTodos);

      getInput().triggerEventHandler('focus', {});
      fixture.detectChanges();
      tick(500);

      component.form.get('search').setValue('Test');

      tick(500);

      getDropdownItems().forEach((element, i) => {
        expect(element.nativeElement.textContent).toEqual(mockTodos[i].title);
      });
    }));

    it('Should navigate the user when an item is clicked on', fakeAsync(() => {
      loadItems(mockTodos);
      getInput().triggerEventHandler('focus', {});
      component.form.get('search').setValue('Test');
      fixture.detectChanges();
      tick(500);

      getDropdownItems()[0].nativeElement.click();

      tick(500);

      expect(routerSpy.navigate).toHaveBeenCalledWith(['todo', '1']);
    }));

    it('Should not display items after an item has been clicked on', fakeAsync(() => {
      loadItems(mockTodos);
      getInput().triggerEventHandler('focus', {});
      component.form.get('search').setValue('Test');
      fixture.detectChanges();
      tick(500);

      getDropdownItems()[0].nativeElement.click();
      fixture.detectChanges();
      tick(500);

      expect(component.hasMadeSearch).toEqual(false);
      expect(component.isFocused).toEqual(false);
      expect(component.dropdownHover).toEqual(false);

      expect(getDropdown()).toBeNull();
    }));
  });
});
