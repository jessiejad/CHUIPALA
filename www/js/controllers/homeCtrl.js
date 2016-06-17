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
        apiFactory.createDelay(date, motif).then(function(result) {
            console.log(result);
        });
        $scope.modal.hide();
        $scope.modal.remove();
        //$state.go($state.current, {}, {reload: true});
    }

    $scope.addAbsences = function(dateDeb, dateFin, motif){
        //À Compléter
        $scope.modal.hide();
        $scope.modal.remove();
    }
})

appChuipala.filter('searchContacts', function(){
  return function (items, query) {
    var filtered = [];
    var letterMatch = new RegExp(query, 'i');
    for (var i = 0; i < items.length; i++) {
      var item = items[i];
      if (query) {
        if (letterMatch.test(item.PersonFullName)) {
          filtered.push(item);
        }
      } else {
        filtered.push(item);
      }
    }
    return filtered;
  };
});

appChuipala.controller('MyAbsencesCtrl', function($scope, apiFactory, CONSTANT_USER, $ionicModal) {
    
    apiFactory.getMyAbsences().then(function (result) {
        $scope.absences = result.data;
    })

    $scope.showModal = function(templateUrl) {
        $ionicModal.fromTemplateUrl(templateUrl, {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.modal = modal;
            $scope.modal.show();
        });
    }
})

appChuipala.controller('MyDelaysCtrl', function($scope, apiFactory, CONSTANT_USER, $ionicModal) {
    apiFactory.getMyDelays().then(function (result) {
        $scope.delays = result.data;
    })

    $scope.showModal = function(templateUrl) {
        $ionicModal.fromTemplateUrl(templateUrl, {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.modal = modal;
            $scope.modal.show();
        });
    }
})

appChuipala.controller('AbsenceCtrl', function($scope, apiFactory, $stateParams) {
    apiFactory.getAbsenceInfo($stateParams.id).then(function(result) {
        $scope.absenceCours = result.data;
    })
});