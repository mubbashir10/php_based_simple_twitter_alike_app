//defining reference to angular app object
var app = angular.module('calApp',[]);

//defining controller for calApp
app.controller('calAppCtrl', function($scope) {

	//defining reference to date object
	var date = new Date();

	//current year
	var currentYear = date.getFullYear();
	$scope.currentYear	 = currentYear;

	//current month
	var tmpMonth = date.getMonth();
	var currentMonth = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	$scope.monthName = currentMonth[tmpMonth];

	//current date
	var currentDate = date.getDate();
	$scope.currentDate = currentDate;

	//time stamp
	var nowHours = date.getHours();
	var nowMinutes = date.getMinutes();
	var nowSeconds = date.getSeconds();
  	nowMinutes = ( nowMinutes < 10 ? "0" : "" ) + nowMinutes;
  	nowSeconds = ( nowSeconds < 10 ? "0" : "" ) + nowSeconds;
  	var timeOfDay = ( nowHours < 12 ) ? "AM" : "PM";
  	nowHours = ( nowHours > 12 ) ? nowHours - 12 : nowHours;
  	nowHours = ( nowHours == 0 ) ? 12 : nowHours;
  	var nowTime = nowHours + ":" + nowMinutes + ":" + nowSeconds + " " + timeOfDay;
  	$scope.timeStamp = nowTime;


	//current day
	var currentDay = date.getDay();

	//total number of days in current month
	var totalDays = new Date(date.getFullYear(),date.getMonth() + 1, 0).getDate();

	//first day of current month
	var firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
		
	//days array
	var monthDays = new Array();
	for(var i = 1; i <= totalDays; i++) {
      monthDays.push(i);
    }
	$scope.calendar = monthDays;


});	

//JSON reading of weather
function weatherJSON(){


	//reading weather JSON
	var xmlhttp = new XMLHttpRequest();
	var url = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22islamabad%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";
	xmlhttp.onreadystatechange=function() {

	    //calling display function once resource file is found and loaded		
	    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
	        parseJSON(xmlhttp.responseText);
	    }
	}
	xmlhttp.open("GET", url, true);
	xmlhttp.send();

}

//JSON parsing of weather
function parseJSON(response) {

    //converting JSON object to js object		
    var arr = JSON.parse(response);

    //current temperature
    var temp = arr["query"].results.channel.item.condition.temp;
    var desc= arr["query"].results.channel.item.condition.text;
    document.getElementById("temp").innerHTML = temp+" F, "+desc ;

    //current conditions
    var cond = arr["query"].results.channel.item.description;
    document.getElementById("cond").innerHTML = cond ;

}

