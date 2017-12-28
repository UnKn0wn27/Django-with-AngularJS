'use strict';

angular.module("core.interceptors")
  .factory("LoginRequiredInterceptor", function($cookies, $location){
    return  function (response){
              console.log("Working");
              // console.log("Interceptor erro");
              // console.log(response);
              if (response.status == 401){
                var currentPath = $location.path();
                console.log(currentPath);
                if (currentPath == "/login"){
                  $location.path("/login")
                } else {
                  $location.path("/login").search("next", currentPath)
                }
              }
            }
  })
