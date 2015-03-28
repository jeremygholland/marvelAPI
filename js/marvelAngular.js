var app = angular.module('app', []);
app.controller ('marvelContrl', function($scope){
	$('.newDiv').hide();
	var heroName;
	var heroName2;
	var seriesName;
	var marvel1 = [];
	var marvel2 = [];
	var results1 = [];
	var wooStuff;
$scope.main = true;
$scope.newDiv= false;

$(function() {
var totalChar = [
"3-D Man", "A-Bomb (HAS)",
"A.I.M.", "Aaron Stack",
"Abomination (Emil Blonsky)",
"Abomination (Ultimate)",
"Absorbing Man", "Abyss",
"Abyss (Age of Apocalypse)",
"Adam Destine", "Adam Warlock",
"Aegis (Trey Rollins)", "Agent Brand", 
"Agent X (Nijo)", "Agent Zero", 
"Agents of Atlas", "Aginar", 
"Air-Walker (Gabriel Lan)", "Ajak", 
"Ajaxis", "Akemi", "Alain", "Albert Cleary", 
"Albion", "Alex Power", "Alex Wilder", 
"Alexa Mendez", "Alexander Pierce", "Alice", 
"Alicia Masters", "Alpha Flight", "Alpha Flight (Ultimate)", 
"Alvin Maker", "Amadeus Cho", "Amanda Sefton", "Amazoness", 
"American Eagle (Jason Strongbow)", "Amiko", "Amora", 
"Amphibian (Earth-712)", "Amun", "Ancient One", 
"Ancient One (Ultimate)", "Angel (Thomas Halloway)", 
"Angel (Ultimate)", "Angel (Warren Worthington III)", 
"Angela (Aldrif Odinsdottir)", "Anita Blake", 
"Anne Marie Hoag", "Annihilus", 
"Anole", "Ant-Man (Eric O'Grady)", "Ant-Man (Scott Lang)", 
"Anthem", "Apocalypse", "Apocalypse (Ultimate)", 
"Aqueduct", "Arachne", "Araٌa", "Arcade", "Arcana", 
"Archangel", "Arclight", "Ares", "Argent", 
"Armadillo", "Armor (Hisako Ichiki)", "Armory", 
"Arnim Zola", "Arsenic", "Artiee", "Asgardian", 
"Askew-Tronics", "Asylum", "Atlas (Team)", 
"Aurora", "Avalanche", "Avengers", "Avengers (Ultimate)", 
"Azazel (Mutant)", "Banshee", "Banshee (Theresa Rourke)", 
"Baron Strucker", "Baron Zemo (Heinrich Zemo)", "Baron Zemo (Helmut Zemo)", 
"Baroness S'Bak", "Barracuda", "Bart Rozum", "Bastion", "Batroc the Leaper", 
"Battering Ram", "Beak", "Beast", "Beast (Earth-311)", "Beast (Ultimate)", 
"Becatron", "Bedlam", "Beef", "Beetle (Abner Jenkins)", "Ben Grimm"];

	$('#bigTime').autocomplete({
		source: totalChar 
	});
});

$scope.woo = function(){
	$('.events').html("<li> </li>");
	async.series({
	one: function(callback){
    heroName =  $("#littleTime").val();
			$('.name').html('');
			$('.description').html('');
			$('.image').html('');
			$('.events').html('');
			$.getJSON("http://gateway.marvel.com:80/v1/public/characters?limit=100&offset=100&apikey=9b468921eeceda45d379088e81c48169").then(function (json) {
				for(n = 0; n<json.data.results.length; n++){
					totalChar.push(json.data.results[n].name);
					console.log(totalChar);
				}

			});
			$.getJSON("http://gateway.marvel.com:80/v1/public/characters?name=" + heroName + "&limit=100&apikey=9b468921eeceda45d379088e81c48169").then(function (json) {
  		$(".name").append(json.data.results[0].name);
  		$(".description").append(json.data.results[0].description);
  		$(".image").attr("src", json.data.results[0].thumbnail.path + "/detail.jpg");
  			$.each(json.data.results[0].events.items, function(i, item){ 
  				marvel1.push(item.name);

  		});

  
  				});
			setTimeout(function(){
				callback(null, 1);

			}, 1000);
	},
	two: function(callback){
		$('.name1').html('');
			$('.description1').html('');
			$('.image1').html('');
			heroName2 = $('#bigTime').val();
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
			}, 1000);
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
				for (var j = 0; j<results1.length; j ++){
						$('.events').append('<li id = '+j+'><a href= #>'+results1[j]+'</a></li>');
						$('#'+j).click(function(){
							var charList = [];
							$('.main').hide();
							$('.newDiv').show();

							var tryIt = $(this).text();
							console.log(tryIt);
							$.getJSON('http://gateway.marvel.com:80/v1/public/events?name=' + tryIt + '&apikey=9b468921eeceda45d379088e81c48169').then (function (json){
							$(".eventName").append(json.data.results[0].title);
							$(".eventDesc").append(json.data.results[0].description);
							var wooStuff = (json.data.results[0].id);
							
							$.getJSON('http://gateway.marvel.com:80/v1/public/events/'+wooStuff+'/characters?limit=100&apikey=9b468921eeceda45d379088e81c48169').then (function (json){
								for(f = 0; f<json.data.results.length; f++ ){
									var shit = json.data.results[f].name;
									$('.eventChar').append('<li>'+json.data.results[f].name+'</li>');
								}
							})

							$.getJSON('http://gateway.marvel.com:80/v1/public/events/'+wooStuff+'/series?limit=100&apikey=9b468921eeceda45d379088e81c48169').then (function (json){
								for(w = 0; w<json.data.results.length; w++ ){
									var shit1 = json.data.results[w].name;
									$('.eventSer').append('<li>'+json.data.results[w].name+'</li>');
								}
							})

							});
					});
					}

			//for loop on results1
			setTimeout(function(){
				callback(null, 3);
			}, 800);
	}, 
	four: function(callback){
			marvel1 = [];
			marvel2= []
			$scope.wooCharacter2 = '';
			$scope.wooCharacter = '';
		
		setTimeout(function(){
				callback(null, 4);
			}, 1);
		},

		},
		function(err, results){
			console.log(results);
});

	}
	
});




