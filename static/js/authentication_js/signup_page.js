// This function is for initialising home page

function initailise_page(){
    $(document).ready(function(){

        $(".sign_up_toggle-password").click(function(){
            $(this).toggleClass("fa-eye fa-eye-slash");
            var x = document.getElementById('sign_up_password-field');
            if ($(x).attr("type") == "password"){
                $(x).attr("type","text");
            }
            else{
                $(x).attr( "type","password");    
            }
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

// Following functions are used for validating and checking signup details

function signup_form_validate(){

    var x1 = 0;
    var x2 = 0;
    var x3 = 0;
    var x4 = 0;
    var x5 = 0;

    $(".Username").blur(function(username) {
        var x = $("#Username").val().trim();               
        if(x.length < 6){
            if(x.length == 0) {
                $(".Username_format_message").empty();
                $(".Username").attr("title","please enter username");
                }
            else if(0<x.length<6){
                $(".Username_format_message").empty();
                $(".Username_format_message").append("Username must have atleast 6 letter");
            }
        }
        else if(x.length >= 6){
            $(".Username_format_message").empty();
            return x1 = 1;
        }
    }); 
             
    $("#sign_up_email").blur(function(email){
        var x = $("#sign_up_email").val().trim();
        var ideal_email=/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var ideal_mobile=/^\d{10}$/;
        if(x.match(ideal_mobile)){
            $(".email_error_message").empty();
            return x2 = 1;
        }
        else if(x.match(ideal_email)){
            $(".email_error_message").empty();
            return x2 = 1;
        }
        else if(x.length==0)
            $(".email_error_message").empty();
        else{
            $(".email_error_message").empty();
            $(".email_error_message").append("Please enter valid Email Address");
        }
    });
        
    $(".sign_up_password").blur(function() {
        var password = $("#sign_up_password-field").val();
        // var ideal_password = /^(?=.*[a-z]).{6,}$/;
        if(password.length >= 6){
            x3 = 1;
            $(".sign_up_password_strength_message").empty();
            return x3=1;
        }
        else if(password.length == 0)
            $(".sign_up_password_strength_message").empty();
        else{
            $(".sign_up_password_strength_message").empty();
            $(".sign_up_password_strength_message").append("Password must have 6 characters");
        }
           
    });

    $("#First_name").blur(function(firstname) {
        var firstname = document.getElementById("First_name").value;
        var firstname_format = /^[A-Za-z]+$/;
        if(firstname.match(firstname_format)){
            $(".username_format").empty();
            return x4 = 1;
        }
        else if(firstname.length==0)
            $(".username_format").empty();
        else{
            $(".username_format").empty();
            $(".username_format").append("Name should be in alphabets");
        }
    });

    $("#Last_name").blur(function (){
        var x=document.getElementById("Last_name").value;
        var lastname_format=/^[A-Za-z]+$/;
        if(x.match(lastname_format)){
            $(".username_format").empty();
            return x5 = 1;
        }
        else if(x.length==0)
            $(".username_format").empty();
        else{
            $(".username_format").empty();
            $(".username_format").append("Name should be in alphabets");
        }
    });

    $(".sign_up_submit").click(function(){
        if(x1==1 && x2==1 && x3==1 && x4==1 && x5==1){
            send_signup_details();
        }
    });

}

function signup_data(){
    data = {
        first_name : $("#First_name").val().toLowerCase().trim().replace(/\b\w/g, l => l.toUpperCase()),
        last_name : $("#Last_name").val().toLowerCase().trim().replace(/\b\w/g, l => l.toUpperCase()),
        user_password : $("#sign_up_password-field").val(),
        username : $("#Username").val().trim(),
        user_email : $("#sign_up_email").val().trim(),
        csrfmiddlewaretoken : csrftoken,
    };
    return data;
}

function signup_check_status(response_data){
    var status = response_data["status"];
    if(status == 400){
        $(".email_error_message").empty();
        $(".email_error_message").append("Entered Email already exist!!!");
        $(".Username_format_message").empty();
        $(".Username_format_message").append("Entered Username already exist!!!");
    }
    else if(status == 401){
        $(".email_error_message").empty();
        $(".email_error_message").append("Entered Email already exist!!!");
    }
    else if(status == 402){
        $(".Username_format_message").empty();
        $(".Username_format_message").append("Entered Username already exist!!!");
    }
    else if(status == 200){
        window.location.assign("http://127.0.0.1:8000/")
    }
}


function send_signup_details(){
    $.ajax({
        url :  'http://127.0.0.1:8000/verify_signup_details/',
        type : "POST",
        data : signup_data(),
        success : function(response_data) {
            signup_check_status(response_data);
        },
        error : function(xhr,errmsg,err) {
            console.log(xhr.status);
        }
    });
}