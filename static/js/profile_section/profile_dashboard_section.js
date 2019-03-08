$(document).ready(function(){

	$('.materialboxed').materialbox();

	
	var modal = document.getElementById('profile_modal');
	var btn = document.getElementById("update_profile");
	var span = document.getElementsByClassName("close")[0];

	btn.onclick = function() {
	    modal.style.display = "block";
	}

	span.onclick = function() {
	    modal.style.display = "none";
	    $('#upload-demo').croppie('destroy');
	    $('.header_section').css('position', 'fixed');
	}


	$('#update_profile').click(function(){

	    $('.header_section').css('position', 'static');

	    var profile_image_source = document.getElementById('user_profile_image').src;

	    var profile_crop = $('#upload-demo').croppie({
	        viewport: {
	            width: 250,
	            height: 250,
	            type: 'square'
	        },
	        boundary: {
	            width: 600,
	            height: 350,
	        }
	    });

	    profile_crop.croppie('bind', {
	        url: profile_image_source,
	        points: [0, 0, 0, 0]
	    }).then(function(){ 
	        profile_crop.croppie('setZoom', 0);
	    });


	    function read_profile_image(input) {
	        if (input.files && input.files[0]) {
	            var reader = new FileReader();          
	            reader.onload = function (e) {
	                profile_crop.croppie('bind', {
	                    url: e.target.result
	                });
	                $('.upload-demo').addClass('ready');
	            }           
	            reader.readAsDataURL(input.files[0]);
	        }
	    }

	    $('#upload_profile').on('change', function () {
	        read_profile_image(this);
	    });

	    $('.send_profile').on('click', function (ev) {
	        ev.preventDefault();
	        profile_crop.croppie('result', {
	            type: 'canvas',
	            // format: 'png',
	            quality: 1,
	            size: {
	                width: 300,
	                height: 300
	            }
	        }).then(function (response) {
	            send_profile_image(response);
	        });
	    });

	    function send_profile_image(response){
	        $('#imagebase64').val(response);
	        var image_base64 = document.getElementById('imagebase64').value;

	        $.ajax({
	            url :  'http://127.0.0.1:8000/profile/save_profile_image/',
	            type : "POST",
	            data : {
	                csrfmiddlewaretoken : csrftoken,
	                image : image_base64,
	            },
	            success : function(json) {
	                console.log(json);
	                window.location.reload();
	            },
	            error : function(xhr,errmsg,err) {
	                console.log(xhr.status + ": " + xhr.responseText);
	            }
	        });
	    }

	});

})







function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie != '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            if (cookie.substring(0, name.length + 1) == (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

var csrftoken = getCookie('csrftoken');

function send_profile_dashboard_data(){
    var user_page = window.location.pathname.split("-")[1];
    $.ajax({
        url :  'http://127.0.0.1:8000/profile/get_user_dashboard/' + user_page,
        type : "POST",
        data : {
            csrfmiddlewaretoken : csrftoken,
        },
        success : function(response_data) {
            console.log(response_data);
            place_user_profile_data(response_data)
        },
        error : function(xhr,errmsg,err) {
            console.log(xhr.status + ": " + xhr.responseText);
        }
    });
}


function place_user_profile_data(data){
	document.getElementById('user_profile_image').src = data["user_image"];
}