$(document).ready(function(){

    // this function is for modal calling
    var exp_modal = document.getElementById('experience_modal');
    var exp_write = document.getElementById("create_experience_post");
    var exp_close = document.getElementById("exp_close");

    function modal_work(post_modal, post_write, modal_close){
        post_write.onclick = function() {
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
    modal_work(exp_modal,exp_write,exp_close);

    // exp_modal.style.display = "block";


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
    function imageHandler_exp() {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.click();

        input.onchange = () => {
            var file = input.files[0];

            var image_file = new FormData();
            image_file.append("image", file);

            $.ajax({
                url :  'http://127.0.0.1:8000/post/save_user_exp_post_image/',
                type : "POST",
                data: image_file,
                contentType: false,
                headers: { "X-CSRFToken": csrftoken },
                processData: false,
                success : function(response_data) {
                    insertToEditor_exp(response_data["image_url"]);
                },
                error : function(xhr,errmsg,err) {
                    console.log(xhr.status + ": " + xhr.responseText);
                }
            });
        };
    }

    function insertToEditor_exp(url) {
        $.getScript('https://cdn.quilljs.com/1.3.5/quill.js', function(){
            const range = quill_exp.getSelection();
            quill_exp.insertEmbed(range.index, 'image', url);
        });
    }
    // end of image handler of experience



    

    var toolbarOptions_exp = {
        container: [
            [{ 'size': ['small', false, 'large',] }],
            ['bold', 'italic','underline'],
            [{ 'list': 'ordered'}, { 'list': 'bullet' },{ 'align': [] },],
            ['link', 'image',"video",],
            ["",'emoji'],
        ],
        handlers: {
            image: imageHandler_exp,
        },
    }

    var quill_exp = new Quill("#experience", {
        modules: {
            "toolbar": toolbarOptions_exp,
            "magicUrl": {
              globalRegularExpression: /(https?:\/\/|www\.|mailto:|tel:)[\S]+/g,
              urlRegularExpression: /(https?:\/\/[\S]+)|(www.[\S]+)|(mailto:[\S]+)|(tel:[\S]+)/
            },
            "emoji-toolbar": true,
            "emoji-shortname": true,
        },
        placeholder: 'Please share your experience here...',
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

    quill_emoji_work(quill_exp);


    $('.chips-autocomplete').chips({
        placeholder: 'Enter Related Tags',
        secondaryPlaceholder: '+ Tag',
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

    function send_data_experience_create(data){
        $.ajax({
            url :  'http://127.0.0.1:8000/post/create_user_experience/',
            type : "POST",
            data: data,
            success : function(response_data) {
                $('#experience_title').val('');
                quill_exp.setText('');
                $('#experience_tags').empty();
                var exp_modal = document.getElementById('experience_modal');
                exp_modal.style.display = "none";
                console.log(response_data);

                swal({
                    title: "Successfully Posted",
                    text: "You can edit your experinece from Profile Section",
                    icon: "success",
                    button: "Ok",
                });

            },
            error : function(xhr,errmsg,err) {
                swal({
                    title: "Server Error",
                    text: "Please check your internet connection",
                    icon: "error",
                    button: "Ok",
                });
                console.log(xhr.status + ": " + xhr.responseText);
            }
        });
    }


    $("#experience_post").click(function(){
        var content= $("#experience").html();
        content = get_main_content(content);
        var title =$("#experience_title").val();
        var experience_tags = M.Chips.getInstance($('#experience_tags')).chipsData;
        var experience_tags_array = [];
        var visibility = $(".experience_annonymous").prop("checked");

        for (var i=0; i <experience_tags.length;i++) {
            experience_tags_array.push((experience_tags[i]["tag"]));
        }

        var tags = experience_tags_array.join();

        data = {
            csrfmiddlewaretoken: csrftoken,
            title: title,
            tags: tags,
            content: content,
            visibility: visibility,
        }

        send_data_experience_create(data);

    });
})