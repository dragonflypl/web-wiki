## HOST AND VISIBILITY IN ANGULAR'S DEPENDENCY INJECTION

> Reminder: each component creates its own injector

In world of components, each nested component creates an injector that inherits from parent's injector:

```
var injector = ResolveInjector.resolveAndCreate([
  { provide: Car, useClass: Car },
  { provide: Engine, useClass: Engine }
]);
var childInjector = injector.resolveAndCreateChild();
var grandChildInjector = childInjector.resolveAndCreateChild([
  { provide: Car, useClass: Convertible }
]);
```

`grandChildInjector` has access to all providers defined "abowe" and can override providers.

But, if we need to ensure that our dependency is created (provided) by parent component (lookup will stop on parent), then we can decorate dependency with `@Host` decorator.

Component has two tools to define a provider:

- `providers`: standard i.e. provider will be available for lookup for child components
- `viewProviders`: non-stanrard i.e. provider will be available for lookup only for current component. Child components will know nothing about these providers. View Providers are also only available in components, not in directives. That’s simply because a directive doesn’t have its own view.
