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
        }
    }
});