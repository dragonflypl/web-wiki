Sample solutions:

- https://github.com/UltimateAngular/ngx-errors
- https://github.com/DmitryEfimenko/ngx-messages
- https://github.com/third774/ng-bootstrap-form-validation
- https://blog.thoughtram.io/angular/2016/03/14/custom-validators-in-angular-2.html

## ElementRef & Renderer

These two dependencies should be used to manipulate DOM, e.g. set styles:

```
import { Directive, ElementRef, Renderer } from '@angular/core';

@Directive({
  selector: '[highlight]'
})
export class HighlightDirective {

	constructor(private elementRef: ElementRef, private renderer: Renderer) {
		this.renderer.setElementStyle(this.elementRef.nativeElement, 'background-color', 'yellow');
	}

}
```

Alternatively, `@HostBinding` can be used:

```
import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: '[highlight]'
})
export class HighlightDirective {

	private color = "yellow";
	
	@HostBinding('style.backgroundColor') get getColor() {
		return this.color;
	}
	
	constructor() {
	}

}
```


# Resources:

- http://techorgan.com/javascript-framework/angularjs-2-series-build-your-own-directive/
