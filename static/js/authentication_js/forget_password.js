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

function send_user_email(text){
    $.ajax({
        url :  'http://127.0.0.1:8000/forget_password_email/',
        type : "POST",
        data : {
            csrfmiddlewaretoken : csrftoken,
            user_email_id : text,
        },
        success : function(json) {
            console.log(json);
            if(json["status"]){
                $('.email_status').empty();
                swal({
                    // title: "Password doesn't chnaged",
                    text: "Please open your email to change your password!!",
                    icon: "success",
                    button: "Ok",
                });
                $('.email_status').siblings().remove();
            }
            else{
                $('.email_status').empty();
                $('.email_status').append('Please enter your email address');
            }
        },
        error : function(xhr,errmsg,err) {
            console.log(xhr.status + ": " + xhr.responseText);
        }
    });
}

$(document).ready(function(){

    $(".submit_email").on('click', function(){
        var user_email = $('.email').val();
        console.log(user_email);
        var ideal_email=/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (user_email.match(ideal_email)) {
            send_user_email(user_email);
        }
        else{
            $('.email_status').empty();
            $('.email_status').append('Please enter valid email address');
        }
    });
    
});
