/**
 * Created by Jessie on 03/06/2016.
 *
 * This file includes the creation and configuration of the
 * application main modules and values, defines the routes
 * and translations
 * @author Jessie Jadas
 */

'use strict';

// Defining the app
var appChuipala = angular.module('starter', ['ionic', 'ui.router', 'pascalprecht.translate', 'ion-datetime-picker']);

// Defining values
appChuipala.value('V_LANGUAGE',{
  language : "fr"
});

appChuipala.value('LANGUAGES', [
    {
        reference : 'fr',
        label : 'Français'
    },
    {
        reference : 'en',
        label : 'English'
    }
]);

appChuipala.value('CONSTANT_USER',{
    username : null,
    password : null,
    token : null,
    name : null,
    firstname : null,
    isProfessor : null,
    isConnected : false
});

// .run is executed at the application launch
appChuipala.run(function($ionicPickerI18n, $rootScope, $state, CONSTANT_USER) {
    $ionicPickerI18n.weekdays = ["Di", "Lu", "Ma", "Me", "Je", "Ve", "Sa"];
    $ionicPickerI18n.months = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
    $ionicPickerI18n.ok = "OK";
    $ionicPickerI18n.cancel = "Annuler";

    $rootScope.$on('$stateChangeStart', function (event,next, nextParams, fromState) {

        if (!CONSTANT_USER.isConnected) {
            if (next.name !== 'app.login') {
                event.preventDefault();
                $state.go('app.login');
            }
        }
        console.log(event, next, nextParams, fromState);
    });
});

// Translations
var translations = {
  "fr": {
      Application_Name : "Chuipala",
      MyClasses : "Mes cours",
      Today : "Aujourd'hui",
      MyAbsences : "Mes absences",
      MyDelays : "Mes retards",
      MyAbsence : "Mon absence",
      MyDelay : "Mon retard",
      Back : "Retour",
      LoginTitle : "Connexion",
      Login : "Se connecter",
      UserName : "Email",
      Password : "Mot de passe",
      LogoutTitle : "Déconnexion",
      Settings : "Paramètres",
      Student : "Etudiant",
      Professor : "Professeur",
      Student_MF : "étudiant(e)",
      Professor_MF : "professeur",
      DateTimeChoice : "Veuillez choisir une date et une heure",
      From : "Du",
      To : "Au",
      The : "Le",
      At : "A",
      Absent : "absent",
      Late : "en retard",
      OnTime : "à l'heure",
      AbsentFromMyClass : "Vous êtes absent à ce cours",
      LateForMyClass : "Vous êtes en retard à ce cours",
      Absences : "Absences",
      Delays : "Retards",
      NewAbsenceTitle : "Nouvelle absence",
      StartDate : "Commence le",
      EndDate : "Termine le",
      Reason : "Motif",
      Add : "Ajouter",
      AbsenceReasonExample : "Malade...",
      NewDelayTitle : "Nouveau retard",
      ArrivalDate : "Heure d'arrivée",
      DelayReasonExample : "Train, Métro, Réveil...",
      SearchForStudents : "Rechercher un étudiant",
      LanguageTitle : "Langue",
      LoginError_Wrong : "Les informations entrées sont incorrectes",
      LoginError_Connexion : "Vous êtes actuellement hors connexion",
      LoginError_Server : "Un problème est survenue lors de la communication avec le serveur",
      ValidationError_Required : "Tous les champs sont requis",
      ValidationError_MaxLength25 : "Email ne peut faire plus de 25 caractères",
      ValidationError_Email : "Email doit être une adresse de messagerie valide",
      MyGroups : "Mes groupes"
  }
  ,
  "en": {
      Application_Name : "Chuipala",
      MyClasses : "My classes",
      Today : "Today",
      MyAbsences : "My absences",
      MyDelays : "My delays",
      MyAbsence : "My absence",
      MyDelay : "My delay",
      Back : "Back",
      LoginTitle : "Log In",
      Login : "Log in",
      UserName : "Email",
      Password : "Password",
      LogoutTitle : "Log Out",
      Settings : "Settings",
      Student : "Student",
      Professor : "Professor",
      Student_MF : "student",
      Professor_MF : "professor",
      DateTimeChoice : "Select a date and time",
      From : "From",
      To : "To",
      The : "The",
      At : "At",
      Absent : "absent",
      Late : "late",
      OnTime : "on time",
      AbsentFromMyClass : "You are absent from this class",
      LateForMyClass : "You are late for this class",
      Absences : "Absences",
      Delays : "Delays",
      NewAbsenceTitle : "New absence",
      StartDate : "Starts the",
      EndDate : "Ends the",
      Reason : "Reason",
      Add : "Add",
      AbsenceReasonExample : "Sick...",
      NewDelayTitle : "New delay",
      ArrivalDate : "Arrival at",
      DelayReasonExample : "Train, Subway, Alarm clock...",
      SearchForStudents : "Find a student",
      LanguageTitle : "Language",
      LoginError_Wrong : "Wrong Email/Password combination",
      LoginError_Connexion : "No connexion",
      LoginError_Server : "An error occured in the communication with the server",
      ValidationError_Required : "All fields are required",
      ValidationError_MaxLength25 : "Email can be at most 25 characters long",
      ValidationError_Email : "Email must be a valid email address",
      MyGroups : "My groups"
  }
}

// Routing
appChuipala.config(function($stateProvider, $urlRouterProvider, $translateProvider) {

  for(var lang in translations){
    $translateProvider.translations(lang, translations[lang]);
  }

  $translateProvider.preferredLanguage('fr');
  $translateProvider.useSanitizeValueStrategy('escape');

    // si authentifié -> home est le défaut,
    // sinon login (aucune autre route accessible)
  $stateProvider
      .state('app', {
          url: "/app",
          abstract: true,
          templateUrl: "templates/navbar.html",
          controller: "LoginCtrl"
      })

      .state('app.login', {
          url: "/login",
          views: {
              'menuContent': {
                  templateUrl: "templates/login.html",
                  controller: "LoginCtrl"
              }
          }
      })

      .state('app.home', {
          url: "/home",
          views: {
              'menuContent': {
                  templateUrl: "templates/home.html",
                  controller: "HomeCtrl"
              }
          },
      })

      .state('app.showAllAbsencesDelays', {
          url: "/showAllAbsencesDelays/:idClass",
          views: {
              'menuContent': {
                  templateUrl: "templates/showAllAbsencesDelays.html",
                  controller: "AbsencesCtrl"
              }
          },
      })

      .state('app.myAbsences', {
          url: "/myAbsences",
          views: {
              'menuContent': {
                  templateUrl: "templates/myAbsences.html",
                  controller: "MyAbsencesCtrl"
              }
          },
      })

      .state('app.myDelays', {
          url: "/myDelays",
          views: {
              'menuContent': {
                  templateUrl: "templates/myDelays.html",
                  controller: "MyDelaysCtrl"
              }
          },
      })

      .state('app.myGroups', {
          url: "/myGroups",
          views: {
              'menuContent': {
                  templateUrl: "templates/myGroups.html",
                  controller: "MyGroupsCtrl"
              }
          },
      })

      .state('app.absence', {
          url: "/absence/:id",
          views: {
            'menuContent': {
                templateUrl: "templates/absence.html",
                controller: "AbsenceCtrl"
            }
          },
      })

      .state('app.delay', {
          url: "/delay/:id",
          views: {
              'menuContent': {
                  templateUrl: "templates/delay.html",
                  controller: "DelayCtrl"
              }
          },
      })

      .state('app.group', {
          url: "/group/:id",
          views: {
              'menuContent': {
                  templateUrl: "templates/group.html",
                  controller: "GroupCtrl"
              }
          },
      })

      .state('app.settings', {
          url: "/settings",
          views: {
              'menuContent': {
                  templateUrl: "templates/settings.html",
                  controller: "SettingsCtrl"
              }
          },
      })
    
    

  // Default route
  $urlRouterProvider.otherwise('/app/home');
});