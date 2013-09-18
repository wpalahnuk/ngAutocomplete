# ng-Autocomplete

A simple directive for adding google places autocomplete to a textbox element

## Examples

+ [Example Plunkers - Simple Usage](http://plnkr.co/edit/il2J8qOI2Dr7Ik1KHRm8?p=preview)

+ [Example Plunkers - Advanced Usage](http://plnkr.co/edit/GF3nM3XfYX9El2w11pGo?p=preview)

## Usage

Include the required libraries 
```html
<script type="text/javascript" src="http://maps.googleapis.com/maps/api/js?libraries=places&sensor=false"></script>
<script src="//ajax.googleapis.com/ajax/libs/jquery/2.0.2/jquery.min.js"></script>
```

Declare a dependency on the `ng-Autocomplete` module
``` javascript
var app = angular.module('myModule', ['ng-Autocomplete']);
```

Add the directive to a textbox

``` javascript
<input type="text" ng-autocomplete="result" details="details" options="options"/>
```

## Documentation

+ result - autocomplete textbox value

+ details - more detailed autocomplete result, includes address parts, latlng, etc. 

+ options - configuration for the autocomplete

	+ types: type,        string, values can be 'geocode', 'establishment', '(regions)', or '(cities)'
	+ bounds: bounds,     google maps LatLngBounds Object, biases results to bounds, but may return results outside these bounds
	+ country: country    string, ISO 3166-1 Alpha-2 compatible country code. examples; 'ca', 'us', 'gb'

example: 
``` javascript
options = {
types: '(cities)'
country: 'ca'
}
```

google places autocomplete info: https://developers.google.com/maps/documentation/javascript/places

## Author

**Will Palahnuk** (http://github.com/wpalahnuk)

## Credits

google places autocomplete https://developers.google.com/maps/documentation/javascript/places

