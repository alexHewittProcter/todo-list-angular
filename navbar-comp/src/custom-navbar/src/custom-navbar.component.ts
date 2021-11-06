import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'app-custom-navbar',
  templateUrl: './custom-navbar.component.html',
  styleUrls: ['./custom-navbar.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class CustomNavbarComponent implements OnInit {
  @Output() onNavigateHome: EventEmitter<void> = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}
}
