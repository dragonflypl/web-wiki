
### Use https://browser-update.org/

### Use conditional styles:

``` html
<!--[if gt IE 8]><![endif]-->
<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="lt-ie9"> <![endif]-->
<!--[if IE 9]>         <html class="lt-ie10"> <![endif]-->
<!--[if gt IE 9]><!-->
<html class="gt-ie9" xmlns:ng="http://angularjs.org">
<!--<![endif]-->
```

### Use message (for Bootstrap):

``` html
<!--[if lt IE 8]>
<div class="alert alert-danger alert-dismissable">
    <button class="close" data-dismiss="alert">&times;</button>
    <h5>Please note that we no longer support Internet Explorer versions older than 8.</h5>
    <p>
        We recommend upgrading Internet Explorer, Google Chrome or Firefox.
    </p>
    <p>
        If you are using IE 8 or later, make sure you <a href="http://windows.microsoft.com/en-US/windows7/webpages-look-incorrect-in-Internet-Explorer">turn off "Compatibility View"</a>.
    </p>
</div>
<![endif]-->
```
