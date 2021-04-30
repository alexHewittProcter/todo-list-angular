import { Component, Inject } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalService, MODAL_DATA } from './modal.service';

@Component({ template: '' })
class TestModalComponent {
  constructor(@Inject(MODAL_DATA) public overlayData: any) {}
}

describe('Modal service', () => {
  let modalService: ModalService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgbModalModule],
      declarations: [TestModalComponent],
      providers: [ModalService],
    })
      .overrideModule(BrowserDynamicTestingModule, {
        set: { entryComponents: [TestModalComponent] },
      })
      .compileComponents();

    modalService = TestBed.get(ModalService);
  });

  it('Should provide `data` as undefined when not provided', () => {
    const modalRef = modalService.open(TestModalComponent);

    expect(modalRef.componentInstance.overlayData).toEqual(undefined);
  });

  it('Should pass `data` to modal component', () => {
    const data = { test: 'hello world' };
    const modalRef = modalService.open<{ test: string }>(TestModalComponent, { data });

    expect(modalRef.componentInstance.overlayData).toEqual(data);
  });
});
