import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';

import { HeaderComponent } from './header.component';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';
import { SharedModule } from '../shared.module';

@Component({
  template: `<app-header [breadcrums]="breadcrums">
    <ng-template #headerLeft>
      <span data-test="header-left">Header left</span>
    </ng-template>
    <span data-test="header-right" class="header-right"> Header right </span>
  </app-header>`,
})
class TestHostComponent {
  breadcrums = ['Hello', 'World', 'Test'];
}

const queryDataTest = (dataTest: string, fixture: ComponentFixture<TestHostComponent>) => {
  return fixture.nativeElement.querySelector(`[data-test=${dataTest}]`);
};

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let hostComponent: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  let navigateSpy: jasmine.Spy;

  beforeEach(async(() => {
    navigateSpy = jasmine.createSpy();
    TestBed.configureTestingModule({
      declarations: [TestHostComponent, HeaderComponent],
      imports: [SharedModule],
      providers: [{ provide: Router, useValue: { navigate: navigateSpy } }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    hostComponent = fixture.componentInstance;
    component = fixture.debugElement.children[0].componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should project content with #headerLeft', () => {
    expect(queryDataTest('header-left', fixture)).toBeTruthy();
  });

  it('should project content with class .header-right', () => {
    expect(queryDataTest('header-right', fixture)).toBeTruthy();
  });

  describe('Should render breadcrums', () => {
    let breadcrums;
    beforeEach(() => {
      breadcrums = fixture.debugElement.queryAll(By.css('.breadcrums > .title'));
    });
    it('Should render all the breadcrum items', () => {
      breadcrums.forEach((v, i) => {
        expect(v.nativeElement.textContent).toEqual(hostComponent.breadcrums[i].toUpperCase());
      });
    });

    it('Should navigate to another page when clicking on a breadcrum', () => {
      breadcrums[1].nativeElement.click();

      expect(navigateSpy).toHaveBeenCalledWith(hostComponent.breadcrums.slice(0, 2));
    });
  });
});
