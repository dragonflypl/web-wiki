## Providers property

Specified on module class level, it lists classes/services that will be available for the modules injector.

Injector creates instance of the service and deliver it, and then cache it. So services are singletons.

## DI 

### Providers

Services are simply classes. You could instantiate classes inside constructor on your own, although drawbacks are obvious.

DI makes code loosely coupled, more flexible, easier to test.

Provider is a recepi for creating a dependency, it has many options to create (useClass, useValue etc.)

We can use `InjectionToken` with `@Inject`, `ModuleWithProviders`, `multi`, `@Optional` decorator, attribute to gain even more control over how services are created.

### Injectors

They deliver provided services to constructors.

They maintain single instance of service.

Delegate injection to parent injectors.

How injectors know what to inject? They do it based on metadata emitted by typescript compiler (`emitDecoratorMetadata`)

(compare output of ng build with / without this flag)

Injectors have hierarchy: root injector (entire application) + injector per component

Any provider defined on module level will be added to rootinjector.

Application wide services should be consolidated in `core module` with constructor guard.

### Injectors hierarchy

- platform injector (shared among all apps running in the browser, so I assume it's possible to run multiple applications)
- application injector
- lazy loaded module injectors
- view/component injectors

### `forwardRef`

If you need to create class and at the same time create provider for it, use forwardRef (because otherwise you will get typescript error that you use type before it is used.

## CoreModules guard

> https://angular.io/guide/styleguide#prevent-re-import-of-the-core-module

If some modules are to be loaded only into application module, then it can be done via module's constructor guard and `SkipSelf`. 
