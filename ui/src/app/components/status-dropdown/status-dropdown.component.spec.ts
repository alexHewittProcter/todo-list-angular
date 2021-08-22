import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { StatusDropdownComponent } from './status-dropdown.component';

@Component({
  template: `<app-status-dropdown
    [status]="status"
    (statusChange)="statusChange($event)"
  ></app-status-dropdown>`,
})
class TestHostComponent {
  statusChange = jasmine.createSpy();
  status = 'open';
}

const getDefaultButton = (fixture) => fixture.debugElement.query(By.css('div.btn-block > button'));
const getDropdownButtons = (fixture) =>
  fixture.debugElement.queryAll(By.css('div.btn-block > button')).slice(1);

describe('StatusDropdownComponent', () => {
  let component: StatusDropdownComponent;
  let testHostComponent: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestHostComponent, StatusDropdownComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    testHostComponent = fixture.componentInstance;
    component = fixture.debugElement.children[0].componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Displaying status', () => {
    it('should display `Open` when the status is `open`', () => {
      expect(getDefaultButton(fixture).nativeElement.innerText.trim()).toBe('Open');
    });

    it('should display `Done` when the status is `done`', () => {
      testHostComponent.status = 'done';
      fixture.detectChanges();
      expect(getDefaultButton(fixture).nativeElement.innerText.trim()).toBe('Done');
    });
  });

  it('should display Statuses in dropdown', () => {
    const dropdownOptions = getDropdownButtons(fixture).map((v) =>
      v.nativeElement.innerText.trim()
    );
    expect(dropdownOptions).toEqual(['Open', 'Done']);
  });

  it('should update the status when you click a dropdown option', () => {
    const doneDropdownOption = getDropdownButtons(fixture)[1];

    doneDropdownOption.nativeElement.click();

    expect(testHostComponent.statusChange).toHaveBeenCalledWith('done');
  });
});
