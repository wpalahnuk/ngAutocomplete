'use strict';

/**
 * A directive for adding google places autocomplete to a text box
 * google places autocomplete info: https://developers.google.com/maps/documentation/javascript/places
 *
 * Usage:
 *
 * <input type="text"  ng-autocomplete ng-model="autocomplete" options="options" details="details"/>
 *
 * + ng-model - autocomplete textbox value
 *
 * + details - more detailed autocomplete result, includes address parts, latlng, etc. (Optional)
 *
 * + options - configuration for the autocomplete (Optional)
 *
 *       + types: type,        String, values can be 'geocode', 'establishment', '(regions)', or '(cities)'
 *       + bounds: bounds,     Google maps LatLngBounds Object, biases results to bounds, but may return results outside these bounds
 *       + country: country    String, ISO 3166-1 Alpha-2 compatible country code. examples; 'ca', 'us', 'gb'
 *       + watchEnter:         Boolean, true; on Enter select top autocomplete result. false(default); enter ends autocomplete
 *
 * example:
 *
 *    options = {
 *        types: '(cities)',
 *        country: 'ca'
 *    }
**/

angular.module( "ngAutocomplete", [])
  .directive('ngAutocomplete', function() {
    return {
      require: 'ngModel',
      scope: {
        ngModel: '=',
        options: '=?',
        details: '=?'
      },

      link: function(scope, element, attrs, controller) {

        var watchEnter = false;

        scope.gPlace = new google.maps.places.Autocomplete(element[0], {});

        google.maps.event.addListener(scope.gPlace, 'place_changed', function() {
          if ((scope.details = scope.gPlace.getPlace()) && scope.details.address_components) {
            scope.$apply(function() {
              controller.$setViewValue(element.val());
            });
          }
        });

        var addListener = element[0].addEventListener || element[0].attachEvent;
        var wrapper = function(type, listener) {
          if (type === 'keydown') {
            var orig = listener;
            listener = function (event) {
              if (watchEnter && event.which === 13)
                orig.apply(element[0], [$.Event('keydown', { keyCode : 40, which : 40 })]);

              orig.apply(element[0], [event]);
            };
          }

          addListener.apply(element[0], [type, listener]);
        };

        if (element[0].addEventListener)
          element[0].addEventListener = wrapper;
        else if (element[0].attachEvent)
          element[0].attachEvent = wrapper;

        controller.$render = function () {
          element.val(controller.$viewValue);
        };

        //watch options provided to directive
        scope.watchOptions = function () {
          return scope.options;
        };
        scope.$watch(scope.watchOptions, function () {
          if (scope.options) {
            watchEnter = scope.options.watchEnter;

            if (scope.options.types)
              scope.gPlace.setTypes([ scope.options.types ]);
            else
              scope.gPlace.setTypes([]);

            if (scope.options.bounds)
              scope.gPlace.setBounds(scope.options.bounds);
            else
              scope.gPlace.setBounds(null);

            if (scope.options.country)
              scope.gPlace.setComponentRestrictions({ country: scope.options.country });
            else
              scope.gPlace.setComponentRestrictions(null);
          }
        }, true);
      }
    };
  });