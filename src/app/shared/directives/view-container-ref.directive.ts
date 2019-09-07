import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[view-ref]',
})
export class ViewContainerRefDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
