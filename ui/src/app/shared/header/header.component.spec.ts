import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';

import { HeaderComponent } from './header.component';

@Component({
  template: `<app-header>
    <ng-template #headerLeft>
      <span data-test="header-left">Header left</span>
    </ng-template>
    <span data-test="header-right" class="header-right"> Header right </span>
  </app-header>`,
})
class TestHostComponent {}

const queryDataTest = (dataTest: string, fixture: ComponentFixture<TestHostComponent>) => {
  return fixture.nativeElement.querySelector(`[data-test=${dataTest}]`);
};

fdescribe('HeaderComponent', () => {
  let component: HeaderComponent;
  let hostComponent: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestHostComponent, HeaderComponent],
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
});
