function initailise_page(){
    $(document).ready(function(){
        $(".login_toggle-password").click(function() {
            $(this).toggleClass("fa-eye fa-eye-slash");
            var x = document.getElementById('login_password-field');
            if ($(x).attr("type") == "password")
                $(x).attr("type","text");
            else
                $(x).attr( "type","password");
        });
    });
}

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



function login_form_validate(){
    var x1 = 0;
    var x2 = 0
    $("#login_email").blur(function(){
        var x = document.getElementById("login_email").value;
        var ideal_email = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if(x.match(ideal_email)){
            $(".login_email_error_message").empty();
            x1 = 1;
            x2 = 0;
        }
        else if(x.length >= 6){
            $(".login_email_error_message").empty();
            x2 = 1;
            x1 = 0;
        }
        else if(x.length==0){
            $(".login_email_error_message").empty();
        }
        else{
            $(".login_email_error_message").empty();
            $(".login_email_error_message").append("Please Enter valid Email Address or Username");
            $(this).attr("title","Please Enter valid Email Address or Username");
        }
    });

    $(".login_btn").click(function(){
        if((document.getElementById("login_email").value == "") || 
            (document.getElementById("login_password-field").value == "")){
            $(".login_form_status").empty();
            $(".login_form_status").append("Please fill correct fields");
        }
        else{
            console.log("sending login details");
            $(".login_form_status").empty();
            if(x1 == 1){
                send_login_details(login_details("email"));
            }
            else if(x2 == 1){
                send_login_details(login_details("username"));
            }
        }
    });

}


function login_details(type){
   var login_data = {
        type : type,
        user_login : document.getElementById("login_email").value,
        user_password : document.getElementById("login_password-field").value,
        csrfmiddlewaretoken : csrftoken,
    }
    console.log(login_data);
    return login_data;
}

function send_login_details(request_data){
    $.ajax({
        url :  'http://127.0.0.1:8000/verify_login_details/',
        type : "POST",
        data : request_data,
        success : function(response_data){
            if(response_data["status"] == 0){
                console.log("You entered correct details");
                window.location.assign("http://127.0.0.1:8000/")
            }
            else if(response_data["status"] == 1){
                console.log("Please enter correct username and password");
                $(".login_email_error_message").empty();
                $(".login_email_error_message").append("Please enter correct username and password");
            }
            else if(response_data["status"] == 2){
                console.log("Please enter correct email and password");
                $(".login_email_error_message").empty();
                $(".login_email_error_message").append("Please enter correct username and password");
            }
        },
        error : function(xhr,errmsg,err){
            console.log(xhr.status);
        }
    });
}