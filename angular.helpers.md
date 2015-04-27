```
<form novalidate name=completeForm>
  <div class="form-group" pw-has-feedback>
    <label for="email">Email address</label>
    <input ng-model=completeFormData.email required type="email" class="form-control" name="email" id="email" placeholder="Enter email">
    <pw-feedback-icon-valid field="completeForm.email"></pw-feedback-icon-valid>
    <pw-feedback-icon-invalid field="completeForm.email" form="completeForm"></pw-feedback-icon-invalid>
    <pw-error-help-block field="completeForm.email" form="completeForm">
      <span ng-message="required">Email is required</span>
      <span ng-message="email">Email is not valid</span>
    </pw-error-help-block>
  </div>
  <div class="form-group" pw-has-feedback>
    <label for="password">Password</label>
    <input ng-model=completeFormData.password required type="password" class="form-control" name="password" id="password" placeholder="Password">
    <pw-feedback-icon-valid field="completeForm.password"></pw-feedback-icon-valid>
    <pw-feedback-icon-invalid field="completeForm.password" form="completeForm"></pw-feedback-icon-invalid>
    <pw-error-help-block field="completeForm.password" form="completeForm">
      <span ng-message="required">Password is required</span>
    </pw-help-block>
  </div>
  <button type="submit" class="btn btn-default">Submit</button>
</form>
```

```
  appModule.directive('pwErrorHelpBlock', function() {
    return {
      restrict: 'E',
      transclude: true,
      scope: {
        field: '=',
        form: '='
      },
      template: '<span class="help-block has-error"' +
          'ng-if="(form.$submitted || field.$touched) && field.$invalid"' +
          'ng-messages=field.$error><ng-transclude></ng-transclude></span>'
    };
  })
  
  appModule.directive('pwHasFeedback', function() {
    return {
      restrict: 'A',
      link: function(scope, element, attrs) {
      
        var $element = $(element);
        $element.addClass('has-feedback');
        
        var formName = $element.closest('form').attr('name');
        var formFieldName = $element.find('input, select, textarea').attr('name');
        
        scope.$watch(formName + '.' + formFieldName + '.$touched', function() {
          updateClasses();  
        });
        
        scope.$watch(formName + '.' + formFieldName + '.$valid', function() {
          updateClasses();
        });
        
        scope.$watch(formName + '.$submitted', function() {
          updateClasses();
        });        
        
        function updateClasses() {
          if (scope[formName][formFieldName].$touched && scope[formName][formFieldName].$valid) {
            $element.addClass('has-success');  
          } else {
            $element.removeClass('has-success');  
          }
          
          if ((scope[formName].$submitted || scope[formName][formFieldName].$touched) && scope[formName][formFieldName].$invalid) {
            $element.addClass('has-error');
          } else {
            $element.removeClass('has-error');
          }
        };
      }
    }
  })
  
  appModule.directive('pwFeedbackIconValid', function() {
    return {
      multiElement: true,
      restrict: 'E',
      replace: true,
      scope: {
        field: '='
      },
      template: '<i ng-show="field.$valid" class="fa fa-check-square-o form-control-feedback"></i>'
    };
  })
  
  appModule.directive('pwFeedbackIconInvalid', function() {
    return {
      restrict: 'E',
      replace: true,
      scope: {
        field: '=',
        form: '='
      },
      template: '<i ng-show="(form.$submitted || field.$touched) && field.$invalid" class="fa fa-exclamation-triangle form-control-feedback"></i>'
    };
  })
```
