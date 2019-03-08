function send_quest_bookmark_data(id, quest_id){
    var bookmark_btn_id = $(id).attr("id");
    if($("#"+bookmark_btn_id).hasClass("bookmark_quest_true")){
        $("#"+bookmark_btn_id).addClass("fa-bookmark-o");
        $("#"+bookmark_btn_id).removeClass("fa-bookmark");
        $("#"+bookmark_btn_id).removeClass("bookmark_quest_true");
        $("#"+bookmark_btn_id).addClass("bookmark_quest_false");
        $.ajax({
            url :  'http://127.0.0.1:8000/post/delete_user_bookmark_problem/',
            type : "POST",
            data : {
                quest_id: quest_id,
                csrfmiddlewaretoken : csrftoken,
            },
            success : function(json) {return true},
            error : function(xhr,errmsg,err) {console.log(xhr.status);}
        });
    }

    else if($("#"+bookmark_btn_id).hasClass("bookmark_quest_false")){
        $("#"+bookmark_btn_id).addClass("fa-bookmark");
        $("#"+bookmark_btn_id).removeClass("fa-bookmark-o");
        $("#"+bookmark_btn_id).removeClass("bookmark_quest_false");
        $("#"+bookmark_btn_id).addClass("bookmark_quest_true");
        $.ajax({
            url :  'http://127.0.0.1:8000/post/create_user_bookmark_problem/',
            type : "POST",
            data : {
                quest_id: quest_id,
                csrfmiddlewaretoken : csrftoken,
            },
            success : function(json) {return true},
            error : function(xhr,errmsg,err) {console.log(xhr.status);}
        });
    }
}





function change_follow_btn_status(id){
    var follow_btn_id = $(id).attr("id");
    var quest_username = follow_btn_id.split("_")[3];
    if($("#"+follow_btn_id).hasClass("following")){
        $("#"+follow_btn_id).addClass("not_following");
        $("#"+follow_btn_id).removeClass("following");
        $("#"+follow_btn_id).text("Follow");
        $.ajax({
            url :  'http://127.0.0.1:8000/profile/delete_user_follow/'+ quest_username +'/',
            type : "POST",
            data : {csrfmiddlewaretoken : csrftoken},
            success : function(json) {return true},
            error : function(xhr,errmsg,err) {console.log(xhr.status);}
        });
    }

    else if($("#"+follow_btn_id).hasClass("not_following")){
        $("#"+follow_btn_id).addClass("following");
        $("#"+follow_btn_id).removeClass("not_following");
        $("#"+follow_btn_id).text("Following");
        $.ajax({
            url :  'http://127.0.0.1:8000/profile/add_user_follow/'+ quest_username +'/',
            type : "POST",
            data : {csrfmiddlewaretoken : csrftoken,},
            success : function(json) {return true},
            error : function(xhr,errmsg,err) {console.log(xhr.status);}
        });
    }
}








function comment_box_show(id,answer_id,quest_id){
    quest_answer_id = $(id).attr("id");
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
                        new_comment_on_answer_append(json);
                    },
                    error: function(xhr,errmsg,err){
                        console.log(xhr.status);
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
            success: function(json){review_update(json);},
            error: function(xhr,errmsg,err){console.log(xhr.status);},
        },false); 
    }
    
    else{
        $("#"+click_id).addClass("true");
        if($("#"+click_id).siblings(".review").hasClass("true"))
            $("#"+click_id).siblings(".review").removeClass("true");
        
        if(click_class =="agree") agree_review =true;
        if(click_class == "disagree") disagree_review=true;
        
        $.ajax({
            url:'http://127.0.0.1:8000/post/get_user_answer_review/',
            type :'POST',
            data:{
                csrfmiddlewaretoken : csrftoken,
                "ans_id" :answer_id,
                "agree"  :agree_review,
                "disagree":disagree_review
            },
            success: function(json){review_update(json);},
            error: function(xhr,errmsg,err){console.log(xhr.status);},
        },false); 
    }
    function review_update(post){
        document.getElementById("quest_"+quest_id+"_answer_"+answer_id+"_no_agree").innerHTML=post.agree_count;
        document.getElementById("quest_"+quest_id+"_answer_"+answer_id+"_no_disagree").innerHTML=post.disagree_count;
    }
}