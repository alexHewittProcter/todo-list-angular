import {
  Component,
  ContentChild,
  AfterViewInit,
  TemplateRef,
  ChangeDetectorRef,
} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements AfterViewInit {
  @ContentChild('headerLeft', { static: false }) headerLeft: TemplateRef<any>;
  constructor(private readonly cdr: ChangeDetectorRef) {}

  ngAfterViewInit() {
    this.cdr.detectChanges();
  }
}
