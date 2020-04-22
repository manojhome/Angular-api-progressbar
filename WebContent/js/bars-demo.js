var app = angular.module("barsDemoApp", []);
app.controller("barsDemoCtrl", function($scope,$http,$compile) {

	
	$scope.init = function(){
		//endpoint call
		$http.get('http://pb-api.herokuapp.com/bars').
		then(function(response) {
			$scope.responseData = response.data;
			$scope.buttons = $scope.responseData.buttons;
			$scope.bars = $scope.responseData.bars;
			$scope.maxLimit = $scope.responseData.limit;

			$scope.createView($scope.buttons,$scope.bars);
		});
	}

	//creates dom elements for the view
	$scope.createView = function(buttons,bars){
		var dropDown = document.createElement("select");
		//set values and lable to buttons
		angular.forEach(buttons,function(btn,indx){
			var button = document.createElement("button");
			var buttonId = "btn"+(indx+1);
			button.setAttribute("id", buttonId);
			button.setAttribute("value", btn);
			button.setAttribute("class", "btn");
			button.setAttribute("ng-click", "changeBarsWidth('"+buttonId+"')");
			button.innerHTML=btn;
			
			//compile button element using $compile, so that ng-click works
			$compile(button)($scope);
			//button.onclick = $scope.changeBarsWidth(buttonId);
			var buttonDiv = document.getElementById("buttonDiv");
			buttonDiv.appendChild(button);
		});

		//create main view
		angular.forEach(bars,function(barValue,indx){
			var progress = document.createElement("div");
			var cont = document.getElementById("mainDiv");

			cont.appendChild(progress);
			progress.setAttribute("class", "progress");
			progress.setAttribute("id", "progress" + (indx+1));

			var bar = document.createElement("div");
			progress.appendChild(bar);
			bar.setAttribute("class", "bar");
			bar.setAttribute("id", "bar" + (indx+1));
			bar.style.width = barValue + "%";


			var label = document.createElement("label");
			bar.appendChild(label);
			label.setAttribute("class", "clabel");
			label.setAttribute("id", "label" + (indx+1));
			label.innerHTML = barValue + "%";

			var options = document.createElement("option");
			dropDown.appendChild(options);
			options.setAttribute("id", "dropDown" + (indx+1));
			options.setAttribute("value", (indx+1));
			options.innerHTML = "progessbar " + (indx+1);
		});
                  
		var but = document.getElementById("buttonDiv");
		but.appendChild(dropDown);
		dropDown.setAttribute("id", "dropDownId");
	}
	
	//this function get called on the click of button
	$scope.changeBarsWidth = function(divId){
		var element = document.getElementById(divId);

		var v = parseInt(document.getElementById("dropDownId").value);
		var a = document.getElementById("label"+v).innerHTML;

		var elementValue = parseInt(element.value) + parseInt(a);

		// if value equal to 100 ,change color to blue
		if (elementValue == 100)
		{
			document.getElementById("bar"+v).style.backgroundColor = "blue";
			document.getElementById("bar"+v).style.width = "100%";
			document.getElementById("label"+v).innerHTML = elementValue + "%";                   
		}
		//if value is greater than 100 and less OR equal to maxlimit ,change color to red
		else if(elementValue > 100 && elementValue <= $scope.maxLimit){  
			document.getElementById("bar"+v).style.backgroundColor = "red";
			document.getElementById("bar"+v).style.width = "100%";
			document.getElementById("label"+v).innerHTML = elementValue + "%"; 
		}
		//if value is greater than maxlimit ,change color to red
		else if(elementValue >= $scope.maxLimit){
			document.getElementById("bar"+v).style.backgroundColor = "red";
			document.getElementById("bar"+v).style.width = "100%";
			document.getElementById("label"+v).innerHTML = $scope.maxLimit + "%"; 
		}
		//if value is less than 100 and greater than 0 ,change color to green
		else if (elementValue <= 100 && elementValue > 0)
		{
			document.getElementById("bar"+v).style.backgroundColor = "lightgreen";
			document.getElementById("bar"+v).style.width = elementValue + "%";
			document.getElementById("label"+v).innerHTML = elementValue + "%";
		} 
		// if value is less than or equal to 0 than set value and width of bar equal to 0
		else if (elementValue <= 0)
		{
			document.getElementById("bar"+v).style.width = "0%";
			document.getElementById("label"+v).innerHTML = "0%";

		} 
	}	
	
	//call to init function
	$scope.init();
});

