var app = angular.module('app', []);
app.controller ('marvelContrl', function($scope){
	var heroName;
	var heroName2;
	var marvel1 = [];
	var marvel2 = [];


$scope.woo = function(){
	$('.events').html("<li> </li>");
	async.series({
	one: function(callback){
		heroName =$scope.wooCharacter;
			$('.name').html('');
			$('.description').html('');
			$('.image').html('');
			$('.events').html('');
			$.getJSON("http://gateway.marvel.com:80/v1/public/characters?name=" + heroName + "&limit=100&apikey=9b468921eeceda45d379088e81c48169").then(function (json) {
  		$(".name").append(json.data.results[0].name);
  		$(".description").append(json.data.results[0].description);
  		$(".image").attr("src", json.data.results[0].thumbnail.path + "/detail.jpg");
  			$.each(json.data.results[0].events.items, function(i, item){ 
  				marvel1.push(item.name);

  		});
  			console.log(marvel1);	

  
  				});
			setTimeout(function(){
				callback(null, 1);

			}, 300);
	},
	two: function(callback){
		$('.name1').html('');
			$('.description1').html('');
			$('.image1').html('');
			heroName2 = $scope.wooCharacter2;
			$.getJSON("http://gateway.marvel.com:80/v1/public/characters?name=" + heroName2 + "&limit=100&apikey=9b468921eeceda45d379088e81c48169").then( function (json) {
				$(".name1").append(json.data.results[0].name);
  				$(".description1").append(json.data.results[0].description);
  				$(".image1").attr("src", json.data.results[0].thumbnail.path + "/detail.jpg");
				$.each(json.data.results[0].events.items, function(i,item){
					marvel2.push(item.name);	
			});

			})
			setTimeout(function(){
				callback(null, 2);
			}, 200);
		},
		three: function(callback){


		var arr = marvel1.concat(marvel2);
			var sorted_arr = arr.sort();
			var results = [];
			for (var i = 0; i<arr.length -1; i ++){
				if(sorted_arr[i+1] == sorted_arr[i]){
					results.push(sorted_arr[i]);
				}
			}
			setTimeout(function(){
				callback(null, 3);
			}, 100);
		$('.events').html("<li>"+ results + "</li>");
		console.log(results);
	}
		},
		function(err, results){
			console.log(results);
});

	}



	});



