angular.module('umbraco').controller('ArchetypeConfigOptionsController', function ($scope) {
    $scope.addButtonPlacements = [
        { alias: 'top', label: 'Above fieldsets' },
        { alias: 'bottom', label: 'Below fieldsets' },
        { alias: 'item', label: 'Per each fieldset' }
    ];

    //handles a fieldset group add
    $scope.addFieldsetGroup = function () {
        $scope.dialogData.model.fieldsetGroups.push({ name: "" });
    }

    //handles a fieldset group removal
    $scope.removeFieldsetGroup = function ($index) {
        $scope.dialogData.model.fieldsetGroups.splice($index, 1);
    }

    $scope.apply = function(index) {
        $scope.submit($scope.dialogData);
    }
});