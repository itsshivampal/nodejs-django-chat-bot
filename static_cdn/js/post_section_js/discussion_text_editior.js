$(document).ready(function(){


    var issue_modal = document.getElementById('issue_modal');
    var issue_write = document.getElementById("ask_problem")
    var issue_close = document.getElementById("issue_close");

    function modal_work(post_modal, post_write, modal_close){
        post_write.onclick= function() {
            post_modal.style.display = "block";
        }
        modal_close.onclick = function() {
            post_modal.style.display = "none";
        }
        window.onclick = function(event) {
            if (event.target == post_modal) {
                post_modal.style.display = "none";
            }
        }
    }
    modal_work(issue_modal,issue_write,issue_close);



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



    // this image handler is for experience
    function imageHandler_discuss() {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.click();

        input.onchange = () => {
            var file = input.files[0];

            var image_file = new FormData();
            image_file.append("image", file);

            $.ajax({
                url :  'http://127.0.0.1:8000/post/save_user_discuss_post_image/',
                type : "POST",
                data: image_file,
                contentType: false,
                headers: { "X-CSRFToken": csrftoken },
                processData: false,
                success : function(response_data) {
                    insertToEditor_discuss(response_data["image_url"]);
                },
                error : function(xhr,errmsg,err) {
                    console.log(xhr.status + ": " + xhr.responseText);
                }
            });
        };
    }

    function insertToEditor_discuss(url) {
        $.getScript('https://cdn.quilljs.com/1.3.5/quill.js', function(){
            const range = quill_discuss.getSelection();
            quill_discuss.insertEmbed(range.index, 'image', url);
        });
    }
    // end of image handler of discussion



    var toolbarOptions_discuss = {
        container: [
            [{ 'size': ['small', false, 'large',] }],
            ['bold', 'italic','underline'],
            [{ 'list': 'ordered'}, { 'list': 'bullet' },{ 'align': [] },],
            ['link', 'image',"video",],
            ["",'emoji'],
        ],
        handlers: {
            image: imageHandler_discuss,
        },
    }
   

    var quill_discuss = new Quill('#issue', {
        modules: {
            "toolbar": toolbarOptions_discuss,
            "magicUrl": {
              globalRegularExpression: /(https?:\/\/|www\.|mailto:|tel:)[\S]+/g,
              urlRegularExpression: /(https?:\/\/[\S]+)|(www.[\S]+)|(mailto:[\S]+)|(tel:[\S]+)/
            },
            "emoji-toolbar": true,
            "emoji-shortname": true,
        },
        placeholder: 'Please share your issue here...',
        theme: 'snow',
    });



    function quill_emoji_work(quill_number){
        var cursorPosition =0;
        quill_number.on('selection-change', function(range, oldRange, source) {
            if(range){
                cursorPosition = range.index;
            }
        });
        quill_number.on('text-change', function(delta, oldDelta, source) {
            if (source == 'api') {
                quill_number.focus()
                quill_number.setSelection(cursorPosition +1);
            }
        });     
    }

    quill_emoji_work(quill_discuss);


    $('.chips-autocomplete').chips({
        placeholder: 'Enter a tag',
        secondaryPlaceholder: '+Tag',
        autocompleteOptions: {
            data: {
                'Startup': null,
                'Mentor': null,
                'Coding': null,
                'Placement': null,
            },
            limit: Infinity,
            minLength: 1,
        }
    });

    function get_main_content(content){
        var pos2 = content.indexOf("</div>");
        var pos1 = content.indexOf(">")
        var main_content = content.slice(pos1 + 1, pos2);
        return main_content;
    }


    function send_data_problem_create(data){
        $.ajax({
            url :"http://127.0.0.1:8000/post/create_user_problem/",
            type :"POST",
            data :data,
            success: function(response_data){
                quill_discuss.setText('');
                $('#issue_tags').empty();
                var issue_modal = document.getElementById('issue_modal');
                issue_modal.style.display = "none";
                console.log(response_data);

                swal({
                    title: "Successfully Posted",
                    text: "You can edit your problem from Profile Section",
                    icon: "success",
                    button: "Ok",
                });
            },
            error: function(xhr,errmsg,err){
                swal({
                    title: "Server Error",
                    text: "Please check your internet connection",
                    icon: "error",
                    button: "Ok",
                });
                console.log(xhr.status + ":" +xhr.responseText);
            }
        });
    }

    $("#issue_post").click(function(){
        var content= $("#issue").html();
        content = get_main_content(content);
        var issue_tags = M.Chips.getInstance($('#issue_tags')).chipsData;
        var issue_tags_array = [];
        var visibility = $(".issue_annonymous").prop("checked");
        for (var i=0;i <issue_tags.length;i++){
            issue_tags_array.push((issue_tags[i]["tag"]));
        }

        var tags = issue_tags_array.join();
        
        data ={
            csrfmiddlewaretoken: csrftoken,
            tags: tags,
            content : content,
            visibility :visibility,
        }
        send_data_problem_create(data);
    });

})