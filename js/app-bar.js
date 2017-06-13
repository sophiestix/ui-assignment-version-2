// $(document).ready(function() {
// 	var url="../data.json";
// 	// $.getJSON(url, function (response){
// 	// 	var barHTML = '<ul>';
// 	// 	$.each(response, function (index, item) {
// 	// 		barHTML += '<li>' + item.networks.name + '</li>';
// 	// 	});
// 	// 	barHTML += '</ul>';
// 	// 	$('#networks').html(barHTML);
// 	// }); // end getJSON



// }); //end ready

// $(document).ready(function() {

// 	var json = (function () {
// 	    var json = null;
// 	    $.ajax({
// 	        'async': true,
// 	        'global': false,
// 	        'url': "../data.json",
// 	        'dataType': "json",
// 	        'success': function (data) {
// 	            json = data;
// 	        }
// 	    });
// 	    return json;
// 	})();

// 	$.getJSON(json, function (response){
// 		var barHTML = '<ul>';
// 		$.each(response, function (index, item) {
// 			barHTML += '<li>' + item.networks.name + '</li>';
// 		});
// 		barHTML += '</ul>';
// 		$('#networks').html(barHTML);
// 	}); // end getJSON

// }); //end ready


$(document).ready(function() {

	function ajax_get(url, callback) {
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function() {
			if (xmlhttp.readyState == 4 && xmlhttp.status == 200 ) {
				// console.log('responseText:' + xmlhttp.responseText);
				try {
					var data = JSON.parse(xmlhttp.responseText);
				} catch(err) {
					console.log(err.message + " in " + xmlhttp.responseText);
					return;
				}
				callback(data);
			}
		};

		xmlhttp.open("GET", url, true);
		xmlhttp.send();
	}

	function percent(count, total) {
		var percent = Math.floor((count/total)*100);
		return percent;
	}

	function bar(percent) {

	}

	// function createHTML(id) {
	// 	var html = "<div>";
	// 	for (var i=0; i < data[id].length; i++) {
	// 		html += '<div style="display: flex">';
	// 		html += '<div>' + data[id][i]["name"] + '</div>';
	// 		html += '<div> ' + percent(data[id][i]["count"], data["total"]) + '%' + '</div>';
	// 		html += '</div>';
	// 	}
	// 	html += '</div>';
	// 	return html;
	// }

	// ajax_get('../data.json', function(data) {
	// 	document.getElementById("networks").innerHTML = data["networks"];
	// 	var id = "networks";

	// 	createHTML("networks");
	// 	// var html = "<div>";
	// 	// for (var i=0; i < data["networks"].length; i++) {
	// 	// 	html += '<div style="display: flex">';
	// 	// 	html += '<div>' + data["networks"][i]["name"] + '</div>';
	// 	// 	html += '<div> ' + percent(data["networks"][i]["count"], data["total"]) + '%' + '</div>';
	// 	// 	html += '</div>';
	// 	// }
	// 	// html += '</div>';
	// 	document.getElementById("networks").innerHTML = html;
	// });

	ajax_get('../data.json', function(data) {
		document.getElementById("networks").innerHTML = data["networks"];
		var html = "<div>";
		for (var i=0; i < data["networks"].length; i++) {
			html += '<div style="display: flex">';
			html += '<div>' + data["networks"][i]["name"] + '</div>';
			html += '<div> ' + percent(data["networks"][i]["count"], data["total"]) + '%' + '</div>';
			html += '</div>';
		}
		html += '</div>';
		document.getElementById("networks").innerHTML = html;
	});

	ajax_get('../data.json', function(data) {
		document.getElementById("demographics").innerHTML = data["demographics"];

		var html = "<div>";
		for (var i=0; i < data["demographics"].length; i++) {
			html += '<div style="display: flex">';
			html += '<div>' + data["demographics"][i]["name"] + '</div>';
			html += '<div> ' + percent(data["demographics"][i]["count"], data["total"]) + '%' + '</div>';
			html += '</div>';
		}
		html += "</div>";
		document.getElementById("demographics").innerHTML = html;
	});

}); //end ready
