import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { NavbarComponent } from './navbar.component';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  let navgiateSpy: jasmine.Spy;

  beforeEach(async(() => {
    navgiateSpy = jasmine.createSpy();
    TestBed.configureTestingModule({
      declarations: [NavbarComponent],
      providers: [{ provide: Router, useValue: { navigate: navgiateSpy } }],
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
