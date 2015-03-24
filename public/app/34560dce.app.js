"use strict";angular.module("snackReactorApp",["ngCookies","ngResource","ngSanitize","ui.router","ui.bootstrap","angularModalService","snackReactor-services","google.places"]).config(["$stateProvider","$urlRouterProvider","$locationProvider","$httpProvider",function(a,b,c,d){b.otherwise("/"),a.state("main",{url:"/",templateUrl:"app/main/main.html",controller:"MainCtrl"}),a.state("results",{url:"/results",templateUrl:"app/results/results.html",controller:"ResultsCtrl"}),a.state("select_org",{url:"/select_org",templateUrl:"app/select_org/select_org.html",controller:"SelectOrgCtrl"}),a.state("/org/create",{url:"/org/create",templateUrl:"app/create_org/create_org.html",controller:"CreateOrgCtrl"}),a.state("/restaurant/create",{url:"/restaurant/create",templateUrl:"app/create_restaurant/create.restaurant.html",controller:"CreateRestCtrl"}),c.html5Mode(!0),d.interceptors.push(["$q","$location",function(a){return{response:function(a){return a},responseError:function(b){return 401===b.status,a.reject(b)}}}])}]);var app=angular.module("snackReactorApp");app.controller("CreateOrgCtrl",["$scope","$modal","$log","CheckLoggedIn","ModalService",function(a,b){a.items=[],a.open=function(c){var d=b.open({templateUrl:"3.html",controller:"3Ctrl",size:c,backdrop:"static",resolve:{items:function(){return a.items}}});d.result.then(function(b){a.selected=b})},a.open("md")}]),app.controller("3Ctrl",["$scope","$modalInstance","items","OrgSelect","$location",function(a,b,c,d,e){var f=e.search();a.submitting=!1,d.getAccessToken().then(function(b){d.getGithubOrgInfo(f.github_login,b.data.access_token).then(function(b){for(var c in b.data)a.createOrg[c]=b.data[c]})}),a.submitOrg=function(){a.submitting=!0,d.createOrg(a.createOrg.id,a.createOrg.address,a.createOrg.name,a.createOrg.login,a.createOrg.placeId).success(function(){console.log("success"),a.submitting=!1,e.path("/"),e.search({github_login:null,github_id:null}),window.location.reload()}).error(function(){a.submitting=!1})},a.ok=function(){b.close(a.selected.item)},a.cancel=function(){b.dismiss("cancel")}}]);var app=angular.module("snackReactorApp");app.controller("CreateRestCtrl",["$scope","$modal","$log","CheckLoggedIn","ModalService",function(a,b){a.open=function(c){var d=b.open({templateUrl:"4.html",controller:"4Ctrl",size:c,resolve:{items:function(){return a.items}}});d.result.then(function(b){a.selected=b})},a.open("md")}]),app.controller("4Ctrl",["$scope","$window","$modalInstance","items","OrgSelect","$location","CreateRestaurant",function(a,b,c,d,e,f,g){a.submitting=!1,a.heartText="",a.priceText="",a.ratingText="",a.hoverHeart=function(b){var c={1:"Junk food!",2:"Any food will do.",3:"Something healthy, please!",4:""};a.heartText=c[b]},a.hoverPrice=function(b){var c={1:"$7 & Under",2:"$8 - $15",3:"$15 ++",4:""};a.priceText=c[b]},a.hoverRating=function(b){var c={1:"NO!",2:"You can do better.",3:"Firmly average.",4:"Pretty good!",5:"Totally delicious :)",6:""};a.ratingText=c[b]},a.isCollapsed=!1;f.search();a.ok=function(){c.close(a.selected.item)},a.cancel=function(){c.dismiss("cancel")},a.successMessage="",a.failureMessage="",a.submitRestaurant=function(){a.submitting=!0,a.successMessage="",a.failureMessage="",console.log(),g(a.createRest.name,a.createRest.address,a.createRest.healthRating,a.createRest.priceRating,a.createRest.description,a.createRest.rating).success(function(){a.submitting=!1,a.successMessage="Restaurant created successfully, thanks!",b.location.reload()}).error(function(b){a.submitting=!1,a.failureMessage="Error creating restaurant. Are you sure you have the correct address?",console.error("Error creating restaurant: "+b)})},a.doneButton=function(){b.location.href="/"}}]);var app=angular.module("snackReactorApp");app.controller("MainCtrl",["$scope","$http","$log","$document","ModalService","$location","SearchRestaurants","SharedData",function(a,b,c,d,e,f,g,h){a.isLogged=!1,a.priceClick=!1,a.is1healthClick=!1,a.is2healthClick=!1,a.is3healthClick=!1,a.is1priceClick=!1,a.is2priceClick=!1,a.is3priceClick=!1,a.healthRank=1,a.priceRank=1,a.searching=!1,a.noResults=!1,a.places=[],a.logout=function(){a.isLogged=!a.isLogged},a.search=function(b){a.noResults=!1,a.searching=!0,h.set("health",a.healthRank),h.set("price",a.priceRank),g(a.healthRank,a.priceRank).success(function(c){a.searching=!1,h.set("results",c),f.path(b)}).error(function(b){a.searching=!1,a.noResults=!0,console.error(b)})},a.healthClick1=function(){a.is1healthClick&&(a.is2healthClick||a.is3healthClick)&&(a.is2healthClick=!1,a.is3healthClick=!1,a.is1healthClick=!1),a.is1healthClick=!a.is1healthClick,g.health=a.healthRank=(a.is1healthClick,1)},a.healthClick2=function(){return g.health=a.healthRank=2,a.is3healthClick?void(a.is3healthClick=!1):a.is2healthClick&&a.is1healthClick?(a.is1healthClick=a.is2healthClick=!1,void(g.health=a.healthRank=1)):(a.is1healthClick=!0,void(a.is2healthClick=!0))},a.healthClick3=function(){return g.health=a.healthRank=3,a.is1healthClick&&a.is2healthClick&&a.is3healthClick?(a.is1healthClick=!1,a.is2healthClick=!1,a.is3healthClick=!1,a.healthRank=1,void console.log(a.healthRank)):(a.is3healthClick=!a.is3healthClick,a.is1healthClick||a.is2healthClick||!a.is1healthClick&&!a.is2healthClick?(a.is1healthClick=!0,a.is2healthClick=!0,void console.log(a.healthRank)):void 0)},a.priceClick1=function(){a.is1priceClick&&(a.is2priceClick||a.is3priceClick)&&(a.is2priceClick=!1,a.is3priceClick=!1,a.is1priceClick=!1),a.is1priceClick=!a.is1priceClick,g.price=a.priceRank=(a.is1priceClick,1)},a.priceClick2=function(){return g.price=a.priceRank=2,a.is3priceClick?void(a.is3priceClick=!1):a.is2priceClick&&a.is1priceClick?(a.is1priceClick=a.is2priceClick=!1,void(a.priceRank=1)):(a.is1priceClick=!0,void(a.is2priceClick=!0))},a.priceClick3=function(){return g.price=a.priceRank=3,a.is1priceClick&&a.is2priceClick&&a.is3priceClick?(a.is1priceClick=!1,a.is2priceClick=!1,a.is3priceClick=!1,a.priceRank=1,void console.log(a.priceRank)):(a.is3priceClick=!a.is3priceClick,a.is1priceClick||a.is2priceClick||!a.is1priceClick&&!a.is2priceClick?(a.is1priceClick=!0,a.is2priceClick=!0,void console.log(a.priceRank)):void 0)}}]),app.controller("ModalCtrl",["$scope","$modal","$log","CheckLoggedIn",function(a,b,c,d){a.items=[],a.open=function(c){var d=b.open({templateUrl:"myModalContent.html",controller:"ModalInstanceCtrl",size:c,backdrop:"static",resolve:{items:function(){return a.items}}});d.result.then(function(b){a.selected=b})},d().then(function(b){b.data||(a.logout(),a.open())})}]),app.controller("ModalInstanceCtrl",["$scope","$modalInstance","items","CheckLoggedIn",function(a,b,c){a.items=c,a.selected={item:a.items[0]},a.ok=function(){b.close(a.selected.item)},a.cancel=function(){b.dismiss("cancel")}}]);var app=angular.module("snackReactorApp");app.controller("ResultsCtrl",["$scope","CheckLoggedIn","$location","SearchRestaurants","$state","SharedData","SendRating","GetRating",function(a,b,c,d,e,f,g,h){a.checkLogged=function(){b().then(function(a){a.data||c.path("/")})},a.restaurants=f.get("results"),a.restaurants.forEach(function(a){h(a.id).success(function(b){a.avgRating=b.avgRating}).error(function(a){console.error("Error: "+a)})}),a.oneAtATime=!0,a.status={isFirstOpen:!0,isFirstDisabled:!1},a.sendRating=function(a,b){g(a,b)},a.reshuffle=function(){d(f.get("health"),f.get("price")).success(function(b){a.restaurants=b})}}]),app.controller("AddModal",["$scope","$modal","$log","CheckLoggedIn",function(a,b){a.items=[],a.open=function(c){var d=b.open({templateUrl:"restaurant.html",controller:"FormCtrl",size:c,resolve:{items:function(){return a.items}}});d.result.then(function(b){a.selected=b})}}]),app.controller("FormCtrl",["$scope","$modalInstance","items","CheckLoggedIn",function(a,b,c){a.test=function(a){console.log(a)},a.items=c,a.selected={item:a.items[0]},a.ok=function(){b.close(a.selected.item)},a.cancel=function(){b.dismiss("cancel")}}]);var app=angular.module("snackReactorApp");app.controller("SelectOrgCtrl",["$scope","$modal","$log","CheckLoggedIn","ModalService",function(a,b){a.items=[],a.open=function(c){var d=b.open({templateUrl:"1.html",controller:"2Ctrl",size:c,backdrop:"static",resolve:{items:function(){return a.items}}});d.result.then(function(b){a.selected=b})},a.open("md")}]),app.controller("2Ctrl",["$scope","$modalInstance","items","OrgSelect","$location","$state",function(a,b,c,d,e,f){a.githubOrgs=[],d.getGithubOrgs().then(function(b){a.githubOrgs=b.data.orgs,a.githubOrgs.forEach(function(a){a.submitting=!1})}),a.selectOrg=function(a,b,c){c.org.submitting=!0,d.setGithubOrg(a,b,e,f).then(function(){c.org.submitting=!1})},a.ok=function(){b.close(a.selected.item)},a.cancel=function(){b.dismiss("cancel")}}]),angular.module("ngAutocomplete",[]).directive("ngAutocomplete",function(){return{require:"ngModel",scope:{ngModel:"=",options:"=?",details:"=?"},link:function(a,b,c,d){var e,f=!1,g=function(){e={},a.options&&(f=a.options.watchEnter!==!0?!1:!0,a.options.types?(e.types=[],e.types.push(a.options.types),a.gPlace.setTypes(e.types)):a.gPlace.setTypes([]),a.options.bounds?(e.bounds=a.options.bounds,a.gPlace.setBounds(e.bounds)):a.gPlace.setBounds(null),a.options.country?(e.componentRestrictions={country:a.options.country},a.gPlace.setComponentRestrictions(e.componentRestrictions)):a.gPlace.setComponentRestrictions(null))};void 0==a.gPlace&&(a.gPlace=new google.maps.places.Autocomplete(b[0],{})),google.maps.event.addListener(a.gPlace,"place_changed",function(){var c=a.gPlace.getPlace();void 0!==c&&(void 0!==c.address_components?a.$apply(function(){a.details=c,d.$setViewValue(b.val())}):f&&h(c))});var h=function(c){var e=new google.maps.places.AutocompleteService;c.name.length>0&&e.getPlacePredictions({input:c.name,offset:c.name.length},function(c){if(null==c||0==c.length)a.$apply(function(){a.details=null});else{var e=new google.maps.places.PlacesService(b[0]);e.getDetails({reference:c[0].reference},function(c,e){e==google.maps.GeocoderStatus.OK&&a.$apply(function(){d.$setViewValue(c.formatted_address),b.val(c.formatted_address),a.details=c;b.on("focusout",function(){b.val(c.formatted_address),b.unbind("focusout")})})})}})};d.$render=function(){var a=d.$viewValue;b.val(a)},a.watchOptions=function(){return a.options},a.$watch(a.watchOptions,function(){g()},!0)}}}),angular.module("snackReactor-services",[]).factory("CheckLoggedIn",["$http",function(a){return function(){return a.post("/auth/checkloggedin").success(function(){return!0}).error(function(){return!1})}}]).factory("SearchRestaurants",["$http","$location",function(a){return function(b,c){var d=moment().local();return a.post("/api/search",{health:b,price:c,time:d})}}]).factory("SharedData",function(){var a={},b=function(b,c){a[b]=c},c=function(b){return a[b]};return{set:b,get:c}}).factory("OrgSelect",["$http",function(a){var b={};return b.getGithubOrgs=function(){return a.get("/user/getorgs/github").success(function(a){return a.orgs}).error(function(a){console.error("Error fetching Github organizations: "+a)})},b.setGithubOrg=function(b,c,d){return a.post("/user/setorg/github",{orgId:b}).success(function(a){a.create?d.path("/org/create").search({github_id:b,github_login:c}):(d.path("/"),window.location.reload())}).error(function(a){console.error("Error posting org: "+a)})},b.getGithubOrgInfo=function(b,c){return a.get("https://api.github.com/orgs/"+b,{headers:{Authorization:"token "+c}}).success(function(a){return a}).error(function(a){console.error("Error getting organization info from Github "+a)})},b.getAccessToken=function(){return a.get("/user/token").success(function(a){return a.access_token}).error(function(a){console.error("Error getting Github authorization "+a)})},b.createOrg=function(b,c,d,e,f){return f=f||null,a.post("/org/create/github",{github_id:b,address:c,name:d,github_login:e,placeId:f})},b}]).factory("CreateRestaurant",["$http",function(a){return function(b,c,d,e,f,g){return a.post("/api/restaurants/new",{name:b,address:c,health:d,price:e,description:f,rating:g})}}]).factory("GetRating",["$http",function(a){return function(b){return a.post("/api/restaurants/getrating",{id:b})}}]).factory("SendRating",["$http",function(a){return function(b,c){return b=parseInt(b),c=parseInt(c),a.post("/api/restaurants/rating",{id:b,rating:c})}}]),angular.module("snackReactorApp").run(["$templateCache",function(a){a.put("app/create_org/create_org.html",'<div ng-controller=CreateOrgCtrl class=main><script type=text/ng-template id=3.html><div class="modal-header">\n            <h5 class="modal-title-md">Create Organization</h5>\n        </div>\n        <div class="modal-body-md modal-create">\n        <span class="h5">It looks like your organization isn\'t on SnackReactor yet. Tell us a little more so you can join!</span>\n          <div>\n            <form name="createOrg" id="createOrg" ng-model="orgForm" class="sr-form">\n                <div class="form-group">\n                    <label for="name">Organiation Name</label>\n                    <input type="text" class="form-control" id="name" placeholder="Name" ng-model="createOrg.name" required>\n                </div>\n                <div class="form-group">\n                    <label for="address">Address</label>\n                    <input type="address" for="address" class="form-control" id="address" placeholder="Address" ng-model="createOrg.address" required>\n                </div>\n                <i class="fa fa-circle-o-notch fa-spin fa-2x" ng-show="submitting"></i>\n                <button type="submit" class="btn btn-primary pull-right" ng-click="submitOrg()" ng-disabled="createOrg.$invalid">Create</button>\n            </form>\n          </div>\n        </div></script><div></div></div>'),a.put("app/create_restaurant/create.restaurant.html",'<div ng-controller=CreateRestCtrl class=main><script type=text/ng-template id=4.html><div class="modal-header">\n            <h5 class="modal-title-md">Create Restaurant</h5>\n        </div>\n        <div class="modal-body-md modal-create">\n        <span class="h5">Use this form to add a new restaurant. Thanks for contributing!</span>\n          <div>\n            <form name="createRest" id="createRest" ng-model="restForm" class="sr-form">\n                <div class="form-group">\n                    <label for="name">Restaurant Name</label>\n                    <input type="text" class="form-control" id="name" placeholder="Name" ng-model="createRest.name" autofocus=true required>\n                </div>\n                <div class="form-group">\n                    <label for="address">Address</label>\n                    <input type="address" for="address" class="form-control" id="address" placeholder="Address" ng-model="createRest.address" required>\n                </div>\n                <div class="form-group">\n                    <label for="healthRating">How healthy is this restaurant?</label>\n                        <span class="label label-default">{{heartText}}</span>\n\n                        <rating required ng-model="createRest.healthRating" id="healthRating" max="3" state-on="\'fa fa-heart fa-2x\'" state-off="\'fa fa-heart-o fa-2x\'" class="pull-right" class="rating" on-hover="hoverHeart(value)" on-leave="hoverHeart(4)">\n\n                </div>\n                <div class="form-group">\n                    <label for="priceRating">How expensive is this restaurant?</label>\n                    <span class="label label-default">{{priceText}}</span>\n\n                    <rating required ng-model="createRest.priceRating" max="3" id="priceRating" state-on="\'fa fa-usd dollar-on\'" state-off="\'fa fa-usd dollar-off\'" class="pull-right" class="rating" on-hover="hoverPrice(value)" on-leave="hoverPrice(4)">\n                </div>\n                <div class="form-group">\n                <label for=\'rating\'>How would you rate this restaurant?</label>\n                    <span class="label label-default">{{ratingText}}</span>\n\n                    <rating required ng-model="createRest.rating" max="5" id="rating" state-on="\'fa fa-star fa-2x star-rating\'" state-off="\'fa fa-star-o fa-2x star-rating\'" class="pull-right" class="rating" on-hover="hoverRating(value)" on-leave="hoverRating(6)">\n                </div>\n                <div class="form-group">\n                    <label for="description">Please describe this restaurant - what do you think of it?</label>\n\n                    <textarea required rows="7" class="form-control" id="description" placeholder="Cafe Venue is a great place to stop in for a quick salad or sandwich. Although the line can look a bit long, it moves quickly, and the prices can\'t be beat. When you need something quick on your short lunch break, this is a great choice." ng-model="createRest.description" required></textarea>\n                </div>\n                <div>\n                    <i class="fa fa-circle-o-notch fa-spin fa-2x" ng-show="submitting"></i>\n                    <span class="label label-success">{{successMessage}}</span>\n                    <span class="label label-danger">{{failureMessage}}</span>\n                    <div class="action-btns">\n                        <button type="submit" class="btn btn-done btn-warning pull-right" ng-click="doneButton()">Done</button>\n                        <button type="submit" class="btn btn-primary pull-right" ng-click="submitRestaurant()" ng-disabled="createRest.$invalid">Create</button>\n                    </div>\n                </div>\n            </form>\n            </div>\n          </div>\n        </div></script><div></div></div>'),a.put("app/main/main.html",'<div ng-controller=MainCtrl class=main><div class=overlay></div><div class=content><a id=logout href=/auth/logout ng-hide=isLogged target=_self>Logout</a> <a href=/restaurant/create target=_self>Create a Restaurant</a><div class=headline><h1>Snack Reactor</h1><p class=subtitle>Find the best places to eat near your work or school.</p></div><div class=options><i class="fa fa-heart fa-5x" ng-class="{\'health\':is1healthClick}" ng-click=healthClick1()></i> <i class="fa fa-heart fa-5x" ng-class="{\'health\':is2healthClick}" ng-click=healthClick2()></i> <i class="fa fa-heart fa-5x" ng-class="{\'health\':is3healthClick}" ng-click=healthClick3()></i> <i class="fa fa-usd fa-4x" ng-class="{\'price\':is1priceClick}" ng-click=priceClick1()></i> <i class="fa fa-usd fa-4x" ng-class="{\'price\':is2priceClick}" ng-click=priceClick2()></i> <i class="fa fa-usd fa-4x" ng-class="{\'price\':is3priceClick}" ng-click=priceClick3()></i><div ng-controller=ModalCtrl><script type=text/ng-template id=myModalContent.html><div class="modal-header">\n            <h3 class="modal-title">Welcome to Snack Reactor</h3>\n        </div>\n\n        <div class="modal-body">\n            SnackReactor is all about using the knowledge of your classmates and colleagues to find the best places to eat near you. Login or sign up with the button below, and start discovering new restaurants today.\n\n            <div class="modal-footer">\n              <a href="/auth/github" target= "_self" class="search fa fa-github btn btn-block btn-social btn-github">\n              Sign in with GitHub\n              </a>\n            </div>\n\n        </div></script><button id=search ng-click="search(\'results\')">Search!</button><br><span class="label label-default" ng-show=searching>Searching...</span> <span class="label label-danger" ng-show=noResults>Your search didn\'t return any results. Perhaps nothing\'s open?</span></div></div></div><!--<form method="post" ng-submit="login()" name="loginForm" class="ng-pristine ng-invalid ng-invalid-required">\n              //   <div class="form-group has-feedback">\n              //     <input class="form-control input-lg ng-pristine ng-invalid ng-invalid-required ng-touched" type="text" name="email" ng-model="email" placeholder="Email" required="" autofocus="">\n              //     <span class="ion-at form-control-feedback"></span>\n              //   </div>\n\n              //   <div class="form-group has-feedback">\n              //     <input class="form-control input-lg ng-pristine ng-invalid ng-invalid-required ng-touched" type="password" name="password" ng-model="password" placeholder="Password" required="">\n              //     <span class="ion-key form-control-feedback"></span>\n              //   </div>\n\n              //   <button type="submit" ng-disabled="loginForm.$invalid" class="btn btn-sm btn-block btn-success" disabled="disabled">Log in</button>\n              //   <br>\n              //   <p class="text-center text-muted">\n              //   <small>Dont have an account yet? <a href="/signin">Sign up</a></small>\n              //   </p>\n              // </form>\n--></div>'),a.put("app/results/results.html",'<div ng-controller=ResultsCtrl><div class=overlay></div><div class=container><div ng-controller=AddModal class=row><div class=col-xs-12><div class=resultsOptions><button class=nav-button id=reshuffle ng-click=reshuffle()>Get 3 More</button> <a href=/restaurant/create><button id=addRest class="nav-button pull-right">Add Restaurant</button></a></div></div></div><div class=row><!--begin ng-repeat--><div ng-repeat="restaurant in restaurants"><div class="col-xs-12 col-sm-12 col-md-4"><div class=box><div class=box-header ng-style="{\'background-image\': \'url(\' + restaurant.photo_url + \')\'}"></div><accordion close-others=oneAtATime><accordion-group heading={{restaurant.name}}><p>{{restaurant.name}}</p><p>Your colleagues\' rating:<rating ng-model=restaurant.avgRating max=5 id=rating state-on="\'fa fa-star star-rating fa-2x\'" state-off="\'fa fa-star-o star-rating fa-2x\'" class=pull-right class=rating readonly></rating></p><p>{{restaurant.address}}</p><p>About this place: {{restaurant.description}}</p><p>Rate this restaurant:<rating ng-model=restaurant.userRating max=5 id=rating state-on="\'fa fa-star star-rating fa-2x\'" state-off="\'fa fa-star-o star-rating fa-2x\'" class=pull-right class=rating on-hover=hoverRating(value) on-leave="hoverRating(6); sendRating(restaurant.id, restaurant.userRating);"></rating></p></accordion-group></accordion></div></div></div><!--end ng-repeat--></div></div></div><!--end repeat--><!-- \n          <div class="col-xs-12 col-sm-12 col-md-4">\n            <div class="a2 box">\n              <div class="box-header" ng-style= "{\'background-image\': \'url(\' + restaurants[1].photo_url + \')\'}"></div>\n              <accordion close-others="oneAtATime">\n                <accordion-group heading="{{restaurants[1].name}}">\n                  <p>{{restaurants[1].name}}</p>\n                  <p>{{restaurants[1].address}}</p>\n                  <p>About this place: {{restaurants[1].description}}</p>\n                </accordion-group>\n              </accordion>\n            </div>\n          </div>\n\n          <div class="col-xs-12 col-sm-12 col-md-4">  \n            <div class="a3 box">\n            <div class="box-header" ng-style= "{\'background-image\': \'url(\' + restaurants[2].photo_url + \')\'}"></div>\n              <accordion close-others="oneAtATime">\n                <accordion-group heading="{{restaurants[2].name}}">\n                  <p>{{restaurants[2].name}}</p>\n                  <p>{{restaurants[2].address}}</p>\n                  <p>About this place: {{restaurants[2].description}}</p>\n                </accordion-group>\n              </accordion>\n            </div>\n          </div> \n -->'),a.put("app/select_org/select_org.html",'<div ng-controller=SelectOrgCtrl class=main><script type=text/ng-template id=1.html><div class="modal-header">\n            <h5 class="modal-title-md">Please select an organization.</h5>\n        </div>\n        <div class="modal-body-md">\n        <span class="h5">SnackReactor is all about knowledge from your friends and colleagues. Please choose an organization to join; you can only choose one.</span>\n          <div ng-repeat="org in githubOrgs">\n            <a ng-click="selectOrg(org.id, org.login, this)" class="blacktext">\n                <div class="org">\n                    <img src="{{org.avatar_url}}" class="org-img img-circle">\n                    <span class="org-name h3">{{org.login}}</span>\n                    <i class="fa fa-sign-out fa-4x org-go" ng-hide="org.submitting"></i>\n                    <i class="fa fa-circle-o-notch fa-spin fa-4x org-go" ng-show="org.submitting"></i>\n                </div>\n            </a>\n          </div>\n        </div></script><div></div></div>'),a.put("app/select_org/select_org_modal.html",'<div class=modal-header><h3 class=modal-title>Select an Organization</h3></div><div class=modal-body><p>test</p></div><!-- \n           <div class="modal-footer">\n             <a href="/auth/github" target= "_self" class="search fa fa-github btn btn-block btn-social btn-github">\n             Sign in with GitHub\n             </a>\n</div> --><!--  <form method="post" ng-submit="login()" name="loginForm" class="ng-pristine ng-invalid ng-invalid-required">\n                       <div class="form-group has-feedback">\n                         <input class="form-control input-lg ng-pristine ng-invalid ng-invalid-required ng-touched" type="text" name="email" ng-model="email" placeholder="Email" required="" autofocus="">\n                         <span class="ion-at form-control-feedback"></span>\n                       </div>\n\n                       <div class="form-group has-feedback">\n                         <input class="form-control input-lg ng-pristine ng-invalid ng-invalid-required ng-touched" type="password" name="password" ng-model="password" placeholder="Password" required="">\n                         <span class="ion-key form-control-feedback"></span>\n                       </div>\n\n                       <button type="submit" ng-disabled="loginForm.$invalid" class="btn btn-sm btn-block btn-success" disabled="disabled">Log in</button>\n                       <br>\n                       <p class="text-center text-muted">\n                       <small>Dont have an account yet? <a href="/signin">Sign up</a></small>\n                       </p>\n                     </form> -->'),a.put("app/signin/signin.html",'<!-- <div ng-controller="SigninCtrl" class="main">\n    <script type="text/ng-template" id="1.html">\n\n        <div class="modal-header">\n            <h3 class="modal-title">Welcome to Snack Reactor</h3>\n        </div>\n\n        <div class="modal-body">\n            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?\n\n            <div class="modal-footer">\n              <a href="/auth/github" target= "_self" class="search fa fa-github btn btn-block btn-social btn-github">\n              Sign in with GitHub\n              </a>\n            </div>\n\n        </div>   \n    </script>\n<div> -->')}]);