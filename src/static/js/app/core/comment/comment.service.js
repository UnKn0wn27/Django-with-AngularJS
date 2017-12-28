'use strict';

angular.
    module('core.comment').
        factory('Comment', function(LoginRequiredInterceptor, $cookies, $httpParamSerializer, $location, $resource){
            var url          = '/api/comments/:id/'
            var commentQuery = {
              url: url,
              method: "GET",
              params: {},
              isArray: true,
              cache: false,
              transformResponse: function(data, headersGetter, status){
                var finalData = angular.fromJson(data)
                // console.log(data);
                return finalData.results
              }
            }

            var commentGet   = {
              method: "GET",
              params: {"id": "@id"},
              isArray: false,
              cache: false,
            }

            var commentCreate   = {
              url: "/api/comments/create/",
              method: "POST",
              interceptor: {responseError: LoginRequiredInterceptor}
              // params: {"id": "@id"},
              // isArray: false,
              // cache: false,
            }

            var commentUpdate  = {
              url: "/api/comments/:id/",
              method: "PUT",
              interceptor: {responseError: LoginRequiredInterceptor}
              // params: {"id": "@id"},
              // cache: false,
            }

            var commentDelete   = {
              url: "/api/comments/:id/",
              method: "DELETE",
              interceptor: {responseError: LoginRequiredInterceptor}
              // params: {"id": "@id"},
              // cache: false,
            }

            var token = $cookies.get("token")
            if (token) {
              commentCreate["headers"] = {"Authorization": "JWT " + token}
              commentDelete["headers"] = {"Authorization": "JWT " + token}
              commentUpdate["headers"] = {"Authorization": "JWT " + token}
            }

            return $resource(url, {}, {
                query: commentQuery,
                get: commentGet,
                create: commentCreate,
                update: commentUpdate,
                delete: commentDelete
            })
        });
