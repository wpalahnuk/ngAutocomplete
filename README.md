# ng-Autocomplete

A simple directive for adding google places autocomplete to a textbox element

## Documentation and Examples

+ [Example Plunkers](http://embed.plnkr.co/PYDYjVuRHaJpdntoJtqL)

## Usage

Include the required libraries 
```html
<script type="text/javascript" src="http://maps.googleapis.com/maps/api/js?libraries=places&sensor=false"></script>
<script src="//ajax.googleapis.com/ajax/libs/jquery/2.0.2/jquery.min.js"></script>
```

Note that you require the libraries=places

Declare a dependency on the `ng-Autocomplete` module
``` javascript
var app = angular.module('myModule', ['ng-Autocomplete']);
```

## Author

**Will Palahnuk** (http://github.com/wpalahnuk)

