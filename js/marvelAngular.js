var app = angular.module('app', []);
app.controller ('marvelContrl', function($scope){
var heroName='hulk';
$scope.wooCharacter = heroName;
$scope.woo = function(){
	$.getJSON("http://gateway.marvel.com:80/v1/public/characters?name=" + heroName + "&apikey=9b468921eeceda45d379088e81c48169", function (json) {
  $(".name").append(json.data.results[0].name);
  $(".description").append(json.data.results[0].description);
  $(".image").attr("src", json.data.results[0].thumbnail.path + "/detail.jpg");
   });
        };

      });


