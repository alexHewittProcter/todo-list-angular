import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './header/header.component';
import { StatusDropdownComponent } from './status-dropdown/status-dropdown.component';

@NgModule({
  declarations: [HeaderComponent, StatusDropdownComponent],
  exports: [HeaderComponent, StatusDropdownComponent],
  imports: [CommonModule, NgbDropdownModule],
})
export class SharedModule {}
