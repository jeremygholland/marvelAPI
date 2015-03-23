var app = angular.module('app', []);
app.controller ('marvelContrl', function($scope){
	var heroName;
	var heroName2;
	var marvel1 = [];
	var marvel2 = [];



	var firstCall = function(){
	heroName =$scope.wooCharacter ;
	$('.name').html('');
	$('.description').html('');
	$('.image').html('');
	$('.events').html('');
	$.getJSON("http://gateway.marvel.com:80/v1/public/characters?name=" + heroName + "&limit=100&apikey=9b468921eeceda45d379088e81c48169", function (json) {
		var charOneID = json.data.results[0].id; 
		console.log(charOneID);
  $(".name").append(json.data.results[0].name);
  $(".description").append(json.data.results[0].description);
  $(".image").attr("src", json.data.results[0].thumbnail.path + "/detail.jpg");
  	$.each(json.data.results[0].events.items, function(i, item){ 
  		marvel1.push(item.name);
  });
  
  		});
}
var secondCall = function(){
	$('.name1').html('');
	$('.description1').html('');
	$('.image1').html('');
	heroName2 = $scope.wooCharacter2;
	$.getJSON("http://gateway.marvel.com:80/v1/public/characters?name=" + heroName2 + "&limit=100&apikey=9b468921eeceda45d379088e81c48169", function (json) {
		$(".name1").append(json.data.results[0].name);
  		$(".description1").append(json.data.results[0].description);
  		$(".image1").attr("src", json.data.results[0].thumbnail.path + "/detail.jpg");
		$.each(json.data.results[0].events.items, function(i,item){
			marvel2.push(item.name);
		})
	});
}


$scope.woo = function(){
	$('.events').html('');
	firstCall();
	secondCall();
		alert(marvel1);
		var arr = marvel1.concat(marvel2);
	var sorted_arr = arr.sort();
	var results = []
	for (var i = 0; i<arr.length -1; i ++){
		if(sorted_arr[i+1] == sorted_arr[i]){
			results.push(sorted_arr[i]);
		}
	}
	console.log(results);
	$('.events').append("<li>"+ results+"</li>");

}

        });






