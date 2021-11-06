import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar.component';
import { LiveSearchModule } from '../components/live-search/live-search.module';

@NgModule({
  declarations: [NavbarComponent],
  exports: [NavbarComponent],
  imports: [CommonModule, LiveSearchModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class NavbarModule {}
