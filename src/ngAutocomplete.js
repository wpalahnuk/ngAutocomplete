'use strict';

angular.module("ngAutocompleteValidate", [])
    .directive('ngAutocompleteValidate', function() {
        return {
            require: 'ngModel',
            scope: {
                ngModel: '=',
                options: '=?',
                details: '=?',
                minedAddress: '=?',
                compiledAddress: '=?'
            },

            link: function(scope, element, attrs, controller) {

                function mineAddress(x) {
                    var rAddress = {}
                    x.address_components.forEach(function(a, i) {
                        rAddress[a.types[0]] = a.long_name
                    })
                    return rAddress;
                }

                function compileAddress(x) {
                    var rAddress = {}
                    if (x.route) rAddress.street = x.route;
                    if (x.street_number && rAddress.street) rAddress.street += ' ' + x.street_number;
                    if (x.country) rAddress.country = x.country;
                    if (x.administrative_area_level_1) {
                        rAddress.state = x.administrative_area_level_1
                    } else if (x.administrative_area_level_2) {
                        rAddress.state = x.administrative_area_level_2
                    }
                    if (x.postal_code) rAddress.zipcode = x.postal_code
                    if (x.locality) rAddress.city = x.locality
                    return rAddress
                }

                if (scope.gPlace == undefined) {
                    scope.gPlace = new google.maps.places.Autocomplete(element[0], {});
                    scope.gPlace.setTypes(['address'])
                }

                google.maps.event.addListener(scope.gPlace, 'place_changed', function() {
                    var result = scope.gPlace.getPlace();
                    if (result !== undefined) {
                        if (result.address_components !== undefined) {
                            scope.$apply(function() {
                                scope.details = result;
                                controller.$setViewValue(element.val());
                                scope.minedAddress = mineAddress(result);
                                scope.compiledAddress = compileAddress(scope.minedAddress);
                                controller.$validate()
                            });
                        } else {
                            getPlace(result)
                        }
                    }
                })

                //function to get retrieve the autocompletes first result using the AutocompleteService
                var getPlace = function(result) {
                    var autocompleteService = new google.maps.places.AutocompleteService();
                    if (result.name.length > 0) {
                        autocompleteService.getPlacePredictions({
                                input: result.name,
                                offset: result.name.length
                            },
                            function listentoresult(list, status) {
                                if (list == null || list.length == 0) {

                                    scope.$apply(function() {
                                        scope.details = null;
                                        scope.minedAddress = null;
                                        scope.compiledAddress = null;
                                        controller.$validate()
                                    });

                                } else {
                                    var placesService = new google.maps.places.PlacesService(element[0]);
                                    placesService.getDetails({
                                            'reference': list[0].reference
                                        },
                                        function detailsresult(detailsResult, placesServiceStatus) {

                                            if (placesServiceStatus == google.maps.GeocoderStatus.OK) {
                                                scope.$apply(function() {

                                                    controller.$setViewValue(detailsResult.formatted_address);
                                                    element.val(detailsResult.formatted_address);

                                                    scope.details = detailsResult;
                                                    scope.minedAddress = mineAddress(detailsResult);
                                                    scope.compiledAddress = compileAddress(scope.minedAddress)
                                                    controller.$validate()
                                                    console.log("TEST", d)


                                                    //on focusout the value reverts, need to set it again.
                                                    var watchFocusOut = element.on('focusout', function(event) {
                                                        element.val(detailsResult.formatted_address);
                                                        scope.details = detailsResult;
                                                        scope.minedAddress = mineAddress(detailsResult);
                                                        scope.compiledAddress = compileAddress(scope.minedAddress)
                                                        controller.$validate()

                                                        element.unbind('focusout')
                                                    })

                                                });
                                            }
                                        }
                                    );
                                }
                            });
                    }
                }


                controller.$validators.validAddress = function() {
                    return checkFields(scope.compiledAddress, scope.minedAddress)
                }

                function checkFields(a, b) {
                    var valid = false
                    if (!a) return false;
                    if (a.city &&
                        a.country &&
                        a.street &&
                        b.street_number) {
                        valid = true;
                    }
                    return valid;
                }

                controller.$render = function() {
                    element.val(controller.$viewValue);
                };

            }
        };
    });
