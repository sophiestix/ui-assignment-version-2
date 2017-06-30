$(document).ready(function() {

    var $audienceList = document.querySelector("#audience-list");
    var $btnTalking = document.querySelector('#btn-talking');
    var $btnLabels = document.querySelector('#btn-labels');
    var $tabBar = document.querySelector('#tab-bar');


//two <div> that are clickable
//click one of them, display relevant rows with data from json
//click the other one, display relevant rows with data from json

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


   /**
    * Tabs
   */

    $tabBar.addEventListener('click', (event) => {

        // ajax_get('../data.json', function(data) {
        //     document.getElementById("audience-list").innerHTML = data["topics"];

        //     var html = "<div>";
        //     for (var i=0; i < data["topics"].length; i++) {
        //         html += '<div style="display: flex">';
        //         html += '<div>' + data["topics"][i]["name"] + '</div>';
        //         html += '<div> ' + data["topics"][i]["users"] + '</div>';
        //         html += '</div>';
        //     }
        //     html += '</div>';
        //     document.getElementById("audience-list").innerHTML = html;
        // });


//get the element I clicked on into a var
//remove the selected class from all of the siblings
//add selected class to the clicked div
        var el = event.target;
        $(el).addClass('selected').siblings().removeClass('selected');
        // console.log(el.classList);

//use the element that was clicked and pass it
//have an empty array
//see what was clicked
    //if talking => then get the topics part of json
    //if lables => get the labels part of json
    //start a for loop and push the relevant data to the empty array
        ajax_get('../data.json', function(data) {
            var array = [];
            if ( el.id == 'btn-talking') {
                for(var key in data["topics"]){
                    if(!data["topics"].hasOwnProperty(key)){
                        continue;
                }
                array.push(data["topics"][key])
                }
            } else if ( el.id == 'btn-labels') {
                for(var key in data["labels"]){
                    if(!data["labels"].hasOwnProperty(key)){
                        continue;
                }
                array.push(data["labels"][key])
                }
            }
            
            // console.log(array, array.slice(0,5));
            var rest = array.splice(5);

            var html = "<div>";
            for (var i=0; i < array.length; i++) {
                html += '<div class="row audience-row">';
                    html += '<div class="audience-name">' + array[i]["name"] + '</div>';
                    html += '<div class="avatar-list">'
                        for (var j=0; j < 6; j++) {
                            var currentUser = array[i]["users"][j];
                            if (currentUser) {
                                html += '<div><img class="avatar" src="' + currentUser["avatar"] + '"></img></div>';
                            }
                        }
                        var users_length = array[i]["users"].length - 6;
                        html += '<span> + '+ users_length +' others</span>';
                    html += '</div>';
                html += '</div>';
            }
            html += '</div>';
            document.getElementById("audience-list").innerHTML = html;

            var html_rest = '<div>';
                for (var i=0; i < rest.length; i++) {
                    html_rest += '<div class="tags">' + rest[i]["name"] + ' (' +rest[i]["users"].length+ ')</div>';
                }
            html_rest += '</div>';
            document.getElementById("other-topics").innerHTML = html_rest;

        });
    });

}); //end ready
