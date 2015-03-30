# Angular JS 1.3

## Why?
- performance
- new features
- productivity

##Requirements:
- +IE9 
- jQuery > 2.1.1

## Performance & Code Constructs

### One Time Bindings
Improves performance. Works with:

- ```{{}}``` expression

```
	{{::expression}}
```

- ```ng-repeat``` expression

```
	ng-repeat="item in ::list"
```

- scope's bindable attributes

```
<my-directive attribute="{{::value}}
```
	
### Disable scope annotations

```javascript
$compileProvider.debugInfoEnabled(false);
```
	
### Strict DI Mode

Ensures that files are correctly annotated and will work after minification. If not, Angular will raise an error.

Works by adding ```ng-strict-di``` on ```ng-app``` element.

## Forms & Input Elements

### Data Binding Options

- ```ng-model-options``` directive: gives control over when the bound model properties are updated from the view.

Sample usage could be to change when validation is triggered. For instance - with email fields - by default validation is triggered after every key press. In order to trigger validation only after user left the input field:

```
<input type=email ng-model=vm.email ng-model-options="{ updateOn: 'blur'}" />
```

Another option is ```debounce```. For what debouncing is, check ...

```ng-model-option="{ debounce: 1500 }"```

> Always use ```ng-submit``` directive to make sure that all pending model changes are processed before form submission.

 - ```$rollbackViewValue``` method - let's synchronize view value with model value.

```
formInputController.$rollbackViewValue()
```

Both ```$rollbackViewValue``` and ```ng-model-options``` can be also used on ```form``` level. It can be used to add form level rollback.

### formController.$submitted

Form controller has new property ```$submitted``` that is set after form was submitted.

### Binding to getter/setter

```ng-model-options``` has ```getterSetter``` boolean property which determines whether or not to treat functions bound to ngModel as getters/setters. 

### Touched detection

```$touched``` specifies if form control was touched, i.e. if the user entered the field and the left it. Can be used to hide validation messages untill user touched form control.

```javascript
formController.$touched
```

### Enhanced custom validation

New ```$validators``` is a collection of validators that are applied whenever model value changes. Its key is validator name, and value is validation function:

```
ngModel.$validators.customValidation = function(modelValue) { 
	// return boolean
};
```

### Asynchronous validation

```$asyncValidators``` is the collection of validators that are expected to do asynchronous validation. Validation function must return a promise.

In order to check if input element has validation in progress, ```$pending``` property is set.

## Services & Filters

```$templateRequest``` , ```$anchorScroll``` are new.

```$q``` service has new **ES6** interface:

```javascript
$q(function(resolve, reject) {
	// call reject or resolve
});
```

New filters:

 - ```limitTo``` : enables display of last or first "n" number of characters
 - ```date:"w"``` : displays week number for the year
 - ```currency:'$':0``` :  currency filter has two parameters: first is currency symbol, and second specifies fractional rounding

## Directives

- New ```bindToController``` property, that belongs to directive's definition object, enables binding ```scope``` data to controller if ```controllerAs``` feature is used.
- Deregistratrion of ```$observe``` - as of Angular 1.3 it is possible to deregister watcher that was created with ```$observe``` function. ```$observe``` returns deregistration function.

```javascript
var deregistration = attrs.$observe('test' function() {});
deregistration();
```

- ```ng-include``` events:  three new events are emited when tempates are included:
 - ```$includeContentRequested```
 - ```$includeContentLoaded```
 - ```$includeContentError```

More on [https://code.angularjs.org/1.3.14/docs/api/ng/directive/ngInclude](https://code.angularjs.org/1.3.14/docs/api/ng/directive/ngInclude)

## Animation

1.3 introduces fundamental change: animations no longer happen until next digest cycle. As a result:

- animations are grouped and Angular can optimize them
- if animation is caused outside of digest cycle, the animation will not happen unless digest cycle is triggered manually

### Promises

```$animate``` service methods no longer take callbacks. Instead, they return promises.

### New $animate.animate method

As of 1.3, new ```animate``` methods was introduced, that allows inline animation of CSS properties (no CSS class is needed).