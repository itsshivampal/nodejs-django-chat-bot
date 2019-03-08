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





$(document).ready(function(){
    $("#name_edit").click(function(){
        $("span#user_name").css({"display":"none"});
        $("#user_name_edit_first").css({"display":"block"});
        $("#user_name_edit_last").css({"display":"block"});
    });
    $("#mobile_edit").click(function(){
        $("span#user_mobile").css({"display":"none"});
        $("#user_mobile_edit").css({"display":"block"});
    });
    $("#gender_edit").click(function(){
        $("span#user_gender").css({"display":"none"});
        $("#user_gender_edit").css({"display":"block"});
    });
    $("#dob_edit").click(function(){
        $("span#user_dob").css({"display":"none"});
        $("#user_dob_edit").css({"display":"block"});
    });
    
})




function get_settings_page_data(text){
    $.ajax({
        url :  'http://127.0.0.1:8000/profile/send_user_settings_data/',
        type : "POST",
        data : {
            csrfmiddlewaretoken : csrftoken,
        },
        success : function(json) {
            console.log(json);
            place_edit_profile_content(json);
        },
        error : function(xhr,errmsg,err) {
            console.log(xhr.status + ": " + xhr.responseText);
        }
    });
}

function place_edit_profile_content(data){
    $("#user_username").append(data["user_username"]);
    $("#user_email").append(data["user_email"]);
    $("span#user_name").text(data["user_first_name"] + " " + data["user_last_name"]);
    $("span#user_mobile").text(data["user_mobile"]);
    $("span#user_gender").text(data["user_gender"]);
    $("span#user_dob").text(data["user_dob"]);
    $("#user_bio_data").append(data["user_bio"]);

    $("#user_name_edit_first").val(data["user_first_name"]);
    $("#user_name_edit_last").val(data["user_last_name"]);
    $("#user_mobile_edit").val(data["user_mobile"]);
    $("#user_gender_edit").val(data["user_gender"]);
    $("#user_dob_edit").val(data["user_dob"]);

    $('#email_subscription').attr('checked',data["email_subs"]);
    $('#sms_subscription').attr('checked',data["sms_subs"]);
}




function send_change_password_data(request_data){
    $.ajax({
        url :  'http://127.0.0.1:8000/profile/request_change_password/',
        type : "POST",
        data : request_data,
        success : function(json) {
            if(json["status"]){
                swal({
                    title: "Password Changed",
                    icon: "success",
                    button: "Ok",
                });
                window.location.reload();
            }
            else{
                swal({
                    title: "Password doesn't chnaged",
                    text: "Please correctly fill Old Password",
                    icon: "error",
                    button: "Ok",
                });
            }
        },
        error : function(xhr,errmsg,err) {
            console.log(xhr.status + ": " + xhr.responseText);
        }
    });
}

// function for changing password

$("#change_password_data").on('click', function(event){
    event.preventDefault();
    var old_password = document.getElementById('old_password').value;
    var new_password = document.getElementById('new_password').value;
    var confirm_new_password = document.getElementById('confirm_new_password').value;
    var x1 = 0;
    var x2 = 0;
    var x3 = 0;

    if(old_password.length == 0) x1 = 0;
    else x1 = 1;

    if(new_password.length == 0) x2 = 0;
    else x2 = 1;

    if(new_password != confirm_new_password) x3 = 0;
    else x3 = 1;

    if(x1==1 && x2==1 && x3==1){
        var data = {
            csrfmiddlewaretoken : csrftoken,
            old_password : old_password,
            new_password : new_password,
        }
        send_change_password_data(data);
    }
    else{
        swal({
            text: "Please correctly fill password fields",
            icon: "error",
            button: "Ok",
        });
    }
    
});



// User subscription data

$("#send_subscription_data").on('click', function(){
    var email_subs = $("#email_subscription").prop('checked');
    var sms_subs = $("#sms_subscription").prop('checked');
    
    data = {
        email_subscription: email_subs,
        sms_subscription: sms_subs,
        csrfmiddlewaretoken : csrftoken,
    }

    $.ajax({
        url :  'http://127.0.0.1:8000/profile/save_user_subscription_data/',
        type : "POST",
        data : data,
        success : function(json) {
            if(json["status"]){
                swal({
                    title: "Your Subscription Changed",
                    icon: "success",
                    button: "Ok",
                });
            }
            // window.location.reload();
        },
        error : function(xhr,errmsg,err) {
            console.log(xhr.status + ": " + xhr.responseText);
        }
    });

});





$("#update_user_data").on('click', function(){
    var x = 0;
    var user_first_name = document.getElementById("user_name_edit_first").value;
    var user_last_name = document.getElementById("user_name_edit_last").value;
    if (user_first_name.length==0 && user_last_name.length==0){
        swal({
            text: "Please fill your name",
            icon: "error",
            button: "Ok",
        });
        x = 0;
    }
    else{
        x = 1;
    }
    if(x == 1){
        var data = {
            csrfmiddlewaretoken : csrftoken,
            user_first_name : document.getElementById("user_name_edit_first").value,
            user_last_name : document.getElementById("user_name_edit_last").value,
            user_mobile : document.getElementById('user_mobile_edit').value,
            user_gender : document.getElementById("user_gender_edit").value,
            user_date_of_birth : document.getElementById("user_dob_edit").value,
            user_bio : document.getElementById("user_bio_data").value,
        }
        console.log(data);
        send_edit_profile_data(data);
    }
})

function send_edit_profile_data(data){
    console.log("its working");
    $.ajax({
        url :  'http://127.0.0.1:8000/profile/save_user_edit_profile/',
        type : "POST",
        data : data,
        success : function(json) {
            window.location.reload();
        },
        error : function(xhr,errmsg,err) {
            console.log(xhr.status + ": " + xhr.responseText);
        }
    });
}