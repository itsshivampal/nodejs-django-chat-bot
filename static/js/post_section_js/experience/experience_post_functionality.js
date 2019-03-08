function on_hover_id_calculation(id){
    $(id).css({"visibility":"visible"});
}

function off_hover_id_calculation(id){
    $(id).css({"visibility":"hidden"});
}

function new_work(id){
    $(id).css({"display" :"block"})
}


function send_exp_bookmark_data(id, exp_id){
    var bookmark_btn_id = $(id).attr("id");

    if($("#"+bookmark_btn_id).hasClass("bookmark_exp_true")){

        $("#"+bookmark_btn_id).addClass("fa-bookmark-o");
        $("#"+bookmark_btn_id).removeClass("fa-bookmark");

        $("#"+bookmark_btn_id).removeClass("bookmark_exp_true");
        $("#"+bookmark_btn_id).addClass("bookmark_exp_false");

        $.ajax({
            url :  'http://127.0.0.1:8000/post/delete_user_bookmark_experience/',
            type : "POST",
            data : {
                exp_id: exp_id,
                csrfmiddlewaretoken : csrftoken,
            },
            success : function(json) {
                return true
            },
            error : function(xhr,errmsg,err) {
                console.log(xhr.status + ": " + xhr.responseText);
            }
        });
    }

    else if($("#"+bookmark_btn_id).hasClass("bookmark_exp_false")){

        $("#"+bookmark_btn_id).addClass("fa-bookmark");
        $("#"+bookmark_btn_id).removeClass("fa-bookmark-o");

        $("#"+bookmark_btn_id).removeClass("bookmark_exp_false");
        $("#"+bookmark_btn_id).addClass("bookmark_exp_true");

        $.ajax({
            url :  'http://127.0.0.1:8000/post/create_user_bookmark_experience/',
            type : "POST",
            data : {
                exp_id: exp_id,
                csrfmiddlewaretoken : csrftoken,
            },
            success : function(json) {
                return true
            },
            error : function(xhr,errmsg,err) {
                console.log(xhr.status + ": " + xhr.responseText);
            }
        });
    }
}



function send_update_current_experience_review(id,exp_id){
    var review_btn_id = $(id).attr("id");    

    if($("#"+review_btn_id).hasClass("review_true")){

        $("#"+review_btn_id).removeClass("review_true");
        $("#"+review_btn_id).addClass("review_false");

        $.ajax({
            url :  'http://127.0.0.1:8000/post/delete_user_experience_review/',
            type : "POST",
            data : {
                exp_id: exp_id,
                csrfmiddlewaretoken : csrftoken,
            },
            success : function(json) {
                $('#current_exp_review_'+exp_id).css("color","#00796b");
                document.getElementById("userful_"+exp_id).innerHTML =json.exp_review_count;
            },
            error : function(xhr,errmsg,err) {
                console.log(xhr.status + ": " + xhr.responseText);
            }
        });
    }
    else if($("#"+review_btn_id).hasClass("review_false")){

        $("#"+review_btn_id).removeClass("review_false");
        $("#"+review_btn_id).addClass("review_true");
        
        $.ajax({
            url :  'http://127.0.0.1:8000/post/create_user_experience_review/',
            type : "POST",
            data : {
                exp_id: exp_id,
                csrfmiddlewaretoken : csrftoken,
            },
            success : function(json) {
                $('#current_exp_review_'+exp_id).css("color","blue");
                document.getElementById("userful_"+exp_id).innerHTML =json.exp_review_count;

            },
            error : function(xhr,errmsg,err) {
                console.log(xhr.status + ": " + xhr.responseText);
            }
        });

    }
    
}



function icon_show(reply_id){
    var primary_comment_id = $(reply_id).parents(".new_comment").attr("id");
    $("#"+primary_comment_id).find(".reply_secondary_input").css({"display":"block"});    
}

function input_focus(exp_id,primary_comment_id){
    
    var comment_on_comment_write_dom_id=$("#exp_"+exp_id+"_secondary_input_"+primary_comment_id).attr("id");
    var comment_on_comment_write_dom =document.getElementById(comment_on_comment_write_dom_id);
    comment_on_comment_write_dom.addEventListener("keyup",function(event){
        event.preventDefault();
        if (event.keyCode === 13) {
            content =$(comment_on_comment_write_dom).val();
            $(comment_on_comment_write_dom).val("");
            if(content.length>0){
                $.ajax({
                    url :"http://127.0.0.1:8000/post/create_experience_comment_on_comment/",
                    type :"POST",
                    data :{
                        "comment_id": primary_comment_id,
                        "content": content,
                        csrfmiddlewaretoken: csrftoken,
                    },
                    success:function(json){
                        comment_on_comment_append(json);
                    },
                    error : function(xhr,errmsg,err) {
                        console.log(xhr.status + ": " + xhr.responseText);
                    }
                });
            }
        }
    });


    function comment_on_comment_append(post){
        // document.getElementById("exp_"+exp_id+"_no_comment").innerHTML =post.no_of_comments;
        var new_reply_dom =[
            '<div class ="secondary_comment" onmouseenter ="on_hover_id_calculation(parent_'+primary_comment_id+'secondary_reply_'+post.comment_id+')" onmouseleave ="off_hover_id_calculation(parent_'+primary_comment_id+'secondary_reply_'+post.comment_id+')">',
                '<span class="child_comment" id="parent_'+primary_comment_id+'secondary_'+post.comment_id+'"><b class="username"><a href="http://127.0.0.1:8000/user-'+post.user_name+'"  style="color: #37474f;">'+post.name+'</a>&nbsp;</b>'+post.content+'</span>',
                '<span class="reply" onclick="icon_show(parent_'+primary_comment_id+'secondary_'+post.comment_id+')" id="parent_'+primary_comment_id+'secondary_reply_'+post.comment_id+'"><i class="material-icons reply_icon">reply</i></span>',
            '</div>',
        ].join("\n");
        
        $(new_reply_dom).insertBefore($(comment_on_comment_write_dom).parent());
        $(comment_on_comment_write_dom).parent().css({"display":"none"});
    }    
}



function write_new_comment(exp_id){

    new_write_comment_id =$("#user_write_comment_"+exp_id).attr("id");
    var new_write_comment_dom =document.getElementById(new_write_comment_id);

    function new_comment_append(post){
        document.getElementById("exp_"+exp_id+"_no_comment").innerHTML =post.no_of_comments;
        new_comment_parent_dom =$("#comment_section_"+exp_id);
        new_comment_dom =[
            '<div class="new_comment" id="parent_'+post.comment_id+'">',
                '<div class="primary_comment" onmouseenter=on_hover_id_calculation(primary_reply_'+post.comment_id+')  onmouseleave=off_hover_id_calculation(primary_reply_'+post.comment_id+')>',
                    '<span class="parent_comment" id="primary_'+ post.comment_id +' "><b class="username"><a href="http://127.0.0.1:8000/user-'+post.name+'" style="color: #37474f;">'+post.name+' </a>&nbsp;</b>'+post.content+'</span>',
                    '<span class="reply" onclick="icon_show(primary_reply_'+post.comment_id+')" id="primary_reply_'+post.comment_id+'"><i class="material-icons reply_icon">reply</i></span>',
                '</div>',
                '<div class="reply_comment" id="reply_comment_'+post.comment_id+' ">',
                    '<div class="reply_secondary_input" id="write_comment_parent_'+post.comment_id+'">',
                        '<input type="text" id="exp_'+exp_id+'_secondary_input_'+post.comment_id+'" onfocus="input_focus('+exp_id+','+post.comment_id+')" class="reply_comment_input" style="width: 95%; border-radius: 3px; height: 30px; padding-left: 14px; border: 1px solid rgba(100,100,100,0.5);" placeholder="Please write your comment here" name="">',
                    '</div>',
                '</div>',
            '</div>'

        ].join("\n");

        // $(new_comment_parent_dom).append(new_comment_dom);

        new_dom =$(new_comment_parent_dom).find(".new_comment")[0];
        if(new_dom){
            // $(new_comment_dom).insertBefore(new_comment_parent_dom);
            $(new_comment_parent_dom).append(new_comment_dom);
        }
        else{
            $(new_comment_parent_dom).append(new_comment_dom);
        }
        // console.log(new_dom);

        // $(new_comment_dom).append(new_comment_parent_dom);
    }

    new_write_comment_dom.addEventListener("keyup",function(event){
        event.preventDefault();
        if (event.keyCode === 13) {
            var content =$(new_write_comment_dom).find(".write_comment").val();
            $(new_write_comment_dom).find(".write_comment").val("");
            if(content.length >0){
                $.ajax({
                    url :"http://127.0.0.1:8000/post/create_user_experience_comment/",
                    type :"POST",
                    data :{
                        "exp_id" :exp_id,
                        "content"  :content,
                        csrfmiddlewaretoken : csrftoken,
                    },
                    success:function(json){
                        new_comment_append(json);
                    },
                    error : function(xhr,errmsg,err) {
                        console.log(xhr.status + ": " + xhr.responseText);
                    }
                },false);
            }
        }
    });
}