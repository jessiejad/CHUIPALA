/**
 * Created by Jessie on 03/06/2016.
 *
 * This file includes the creation and configuration of the
 * application main module and values, defines the routes
 * and translations
 * @author Jessie
 */

'use strict';

// Defining the app
var appChuipala = angular.module('starter', ['ionic', 'ui.router', 'pascalprecht.translate', 'ion-datetime-picker']);

// Defining values
appChuipala.value('V_LANGUAGE',{
  language : "fr"
});

appChuipala.value('CONSTANT_USER',{
    isProfessor : true,
});

// .run is executed at the application launch
appChuipala.run(function($ionicPickerI18n) {
    $ionicPickerI18n.weekdays = ["Di", "Lu", "Ma", "Me", "Je", "Ve", "Sa"];
    $ionicPickerI18n.months = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
    $ionicPickerI18n.ok = "OK";
    $ionicPickerI18n.cancel = "Annuler";
});

// Translations
var translations = {
  "fr": {
      Application_Name : "Chuipala",
      Home_Title : "Mes cours",
      Home_SubTitle : "Aujourd'hui",
      Absences_SubTitle : "Absences",
      Delays_SubTitle : "Retards",
      DateTime_Choice : "Veuillez choisir une date et une heure",
  }
  ,
  "en": {
      Application_Name : "Chuipala",
      Home_Title : "My classes",
      Home_SubTitle : "Today",
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
          controller: 'LanguageCtrl'
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

  // Default route
  $urlRouterProvider.otherwise('/app/home');
});