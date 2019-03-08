from django.conf.urls import url, handler404, handler400, handler500, handler403

from .authentication_views import (
	# functions for authentication pages
	login_page,
	signup_page,
	logout_user,
	forget_password_page,
	forget_change_password_page,

	# functions for authentication APIs
	verify_signup_details,
	verify_login_details,
	forget_password_email,
	forget_change_password,
)

from .miscllaneous_page_views import (
	about_us_page,
	about_company_page,
	business_with_us_page,
	career_with_us_page,
	contact_us_page,
	privacy_policy_page,
	terms_and_conditions_page,
	faqs_page,
)


from .profile_views import (
	# all profile page views
	user_profile_page,
	user_follow_page,
	user_follower_page,
	user_about_page,

	settings_page_views,
)

from .views import (
	home_page,
	topic_page,
	discussion_page,
	answer_write_page,
	experience_page,
	chat_page,
	page_not_found,

	temp_page,
	temp_page_data,
)


urlpatterns = [

	url(r'^$', home_page),
	url(r'^(?:topic-(?P<group_name>[\w-]+))/$', topic_page),
	url(r'^(?:experience-(?P<exp_id>[\w-]+)/)?$', experience_page),
	url(r'^(?:write-answer-(?P<quest_id>[\w-]+)/)?$', answer_write_page),
	url(r'^discussion/$', discussion_page),
	url(r'^page-not-found/$', page_not_found),
	url(r'^(?:chat-(?P<username>[\w-]+))/$', chat_page),
	
	# url for authentication pages
	url(r'^login/$', login_page),
	url(r'^signup/$', signup_page),
	url(r'^forget-password/$', forget_password_page),
	url(r'^change-password/(?P<email_encrypt>[\w-]+)-(?P<count>\d+)/$', forget_change_password_page),

	# url for miscllaneous pages
	url(r'^about-us/$', about_us_page),
	url(r'^about/$', about_company_page),
	url(r'^business-with-us/$', business_with_us_page),
	url(r'^career-with-us/$', career_with_us_page),
	url(r'^contact/$', contact_us_page),
	url(r'^privacy-policy/$', privacy_policy_page),
	url(r'^terms-conditions/$', terms_and_conditions_page),
	url(r'^FAQs/$', faqs_page),

	# url for settings page
	url(r'^(?:user-(?P<username>[\w-]+))/settings/$', settings_page_views),

	# url for profile page
	url(r'^(?:user-(?P<username>[\w-]+)/)?$', user_profile_page),
	url(r'^(?:user-(?P<username>[\w-]+))/following/$', user_follow_page),
	url(r'^(?:user-(?P<username>[\w-]+))/follower/$', user_follower_page),
	url(r'^(?:user-(?P<username>[\w-]+))/about/$', user_about_page),


	# url for authentication APIs
	url(r'^logout/$', logout_user),
	url(r'^verify_signup_details/$', verify_signup_details),
	url(r'^verify_login_details/$', verify_login_details),
	url(r'^forget_password_email/$', forget_password_email),
	url(r'^forget_change_password/$', forget_change_password),

	url(r'^temp_page/$', temp_page),
	url(r'^temp_page_data/$', temp_page_data),
]