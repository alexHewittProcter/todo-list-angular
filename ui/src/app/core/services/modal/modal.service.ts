import { Injectable, InjectionToken, Injector } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

export const MODAL_DATA: InjectionToken<any> = new InjectionToken<any>('MODAL_DATA');

export interface IModalConfig<T> {
  data?: T;
}

@Injectable({ providedIn: 'root' })
export class ModalService {
  constructor(private ngbModalService: NgbModal) {}

  public open<Data>(component: any, config?: IModalConfig<Data>): NgbModalRef {
    const data = config && config.data ? config.data : undefined;
    const injector = this.setupInjector<Data>(data);

    const modalRef = this.ngbModalService.open(component, { injector });

    return modalRef;
  }

  private setupInjector<Data>(data: Data): Injector {
    return Injector.create({ providers: [{ provide: MODAL_DATA, useValue: data }] });
  }
}
