angular.module("umbraco.directives").directive('archetypeLabelTemplate', function () {

	//helper to get $eval the labelTemplate
    var getFieldsetTitle = function(scope, element) {

        if(!scope.fieldsetConfigModel)
            return "";
        var fieldsetConfig = scope.getConfigFieldsetByAlias(scope.fieldset.alias);
        var template = scope.fieldsetConfigModel.labelTemplate;

        if (template.length < 1)
            return fieldsetConfig.label;

        var rgx = /{{(.*?)}}*/g;
        var results;
        var parsedTemplate = template;

        while ((results = rgx.exec(template)) !== null) {
            var propertyAlias = "";

            //test for function
            var beginIndexOf = results[1].indexOf("(");
            var endIndexOf = results[1].indexOf(")");

            if(beginIndexOf != -1 && endIndexOf != -1)
            {
                var functionName = results[1].substring(0, beginIndexOf);
                propertyAlias = results[1].substring(beginIndexOf + 1, endIndexOf);
                parsedTemplate = parsedTemplate.replace(results[0], executeFunctionByName(functionName, window, scope, scope.getPropertyValueByAlias(scope.fieldset, propertyAlias), element));
            }
            else {
                propertyAlias = results[1];
                parsedTemplate = parsedTemplate.replace(results[0], scope.getPropertyValueByAlias(scope.fieldset, propertyAlias));
            }
        }

        return parsedTemplate;
    };

    var executeFunctionByName = function(functionName, context) {
        var args = Array.prototype.slice.call(arguments).splice(2);

        var namespaces = functionName.split(".");
        var func = namespaces.pop();

        for(var i = 0; i < namespaces.length; i++) {
            context = context[namespaces[i]];
        }

        if(context && context[func]) {
            return context[func].apply(this, args);
        }

        return "";
    }

	var linker = function (scope, element, attrs){
		element.text(getFieldsetTitle(scope, element));

        scope.$watch("model.value", function(){
                    console.log(scope.model.value);
            element.text(getFieldsetTitle(scope, element));
        });
	}   

	return {
	    restrict: "A",
	    replace: false,
	    link: linker,
	    transclude: true
	}
});