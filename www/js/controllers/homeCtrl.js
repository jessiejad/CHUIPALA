/**
 * Created by Jessie on 03/06/2016.
 * @author Jessie
 */

appChuipala.controller('HomeCtrl', function($scope, apiFactory, CONSTANT_USER, $ionicModal) {
    console.log("in homeCtrl");
    apiFactory.getDaysClasses().then(function (result) {
        console.log(result);
        $scope.classes = result.data;
        $scope.IsUserProfessor = CONSTANT_USER.isProfessor;
    });
    // ion model view // graphController showModal
    /*$scope.absences = function() {

    }*/

    $scope.showModal = function(templateUrl) {
        $ionicModal.fromTemplateUrl(templateUrl, {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.modal = modal;
            $scope.modal.show();
        });
    }

    $scope.showModalComplex = function(templateUrl, idParam){
        $ionicModal.fromTemplateUrl(templateUrl, {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            apiFactory.getClassEvents(idParam).then(function (result){
                console.log(result);
                $scope.absences = result.data.Absences;
                $scope.delays = result.data.Delays;
                $scope.countAbsences = result.data.NbAbsences;
                $scope.countDelays = result.data.NbDelays;
            })
            $scope.modal = modal;
            $scope.modal.show();
        });
    }

    $scope.title = "Veuillez choisir une date et une heure";

    $scope.addDelays = function(date, motif){
        //À compléter
        $scope.modal.hide();
        $scope.modal.remove();
    }

    $scope.addAbsences = function(dateDeb, dateFin, motif){
        //À Compléter
        $scope.modal.hide();
        $scope.modal.remove();
    }
})

appChuipala.controller('AbsencesCtrl', function($scope, apiFactory, CONSTANT_USER) {
    
})