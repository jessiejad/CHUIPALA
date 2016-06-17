/**
 * Created by Jessie on 15/06/2016.
 */
appChuipala.factory('apiFactory', function($http) {

    return {
        getDaysClasses: function () {
            return  $http({
                 method: 'GET',
                 url: 'http://chuipala-ws.azurewebsites.net/api/DaysClasses',
                 headers: {
                    'Content-Type': 'application/json',
                    //'Authorization': "Bearer " + CONSTANT_USER.token
                 },
                //data: ,
                //auth data: "grant_type=password&username="+CONSTANT_USER.username+"&password="+CONSTANT_USER.password
             })
        },
        getClassEvents: function (id) {
            return  $http({
                method: 'GET',
                url: 'http://chuipala-ws.azurewebsites.net/api/ClassEvents/' + id,
                headers: {
                    'Content-Type': 'application/json',
                    //'Authorization': "Bearer " + CONSTANT_USER.token
                },
                //data: ,
                //auth data: "grant_type=password&username="+CONSTANT_USER.username+"&password="+CONSTANT_USER.password
            })
        },
        getMyAbsences: function () {
            return  $http({
                method: 'GET',
                url: 'http://chuipala-ws.azurewebsites.net/api/LastAbsences',
                headers: {
                    'Content-Type': 'application/json',
                    //'Authorization': "Bearer " + CONSTANT_USER.token
                },
                //data: ,
                //auth data: "grant_type=password&username="+CONSTANT_USER.username+"&password="+CONSTANT_USER.password
            })
        },
        getMyDelays: function () {
            return  $http({
                method: 'GET',
                url: 'http://chuipala-ws.azurewebsites.net/api/LastDelays',
                headers: {
                    'Content-Type': 'application/json',
                    //'Authorization': "Bearer " + CONSTANT_USER.token
                },
                //data: ,
                //auth data: "grant_type=password&username="+CONSTANT_USER.username+"&password="+CONSTANT_USER.password
            })
        },
        getAbsenceInfo: function (id) {
            return  $http({
                method: 'GET',
                url: 'http://chuipala-ws.azurewebsites.net/api/FullAbsencesInfo/' + id,
                headers: {
                    'Content-Type': 'application/json',
                //'Authorization': "Bearer " + CONSTANT_USER.token
                },
                // data: ,
                // auth data: "grant_type=password&username="+CONSTANT_USER.username+"&password="+CONSTANT_USER.password
                })
        },
        getDelayInfo: function (id) {
             return  $http({
                 method: 'GET',
                 url: 'http://chuipala-ws.azurewebsites.net/api/FullDelaysInfo/' + id,
                 headers: {
                     'Content-Type': 'application/json',
                    //'Authorization': "Bearer " + CONSTANT_USER.token
                 },
                 //data: ,
                 // auth data: "grant_type=password&username="+CONSTANT_USER.username+"&password="+CONSTANT_USER.password
             })
         },
        createAbsence: function (begin, end, reason) {
            return  $http({
                method: 'POST',
                url: 'http://chuipala-ws.azurewebsites.net/api/NewAbsence',
                headers: {
                    'Content-Type': 'application/json',
                    //'Authorization': "Bearer " + CONSTANT_USER.token
                },
                data: {
                    begin : begin, // '2016-06-17 09:00'
                    end : end, // '2016-06-17 12:30'
                    reason : reason // 'Malade'
                },
                //auth data: "grant_type=password&username="+CONSTANT_USER.username+"&password="+CONSTANT_USER.password
            })
        },
        createDelay: function (arrival, reason) {
            return  $http({
                method: 'POST',
                url: 'http://chuipala-ws.azurewebsites.net/api/FullDelaysInfo',
                headers: {
                    'Content-Type': 'application/json',
                    //'Authorization': "Bearer " + CONSTANT_USER.token
                },
                data: {
                    arrival : arrival, // '2016-06-17 09:15'
                    reason : reason // 'Problème de transport'
                }
                //auth data: "grant_type=password&username="+CONSTANT_USER.username+"&password="+CONSTANT_USER.password
            })
        },
        updateAbsence: function (id, begin, end, reason) {
            return  $http({
                method: 'POST',
                url: 'http://chuipala-ws.azurewebsites.net/api/UpdateAbsence',
                headers: {
                    'Content-Type': 'application/json',
                    //'Authorization': "Bearer " + CONSTANT_USER.token
                },
                data: {
                    id : id, // 5
                    begin : begin, // '2016-06-17 09:00'
                    end : end, // '2016-06-17 12:30'
                    reason : reason // 'Malade'
                },
                //auth data: "grant_type=password&username="+CONSTANT_USER.username+"&password="+CONSTANT_USER.password
            })
        },
        updateDelay: function (id, arrival, reason) {
            return  $http({
                method: 'POST',
                url: 'http://chuipala-ws.azurewebsites.net/api/UpdateDelay',
                headers: {
                    'Content-Type': 'application/json',
                    //'Authorization': "Bearer " + CONSTANT_USER.token
                },
                data: {
                    id: id, // 5
                    arrival : arrival, // '2016-06-17 09:15'
                    reason : reason // 'Problème de transport'
                }
                //auth data: "grant_type=password&username="+CONSTANT_USER.username+"&password="+CONSTANT_USER.password
            })
        }
    }
});