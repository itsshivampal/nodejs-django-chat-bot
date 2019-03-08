var grp={
    title:"Recommended Groups",
    image:["static/images/image3.jpg","static/images/image3.jpg","static/images/image3.jpg","static/images/image3.jpg"],
    name:["Movies","Sports","JEE","Medical"],
    details:["Hollywood : Bollywood","Cricket : Football : Volleyball","Coaching, Books","More info for movies"]

};

function recommendation_group(){

    for(var i=0;i<=2;i++){
        var html2=[

            '<div class="row col s12" id="grp_recommend">',

                '<div class="row card-panel new_grp_add">',
                    '<div class="recommend_icon">',
                        '<img class="responsive-img circle recommend_image" src="'+grp.image[i]+'" alt="User_name">',
                    '</div>',
                    '<div class="recommend_intro">',
                        '<p class="grp_name">'+grp.name[i]+' <span class="badge" id="follow_option">Join <i class="fa fa-plus" aria-hidden="true"></i></span></p>',
                        '<p class="grp_details">'+grp.details[i]+'</p>',
                    '</div>',
                '</div>',

            '</div>',

        ].join("\n");
        $(".group_recommendation_section").append(html2);
    }
}

var people={
    "title":"Recommended Groups",
    "image":["static/images/image3.jpg","static/images/image3.jpg","static/images/image3.jpg","static/images/image3.jpg"],
    "name":["Shivam","Vikram","Sameer","Shashank"],
    "details":["Student at IITK","Student at IITkgp","Student at IITK","Student at IITkgp"]

};


function recommendation_people() {
   
  for(var i=0;i<=2;i++){
        var html=[

            '<div class="row col s12" id="grp_recommend">',

                '<div class="row card-panel new_grp_add">',
                    '<div class="recommend_icon">',
                        '<img class="responsive-img circle recommend_image" src="'+people.image[i]+'" alt="User_name">',
                    '</div>',
                    '<div class="recommend_intro">',
                        '<p class="grp_name">'+people.name[i]+' <span class="badge" id="follow_option">Follow <i class="fa fa-plus" aria-hidden="true"></i></span></p>',
                        '<p class="grp_details">'+people.details[i]+'</p>',
                    '</div>',
                '</div>',

            '</div>',

        ].join("\n");
        $(".people_recommendation_section").append(html);
    }

 } 