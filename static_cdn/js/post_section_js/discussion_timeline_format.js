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

function comment_box_show(id,answer_id,quest_id){
    quest_answer_id = $(id).attr("id");
    console.log(quest_answer_id);
    console.log(answer_id);
    $(id).find(".reply_secondary_input").css({"display":"block"});
}



function new_comment_on_answer(id,answer_id,quest_id){
    var new_comment_on_answer_dom_id =$(id).find(".reply_secondary_input").attr("id");
    var new_comment_on_answer_add_dom =document.getElementById(new_comment_on_answer_dom_id);
    var new_comment_on_answer_write_dom = $(new_comment_on_answer_add_dom).find(".reply_comment_input");

    new_comment_on_answer_add_dom.addEventListener("keyup",function(event){
        event.preventDefault();
        if (event.keyCode === 13) {
            var content= $(new_comment_on_answer_write_dom).val();
            $(new_comment_on_answer_write_dom).val("");
            if(content.length >0){
                $.ajax({
                    url:'http://127.0.0.1:8000/post/create_user_answer_comment/',
                    type :'POST',
                    data:{
                        csrfmiddlewaretoken : csrftoken,
                        "ans_id":answer_id,
                        "content":content,
                    },
                    success: function(json){
                        console.log(json);
                        new_comment_on_answer_append(json);
                    },
                    error: function(xhr,errmsg,err){
                        console.log(xhr.status + ": " + xhr.responseText);
                    },
                });
            }
        }
    },false);

    function new_comment_on_answer_append(post){
        document.getElementById("quest_"+quest_id+"_answer_"+answer_id+"_no_comment").innerHTML=post.no_of_comments;
        $(id).find(".reply_secondary_input").css({"display":"none"});
        var new_comment_on_answer_parent_dom = $(id).find(".comment_section");
        var new_comment_on_answer_sibling_dom = $(id).find(".comment_section").find(".primary_comment")[0];
        new_comment_on_answer_dom=[
            '<div class="primary_comment" id="'+quest_answer_id+'_comment_'+post.comment_id+'">',
                '<span class="parent_comment">',
                    '<a href="http://127.0.0.1:8000/user-'+post.user_name+'"><b class="username">'+post.name+'</b></a>&nbsp;'+post.content+'</span>',
                '</span>',
            '</div>',
        ].join("\n");

        if(new_comment_on_answer_sibling_dom){
            $(new_comment_on_answer_dom).insertBefore(new_comment_on_answer_sibling_dom);
        }
        else{
            new_comment_on_answer_parent_dom .append($(new_comment_on_answer_dom));
        }
    }

}



function write_new_answer(id,quest_id){
    var new_answer_add_dom_id=$(id).attr("id");
    console.log(quest_id);
    var new_answer_add_dom =document.getElementById(new_answer_add_dom_id);
    var new_answer_write_dom=$(new_answer_add_dom).find(".write_comment");
    var question_dom =$("#question_"+quest_id).find(".post-section");
    function new_answer_append_dom(post){
        var question_post_section_dom =$("#question_"+quest_id).find(".post-section").find(".answer_write");
        var new_answer_dom=[
            '<div class="col s12 answer-section" id="quest_'+quest_id+'_answer_'+post.answer_id+'">',
                    '<div class="answer-user-details-section">',
                        '<div class="answer-user-image-section">',
                            '<img class="responsive-img answer-user-image"  src="'+post.user_profile_link+'" alt="'+post.user_profile_name+'">',
                        '</div>',
                        '<div class="answer-user-intro-section">',
                            '<p class="answer-user-name">'+post.user_profile_name+'</p>',
                            '<p class="answer-user-details"><i class="fa fa-dot-circle-o" aria-hidden="true">'+post.user_profile_intro+'</i></p>',
                        '</div>',
                    '</div>',
                    '<p class="answer-text">'+post.content+'</p>',
                    '<div class="col s12 iconslist" style="padding: 3px;">',
                        '<div class="col s4" style="text-align: center;" onclick="comment_box_show(quest_'+quest_id+'_answer_'+post.answer_id+','+post.answer_id+','+quest_id+')">',
                            '<span class="icons">',
                                '<i class="fa fa-comment" aria-hidden="true"></i> Comment &nbsp;<span id="quest_'+quest_id+'_answer_'+post.answer_id+'_no_comment" class="icon_numbers">0</span>',
                            '</span>',
                        '</div>',
                        '<div class="col s4 agree review false" id="quest_'+quest_id+'_answer_'+post.answer_id+'_agree_false" style="text-align:center" onclick="update_review_answer(quest_'+quest_id+'_answer_'+post.answer_id+'_agree_false,'+post.answer_id+','+quest_id+')">',
                            '<span class="icons">',
                                '<i class="fa fa-thumbs-up" aria-hidden="true"></i> Agree &nbsp;<span id="quest_'+quest_id+'_answer_'+post.answer_id+'_no_agree" class="icon_numbers">0</span>',
                            '</span>',
                        '</div>',
                        '<div class="col s4 disagree review false" id="quest_'+quest_id+'_answer_'+post.answer_id+'_disagree_false" style="text-align: center;" onclick="update_review_answer(quest_'+quest_id+'_answer_'+post.answer_id+'_disagree_false,'+post.answer_id+','+quest_id+')">',
                            '<span class="icons">',
                                '<i class="fa fa-thumbs-down" aria-hidden="true"></i> Disagree &nbsp;<span id="quest_'+quest_id+'_answer_'+post.answer_id+'_no_disagree"  class="icon_numbers">0</span>',
                            '</span>',
                        '</div>',
                    '</div>',
                    '<div class="col s12 comment_section" style="margin-left:10px;" >',
                    '<div class="col s12 reply_secondary_input" id="write_comment_parent_'+post.answer_id+'" style="margin-left:10px;">',
                            '<input type="text" onfocus="new_comment_on_answer(quest_'+quest_id+'_answer_'+post.answer_id+','+post.answer_id+','+quest_id+')"class="reply_comment_input" style="width: 95%; border-radius: 14px; height: 28px; padding-left: 14px; border: 1px solid rgba(100,100,100,0.5);" placeholder="Please write your comment here" name="">',
                        '</div>',
                    '</div>',
                '</div>',

        ].join("\n");
        $(new_answer_dom).insertBefore(question_post_section_dom)
    }

    new_answer_add_dom.addEventListener("keyup",function(event){
        event.preventDefault();
        if(event.keyCode ===13){
            var content =$(new_answer_write_dom).val();
            $(new_answer_write_dom).val("");

            if(content.length>0){
                    $.ajax({
                        url:'http://127.0.0.1:8000/post/user_answer_create/',
                        type :'POST',
                        data:{
                            csrfmiddlewaretoken : csrftoken,
                            "quest_id":quest_id,
                            "content":content,
                            "visibility":true,
                        },
                        success: function(json){
                            console.log(json);
                            new_answer_append_dom(json);

                        },
                        error: function(xhr,errmsg,err){
                            console.log(xhr.status + ": " + xhr.responseText);

                        },
                    },false); 
                }
               
            }
            
    });
}



function update_review_answer(id,answer_id,quest_id){

    var click_class =$(id).attr("class").split(" ")[2];
    var click_id=$(id).attr("id");

    var agree_review;
    var disagree_review;

    if($("#"+click_id).hasClass("true")){

        if(click_class =="agree") agree_review =false;
        else if(click_class == "disagree") disagree_review=false;

        $("#"+click_id).removeClass("true");

        if($("#"+click_id).siblings(".review").hasClass("false"))
            $("#"+click_id).siblings(".review").removeClass("false")
        
        $.ajax({
            url:'http://127.0.0.1:8000/post/get_user_answer_review/',
            type :'POST',
            data:{
                csrfmiddlewaretoken : csrftoken,
                "ans_id" :answer_id,
                "agree"  :agree_review,
                "disagree":disagree_review
            },
            success: function(json){
                console.log(json);
                review_update(json);
            },
            error: function(xhr,errmsg,err){
                console.log(xhr.status + ": " + xhr.responseText);

            },
        },false); 
    }
    
    else{
        $("#"+click_id).addClass("true");
        if($("#"+click_id).siblings(".review").hasClass("true")){
            $("#"+click_id).siblings(".review").removeClass("true");
        }
        if(click_class =="agree"){
            agree_review =true;
        }
        if(click_class == "disagree"){
            disagree_review=true;
        }
        $.ajax({
            url:'http://127.0.0.1:8000/post/get_user_answer_review/',
            type :'POST',
            data:{
                csrfmiddlewaretoken : csrftoken,
                "ans_id" :answer_id,
                "agree"  :agree_review,
                "disagree":disagree_review
            },
            success: function(json){
                console.log(json);
                review_update(json);
            },
            error: function(xhr,errmsg,err){
                console.log(xhr.status + ": " + xhr.responseText);

            },
        },false); 
    }
    function review_update(post){
        document.getElementById("quest_"+quest_id+"_answer_"+answer_id+"_no_agree").innerHTML=post.agree_count;
        document.getElementById("quest_"+quest_id+"_answer_"+answer_id+"_no_disagree").innerHTML=post.disagree_count;
    }
}

//***************************************************************************************
// Above are pre defined functions
//***************************************************************************************

// user discussion format for timeline

function user_discussion(post){
    var user_discussion_format=[
        '<div class="card-panel row" id="question_'+post.quest_id+'" class="experience-post-group" style="padding:0px;">',
            '<div class="col s12">',
                '<div class="post-tags">',
                    '<div class="chip no_chip">Related Tags : </div>',
    ].join("\n");
    var no_of_discussion_tags=Object.keys(post.quest_tags).length;
    for(var i = 0; i < no_of_discussion_tags; i++){
        user_discussion_format += [
                    '<a href="http://127.0.0.1:8000/title-' + post.quest_tags[i] +'" class="chip">'+ post.quest_tags[i] +'</a>',
        ].join("\n");
    }

    user_discussion_format+=[
                '</div>',
                '<div class="post-user-details-section">',
                    '<div class="post-user-image-section">',
                        '<a href="http://127.0.0.1:8000/user-' + post.quest_user_username+'"><img class="responsive-img post-user-image" src="'+ post.quest_user_image +'"></a>',
                    '</div>',
                    '<div class="post-user-intro-section">',
                        '<a href="http://127.0.0.1:8000/user-' + post.quest_user_username+'"><p class="post-user-name">'+ post.quest_user_name +'</p></a>',
                        '<p class="post-user-details"><i class="fa fa-dot-circle-o" aria-hidden="true"></i> '+ post.quest_user_intro +'</p>',
                    '</div>',
                '</div>',
            '</div>',
            '<div class="row col s12 post-section">',
                '<p class="question-text">'+post.quest_content+'</p>',
    ].join("\n");

    var no_of_answers =Object.keys(post.user_answers).length;

    for(var i=0;i<no_of_answers;i++){

        var no_of_comments_on_answer =Object.keys(post.user_answers[i].answer_comments).length;

        user_discussion_format+=[
                '<div class="col s12 answer-section" id="quest_'+post.quest_id+'_answer_'+post.user_answers[i].answer_id+'">',

                    '<div class="answer-user-details-section">',
                        '<div class="answer-user-image-section">',
                            '<img class="responsive-img answer-user-image"  src="'+post.user_answers[i].user_profile_image+'" alt="'+post.user_answers[i].user_profile_name+'">',
                        '</div>',
                        '<div class="answer-user-intro-section">',
                            '<p class="answer-user-name">'+post.user_answers[i].user_profile_name+'</p>',
                            '<p class="answer-user-details"><i class="fa fa-dot-circle-o" aria-hidden="true"></i>'+post.user_answers[i].user_profile_intro+'</p>',
                        '</div>',
                    '</div>',

                    '<p class="answer-text">'+post.user_answers[i].ans_preview_content+'<a href="'+post.user_answers[i].ans_preview_link+'">  see more....</a></p>',

                    '<div class="col s12 iconslist" style="padding: 3px;">',

                        '<div class="col s4" style="text-align: center;" onclick="comment_box_show(quest_'+post.quest_id+'_answer_'+post.user_answers[i].answer_id+','+post.user_answers[i].answer_id+')">',
                            '<span class="icons">',
                                '<i class="fa fa-comment" aria-hidden="true"></i> Comment &nbsp;<span class="icon_numbers" id="quest_'+post.quest_id+'_answer_'+post.user_answers[i].answer_id+'_no_comment">'+no_of_comments_on_answer+'</span>',
                            '</span>',
                        '</div>',

                        '<div class="col s4 agree review '+post.user_answers[i].current_agree_review+'" id="quest_'+post.quest_id+'_answer_'+post.user_answers[i].answer_id+'_agree_'+post.user_answers[i].current_agree_review+'" style="text-align:center" onclick="update_review_answer(quest_'+post.quest_id+'_answer_'+post.user_answers[i].answer_id+'_agree_'+post.user_answers[i].current_agree_review+','+post.user_answers[i].answer_id+','+post.quest_id+')">',
                            '<span class="icons">',
                                '<i class="fa fa-thumbs-up" aria-hidden="true"></i> Agree &nbsp;<span id="quest_'+post.quest_id+'_answer_'+post.user_answers[i].answer_id+'_no_agree" class="icon_numbers">'+post.user_answers[i].agree_review_count+'</span>',
                            '</span>',
                        '</div>',

                        '<div class="col s4 disagree review '+post.user_answers[i].current_disagree_review+' " id="quest_'+post.quest_id+'_answer_'+post.user_answers[i].answer_id+'_disagree_'+post.user_answers[i].current_disagree_review+'" style="text-align: center;" onclick="update_review_answer(quest_'+post.quest_id+'_answer_'+post.user_answers[i].answer_id+'_disagree_'+post.user_answers[i].current_disagree_review+','+post.user_answers[i].answer_id+','+post.quest_id+')">',
                            '<span class="icons">',
                                '<i class="fa fa-thumbs-down" aria-hidden="true"></i> Disagree &nbsp;<span id="quest_'+post.quest_id+'_answer_'+post.user_answers[i].answer_id+'_no_disagree" class="icon_numbers">'+post.user_answers[i].disagree_review_count+'</span>',
                            '</span>',
                        '</div>',

                    '</div>',

        ].join("\n");
        var no_of_comments_on_answer =Object.keys(post.user_answers[i].answer_comments).length;
            user_discussion_format+=[
                    '<div class="col s12 comment_section" style="margin-left:10px;" >',
            ].join("\n");

            for(comment in post.user_answers[i].answer_comments){
                user_discussion_format+=[
                        '<div class="primary_comment" id="quest_'+post.quest_id+'answer_'+post.user_answers[i].answer_id+'_comment_'+post.user_answers[i].answer_comments[comment].comment_id+'">',
                            '<span class="parent_comment">',
                                '<b class="username">'+post.user_answers[i].answer_comments[comment].name+'</b> &nbsp;'+post.user_answers[i].answer_comments[comment].content+'</span>',
                            '</span>',
                        '</div>',
                ].join("\n");
            }

        user_discussion_format+=[
                        '<div class="col s12 reply_secondary_input" id="write_comment_parent_'+post.user_answers[i].answer_id+'" style="margin-left:10px;">',
                            '<input type="text" class="reply_comment_input" onfocus="new_comment_on_answer(quest_'+post.quest_id+'_answer_'+post.user_answers[i].answer_id+','+post.user_answers[i].answer_id+','+post.quest_id+')" style="width: 95%; border-radius: 14px; height: 28px; padding-left: 14px; border: 1px solid rgba(100,100,100,0.5);" placeholder="Please write your comment here" name="">',
                        '</div>',
                    '</div>',
                '</div>',
            ].join("\n");
    }

    user_discussion_format+=[
                '<div class="col s12 answer_write">',
                    '<div class="user_write_comment" id="user_write_comment_quest_'+post.quest_id+'" >',
                        '<input type="" class="write_comment" onfocus="write_new_answer(user_write_comment_quest_'+post.quest_id+','+post.quest_id+')" placeholder="Write your answer on this post..." name="">',
                    '</div>',
                '</div>',
            '</div>',
        '</div>',
    ].join("\n");   

    $("#user_timeline").append(user_discussion_format);

}


// this is for getting discussion data from backend

function get_discussion_data(){
    $.ajax({
        url :  'http://127.0.0.1:8000/post/retrieve_user_discussion/',
        type : 'GET',
        data : {
            csrfmiddlewaretoken : csrftoken
        },
        success : function(json) {
            user_discussion(json);
        },
        error : function(xhr,errmsg,err) {
            console.log(xhr.status + ": " + xhr.responseText);
        }
    });
}


// all the required functions are defined above




