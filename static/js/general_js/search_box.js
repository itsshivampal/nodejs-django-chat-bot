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

function send_request(text){
    $.ajax({
        url :  'http://127.0.0.1:8000/post/search_request/',
        type : "POST",
        data : {
            csrfmiddlewaretoken : csrftoken,
            search_text : text,
        },
        success : function(json) {
            console.log(json);
            suggest_data(json);
        },
        error : function(xhr,errmsg,err) {
            console.log(xhr.status + ": " + xhr.responseText);
        }
    });
}

function set(el,text){
    while(el.firstChild)el.removeChild(el.firstChild);
    el.appendChild(document.createTextNode(text))
}

function suggest_questions(){
    var input = document.getElementsByClassName('searching')[0];
    var oldText = input.value;
    var timeout = null;


    function handleChange(){
        var newText = input.value;
        if (newText == oldText) return;
        else oldText=newText;
        if (newText!=""){
            send_request(newText);
        }
    }

    function eventHandler(){
        if(timeout) clearTimeout(timeout);
        timeout=setTimeout(handleChange, 50);
    }

    input.onkeydown=input.onkeyup=input.onclick=eventHandler;
}

function suggest_data(data){
    $('input.autocomplete').autocomplete({
        data : data,
    });
}
