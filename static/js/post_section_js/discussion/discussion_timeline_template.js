function user_discussion(post){
    var user_discussion_format=[
        '<div class="card-panel row" id="question_'+post.quest_id+'" style="padding:0px;">',
            '<div class="col s12">',
                '<div class="post-tags">',
                    '<div class="chip no_chip">Related Tags : </div>',
    ].join("\n");
    var no_of_discussion_tags=Object.keys(post.quest_tags).length;
    for(var i = 0; i < no_of_discussion_tags; i++){
        user_discussion_format += [
                    '<a href="http://127.0.0.1:8000/topic-' + post.quest_tags[i] +'" class="chip topic_chip">'+ post.quest_tags[i] +'</a>',
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
                '<a style="color: black;" href="127.0.0.1:8000/discussion-'+ post.quest_id +'/"><div class="question-text">'+post.quest_content+'</div></a>',
    ].join("\n");

    var no_of_answers =Object.keys(post.user_answers).length;

    // for(var i=0;i<no_of_answers;i++){
    if(no_of_answers>0){
        for(var i=0;i<1;i++){

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



                        '<div class="answer-text" id="show_more_ans_'+ post.user_answers[i].answer_id +'">',
                            '<div>'+ post.user_answers[i].ans_preview_content +'<a style="cursor: pointer;" id="see_more_ans_'+ post.user_answers[i].answer_id +'" onclick = show_more_ans_content(see_more_ans_'+ post.user_answers[i].answer_id +')> see more....</a></div>',
                            '<img class="responsive-img" src="'+ post.user_answers[i].ans_preview_link +'" style="margin-top: 10px;">',
                        '</div>',




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

            user_discussion_format+=[
                        '<div class="col s12 comment_section" style="margin-left:10px;" >',
            ].join("\n");

            var no_of_comments_on_answer =Object.keys(post.user_answers[i].answer_comments).length;

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
                            '<div class="col s12 reply_secondary_input" id="write_comment_parent_'+post.user_answers[i].answer_id+'" style="margin-top:10px;">',

                                '<input type="text" class="reply_comment_input" onfocus="new_comment_on_answer(quest_'+post.quest_id+'_answer_'+post.user_answers[i].answer_id+','+post.user_answers[i].answer_id+','+post.quest_id+')" style="width: 100%; border-radius: 3px; height: 30px; padding-left: 14px; border: 1px solid rgba(100,100,100,0.5);" placeholder="Please write your comment here" name="">',
                            '</div>',
                        '</div>',
                    '</div>',

                    '<div class="col s12">',
                        '<hr class="answer_finish">',
                    '</div>',
            ].join("\n");
        }
    }

    user_discussion_format+=[
                '<div class="col s12" class="question_icons">',
                    '<div class="col s6" style="text-align: center">',
                        '<a href="http://127.0.0.1:8000/write-answer-'+ post.quest_id +'/"><i class="fa fa-pencil-square-o" aria-hidden="true" style="font-size: 18px;"><span style="margin-left: 10px; font-size: 16px;">Write Answer</span></i></a>',
                    '</div>',
                    '<div class="col s6" style="text-align: right;">',
                        '<span class="icons">',
                            '<i class="fa fa-bookmark-o bookmark_quest_'+ post.bookmark_quest_status +'" aria-hidden="true" style="font-size: 20px;" id="current_quest_bookmark_'+post.quest_id+'" onclick="send_quest_bookmark_data(current_quest_bookmark_'+post.quest_id+', '+ post.quest_id +')"></i>',
                        '</span>',
                    '</div>',
                '</div>',

            '</div>',
        '</div>',
    ].join("\n");   

    $("#user_timeline").append(user_discussion_format);

    if(post.bookmark_quest_status){
        $('#current_quest_bookmark_'+post.quest_id).removeClass("fa-bookmark-o");
        $('#current_quest_bookmark_'+post.quest_id).addClass("fa-bookmark");
    }

}



function show_more_ans_content(id){
    var ans_id = $(id).attr("id").split("_")[3];
    console.log(id);
    $.ajax({
        url :  'http://127.0.0.1:8000/post/get_complete_user_answer/',
        type : "GET",
        data : {
            ans_id: ans_id,
            csrfmiddlewaretoken : csrftoken,
        },
        success : function(json) {
            console.log(json);
            console.log("#show_more_ans_" + json["ans_id"]);
            $("#show_more_ans_" + json["ans_id"]).empty();
            $("#show_more_ans_" + json["ans_id"]).append(json["content"]);
        },
        error : function(xhr,errmsg,err) {
        console.log(xhr.status + ": " + xhr.responseText);
        }
    });
}


