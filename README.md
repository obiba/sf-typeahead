Schema Form Typeahead Add-on
===================================
 
**sf-typeahead** add-on 

Installation
------------

```
$ bower install sf-typeahead --save
```

Alternatively:

```
$ bower install https://github.com/obiba/sf-typeahed.git#<release-number> --save
```


Make sure to include `sf-typeahead.min.js` in your index file and load the module in your application:

```
var myModule = angular.module('myModule', [
 ...
 'sfTypeahead',
]);
```

Usage
-----

The schema:

```
"name": {
  "type": "object",
  "properties": {
    "name": {
      "type": "string",
      "format": "typeahead",
      "title": "Name",
      "description": "Name or alias"
    }
  }
}
```

The Definition:

```
{
  "type":"typeahead",
  "key":"name"
}
```

To provide the typeahead auto complete values you need to pass them to the form default options:

```
$scope.sfOptions = {formDefaults: { values: ['Bob','Jim','Jack']}};

```