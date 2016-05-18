var myApp = angular.module('myApp',['ngMaterial', 'widget.scrollbar', 'ngCookies'])
.config(function($mdThemingProvider, $mdIconProvider) {
    var customBackground = {
        '50': '#ffffff',
        '100': '#ffffff',
        '200': '#ffffff',
        '300': '#ffffff',
        '400': '#ffffff',
        '500': '#ffffff',
        '600': '#f2f2f2',
        '700': '#e6e6e6',
        '800': '#d9d9d9',
        '900': '#cccccc',
        'A100': '#ffffff',
        'A200': '#ffffff',
        'A400': '#ffffff',
        'A700': '#bfbfbf'
    };
    $mdThemingProvider
        .definePalette('customBackground', 
                        customBackground);

	$mdThemingProvider.theme('default')
		.dark();

	$mdThemingProvider.theme('alt')
		.primaryPalette('red')
    	.accentPalette('pink')
    	.warnPalette('blue')
    	.backgroundPalette('customBackground')

	$mdThemingProvider.alwaysWatchTheme(true);

	$mdIconProvider
	  .icon('contact', 'img/contact_mail.svg', 24)
});

myApp.filter( 'shortNumber', function() {
	return function( number ) {
		if ( number ) {
			abs = Math.abs( number );
			if ( abs >= Math.pow( 10, 36 ) ) {
			// undecillion
				number = ( number / Math.pow( 10, 36 ) ).toFixed( 2 ) + "UnD";
			} else if ( abs < Math.pow( 10, 36 ) && abs >= Math.pow( 10, 33 ) ) {
			// decillion
				number = ( number / Math.pow( 10, 33 ) ).toFixed( 2 ) + "De";
			} else if ( abs < Math.pow( 10, 33 ) && abs >= Math.pow( 10, 30 ) ) {
			// nonillion
				number = ( number / Math.pow( 10, 30 ) ).toFixed( 2 ) + "No";
			} else if ( abs < Math.pow( 10, 30 ) && abs >= Math.pow( 10, 27 ) ) {
			// octillion
				number = ( number / Math.pow( 10, 27 ) ).toFixed( 2 ) + "Oc";
			} else if ( abs < Math.pow( 10, 27 ) && abs >= Math.pow( 10, 24 ) ) {
			// septillion
				number = ( number / Math.pow( 10, 24 ) ).toFixed( 2 ) + "Sp";
			} else if ( abs < Math.pow( 10, 24 ) && abs >= Math.pow( 10, 21 ) ) {
			// sextillion
				number = ( number / Math.pow( 10, 21 ) ).toFixed( 2 ) + "Sx";
			} else if ( abs < Math.pow( 10, 21 ) && abs >= Math.pow( 10, 18 ) ) {
			// quintillion
				number = ( number / Math.pow( 10, 18 ) ).toFixed( 2 ) + "Qi";
			} else if ( abs < Math.pow( 10, 18 ) && abs >= Math.pow( 10, 15 ) ) {
			// quadrillion
				number = ( number / Math.pow( 10, 15 ) ).toFixed( 2 ) + "Qa";
			} else if ( abs < Math.pow( 10, 15 ) && abs >= Math.pow( 10, 12 ) ) {
			// trillion
				number = ( number / Math.pow( 10, 12 ) ).toFixed( 2 ) + "T";
			} else if ( abs < Math.pow( 10, 12 ) && abs >= Math.pow( 10, 9 ) ) {
			// billion
				number = ( number / Math.pow( 10, 9 ) ).toFixed( 2 ) + "B";
			} else if ( abs < Math.pow( 10, 9 ) && abs >= Math.pow( 10, 6 ) ) {
			// million
				number = ( number / Math.pow( 10, 6 ) ).toFixed( 2 ) + "M";
			} else if ( abs < Math.pow( 10, 6 ) && abs >= Math.pow( 10, 3 ) ) {
			// thousand
				number = ( number / Math.pow( 10, 3 ) ).toFixed( 2 ) + "K";
			} else if ( abs < Math.pow( 10, 3 ) && abs > 0 ) {
			// one+tens+hundreds
				number = ( number ).toFixed( 2 );
			} else {
			// zero
				number = 0;
			}
			return number;
		} else {
			return 0;
		}
	};
});

myApp.controller('yudodis', function($scope, $interval, $mdDialog, $cookies, $mdBottomSheet) {
	$interval(addPotatoes, 10);
	$interval(savePotatoes, 30000);

	$scope.alert = '';
  	$scope.showListBottomSheet = function() {
	    $scope.alert = '';
	    $mdBottomSheet.show({
	    	template:
	    	'<md-bottom-sheet style="background-color: black;" class="md-grid" layout="column" ng-cloak>'+
	    		'<md-content>'+
				  '<div layout="row" layout-align="center center">'+
				    '<h4>Stuff</h4>'+
				  '</div>'+
				  '<div>'+
				    '<md-list flex layout="row" layout-align="center center">'+
				      '<md-list-item ng-repeat="item in items">'+
				        '<md-button class="md-grid-item-content" ng-click="listItemClick($index)">'+
				         '<i class="material-icons">contact_mail</i>'+
				          '<div class="md-grid-text"> {{ item.name }} </div>'+
				        '</md-button>'+
				      '</md-list-item>'+
				    '</md-list>'+
				  '</div>'+
				'</md-content>'+
			'</md-bottom-sheet>',
	    	controller: 'GridBottomSheetCtrl'
	    }).then(function(clickedItem) {
	    	$scope.alert = clickedItem['name'] + ' clicked!';
	    });
    };

	$scope.optionToggle = false;
	$scope.statToggle = false;
	$scope.savingToggle = 0;

	$scope.toggle1 = function() {
		if(!$scope.optionToggle) {
			if($scope.statToggle) {
				$scope.statToggle = false;
			}
			$scope.optionToggle = true;
		}else {
			$scope.optionToggle = false;
		}
	}

	$scope.toggle2 = function() {
		if(!$scope.statToggle) {
			if($scope.optionToggle) {
				$scope.optionToggle = false;
			}
			$scope.statToggle = true;
		}else {
			$scope.statToggle = false;
		}
	}

	$scope.lightSwitch = 'Off';
	$scope.dynamicTheme = 'default';
	$scope.borders = 'white';
	$scope.lightSwitchOn = function() {
		if($scope.lightSwitch == 'Off') {
			$scope.dynamicTheme = 'alt';
			$scope.borders = 'black';
		}else{
			$scope.dynamicTheme = 'default';
			$scope.borders = 'white';
		}
	}

	$scope.hackSwitch = 'Off';
	$scope.hackSwitchOn = function() {
		if($scope.hackSwitch == 'On') {
			$scope.hackMult = 1e+100;
		}else {
			$scope.hackMult = 1;
		}
		return $scope.hackMult;
	}

	$scope.potatoes = 0;
	$scope.totalPotatoes = 0;
	$scope.totalPotatoesFromClicks = 0;
	$scope.totalBigPotatoClicks = 0;
	$scope.power = 0;
	$scope.pps = 0;

	var units = ['Potato Peeler', 'Potato Farmer', 'Potato Spinner', 'Potato Breeder', 'Spud Extractor', 'Potato Alchemist', 'Cloning Device', 'Time Bot'];
	var unitDescriptions = ['More peelers mean faster peeling!', 'Hire farmers to do work', 'Bet the farmers will like this.', "They're...they're multiplying", 'Asexual production', 
	"SCIENCE!", 'Molecular cloning', 'Travel either forward or backward in time for infinite potatoes!']; 

	var machines = ['Battery', 'Machine', 'Nuclear Reactor', 'AP-V Generator'];
	var machineDescriptions = ["Let's wire this tator up!", "Need more fuel...potato fuel", 'If we collide these potatoes just right...', 'Atmospheric Potato-Vortex Generator'];

	var buildings = ['Factory', 'Lab'];
	var buildingDescriptions = ["We will power the world with our potatoes!", 'Further science with potatoes!'];

	var achievements = [];
	var achievementDescriptions = [];

	$scope.machines = [];
	$scope.buildings = [];
	$scope.achievements = [];
	$scope.units = [];
	$scope.upgrades = [];
	
	for(var i = 0; i < units.length; i++) {
		$scope.units.push({
			name: units[i],
			amount: 0,
			price: Math.pow(10, (i+1)),
			pps: Math.pow((i+1), 6)/10,
			mult: 1,
			requirement: Math.pow(10, i) <= 100 ? 0 : Math.pow(10, (i-1)),
			description: unitDescriptions[i]
		});
		$scope.upgrades.push({
			name: units[i],
			amount: 0,
			upgrade: 1,
			cost: Math.pow(10, (i+2)) * 2,
			requirement: Math.pow(10, (i)) * 2
		});
		$scope.upgrades.push({
			name: units[i],
			amount: 0,
			upgrade: 2,
			cost: Math.pow(10, (i+3)) * 3,
			requirement: Math.pow(10, (i+1)) * 2
		});
		$scope.upgrades.push({
			name: units[i],
			amount: 0,
			upgrade: 3,
			cost: Math.pow(10, (i+4)) * 4,
			requirement: Math.pow(10, (i+2)) * 2
		});
	}
	
	$scope.upgradeStuff = function(index) {
		$scope.upgrades[index].amount = $scope.upgrades[index].amount + 1;
		var searchTerm = $scope.upgrades[index].name,
    	search = -1;
		for(var i = 0, len = $scope.units.length; i < len; i++) {
		    if ($scope.units[i].name === searchTerm) {
		        search = i;
		        break;
		    }
		}
		$scope.potatoes = $scope.potatoes - $scope.upgrades[index].cost;
		$scope.units[search].mult = $scope.units[search].mult + $scope.upgrades[index].upgrade;
	}

	$scope.price = function(index) {
		if($scope.potatoes >= $scope.units[index].price) {
			$scope.units[index].amount = $scope.units[index].amount + 1;
			$scope.potatoes = $scope.potatoes - $scope.units[index].price;
			$scope.units[index].price = Math.round(1.2 * $scope.units[index].price + Math.pow($scope.units[index].amount, 2));
		}
	}

	$scope.getPPS = function() {
		$scope.pps = 0;
		for(var i = 0; i < $scope.units.length; i++) {
		    var unit = $scope.units[i];
			$scope.pps += ((unit.pps * unit.mult) * unit.amount);
		}
		return $scope.pps;
	}

	function addPotatoes() {
		for(var i = 0; i < $scope.units.length; i++) {
			$scope.potatoes = $scope.potatoes + (($scope.units[i].pps * $scope.units[i].mult) * $scope.units[i].amount)/100;
			$scope.totalPotatoes = $scope.totalPotatoes + (($scope.units[i].pps * $scope.units[i].mult) * $scope.units[i].amount)/100;
		}
		if($scope.savingToggle > 0) {
			$scope.savingToggle = $scope.savingToggle - 1/100;
		}
	}
	
	function savePotatoes() {
		$scope.savingToggle = 3;
		var potatoes = $scope.potatoes;
	    var totalPotatoes = $scope.totalPotatoes;
	    var totalPotatoesFromClicks = $scope.totalPotatoesFromClicks;
	    var totalBigPotatoClicks = $scope.totalBigPotatoClicks;
	    var pps = $scope.pps;
		var upgradesAmount = [];
		for(var i = 0; i < $scope.upgrades.length; i++) {
			upgradesAmount.push($scope.upgrades[i].amount)
		}
		var unitsAmount = [];
		var unitsPrice = [];
		var unitsPps = [];
		var unitsMult = [];
		for(var i = 0; i < $scope.units.length; i++) {
			unitsAmount.push($scope.units[i].amount);
			unitsPrice.push($scope.units[i].price);
			unitsPps.push($scope.units[i].pps);
			unitsMult.push($scope.units[i].mult);
		}
		$scope.exportData = btoa(angular.toJson([potatoes, totalPotatoes, totalPotatoesFromClicks, totalBigPotatoClicks, pps, unitsAmount, unitsPrice, unitsPps, unitsMult, upgradesAmount]));
		$cookies.put('exportData', $scope.exportData, {'expires': new Date(2018, 1, 1)});
	}
	
	$scope.export = function(ev) {
		var potatoes = $scope.potatoes;
	    var totalPotatoes = $scope.totalPotatoes;
	    var totalPotatoesFromClicks = $scope.totalPotatoesFromClicks;
	    var totalBigPotatoClicks = $scope.totalBigPotatoClicks;
	    var pps = $scope.pps;
		var upgradesAmount = [];
		for(var i = 0; i < $scope.upgrades.length; i++) {
			upgradesAmount.push($scope.upgrades[i].amount)
		}
		var unitsAmount = [];
		var unitsPrice = [];
		var unitsPps = [];
		var unitsMult = [];
		for(var i = 0; i < $scope.units.length; i++) {
			unitsAmount.push($scope.units[i].amount);
			unitsPrice.push($scope.units[i].price);
			unitsPps.push($scope.units[i].pps);
			unitsMult.push($scope.units[i].mult);
		}
		$scope.exportData = btoa(angular.toJson([potatoes, totalPotatoes, totalPotatoesFromClicks, totalBigPotatoClicks, pps, unitsAmount, unitsPrice, unitsPps, unitsMult, upgradesAmount]));
		$cookies.put('exportData', $scope.exportData, {'expires': new Date(3000, 1, 1)});
		$mdDialog.show({
	        controller: DialogController,
	        template: 
	        	'<md-dialog>'+	
			        '<md-input-container class="md-block">'+
		        		'<label>Data</label>'+
		        		'<textarea ng-model="exportData" rows="5"></textarea>'+
		        	'</md-input-container>'+
	        	'</md-dialog>',
	        parent: angular.element(document.body),
		    targetEvent: ev,
		    clickOutsideToClose:true
	    });
	}

	$scope.import = function(ev) {
		$mdDialog.show({
	        controller: DialogController,
	        template: 
	        	'<md-dialog>'+	
			        '<md-input-container class="md-block">'+
		        		'<label>Data</label>'+
		        		'<textarea ng-model="importData" rows="5"></textarea>'+
		        	'</md-input-container>'+
		        	'<md-button ng-click="answer(importData)">Import</md-button>'+
	        	'</md-dialog>',
	        parent: angular.element(document.body),
		    targetEvent: ev,
		    clickOutsideToClose:true
	    })
	    .then(function(answer) {
	        $scope.importData = angular.fromJson(atob(answer));
	        $scope.potatoes = $scope.importData[0];
			$scope.totalPotatoes = $scope.importData[1];
			$scope.totalPotatoesFromClicks = $scope.importData[2];
			$scope.totalBigPotatoClicks = $scope.importData[3];
			$scope.pps = $scope.importData[4];
	        for(var i = 0; i < $scope.units.length; i++) {
	        	$scope.units[i].amount = $scope.importData[5][i];
				$scope.units[i].price = $scope.importData[6][i];
				$scope.units[i].pps = $scope.importData[7][i];
				$scope.units[i].mult = $scope.importData[8][i];
	        }
	        for(var i = 0; i < $scope.upgrades.length; i++) {
	        	$scope.upgrades[i].amount = $scope.importData[9][i];
	        }
        }, function() {
        	$scope.status = 'You cancelled the dialog.';
        });
    };

	$scope.bigPotatoClick = function() {
		$scope.potatoes = $scope.potatoes + 1 * ($scope.hackSwitchOn());
		$scope.totalPotatoes = $scope.totalPotatoes + 1 * ($scope.hackSwitchOn());
		$scope.totalPotatoesFromClicks = $scope.totalPotatoesFromClicks + 1 * ($scope.hackSwitchOn());
		$scope.totalBigPotatoClicks = $scope.totalBigPotatoClicks + 1;
	}

	$scope.showAdvanced = function(ev) {
	    $mdDialog.show({
		    controller: DialogController,
		    template:
		    '<md-dialog aria-label="Changelog">'+
			    '<form>'+
			        '<md-toolbar>'+
			            '<div class="md-toolbar-tools">'+
			                '<h2>Changelog</h2>'+
			                '<span flex></span>'+
			                '<md-button class="md-icon-button" ng-click="cancel()">X</md-button>'+
			            '</div>'+
			     '   </md-toolbar>'+
			       ' <md-dialog-content>'+
				        '<md-tabs md-dynamic-height md-border-bottom>'+
				        	'<md-tab label="Version 1">'+
					            '<md-tabs md-dynamic-height md-border-bottom>'+
					               '<md-tab label="v1.1">'+
					                   '<md-content class="md-padding">'+
					                       '<h3>Version 1.1</h3>'+
					                        '<ul>'+
					                       		'<li>Nothing here but tests and stuff</li>'+
					                       	'</ul>'+
					                   '</md-content>'+
					                '</md-tab>'+
					                '<md-tab label="v1.2">'+
					                	'<md-content class="md-padding">'+
						                	'<h3>Version 1.2</h3>'+
						                    '<ul>' + 
						                    	'<li>Implemented full reset, import/export and saving (saving cookie every 30 seconds) for the game</li>' + 
						                    '</ul>'+
					                	'</md-content>'+
					               ' </md-tab>'+
					               ' <md-tab label="v1.3">'+
					                	'<md-content class="md-padding">'+
					                		'<h3>Version 1.3</h3>'+
					                		'<ul>'+
					                			"<li>New filter for numbers that go up to Undecillion (doubt I'm gonna need for now...but might as well!)</li>"+
					                			"<li>Modified the stupid changelog so it updates manually (without me replacing the URL)</li>"+
					                			"<li>addPotatoes interval is a lot faster now so that it looks more cool when getting potatoes, and everything updates faster</li>"+
					                		'</ul>'+
					                	'</md-content>'+
					                '</md-tab>'+
					           ' </md-tabs>'+
					       ' </md-tab>'+
					       ' <md-tab ng-disabled="true" label="Version 2">'+
					        	'<md-tabs md-dynamic-height md-border-bottom>'+
					                '<md-tab label="v2.1">'+
					                   ' <md-content class="md-padding">'+
					                       ' <h3>Version 2.1</h3>'+
					                      '  <p>Nothing here</p>'+
					                   ' </md-content>'+
					               ' </md-tab>'+
					               ' <md-tab label="v2.2">'+
					                	'<md-content class="md-padding">'+
						                	'<h3>Version 2.2</h3>'+
						                    '<p>Also nothing here</p>'+
					                	'</md-content>'+
					                '</md-tab>'+
					           ' </md-tabs>'+
					       ' </md-tab>'+
					    '</md-tabs>'+
			       ' </md-dialog-content>'+
			    '</form>'+
			'</md-dialog>',
		    parent: angular.element(document.body),
		    targetEvent: ev,
		    clickOutsideToClose:true
    	})
  	};
  	$scope.showConfirm = function(ev) {
	    var confirm = $mdDialog.confirm()
	        .title('Full Reset')
	        .textContent('WARNING: THIS RESETS ALL YOUR DATA BACK TO 0!!!!!')
	        .ariaLabel('Full Reset')
	        .targetEvent(ev)
	        .ok('Yes')
	        .cancel('No');
	    $mdDialog.show(confirm).then(function() {
	    	$scope.potatoes = 0;
	    	$scope.totalPotatoes = 0;
	    	$scope.totalPotatoesFromClicks = 0;
	    	$scope.totalBigPotatoClicks = 0;
	    	$scope.pps = 0;
	    	for(var i = 0; i < $scope.units.length; i++) {
	    		$scope.units[i].amount = 0;
	    		$scope.units[i].mult = 1;
	    		$scope.units[i].price = Math.pow(10, (i+1));
	    	}
	    	for(var i = 0; i < $scope.upgrades.length; i++) {
	    		$scope.upgrades[i].amount = 0;
	    	}
	    }, function() {
	    	$scope.status = 'no';
	    });
    };

    if($cookies.get('exportData')) {
	    $scope.importData = angular.fromJson(atob($cookies.get('exportData')));
		if($scope.importData == null || undefined)	{
			console.log("Bad Cookie");
		}else{
			$scope.potatoes = $scope.importData[0];
			$scope.totalPotatoes = $scope.importData[1];
			$scope.totalPotatoesFromClicks = $scope.importData[2];
			$scope.totalBigPotatoClicks = $scope.importData[3];
			$scope.pps = $scope.importData[4];
			for(var i = 0; i < $scope.units.length; i++) {
			    $scope.units[i].amount = $scope.importData[5][i];
				$scope.units[i].price = $scope.importData[6][i];
				$scope.units[i].pps = $scope.importData[7][i];
				$scope.units[i].mult = $scope.importData[8][i];
			}
			for(var i = 0; i < $scope.upgrades.length; i++) {
			    $scope.upgrades[i].amount = $scope.importData[9][i];
			}
		}
	}
})

function DialogController($scope, $mdDialog, $cookies) {
  $scope.hide = function() {
    $mdDialog.hide();
  };
  $scope.cancel = function() {
    $mdDialog.cancel();
  };
  $scope.answer = function(answer) {
    $mdDialog.hide(answer);
  };
  $scope.exportData = $cookies.get('exportData'); 
}

myApp.controller('GridBottomSheetCtrl', function($scope, $mdBottomSheet) {
  $scope.items = [
    { name: 'Contact', icon: 'contact' }
  ];
  $scope.listItemClick = function($index) {
    var clickedItem = $scope.items[$index];
    $mdBottomSheet.hide(clickedItem);
  };
})