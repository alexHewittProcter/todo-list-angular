import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { LiveSearchComponent } from './live-search.component';

const DECLARATIONS = [LiveSearchComponent];

@NgModule({
  exports: DECLARATIONS,
  declarations: DECLARATIONS,
  imports: [CommonModule, ReactiveFormsModule],
})
export class LiveSearchModule {}
