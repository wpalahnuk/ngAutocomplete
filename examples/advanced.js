angular.module( "Test", ['ngAutocompleteValidate'])
  .controller("TestCtrl",function ($scope) {
    $scope.validboxlabel = "Validation"
    $scope.validbox = "invalidbox";
    $scope.result = ''

    $scope.options = {};

    $scope.$watch('but.$valid', function (validity) {
      $scope.validboxlabel = validity ? 'Valid' : 'Invalid';
    }, true);


  });
