angular.module("alert-directive", [])
 
    .directive('alert', function () {
        return {
            restrict: 'EA', // support to be used as an element or an attribute
            replace: true, // tells the compiler to replace the original directive's element with the template given by the template field
            template: '<div class="alert alert-{{type || \'info\'}}">' +
                '<button type="button" class="close" ng-click="close()">&times;</button>' +
                '<div ng-transclude></div>' + // the ng-transclude directive gets the transcluded elements and appends them to the element in the template on which it appears
                '</div>',
            transclude: true, // tells the compiler to extract the contents of the original <alert> element and make them available to be transcluded into the template
            scope: { // create an isolated scope
                type: '=', // the = symbol indicates that AngularJS should keep the expression in the specified attribute and the value on the isolated scope in sync with each other
                close: '&' // the & symbol indicates that the expression provided in the attribute on the element will be made available on the scope as a function
            }
        };
    });