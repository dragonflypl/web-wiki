### Configuration

``` javascript
var app = angular.module('at', ['pascalprecht.translate']);

app.config(function ($translateProvider) {
  $translateProvider.translations('en', {
    TITLE: 'Hello',
    FOO: 'This is a paragraph.',
    BUTTON_LANG_EN: 'english',
    BUTTON_LANG_DE: 'german'
  });
  $translateProvider.translations('de', {
    TITLE: 'Hallo',
    FOO: 'Dies ist ein Paragraph.',
    BUTTON_LANG_EN: 'englisch',
    BUTTON_LANG_DE: 'deutsch'
  });
  $translateProvider.preferredLanguage('en');
});
```

### Changing language at runtime

``` javascript
app.controller('Ctrl', function ($scope, $translate) {
  $scope.changeLanguage = function (key) {
    $translate.use(key);
  };
});
```

### Automatic language detection

Since version 2.0 there's also a method determinePreferredLanguage() on the $translateProvider, that uses this approach:

It searches for values in the window.navigator object in the following properties (also in this order):

- navigator.languages[0]
- navigator.language
- navigator.browserLanguage
- navigator.systemLanguage
- navigator.userLanguage

If this is not what you need, use callback:

``` javascript
$translateProvider.determinePreferredLanguage(function () {
  var preferredlangKey = '';
  // some custom logic's going on in here
  return preferredLangKey;
});
```

### Language negotiation

Very useful feature that makes relationships between language keys (eg navigator could return en_US, en_UK) and supported translation keys:

``` javascript
$translateProvider
  .translations('en', { /* ... */ })
  .translations('de', { /* ... */ })
  .registerAvailableLanguageKeys(['en', 'de'], {
    'en_US': 'en',
    'en_UK': 'en',
    'de_DE': 'de',
    'de_CH': 'de'
  })
  .determinePreferredLanguage();
```

### Fallback languages

``` javascript
$translateProvider
  .translations('de', { /* ... */ })
  .translations('en', { /* ... */ })
  .fallbackLanguage('en');
```

### Rembering language

- enable ngCookies
- install & enable ```angular-translate-storage-cookie``` or ```angular-translate-storage-local```
- enable storage with ```$translateProvider.useCookieStorage();``` or ```$translateProvider.useLocalStorage();```
