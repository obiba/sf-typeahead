angular.module("sfTypeaheadTemplates", []).run(["$templateCache", function($templateCache) {$templateCache.put("src/templates/sf-typeahead.html","<div class=\"form-group\"\n     ng-controller=\"TypeaheadController\"\n     ng-class=\"{\'has-error\': form.disableErrorState !== true && hasError(), \'has-success\': form.disableSuccessState !== true && hasSuccess(), \'has-feedback\': form.feedback !== false }\"\n     schema-validate=\"form\" sf-field-model >\n  <!--<pre>{{form|json}}</pre>-->\n  <label class=\"control-label\" ng-show=\"showTitle()\">{{form.title}}</label>\n  <input type=\"text\"\n         ng-readonly=\"form.readonly\"\n         sf-field-model=\"replaceAll\"\n         ng-model=\"$$value$$\"\n         typeahead-editable=\"false\"\n         uib-typeahead=\"value for value in form.values | filter:$viewValue | limitTo:8\"\n         class=\"form-control\">\n  <span class=\"help-block\" sf-message=\"form.description\"></span>\n</div>\n");}]);
angular.module('sfTypeahead', [
  'schemaForm',
  'sfTypeaheadTemplates'
]).config(['schemaFormProvider', 'schemaFormDecoratorsProvider', 'sfBuilderProvider', 'sfPathProvider',
  function (schemaFormProvider, schemaFormDecoratorsProvider, sfBuilderProvider, sfPathProvider) {

    var sfTypeahead = function (name, schema, options) {
      if (schema.type === 'string' && schema.format == 'typeahead') {
        var f = schemaFormProvider.stdFormObj(name, schema, options);
        f.key = options.path;
        f.type = 'typeahead';
        if (options.global.validators) {
          f.$validators = options.global.validators;
        }
        options.lookup[sfPathProvider.stringify(options.path)] = f;
        return f;
      }
    };

    schemaFormProvider.defaults.string.unshift(sfTypeahead);

    schemaFormDecoratorsProvider.defineAddOn(
      'bootstrapDecorator',           // Name of the decorator you want to add to.
      'typeahead',                      // Form type that should render this add-on
      'src/templates/sf-typeahead.html',  // Template name in $templateCache
      sfBuilderProvider.stdBuilders   // List of builder functions to apply.
    );

  }])
  .controller('TypeaheadController', ['$scope', function ($scope) {
    $scope.$watch('ngModel.$modelValue', function () {
      if ($scope.ngModel.$validate) {
        // Make sure that allowInvalid is always true so that the model is preserved when validation fails
        $scope.ngModel.$options = $scope.ngModel.$options || {};
        $scope.ngModel.$options = {allowInvalid: true};
        $scope.ngModel.$validate();
        if ($scope.ngModel.$invalid) { // The field must be made dirty so the error message is displayed
          $scope.ngModel.$dirty = true;
          $scope.ngModel.$pristine = false;
        }
      }
      else {
        $scope.ngModel.$setViewValue(ngModel.$viewValue);
      }
    }, true);

    $scope.$watch('form', function () {
      $scope.form.disableErrorState = $scope.form.hasOwnProperty('readonly') && $scope.form.readonly;
    });
  }]);
