import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[focusInput]'
})
export class FocusFormDirective {
  constructor(private el: ElementRef) {}
  @HostListener('ngSubmit')
  onFormSubmit() {
    const invalidControl = this.el.nativeElement.querySelector('.ng-invalid');
    if (invalidControl) {
      invalidControl.focus();
    }
  }
}