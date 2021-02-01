import { Component, Output, Input, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-status-dropdown',
  templateUrl: './status-dropdown.component.html',
  styleUrls: ['./status-dropdown.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatusDropdownComponent {
  readonly statusKeys = ['open', 'done'];
  readonly statuses = { open: 'Open', done: 'Done' };

  @Input()
  status: string = 'open';

  @Output()
  statusChange: EventEmitter<string> = new EventEmitter();

  constructor() {}

  changeStatus(newStatus: string) {
    this.statusChange.emit(newStatus);
  }
}
