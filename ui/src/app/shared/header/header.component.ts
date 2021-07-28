import {
  Component,
  ContentChild,
  AfterViewInit,
  TemplateRef,
  ChangeDetectorRef,
  Input,
} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements AfterViewInit {
  @Input() breadcrums = [];

  @ContentChild('headerLeft', { static: false }) headerLeft: TemplateRef<any>;
  constructor(private readonly cdr: ChangeDetectorRef, private readonly router: Router) {}

  ngAfterViewInit() {
    this.cdr.detectChanges();
  }

  navigateBreadcrum(index: number) {
    this.router.navigate(this.breadcrums.slice(0, index + 1));
  }
}
