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
var appChuipala = angular.module('starter', ['ionic', 'ngCordova', 'ui.router', 'ngStorage']);

// Defining values
appChuipala.value('V_LANGUAGE',{
  language : "fr"
});

// .run is executed at the application launch
appDedale.run(function($ionicPlatform, $cordovaSQLite) {

    // bdd?

});

// Translations
var translations = {
  "fr": {

  },

  "en": {

  }

}

// Routing
appDedale.config(function($stateProvider, $urlRouterProvider, $translateProvider) {
/*
  for(var lang in translations){
    $translateProvider.translations(lang, translations[lang]);
  }

  $translateProvider.preferredLanguage('fr');
  $translateProvider.useSanitizeValueStrategy('escape');
*/

  $stateProvider

      .state('home', {
        url: "/home",
        views: {
          'menuContent': {
            templateUrl: "templates/home.html",
            controller: "homeCtrl"
          }
        },
      })

  // Default route
  $urlRouterProvider.otherwise('/app/home');
});