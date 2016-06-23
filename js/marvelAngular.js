var app = angular.module('app', []);
app.controller ('marvelContrl', function($scope){
	$('.newDiv').hide();
	$('.firstInfo').hide();
	$('.charStuff').hide()
	$('.serStuff').hide();
	$('.reStart').hide();
	$('.secondInfo').hide();
	$("#firstInfo").hide();
	$('.events').hide();
	$(".image1").hide();
	$('.image').hide();
	$('.loading1').hide();
	$('.loading').hide();
	var heroName = '';
	var heroName2 = '';
	var seriesName;
	var marvel1 = [];
	var marvel2 = [];
	var results1 = [];
	var wooStuff;
	var totalChar = [];
	$scope.wooCharacter = '';
	$scope.wooCharacter1 = '';


$scope.woo = function(){
	if(($scope.wooCharacter == '') || ($scope.wooCharacter1 =='')){
		$('.wooNess').append('<h2> Please make two selections. </h2>');
	}
	else{
	$('.main').hide();
	$('.firstInfo').show();
	$('.events').html("<li> </li>");
	async.series({
	one: function(callback){
    heroName =  $("#littleTime").val();
			$('.name').html('');
			$('.description').html('');
			$('.image').html('');
			$('.events').html('');
			$.ajax
			({
				type: "GET",
				url: 'http://gateway.marvel.com:80/v1/public/characters?name=' + heroName +
				'&limit=100&apikey=64f1f5a1ab896a13dd9c6b4009b0817e',
				dataType: 'json',
				success: function(json){

		  		$(".name").append(json.data.results[0].name);
		  		var id1 = json.data.results[0].id;
		  		console.log(id1);
		  		if(json.data.results[0].description == ''){
		  			$(".description").append('<p class = "characterDescription"> No description was found for '+heroName+'.</p>');
		  		}
		  		else{
		  		$(".description").append('<p class = "characterDescription">'+json.data.results[0].description+'</p>');
		  	}
		  		if(json.data.results[0].thumbnail.path == null){
		  			$('.image').attr("src", "http://vertex-uae.com/images/no-image-found.jpg");
		  		}
		  		else{
		  		$(".image").attr("src", json.data.results[0].thumbnail.path + "/detail.jpg");
		  		}
		  		$.each(json.data.results[0].events.items, function(i, item){
							marvel1.push(item.name);

					})


				},
				error: function(){
					alert('did not work')
				}
			})
			$('.image').fadeIn(1000)
			$("#firstInfo").fadeIn(1500);
			setTimeout(function(){
				callback(null, 1);

			}, 2500);
	},
	two: function(callback){
			$('.name1').html('');
			$('.description1').html('');
			$('.image1').html('');
			heroName2 = $('#bigTime').val();
			$.ajax
			({
				type: "GET",
				url: 'http://gateway.marvel.com:80/v1/public/characters?name=' + heroName2 +
				'&limit=100&apikey=64f1f5a1ab896a13dd9c6b4009b0817e',
				dataType: 'json',
				success: function(json){
				$(".name1").append(json.data.results[0].name);
				if(json.data.results[0].description == ''){
					$(".description1").append('<p class = "characterDescription"> No description was found for '+heroName2+'.</p>');
				}
				else{
  				$(".description1").append('<p class = "characterDescription">'+json.data.results[0].description+'</p>');
  				}
  				if(json.data.results[0].thumbnail.path == null){
  					$('.image1').attr("src", "http://vertex-uae.com/images/no-image-found.jpg");
  				}
  				else{
  				$(".image1").attr("src", json.data.results[0].thumbnail.path + "/detail.jpg");
  				}
  				var id2 = json.data.results[0].id;

				$.each(json.data.results[0].events.items, function(i, item){
					marvel2.push(item.name);

			})
				$('.image1').fadeIn(1000);
				$('.secondInfo').fadeIn(1500);
			setTimeout(function(){
				callback(null, 2);
			}, 2000);
		},
		error:function(){
			alert('#2 did not fire');
		}
	})
},
		three: function(callback){


		var arr = marvel1.concat(marvel2);
			var sorted_arr = arr.sort();
			var results1 = [];
			for (var i = 0; i<arr.length -1; i ++){
				if(sorted_arr[i+1] == sorted_arr[i]){
					results1.push(sorted_arr[i]);

				}

				//this is fucked but it's a start

			}
			if(results1 == ''){
				$('.events').append("<p> Odd, it seems like these two characters don't share events. Try again!</p>");
				$('.reStart').fadeIn('slow');
			}
			else{
				for (var j = 0; j<results1.length; j ++){
						$('.events').append('<li id = '+j+' class = "eventList"><a href= #>'+results1[j]+'</a></li>');
						$('#'+j).click(function(){
							var charList = [];
							$('.main').hide();
							$('.firstInfo').hide();
							$('.newDiv').show();

							var tryIt = $(this).text();
							console.log(tryIt);
							$('.loading1').show();
							$('.loading').show();
							$.ajax({
								type: 'GET',
								url: 'http://gateway.marvel.com:80/v1/public/events?name=' + tryIt + '&apikey=64f1f5a1ab896a13dd9c6b4009b0817e',
								dataType: 'json',
								success: function(json){
							$(".eventName").append(json.data.results[0].title);
							$(".eventDesc").append(json.data.results[0].description);
							var wooStuff = (json.data.results[0].id);
							console.log(wooStuff);

									$.ajax({

									type: 'GET',
									url:'http://gateway.marvel.com:80/v1/public/events/'+wooStuff+'/characters?limit=100&apikey=64f1f5a1ab896a13dd9c6b4009b0817e',
									dataType: 'json',
									success: function(json){
										for(f = 0; f<json.data.results.length; f++ ){
											var shit = json.data.results[f].name;
											$('.eventChar').append('<li class = "cEvents">'+json.data.results[f].name+'</li>');
										}
										$('.loading').hide();
										$('.charStuff').fadeIn('slow');
									},
									error: function() {
										alert ('character list didnt work')

								}
							}),

							$.ajax({
								type: 'GET',
								url:'http://gateway.marvel.com:80/v1/public/events/'+wooStuff+'/series?apikey=64f1f5a1ab896a13dd9c6b4009b0817e',
								dataType: 'json',
								success: function(json){
									for(w = 0; w<json.data.results.length; w++ ){
										var shit1 = json.data.results[w].title;
										$('.eventSer').append('<li class = "cStories">'+json.data.results[w].title+'</li>');
									}
									$('.loading1').hide();
									$('.serStuff').fadeIn('slow');

								},
								error: function(){
									alert('stories of characters did not work');
								}

							})
						},
						error: function(){
							'combingig the two failed'
						}
					})

					});
					}
				}
				$('.events').fadeIn('slow');
					$('.reStart').fadeIn('slow');

			//for loop on results1
			setTimeout(function(){
				callback(null, 3);
			}, 2500);
	},

		},
		function(err, results){
			console.log(results);
});

	}
}
	$scope.startOver = function(){
			marvel1 = [];
			marvel2= [];
			var heroName = '';
			var heroName2 = '';
			var wooStuff = '';
			$('.eventChar').html('');
			$('.eventSer').html('');
			$('.events').html('');
			$('.main').show();
			$('.newDiv').hide();
			$('.firstInfo').hide();
			$('.name').html('');
			$('.description').html('');
			$('.image').attr('src', '');
			$('.events').html('');
			$('.eventChar').html('');
			$(".eventDesc").html('');
			$(".eventName").html('');
			$('.name1').html('');
			$('.description1').html('');
			$('.wooNess').html('');
			$('.image1').attr('src', ' ');
			$scope.wooCharacter = '';
			$scope.wooCharacter1 = '';
			$('.charStuff').hide()
			$('.reStart').hide();
			$('.secondInfo').css("background-image", "url('')");
			$("#firstInfo").css("background-image", "url('')");
			$('.serStuff').hide();
			$('.events').hide();
			$(".image1").hide();
			$('.image').hide();
			$('.loading1').hide();
			$('.loading').hide();

		}
});
