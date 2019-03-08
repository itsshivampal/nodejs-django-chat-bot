from django.conf.urls import url

from .views import (
	save_profile_image,
	# save_dashboard_image,
	get_user_dashboard,

	save_user_edit_profile,
	send_user_settings_data,
	request_change_password,
	save_user_subscription_data,

	add_user_follow,
	delete_user_follow,
	user_follow_list,

	header_data_api,

	get_user_chat_status,
	start_chat_request,
	accept_chat_request,
	decline_chat_request,
	block_chat_request,


	get_chat_session_data,
)

urlpatterns = [
	url(r'^save_profile_image/$', save_profile_image),
	# (url(r'^save_dashboard_image/(?P<image_id>[\w-]+)/$', save_dashboard_image),)
	url(r'^get_user_dashboard/(?P<username>[\w-]+)/$', get_user_dashboard),


	url(r'^send_user_settings_data/$', send_user_settings_data),
	url(r'^save_user_edit_profile/$', save_user_edit_profile),
	url(r'^request_change_password/$', request_change_password),
	url(r'^save_user_subscription_data/$', save_user_subscription_data),

	url(r'^add_user_follow/(?P<username>[\w-]+)/$', add_user_follow),
	url(r'^delete_user_follow/(?P<username>[\w-]+)/$', delete_user_follow),
	url(r'^user_follow_list/(?P<username>[\w-]+)/$', user_follow_list),

	url(r'^header_data_api/$', header_data_api),

	url(r'^get_user_chat_status/$', get_user_chat_status),
	url(r'^start_chat_request/$', start_chat_request),
	url(r'^accept_chat_request/$', accept_chat_request),
	url(r'^decline_chat_request/$', decline_chat_request),
	url(r'^block_chat_request/$', block_chat_request),


	url(r'^get_chat_session_data/$', get_chat_session_data),
]