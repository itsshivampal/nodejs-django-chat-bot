from django.conf.urls import url


from .save_post_image_views import (
	save_user_exp_post_image,
	save_user_discuss_post_image,
	save_user_answer_post_image,
)

from .experience_crud_views import (
	create_user_experience,
	create_user_experience_review,
	create_user_bookmark_experience,
	create_user_experience_comment,
	create_experience_comment_on_comment,

	update_user_experience,

	delete_user_experience,
	delete_user_experience_review,
	delete_user_bookmark_experience,
	delete_user_experience_comment,
	delete_experience_comment_on_comment,	
)

from .discussion_crud_views import (
	create_user_problem,
	user_answer_create,
	get_user_answer_review,
	create_user_bookmark_problem,
	delete_user_bookmark_problem,
	create_user_answer_comment,
	delete_user_answer_comment,
)

from .retrieve_experience_data import(
	experience_page_exp_data,
	get_complete_user_experience,
)

from .retrieve_discussion_data import(
	discussion_page_quest_data,
	discussion_timeline_data,
	get_complete_user_answer,
)


from .views import (
	user_timeline_post,
	user_experience_recommendation,
	user_discussion_recommendation,
)

urlpatterns = [
	
	# save post image views
	url(r'^save_user_exp_post_image/$', save_user_exp_post_image),
	url(r'^save_user_discuss_post_image/$', save_user_discuss_post_image),
	url(r'^save_user_answer_post_image/$', save_user_answer_post_image),

	# experience crud views
	url(r'^create_user_experience/$', create_user_experience),
	url(r'^create_user_experience_review/$', create_user_experience_review),
	url(r'^create_user_experience_comment/$', create_user_experience_comment),
	url(r'^create_experience_comment_on_comment/$', create_experience_comment_on_comment),
	url(r'^create_user_bookmark_experience/$', create_user_bookmark_experience),
	url(r'^update_user_experience/$', update_user_experience),
	url(r'^delete_user_experience/$', delete_user_experience),
	url(r'^delete_user_experience_review/$', delete_user_experience_review),
	url(r'^delete_user_experience_comment/$', delete_user_experience_comment),
	url(r'^delete_experience_comment_on_comment/$', delete_experience_comment_on_comment),
	url(r'^delete_user_bookmark_experience/$', delete_user_bookmark_experience),

	# discussion crud views
	url(r'^create_user_problem/$', create_user_problem),
	url(r'^user_answer_create/$', user_answer_create),
	url(r'^get_user_answer_review/$', get_user_answer_review),
	url(r'^create_user_bookmark_problem/$', create_user_bookmark_problem),
	url(r'^delete_user_bookmark_problem/$', delete_user_bookmark_problem),
	url(r'^create_user_answer_comment/$', create_user_answer_comment),
	url(r'^delete_user_answer_comment/$', delete_user_answer_comment),

	# retrieve experience data
	url(r'^experience_page_exp_data/(?P<exp_id>\d+)/$', experience_page_exp_data),
	url(r'^get_complete_user_experience/$', get_complete_user_experience),

	# retrieve discussion data
	url(r'^discussion_page_quest_data/(?P<quest_id>\d+)/$', discussion_page_quest_data),
	url(r'^get_complete_user_answer/$', get_complete_user_answer),
	url(r'^discussion_timeline_data/$', discussion_timeline_data),

	# from views file
	url(r'^user_timeline_post/$', user_timeline_post),
	url(r'^user_experience_recommendation/(?P<exp_id>\d+)/$', user_experience_recommendation),
	url(r'^user_discussion_recommendation/(?P<quest_id>\d+)/$', user_discussion_recommendation),
]
