$(document).ready(function() {

	var $networks = document.querySelector("#networks");
    var $demographics = document.querySelector('#demographics');

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

	function compareNumbers(a, b) {
		return b.count - a.count;
	}

	// function createArray (type) {
	// 	for (let key in data[type]) {
	// 		if(!data[type].hasOwnProperty(key)) {
	// 			continue;
	// 		}
	// 		arr.push(data[type].sort(compareNumbers)[key]);
	// 		// arr.sort(compareNumbers);
	// 	}
	// 	return arr;
	// }
	

	function displayHTML(arr, id, total) {
		let html = "<div>";
		for (let i=0; i < arr.length; i++) {
			html += '<div class="stat-row">';
				html += '<div class="progess-bar-tag">' + arr[i]["name"] + '</div>';
				html += '<div class="progress-bar-background">';
					html += '<div class="progress-bar" style="width:' + percent(arr[i]["count"], total) + '%;">x' + '</div>'
				html += '</div>';
				html += '<div class="progress-bar-percent"> ' + percent(arr[i]["count"], total) + '%' + '</div>';
			html += '</div>';
		}
		html += '</div>';
		document.getElementById(id).innerHTML = html;
	}

	// ajax_get('../data.json', function(data) {
	// 	let arr = [];
	// 	if ($networks) {
	// 		createArray ("networks")
	// 	}; 
	// 	displayHTML(arr, "networks", data["total"]);
	// })

	ajax_get('../data.json', function(data) {
		let arr = [];
		if ($networks) {
			for (let key in data["networks"]) {
				if(!data["networks"].hasOwnProperty(key)) {
					continue;
				}
				arr.push(data["networks"].sort(compareNumbers)[key]);
				// arr.sort(compareNumbers);
			}
		};
		displayHTML(arr, "networks", data["total"]);
	})

	ajax_get('../data.json', function(data) {
		let arr = [];
		if ($demographics) {
			for (let key in data["demographics"]) {
				if(!data["demographics"].hasOwnProperty(key)) {
					continue;
				}
				arr.push(data["demographics"].sort(compareNumbers)[key]);
				// arr.sort(compareNumbers);
			}
		}
		displayHTML(arr, "demographics", data["total"]);
	})

}); //end ready
