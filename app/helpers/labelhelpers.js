var ArchetypeLabels = (function() {

    var isLoading = false;
    var entityNameLookupCache = [];

    function getEntityById(scope, id, type) {

        console.log(id);

        for (var i in entityNameLookupCache) {
            if (entityNameLookupCache[i].id == id) {
                return entityNameLookupCache[i].value;
            }
        }

        if (!isLoading) {
            console.log("calling...");
            isLoading = true;

            scope.resources.entityResource.getById(id, type).then(function(entity) {
                entityNameLookupCache.push({id: id, value: entity.name});

                console.log(entity.name);

                isLoading = false;
                return entity.name;
            });
        }

        return "";
    }

    return {
        GetEntityById: function (scope, value, labelElement) {
            var foo = getEntityById(scope, value.split(',')[0], "Document");
            console.log(foo);
        },

        GetFirstListItem: function (scope, value, labelElement) {

            //so far i can't drive down to the items I want
            //as-if jQuery lite is the only thing available here
            var labelElement = $(labelElement);

            var $fs = labelElement.closest("fieldset");
            console.log($fs);
            var fieldsetProps = $fs[0].children[1].children;

            console.log(fieldsetProps);

            return "foo";
        }
    }
})();