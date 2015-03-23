var app = angular.module('app', []);
app.controller ('marvelContrl', function($scope){
var heroName='';
$scope.woo = function(){
	$scope.wooCharacter = heroName;
	$('.name').html('');
	$('.description').html('');
	$('.image').html('');
	$('.events').html('');
	$.getJSON("http://gateway.marvel.com:80/v1/public/characters?name=" + heroName + "&apikey=9b468921eeceda45d379088e81c48169", function (json) {
  $(".name").append(json.data.results[0].name);
  $(".description").append(json.data.results[0].description);
  $(".image").attr("src", json.data.results[0].thumbnail.path + "/detail.jpg");
  $.each(json.data.results[0].stories.items, function(i, item){
  		$('.events').append("<li>"+item.name+"</li>");

  })
   });
        };

      });


