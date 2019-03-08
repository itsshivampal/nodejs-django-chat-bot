from __future__ import unicode_literals
from django.db import models

# from user_templates.models import tag_name
from django.contrib.auth.models import User



class user_profile_detail(models.Model):
	user_id = models.ForeignKey(User)
	profile_image = models.FileField(upload_to = None, null = False, blank = False, default = 'profile_images/user_image.jpg')
	user_intro = models.TextField(null = True, blank = True, default = "")

	def __unicode__(self):
		return unicode(self.user_id)


class user_detail(models.Model):
	user_id = models.ForeignKey(User)
	date_of_birth = models.CharField(max_length = 20, null = True, blank = True, default = "")
	mobile = models.CharField(max_length = 15, null = True, blank = True, default = "")
	gender = models.CharField(max_length = 10, null = True, blank = True, default = "")
	user_bio = models.TextField(null = True, blank = True, default = "")
	updated_on = models.DateTimeField(auto_now = True, auto_now_add = False)

	def __unicode__(self):
		return unicode(self.user_id)

class user_subscription(models.Model):
	user_id = models.ForeignKey(User)
	email_subscribe = models.BooleanField(null = False, blank = False, default = True)
	sms_subscribe = models.BooleanField(null = False, blank = False, default = True)

	def __unicode__(self):
		return unicode(self.user_id)



class user_organization(models.Model):
	user_id = models.ForeignKey(User)
	organization = models.CharField(max_length = 40, null = False, blank = False)

	def __unicode__(self):
		return unicode(self.user_id)

class user_knowledge_field(models.Model):
	user_id = models.ForeignKey(User)
	knowledge_field = models.CharField(max_length = 30, null = False, blank = False)

	def __unicode__(self):
		return unicode(self.user_id)


class user_follow(models.Model):
	user_id = models.ForeignKey(User, related_name = "follower")
	user_following = models.ForeignKey(User, related_name = "following")
	connected_on = models.DateTimeField(auto_now = False, auto_now_add = True)

	def __unicode__(self):
		return unicode(self.user_id)

class user_review(models.Model):
	user1 = models.ForeignKey(User, related_name = "person_who_comment")
	user2 = models.ForeignKey(User, related_name = "person_on_whom_comment")
	review = models.TextField(null = False, blank = False)
	reviewed_on = models.DateTimeField(auto_now = False, auto_now_add = True)

	def __unicode__(self):
		return unicode(self.user1)

class user_help(models.Model):
	user1 = models.ForeignKey(User, related_name = "person_who_help")
	user2 = models.ForeignKey(User, related_name = "person_whom_help")
	is_help = models.BooleanField(null = False, blank = False)
	helped_on = models.DateTimeField(auto_now = False, auto_now_add = True)

	def __unicode__(self):
		return unicode(self.user1)


class user_chat_session(models.Model):
	chat_id = models.BigAutoField(primary_key = True, unique = True, null = False, blank = False)
	user1 = models.ForeignKey(User, related_name="person_who_chat")
	user2 = models.ForeignKey(User, related_name="person_whom_to_chat")
	# is_active = models.BooleanField(blank = False, null = False, default = False)
	status_choices = (
		('0', 'no_action'),
		('1', 'requested_by'),
		('2', 'accepted_by'),
		('3', 'declined_by'),
		('4', 'blocked_by'),
	)
	status = models.CharField(max_length = 1, choices = status_choices, default = "0")
	action_user_id = models.ForeignKey(User, related_name = "action_taken_by", null = True)
	created_on = models.DateTimeField(auto_now = False, auto_now_add = True)

	def __unicode__(self):
		return unicode(self.chat_id)

class user_chat_message(models.Model):
	chat_id = models.ForeignKey(user_chat_session, on_delete = models.CASCADE)
	user_id = models.ForeignKey(User)
	message = models.TextField(blank = False, null = False)

	def __unicode__(self):
		return unicode(self.chat_id)

