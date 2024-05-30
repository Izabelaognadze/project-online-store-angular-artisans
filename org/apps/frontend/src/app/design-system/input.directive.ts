import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: '[orgInput]',
})
export class InputDirective {
  @HostBinding('class')
  get additionalClasses() {
    return 'shadow w-80 appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:animate-shake';
  }
}
