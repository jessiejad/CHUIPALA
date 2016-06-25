/**
 * Created by Jessie on 03/06/2016.
 * @author Jessie
 */

appChuipala.controller('HomeCtrl', function($scope, apiFactory, CONSTANT_USER, $ionicModal, CONSTANT_USER, $state, $rootScope) {
    if(!CONSTANT_USER.isConnected) {
        $state.go('app.login');
        return;
    }
    $rootScope.logout = function() {
        CONSTANT_USER.isConnected = false;
        $state.go('app.login');
        return;
    }
    console.log("in homeCtrl");
    apiFactory.getUserInfo().then(function (result) {
        console.log(result);
        CONSTANT_USER.name = result.data.Name;
        CONSTANT_USER.firstname = result.data.FirstName;
        CONSTANT_USER.isProfessor = result.data.IsProfessor;
        console.log(CONSTANT_USER);
        $rootScope.userFullName = CONSTANT_USER.firstname + " " + CONSTANT_USER.name;
        $rootScope.isProfessor = CONSTANT_USER.isProfessor;
    })
    apiFactory.getDaysClasses().then(function (result) {
        console.log(result);
        $scope.classes = result.data;
        $scope.IsUserProfessor = CONSTANT_USER.isProfessor;
    });
    // ion model view // graphController showModal
    /*$scope.absences = function() {

    }*/

    $scope.showModalDelay = function(templateUrl, datetime) {
        $ionicModal.fromTemplateUrl(templateUrl, {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            console.log(datetime);
            $scope.datetimeValue = datetime;
            $scope.modal = modal;
            $scope.modal.show();
        });
    }

    $scope.showModalAbsence = function(templateUrl, datetime1, datetime2) {
        $ionicModal.fromTemplateUrl(templateUrl, {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            console.log(datetime1);
            console.log(datetime2);
            $scope.datetimeValueDeb = datetime1;
            $scope.datetimeValueFin = datetime2;
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
        console.log(date);
        console.log(motif);
        apiFactory.createDelay(date, motif).then(function(result) {
            console.log(result);
        });
        $scope.modal.hide();
        $scope.modal.remove();
        //$state.go($state.current, {}, {reload: true});
    }

    $scope.addAbsences = function(dateDeb, dateFin, motif){
        console.log(dateDeb, dateFin, motif);
        apiFactory.createAbsence(dateDeb, dateFin, motif).then(function(result) {
            console.log(result);
        });
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

    $scope.addAbsences = function(dateDeb, dateFin, motif){
        apiFactory.createAbsence(dateDeb, dateFin, motif).then(function(result) {
            console.log(result);
        });
        $scope.modal.hide();
        $scope.modal.remove();
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

    $scope.addDelays = function(date, motif){
        console.log(date);
        console.log(motif);
        apiFactory.createDelay(date, motif).then(function(result) {
            console.log(result);
        });
        $scope.modal.hide();
        $scope.modal.remove();
        //$state.go($state.current, {}, {reload: true});
    }
})

appChuipala.controller('AbsenceCtrl', function($scope, apiFactory, $stateParams) {
    apiFactory.getAbsenceInfo($stateParams.id).then(function(result) {
        $scope.absenceCours = result.data;
        console.log(result);
    })
});

appChuipala.controller('DelayCtrl', function($scope, apiFactory, $stateParams) {
    apiFactory.getDelayInfo($stateParams.id).then(function(result) {
        $scope.delay = result.data;
    })
});

appChuipala.controller('LoginCtrl', function($scope, apiFactory, $stateParams, CONSTANT_USER, $state) {
    console.log('in login ctrl');
    $scope.login = function(email, password) {
        /*$scope.email = 'fiofio@gmail.com';
        $scope.password = 'Pass@123';*/
        console.log(email);
        console.log(password);
        apiFactory.authenticate(email, password)
            .success(function(result) {
                console.log(result);
                CONSTANT_USER.username = email;
                CONSTANT_USER.password = password;
                CONSTANT_USER.token = result.access_token;
                CONSTANT_USER.isConnected = true;
                console.log(CONSTANT_USER);
                $state.go('app.home');
            })
            .error(function(result) {
                $state.go('app.login');
            })
    }
});

appChuipala.controller('SettingsCtrl', function($scope, LANGUAGES) {
    $scope.languages = LANGUAGES;
});