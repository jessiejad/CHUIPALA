/**
 * Created by Jessie on 15/06/2016.
 */
appChuipala.factory('apiFactory', function($http) {

    return {
        getDaysClasses: function () {
            return  $http({
                 method: 'GET',
                 url: 'http://chuipala-ws.azurewebsites.net/api/NextClasses',
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