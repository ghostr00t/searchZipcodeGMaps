$(document).ready(function () {
  window.locateTask = new Task();
  window.locateTask.init();
  window.locateTask.meetupAjax();
});

var Task = function () {};

var retrievedData = localStorage.getItem("meetupLS");

Task.prototype.cityArray = JSON.parse(retrievedData);

Task.prototype.init = function () {
  this.$zipInput = $("#screen input");
  this._bindEvents();
  this.terminal();
};

Task.prototype._bindEvents = function () {};

Task.prototype.meetupAjax = function (zip) {
  var _self = this;
  console.log("test")
  $.ajax({
    type: "GET",
    dataType: 'jsonp',
    data: {
      query: zip
    },
    url: "https://api.meetup.com/2/cities",
    success: function (data) {
      console.log(data)
      initMap(data.results);        
    }
  });
};

Task.prototype.terminal = function () {
  var _self = this;
  this.$zipInput.focus();
  console.log(this.$zipInput);
  this.$zipInput.on('keyup', function (event) {
    if (event.which === 13) {
      var $this = $(this);
      var val = $this.val();
      $this.focus().val('');
      _self.meetupAjax(val);
      if (val === "Travie is cool") {
        alert("YAAAAAAS!");
      }
    }
  });
}

function initMap(oData) {
  var lon = 0;
  var lat = 0;
  if (typeof (oData) !== "undefined") {
    for (var i = 0; i < oData.length; i++) {
      lon = oData[i].lon;
      lat = oData[i].lat;
    }
  }
  
  var target = {lat: lat, lng: lon};
  
  var map = new google.maps.Map(document.getElementById('map'), {
    draggableCursor:'crosshair',
    center: target,
    zoom: 12,
    styles: [{
        elementType: 'geometry',
        stylers: [{
          color: '#242f3e'
        }]
      },
      {
        elementType: 'labels.text.stroke',
        stylers: [{
          color: '#242f3e'
        }]
      },
      {
        elementType: 'labels.text.fill',
        stylers: [{
          color: '#746855'
        }]
      },
      {
        featureType: 'administrative.locality',
        elementType: 'labels.text.fill',
        stylers: [{
          color: '#d59563'
        }]
      },
      {
        featureType: 'poi',
        elementType: 'labels.text.fill',
        stylers: [{
          color: '#d59563'
        }]
      },
      {
        featureType: 'poi.park',
        elementType: 'geometry',
        stylers: [{
          color: '#263c3f'
        }]
      },
      {
        featureType: 'poi.park',
        elementType: 'labels.text.fill',
        stylers: [{
          color: '#6b9a76'
        }]
      },
      {
        featureType: 'road',
        elementType: 'geometry',
        stylers: [{
          color: '#38414e'
        }]
      },
      {
        featureType: 'road',
        elementType: 'geometry.stroke',
        stylers: [{
          color: '#212a37'
        }]
      },
      {
        featureType: 'road',
        elementType: 'labels.text.fill',
        stylers: [{
          color: '#9ca5b3'
        }]
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry',
        stylers: [{
          color: '#746855'
        }]
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry.stroke',
        stylers: [{
          color: '#1f2835'
        }]
      },
      {
        featureType: 'road.highway',
        elementType: 'labels.text.fill',
        stylers: [{
          color: '#f3d19c'
        }]
      },
      {
        featureType: 'transit',
        elementType: 'geometry',
        stylers: [{
          color: '#2f3948'
        }]
      },
      {
        featureType: 'transit.station',
        elementType: 'labels.text.fill',
        stylers: [{
          color: '#d59563'
        }]
      },
      {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [{
          color: '#17263c'
        }]
      },
      {
        featureType: 'water',
        elementType: 'labels.text.fill',
        stylers: [{
          color: '#515c6d'
        }]
      },
      {
        featureType: 'water',
        elementType: 'labels.text.stroke',
        stylers: [{
          color: '#17263c'
        }]
      }
    ]
  });

  var marker = new google.maps.marker({
    position: target,
    map: map
  });
};

var passwords = ['techTonic21', 'iWin4lyfe', 'admin2017', 'travisIsCool', 'letmein1337'];
var indexOld;
var index = Math.floor((Math.random() * passwords.length));
var password = passwords[index];
var characters = [];
var counter = 0;
	
var interval = setInterval(function(){
		for(i = 0; i < counter; i++) {
			characters[i] = password.charAt(i);
		}
		for(i = counter; i < password.length; i++) {
			characters[i] = Math.random().toString(36).charAt(2);
		}
		$('.password').text(characters.join(''));
	}, 25);

function hack() {
	counter++;
	if(counter == password.length){
		$('.granted, .rerun').removeClass('hidden');
	}
}
$(window).on('keydown', hack);
$('.password').on('click', hack);


$('.rerun').on('click', function() {
	indexOld = index; 
	do {
		index = Math.floor((Math.random() * passwords.length));
	} while(index == indexOld);
	
	$('.granted, .rerun').addClass('hidden');
	password = passwords[index];
	characters = [];
	counter = 0;
});

$('.start').on('click', function() {
	$(this).addClass('hidden');
	$('.info p:last-child, .password').removeClass('hidden');
});