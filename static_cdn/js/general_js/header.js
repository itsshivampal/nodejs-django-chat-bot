$(document).ready(function(){
    $('.dropdown-trigger').dropdown({
        hover: true,
        coverTrigger: false,
    });
})

function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
var csrftoken = getCookie('csrftoken');

function get_header_data(){
    $.ajax({
        url :  'http://127.0.0.1:8000/profile/header_data_api/',
        type : "GET",
        data : {
            csrfmiddlewaretoken : csrftoken,
        },
        success : function(response_data) {
            var username = response_data["username"];
            var user_profile_link = "http://127.0.0.1:8000/user-" + username + "/";
            var user_settings_link = "http://127.0.0.1:8000/user-" + username + "/settings";
            $("#user_image").attr('src', response_data["profile_image"]);
            $("#user_profile").attr('href', user_profile_link);
            $("#user_profile_link").attr('href', user_profile_link);
            $("#user_settings").attr('href', user_settings_link);
            $("#user_name").text(response_data["first_name"]);
        },
        error : function(xhr,errmsg,err) {
            console.log(xhr.status + ": " + xhr.responseText);
        }
    });
}