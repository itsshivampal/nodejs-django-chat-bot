function user_experience(post){

    var experience_format = [
        '<div class="row" id="card_panel" class="experience-post-group" id="user_'+post.user_profile_id+'exp_'+post.experience_id+'">',
            '<div class="col s12">',

                '<div class="post-user-details-section col s9">',
                    '<div class="post-user-image-section">',
                        '<a href="http://127.0.0.1:8000/user-' + post.user_profile_id +'"><img class="responsive-img post-user-image" src="'+ post.user_profile_image +'"></a>',
                    '</div>',
                    '<div class="post-user-intro-section">',
                        '<a href="http://127.0.0.1:8000/user-' + post.user_profile_id +'">',
                            '<span class="post-user-name">'+ post.user_profile_name + '</span><br>',
                            '<span class="post-user-details">'+ post.user_profile_intro +'</span>',
                        '</a>',
                    '</div>',
                '</div>',

                '<div class="col s3">',
                    '<a href="" class="follow_button">Follow</a>',
                '</div>',

            '</div>',
    ].join("\n");

    experience_format += [
            '<div class="row col s12 post-section">',
                '<p class="experience-intro">'+ post.exp_title +'</p>',
                '<div class="experience-text">',
                    '<div>'+ post.exp_content +'</div>',
                '</div>',
            '</div>',
    ].join("\n");

    experience_format += [
            '<div class="col s12">',
               '<div class="post-tags">',
                    '<div class="chip no_chip">Related Tags : </div>',
    ].join("\n");
    var no_of_tags = Object.keys(post.exp_tags).length;
    for(var i = 0; i < no_of_tags; i++){
        experience_format += [
                        '<a href="http://127.0.0.1:8000/title-' + post.exp_tags[i] +'" class="chip">'+ post.exp_tags[i] +'</a>',
        ]
    }
    experience_format += [
                '</div>',
            // '</div>',   
    ].join("\n");


    experience_format += [
        // This section is for updating reviews
                    '<div class="col s12 iconslist" style="padding: 3px;">',
                        '<div class="col s4" style="text-align: center;">',
                            '<span class="icons review_'+post.current_exp_review+'" id="current_review_'+post.experience_id+'"  onclick = send_update_current_experience_review(current_review_'+post.experience_id+','+post.experience_id+')>',
                                '<i class="fa fa-thumbs-up" aria-hidden="true" style="font-size: 17px;"></i> Helpful &nbsp;<span class="icon_numbers" id="userful_'+post.experience_id+'">'+post.exp_review_count+'</span>',
                            '</span>',
                        '</div>',

                        '<div class="col s4" style="text-align: center;">',
                            '<span class="icons">',
                                '<i class="fa fa-comment" aria-hidden="true" style="font-size: 17px;"></i> Comment &nbsp;<span id="exp_'+post.experience_id+'_no_comment" class="icon_numbers">'+post.no_of_comments+'</span>',
                            '</span>',
                        '</div>',
                        '<div class="col s4" style="text-align: right;">',
                            '<span class="icons">',
                                '<i class="fa fa-share" aria-hidden="true" style="font-size: 20px; margin-right: 50px;"></i>',
                                '<i class="fa fa-bookmark-o" aria-hidden="true" style="font-size: 20px;"></i></span>',
                            '</span>',
                        '</div>',
                    '</div>',
                '</div>',

    ].join("\n");

    var no_parent_comment =Object.keys(post.experience_comments).length;
    if(no_parent_comment>0){
        experience_format+=[
                    '<div class="col s12 comment_section" id="comment_section_'+post.experience_id+'">',
        ].join("\n");
        
        for (y in post.experience_comments){
            experience_format+=[
                        '<div class="new_comment" id="parent_'+post.experience_comments[y].parent_comment.comment_id+'">',
                            '<div class="primary_comment" onmouseenter=on_hover_id_calculation(primary_reply_'+post.experience_comments[y].parent_comment.comment_id+') onmouseleave=off_hover_id_calculation(primary_reply_'+post.experience_comments[y].parent_comment.comment_id+')>',
                                '<span class="parent_comment" id="primary_'+ post.experience_comments[y].parent_comment.comment_id +' "><b class="username"><a href="http://127.0.0.1:8000/user-'+post.experience_comments[y].parent_comment.user_name+'" style="color: #37474f;">'+post.experience_comments[y].parent_comment.name+' </a>&nbsp;</b>'+post.experience_comments[y].parent_comment.content+'</span>',
                                '<span class="reply" onclick="icon_show(primary_reply_'+post.experience_comments[y].parent_comment.comment_id+')" id="primary_reply_'+post.experience_comments[y].parent_comment.comment_id+'"><i class="material-icons reply_icon">reply</i></span>',
                            '</div>', 
            ].join("\n");

            experience_format +=[
                            '<div class="reply_comment" id="reply_comment_'+post.experience_comments[y].parent_comment.comment_id+' ">',
            ].join("\n");
            
            for(x in post.experience_comments[y].children_comment){
                experience_format+=[
                                '<div class="secondary_comment" onmouseenter="on_hover_id_calculation(parent_'+post.experience_comments[y].parent_comment.comment_id+'secondary_reply_'+post.experience_comments[y].children_comment[x].comment_id+')" onmouseleave="off_hover_id_calculation(parent_'+post.experience_comments[y].parent_comment.comment_id+'secondary_reply_'+post.experience_comments[y].children_comment[x].comment_id+')">',
                                    '<span class="child_comment" id="parent_'+post.experience_comments[y].parent_comment.comment_id+'secondary_'+ post.experience_comments[y].children_comment[x].comment_id +'"><b class="username"><a href="http://127.0.0.1:8000/user-'+post.experience_comments[y].children_comment[x].user_name+'" style="color: #37474f;">'+post.experience_comments[y].children_comment[x].name+' </a>&nbsp;</b>'+post.experience_comments[y].children_comment[x].content+'</span>',
                                    '<span class="reply" onclick="icon_show(parent_'+post.experience_comments[y].parent_comment.comment_id+'secondary_reply_'+post.experience_comments[y].children_comment[x].comment_id+')" id="parent_'+post.experience_comments[y].parent_comment.comment_id+'secondary_reply_'+post.experience_comments[y].children_comment[x].comment_id+'"><i class="material-icons reply_icon">reply</i></span>',
                                '</div>',
                ].join("\n");
            }
            
            experience_format+=[
                                '<div class="reply_secondary_input" id="write_comment_parent_'+post.experience_comments[y].parent_comment.comment_id+'">',
                                    '<input type="text" id="exp_'+post.experience_id+'_secondary_input_'+post.experience_comments[y].parent_comment.comment_id+'" onfocus="input_focus('+post.experience_id+','+post.experience_comments[y].parent_comment.comment_id+')" class="reply_comment_input" style="width: 95%; border-radius: 3px; height: 30px; padding-left: 14px; border: 1px solid rgba(100,100,100,0.5);" placeholder="Please write your comment here" name="">',

                                '</div>',
                            '</div>',
                        '</div>'
            ].join("\n");
        }

        experience_format+=[
                    '</div>'
        ].join("\n");
    }
    experience_format +=[
                    '<div class="col s12">',
                        '<div class="user_write_comment" id="user_write_comment_'+post.experience_id+'">',
                            '<input type="text" class="write_comment" onfocus="write_new_comment('+post.experience_id+')" style="border: 1px solid rgba(100,100,100,0.4); width: 100%; padding-bottom: 5px; padding-top: 5px; padding-left: 10px; border-bottom: 1px solid rgba(100,100,100,0.4);" placeholder="Write your comments on this post..." name="">',
                        '</div>',
                    '</div>',
                '</div>',

    ].join("\n");


    $("#experience_main_content").append(experience_format);
}



function on_hover_id_calculation(id){
    $(id).css({"visibility":"visible"});
}

function off_hover_id_calculation(id){
    $(id).css({"visibility":"hidden"});
}

function new_work(id){
    $(id).css({"display" :"block"})
}



function send_update_current_experience_review(id,exp_id){
    var review_btn_id =$(id).attr("id");
    if($("#"+review_btn_id).hasClass("review_true")){
        $("#"+review_btn_id).removeClass("review_true");
        $("#"+review_btn_id).addClass("review_false");
        console.log(exp_id);
        $.ajax({
            url :  'http://127.0.0.1:8000/post/delete_user_experience_review/',
            type : "POST",
            data : {
                exp_id: exp_id,
                csrfmiddlewaretoken : csrftoken,
            },
            success : function(json) {
                console.log(json);
                document.getElementById("userful_"+exp_id).innerHTML =json.exp_review_count;
            },
            error : function(xhr,errmsg,err) {
                console.log(xhr.status + ": " + xhr.responseText);
            }
        });
    }
    else{
        if($("#"+review_btn_id).hasClass("review_false")){
            $("#"+review_btn_id).removeClass("review_false");
        }
        $("#"+review_btn_id).addClass("review_true");
        console.log($(id).attr("id"));
        $.ajax({
            url :  'http://127.0.0.1:8000/post/create_user_experience_review/',
            type : "POST",
            data : {
                exp_id: exp_id,
                csrfmiddlewaretoken : csrftoken,
            },
            success : function(json) {
                console.log(json);
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
    console.log(exp_id);
    console.log(primary_comment_id);
    var comment_on_comment_write_dom_id=$("#exp_"+exp_id+"_secondary_input_"+primary_comment_id).attr("id");
    var comment_on_comment_write_dom =document.getElementById(comment_on_comment_write_dom_id);
    console.log($(comment_on_comment_write_dom).parent())
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
                        console.log(json);
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
    console.log(exp_id)
    new_write_comment_id =$("#user_write_comment_"+exp_id).attr("id");
    var new_write_comment_dom =document.getElementById(new_write_comment_id);
    console.log(new_write_comment_dom);

    function new_comment_append(post){
        document.getElementById("exp_"+exp_id+"_no_comment").innerHTML =post.no_of_comments;
        $(new_write_comment_dom).find(".write_comment").val("");
        new_comment_parent_dom =$("#comment_section_"+exp_id);
        console.log(new_comment_parent_dom);
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

        new_dom =$(new_comment_parent_dom).find(".new_comment")[0];
        console.log(new_dom);
        $(new_comment_dom).insertBefore(new_dom);
    }

    new_write_comment_dom.addEventListener("keyup",function(event){
        event.preventDefault();
        if (event.keyCode === 13) {
            var content =$(new_write_comment_dom).find(".write_comment").val();
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
                        console.log(json);
                        new_comment_append(json);
                    },
                    error : function(xhr,errmsg,err) {
                        console.log(xhr.status + ": " + xhr.responseText);
                    }
                });
            }
        }
    });
}




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




function get_experience_page_data(){
    $.ajax({
        url :  'http://127.0.0.1:8000/post/experience_page_exp_data/',
        type : "GET",
        data : {
            csrfmiddlewaretoken : csrftoken,
        },
        success : function(json) {
            user_experience(json);
        },
        error : function(xhr,errmsg,err) {
        console.log(xhr.status + ": " + xhr.responseText);
        }
    });
}
