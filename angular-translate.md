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
