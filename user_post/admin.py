from __future__ import unicode_literals
from django.contrib import admin

from .models import *



class user_experience_admin(admin.ModelAdmin):
	fields = ["user_id", "title", "content", "visibility"]
	list_display = ["user_id", "exp_id", "title", "content", "visibility", "updated_on", "created_on"]
	list_display_links = ["user_id"]
	search_fields = ["user_id"]

	class Meta:
		model = user_experience

class user_experience_tag_admin(admin.ModelAdmin):
	fields = ["exp_id", "tag"]
	list_display = ["exp_id", "tag"]
	list_display_links = ["exp_id"]
	search_fields = ["exp_id", "tag"]

	class Meta:
		model = user_experience_tag

class user_experience_review_admin(admin.ModelAdmin):
	fields = ["user_id", "exp_id"]
	list_display = ["user_id", "exp_id"]
	list_display_links = ["user_id", "exp_id"]
	search_fields = ["user_id", "exp_id"]

	class Meta:
		model = user_experience_review

class user_experience_comment_admin(admin.ModelAdmin):
	fields = ["user_id", "exp_id", "content"]
	list_display = ["user_id", "exp_id", "comment_id", "content", "created_on", "updated_on"]
	list_display_links = ["user_id", "exp_id", "comment_id"]
	search_fields = ["user_id", "exp_id", "comment_id"]

	class Meta:
		model = user_experience_comment

class experience_comment_on_comment_admin(admin.ModelAdmin):
	fields = ["user_id", "comment_id", "content"]
	list_display = ["user_id", "comment_id", "content", "updated_on", "created_on"]
	list_display_links = ["user_id", "comment_id"]
	search_fields = ["user_id", "comment_id"]

	class Meta:
		model = experience_comment_on_comment


class user_bookmark_experience_admin(admin.ModelAdmin):
	fields = ["user_id", "exp_id"]
	list_display = ["user_id", "exp_id"]
	list_display_links = ["user_id", "exp_id"]
	search_fields = ["user_id", "exp_id"]

	class Meta:
		model = user_bookmark_experience


admin.site.register(user_experience, user_experience_admin)
admin.site.register(user_experience_tag, user_experience_tag_admin)
admin.site.register(user_experience_review, user_experience_review_admin)
admin.site.register(user_experience_comment, user_experience_comment_admin)
admin.site.register(experience_comment_on_comment, experience_comment_on_comment_admin)
admin.site.register(user_bookmark_experience, user_bookmark_experience_admin)




class user_problem_admin(admin.ModelAdmin):
	fields = ["user_id", "content", "visibility"]
	list_display = ["user_id", "quest_id", "content", "visibility", "updated_on", "created_on"]
	list_display_links = ["user_id", "quest_id"]
	search_fields = ["user_id", "quest_id"]

	class Meta:
		model = user_problem

class user_problem_tag_admin(admin.ModelAdmin):
	fields = ["quest_id", "tag"]
	list_display = ["quest_id", "tag"]
	list_display_links = ["quest_id", "tag"]
	search_fields = ["quest_id", "tag"]

	class Meta:
		model = user_problem_tag

class user_answer_admin(admin.ModelAdmin):
	fields = ["user_id", "quest_id", "content", "visibility"]
	list_display = ["user_id", "quest_id", "ans_id", "content", "visibility", "updated_on", "created_on"]
	list_display_links = ["user_id", "quest_id", "ans_id"]
	search_fields = ["user_id", "quest_id", "ans_id"]

	class Meta:
		model = user_answer


class user_answer_review_admin(admin.ModelAdmin):
	fields = ["user_id", "ans_id", "agree", "disagree"]
	list_display = ["user_id", "ans_id", "agree", "disagree"]
	list_display_links = ["user_id", "ans_id"]
	search_fields = ["user_id", "ans_id"]

	class Meta:
		model = user_answer_review

class user_answer_comment_admin(admin.ModelAdmin):
	fields = ["user_id", "ans_id", "content"]
	list_display = ["user_id", "ans_id", "comment_id", "content", "created_on", "updated_on"]
	list_display_links = ["user_id", "ans_id", "comment_id"]
	search_fields = ["user_id", "ans_id", "comment_id"]

	class Meta:
		model = user_answer_comment

class answer_comment_on_comment_admin(admin.ModelAdmin):
	fields = ["user_id", "comment_id", "content"]
	list_display = ["user_id", "comment_id", "content", "created_on", "updated_on"]
	list_display_links = ["user_id", "comment_id"]
	search_fields = ["user_id", "comment_id"]

	class Meta:
		model = answer_comment_on_comment

class user_bookmark_problem_admin(admin.ModelAdmin):
	fields = ["user_id", "quest_id"]
	list_display = ["user_id", "quest_id"]
	list_display_links = ["user_id", "quest_id"]
	search_fields = ["user_id", "quest_id"]

	class Meta:
		model = user_bookmark_problem

admin.site.register(user_problem, user_problem_admin)
admin.site.register(user_problem_tag, user_problem_tag_admin)
admin.site.register(user_answer, user_answer_admin)
admin.site.register(user_answer_review, user_answer_review_admin)
admin.site.register(user_answer_comment, user_answer_comment_admin)
admin.site.register(answer_comment_on_comment, answer_comment_on_comment_admin)
admin.site.register(user_bookmark_problem, user_bookmark_problem_admin)




