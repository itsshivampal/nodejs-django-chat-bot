from __future__ import unicode_literals
from django.contrib import admin

from .models import *



class user_detail_admin(admin.ModelAdmin):
	fields = ["user_id", "mobile", "date_of_birth", "gender", "user_bio"]
	list_display = ["user_id", "mobile", "date_of_birth", "gender", "date_of_birth", "user_bio", "updated_on"]
	list_display_links = ["user_id"]
	search_fields = ["user_id", "gender"]

	class Meta:
		model = user_detail


class user_profile_detail_admin(admin.ModelAdmin):
	fields = ["user_id", "user_intro", "profile_image"]
	list_display = ["user_id", "user_intro", "profile_image"]
	list_display_links = ["user_id"]
	search_fields = ["user_id"]

	class Meta:
		model = user_profile_detail


class user_subscription_admin(admin.ModelAdmin):
	fields = ["user_id", "email_subscribe", "sms_subscribe"]
	list_display = ["user_id", "email_subscribe", "sms_subscribe"]
	list_display_links = ["user_id"]
	search_fields = ["user_id"]

	class Meta:
		model = user_subscription




class user_organization_admin(admin.ModelAdmin):
	fields = ["user_id", "organization"]
	list_display = ["user_id", "organization"]
	list_display_links = ["user_id", "organization"]
	search_fields = ["user_id", "organization"]

	class Meta:
		model = user_organization

class user_knowledge_field_admin(admin.ModelAdmin):
	fields = ["user_id", "knowledge_field"]
	list_display = ["user_id", "knowledge_field"]
	list_display_links = ["user_id", "knowledge_field"]
	search_fields = ["user_id", "knowledge_field"]

	class Meta:
		model = user_knowledge_field


class user_review_admin(admin.ModelAdmin):
	fields = ["user1", "user2", "review"]
	list_display = ["user1", "user2", "review", "reviewed_on"]
	list_display_links = ["user1", "user2"]
	search_fields = ["user1", "user2"]

	class Meta:
		model = user_review

class user_help_admin(admin.ModelAdmin):
	fields = ["user1", "user2", "is_help"]
	list_display = ["user1", "user2", "is_help", "helped_on"]
	list_display_links = ["user1", "user2"]
	search_fields = ["user1", "user2"]

	class Meta:
		model = user_help



class user_follow_admin(admin.ModelAdmin):
	fields = ["user_id", "user_following"]
	list_display = ["user_id", "user_following"]
	list_display_links = ["user_id", "user_following"]
	search_fields = ["user_id"]

	class Meta:
		model = user_follow

class user_chat_session_admin(admin.ModelAdmin):
	fields = ["user1", "user2", "status", "action_user_id"]
	list_display = ["chat_id", "user1", "user2", "status", "action_user_id", "created_on"]
	list_display_links = ["user1", "user2", "chat_id", "status"]
	search_fields = ["user1", "user2", "chat_id", "status"]

	class Meta:
		model = user_chat_session

class user_chat_message_admin(admin.ModelAdmin):
	fields = ["chat_id", "user_id", "message"]
	list_display = ["chat_id", "user_id", "message"]
	list_display_links = ["chat_id", "user_id"]
	search_fields = ["chat_id", "user_id"]
	class Meta:
		model = user_chat_message




admin.site.register(user_detail, user_detail_admin)
admin.site.register(user_profile_detail, user_profile_detail_admin)
admin.site.register(user_subscription, user_subscription_admin)
admin.site.register(user_follow, user_follow_admin)
admin.site.register(user_help, user_help_admin)
admin.site.register(user_review, user_review_admin)
admin.site.register(user_knowledge_field, user_knowledge_field_admin)
admin.site.register(user_organization, user_organization_admin)


admin.site.register(user_chat_session, user_chat_session_admin)
admin.site.register(user_chat_message, user_chat_message_admin)




