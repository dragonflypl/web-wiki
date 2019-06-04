# Working with the DOM

This document describes Angular's API to query the DOM / Attach handlers / Working with templates etc, basically everything what is needed to write platform agnostic code

The new Angular version runs on different platforms — in a browser, on a mobile platform or inside a web worker. So a level of abstraction is required to stand between platform specific API and the framework interfaces. In angular these abstractions come in a form of the following reference types: ElementRef, TemplateRef, ViewRef, ComponentRef and ViewContainerRef

View vs Content children - this is easy: view children (available in `ngAfterViewInit`) are pieces that are in component's template, whereas content children are between component's opening & closing tags.

## Angular's dynamic scoping in templates & ngFor magic

Here you can read on how to customize `*ngFor` and how it takes advantage of dynamic (runtime) scoping.

> http://blog.mgechev.com/2017/10/01/angular-template-ref-dynamic-scoping-custom-templates/

## Quering the DOM for content childrens

> https://github.com/mgechev/viewchildren-contentchildren-demo

The only two differences between accessing view children and content children are the decorators and the life-cycle hooks in which they are initialized. For grabbing all the content children we should use @ContentChildren (or @ContentChild if there’s only one child), and the children will be set on ngAfterContentInit.

### Content projection with `ng-content`

`ng-content` allows to select a piece of DOM that is between openint & closing tag of the component and project it to a place inside component's template. Use `select` attribute along with CSS selector.

### `providers` vs `viewProviders`

If provider is registered on component's level via `providers`, it will be available also to content children.

`viewProviders` should be used to hide services from outside content, e.g. when developing a library.

## Quering the DOM for view childrens

> https://blog.angularindepth.com/exploring-angular-dom-abstractions-80b3ebcfc02

There're two decorators: `@ViewChild` and `@ViewChildren`. They take a selector and "return" single or collection of elements `QueryList`. 

Selector can be of:
- template variable reference (`#{name}` in HTML)

Elements can be of following types:
- `ElementRef` if quering for regular HTML tag. Also each component / directive can obtain its host element by `ElementRef` DI to constructor.
- `TemplateRef` if quering for ng-template
- `ViewContainerRef` if quering for ng-container (here, read property of decorator must be specified). This type has api for manipulating views i.e. having instance of `ViewRef` we can insert it into the DOM with `ViewContainerRef` object.

There's additional type: `ViewRef` - this one cannot be queried. It can be created in two ways:
- `ViewRef.createEmbeddedView` - so creating it from ViewRef (embedded view)

```
ngAfterViewInit() {
    let view = this.tpl.createEmbeddedView(null);
}
```

- using component factory (host view)

```
constructor(private injector: Injector,
            private r: ComponentFactoryResolver) {
    let factory = this.r.resolveComponentFactory(ColorComponent);
    let componentRef = factory.create(injector);
    let view = componentRef.hostView;
}
```

### ngTemplateOutlet & ngComponentOutlet

This directives are give short way of putting component (HostView) or template (embedded view) into the container

## Creating reusable components 

- `read` property and DI: it turns out that read property uses DI. If we pass a service, and this service is available for injection, then it will be injected , so for instance you can have `QueryList<SomeService>`.
