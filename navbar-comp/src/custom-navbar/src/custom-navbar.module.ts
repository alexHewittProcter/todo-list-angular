import { DoBootstrap, Injector, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { CustomNavbarComponent } from './custom-navbar.component';
import { createCustomElement } from '@angular/elements';

const DECLARATIONS = [CustomNavbarComponent];

@NgModule({
  declarations: DECLARATIONS,
  exports: DECLARATIONS,
  imports: [CommonModule, BrowserModule],
})
export class CustomNavbarModule implements DoBootstrap {
  constructor(private injector: Injector) {}

  ngDoBootstrap(): void {
    const nav = createCustomElement(CustomNavbarComponent, { injector: this.injector });

    customElements.define('custom-navbar', nav);
  }
}
