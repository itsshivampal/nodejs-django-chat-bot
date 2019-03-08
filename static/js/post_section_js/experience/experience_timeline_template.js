function user_experience(post){

    var experience_format = [
        '<div class="card-panel row" id="card_panel" class="experience-post-group" id="user_'+post.user_profile_id+'exp_'+post.experience_id+'">',
            '<div class="col s12">',
                '<div>',
                    '<div class="post-tags">',
                        '<div class="chip no_chip">Related Tags : </div>',
    ].join("\n");

    var no_of_tags = Object.keys(post.exp_tags).length;

    for(var i = 0; i < no_of_tags; i++){
        experience_format += [
                        '<a href="http://127.0.0.1:8000/topic-' + post.exp_tags[i] +'" class="chip topic_chip">'+ post.exp_tags[i] +'</a>',
        ]
    }
    
    experience_format += [                                   
                        '</div>',
                    '</div>',

                    '<div class="post-user-details-section">',
                        '<div class="post-user-image-section">',
                            '<a href="http://127.0.0.1:8000/user-' + post.user_profile_id +'"><img class="responsive-img post-user-image" src="'+ post.user_profile_image +'"></a>',
                        '</div>',
                        '<div class="post-user-intro-section">',
                            '<a href="http://127.0.0.1:8000/user-' + post.user_profile_id +'"><p class="post-user-name">'+ post.user_profile_name +'</p></a>',
                            '<p class="post-user-details"><i class="fa fa-dot-circle-o" aria-hidden="true"></i> '+ post.user_profile_intro +'</p>',
                        '</div>',
                    '</div>',
                '</div>',
    ].join("\n");
    
    experience_format += [
                '<div class="row col s12 post-section">',
                    '<a href="http://127.0.0.1:8000/experience-'+post.experience_id+'"><p class="experience-intro">'+ post.exp_title +'</p></a>',

                    '<div class="experience-text" id="show_more_exp_'+ post.experience_id +'">',
                        '<div>'+ post.exp_preview_content +'<a style="cursor: pointer;" id="see_more_exp_'+ post.experience_id +'" onclick = show_more_exp_content(see_more_exp_'+ post.experience_id +')> see more....</a></div>',
                        '<img class="responsive-img" src="'+ post.exp_preview_link +'" style="margin-top: 10px;">',
                    '</div>',
    ].join("\n");


    experience_format += [
        // This section is for updating reviews
                    '<div class="col s12 iconslist" style="padding: 3px;">',

                        '<div class="col s4" style="text-align: center;">',
                            '<span class="icons review_'+post.current_exp_review+'" id="current_exp_review_'+post.experience_id+'" onclick = send_update_current_experience_review(current_exp_review_'+post.experience_id+','+post.experience_id+')>',
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
                                '<i class="fa fa-bookmark-o bookmark_exp_'+ post.bookmark_status +'" aria-hidden="true" style="font-size: 20px;" id="current_exp_bookmark_'+post.experience_id+'" onclick="send_exp_bookmark_data(current_exp_bookmark_'+post.experience_id+', '+ post.experience_id +')"></i>',
                            '</span>',
                        '</div>',

                    '</div>',
                '</div>',

    ].join("\n");




    experience_format+=[
                '<div class="col s12 comment_section" style="padding = 20px;" id="comment_section_'+post.experience_id+'">',
    ].join("\n");

    var no_parent_comment =Object.keys(post.experience_comments).length;

    if(no_parent_comment>0){
        
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

    }

    experience_format+=[
                    '</div>'
    ].join("\n");

    experience_format +=[
                    '<div class="col s12">',
                        '<div class="user_write_comment" id="user_write_comment_'+post.experience_id+'">',
                            '<input type="text" class="write_comment" onfocus="write_new_comment('+post.experience_id+')" style="border: 1px solid rgba(100,100,100,0.4); width: 100%; padding-left: 3px;" padding: 0px; margin: 0px;  height: 20px; line-height: 20px; placeholder="Write your comment on this post..." name="">',
                        '</div>',
                    '</div>',
                '</div>',

    ].join("\n");


    $("#user_timeline").append(experience_format);

    if(post.current_exp_review){
        $('#current_exp_review_'+post.experience_id).css("color","blue");
    }

    if(post.bookmark_status){
        $('#current_exp_bookmark_'+post.experience_id).removeClass("fa-bookmark-o");
        $('#current_exp_bookmark_'+post.experience_id).addClass("fa-bookmark");
    }
    

}



function show_more_exp_content(id){
    var exp_id = $(id).attr("id").split("_")[3];
    $.ajax({
        url :  'http://127.0.0.1:8000/post/get_complete_user_experience/',
        type : "GET",
        data : {
            exp_id: exp_id,
            csrfmiddlewaretoken : csrftoken,
        },
        success : function(json) {
            $("#show_more_exp_" + json["exp_id"]).empty();
            $("#show_more_exp_" + json["exp_id"]).append(json["content"]);
        },
        error : function(xhr,errmsg,err) {
        console.log(xhr.status + ": " + xhr.responseText);
        }
    });
}

