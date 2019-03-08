$(document).ready(function(){

    $(".submit_change").on('click', function(){
        var new_password = document.getElementsByClassName('new_password')[0].value;
        var confirm_new_password = document.getElementsByClassName('confirm_new_password')[0].value;
        var x2 = 0;
        var x3 = 0;
        var x1 = 0;
        if(new_password.length == 0){
            $("#new_password").empty();
            $("#new_password").append("Please enter your new passowrd");
            $('#new_password').css({"margin-bottom":'-15px'});
        }
        else{
            $("#new_password").empty();
            x1 = 1;
        }
        if(confirm_new_password.length == 0){
            $("#confirm_password").empty();
            $("#confirm_password").append("Please enter your  passowrd for confirmation");
            $('.confirm_password').css({"margin-top":'-12px'});
        }
        else{
            $("#confirm_password").empty();
            x2 = 1;
        }

        if((new_password != confirm_new_password)&& x1==1 && x2==1){
            swal({
                // title: "Password doesn't match",
                text: "Please correct your password",
                icon: "error",
                button: "Ok",
            });
        }
        else{
            $("#password_match_error").empty();
            x3 = 1;
        }
        

        if(x2==1 && x3==1){
        	var email_string = window.location.pathname.split("/")[2];
            var data = {
                csrfmiddlewaretoken : csrftoken,
                new_password : new_password,
                email_string : email_string,
            }

            send_forget_password_data(data);

        }
        
    });
});

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

function send_forget_password_data(data){
    $.ajax({
        url :  'http://127.0.0.1:8000/forget_change_password/',
        type : "POST",
        data : data,
        success : function(json) {
            if(json["status"]){
            	window.location.assign("http://127.0.0.1:8000/");
            }
            else{
            	window.location.assign("http://127.0.0.1:8000/page-not-found/");	
            }
        },
        error : function(xhr,errmsg,err) {
            console.log(xhr.status + ": " + xhr.responseText);
        }
    });
}