from __future__ import unicode_literals
from django.db import models
# from user_templates.models import new_user, tag_name
from django.contrib.auth.models import User



# database for user experience

class user_experience(models.Model):
	user_id = models.ForeignKey(User)
	exp_id = models.BigAutoField(primary_key = True, unique = True, null = False, blank = False)
	title = models.TextField(null = True, blank = True)
	content = models.TextField(null = True, blank = True)
	visibility = models.BooleanField(null = False, blank = False, default = True)
	created_on = models.DateTimeField(auto_now = False, auto_now_add = True)
	updated_on = models.DateTimeField(auto_now = True, auto_now_add = False)

	def __unicode__(self):
		return unicode(self.exp_id)

class user_experience_tag(models.Model):
	exp_id = models.ForeignKey(user_experience, on_delete = models.CASCADE)
	tag = models.CharField(max_length = 30, null = False, blank = False)
	
	def __unicode__(self):
		return unicode(self.tag)

class user_experience_review(models.Model):
	user_id = models.ForeignKey(User)
	exp_id = models.ForeignKey(user_experience, on_delete = models.CASCADE)

	def __unicode__(self):
		return unicode(self.exp_id)

class user_experience_comment(models.Model):
	user_id = models.ForeignKey(User)
	exp_id = models.ForeignKey(user_experience, on_delete = models.CASCADE)
	comment_id = models.BigAutoField(primary_key = True, unique = True, null = False, blank = False)
	content = models.TextField(null = True, blank = True)
	created_on = models.DateTimeField(auto_now = False, auto_now_add = True)
	updated_on = models.DateTimeField(auto_now = True, auto_now_add = False)

	def __unicode__(self):
		return unicode(self.comment_id)

class experience_comment_on_comment(models.Model):
	user_id = models.ForeignKey(User)
	comment_id = models.ForeignKey(user_experience_comment, on_delete = models.CASCADE)
	content = models.TextField(null = True, blank = True)
	created_on = models.DateTimeField(auto_now = False, auto_now_add = True)
	updated_on = models.DateTimeField(auto_now = True, auto_now_add = False)

	def __unicode__(self):
		return unicode(self.comment_id)

class user_bookmark_experience(models.Model):
	user_id = models.ForeignKey(User)
	exp_id = models.ForeignKey(user_experience, on_delete = models.CASCADE)

	def __unicode__(self):
		return unicode(self.exp_id)


# database for user problem discussion

class user_problem(models.Model):
	user_id = models.ForeignKey(User)
	quest_id = models.BigAutoField(primary_key = True, unique = True, null = False, blank = False)
	content = models.TextField(null = True, blank = True)
	visibility = models.BooleanField(null = False, blank = False, default = True)
	created_on = models.DateTimeField(auto_now = False, auto_now_add = True)
	updated_on = models.DateTimeField(auto_now = True, auto_now_add = False)

	def __unicode__(self):
		return unicode(self.quest_id)

class user_problem_tag(models.Model):
	quest_id = models.ForeignKey(user_problem, on_delete = models.CASCADE)
	tag = models.CharField(max_length = 30, null = False, blank = False)

	def __unicode__(self):
		return unicode(self.tag)


class user_answer(models.Model):
	user_id = models.ForeignKey(User)
	quest_id = models.ForeignKey(user_problem, on_delete = models.CASCADE)
	ans_id = models.BigAutoField(primary_key = True, unique = True, null = False, blank = False)
	content = models.TextField(null = True, blank = True)
	visibility = models.BooleanField(null = False, blank = False, default = True)
	created_on = models.DateTimeField(auto_now = False, auto_now_add = True)
	updated_on = models.DateTimeField(auto_now = True, auto_now_add = False)

	def __unicode__(self):
		return unicode(self.ans_id)


# answers_review is a database for storing reviews of users on answers

class user_answer_review(models.Model):
	user_id = models.ForeignKey(User)
	ans_id = models.ForeignKey(user_answer, on_delete = models.CASCADE)
	agree = models.BooleanField(null = False, blank = False, default = False)
	disagree = models.BooleanField(null = False, blank = False, default = False)

	def __unicode__(self):
		return unicode(self.user_id)

# answer_comment is a database for storing comments on users answers

class user_answer_comment(models.Model):
	user_id = models.ForeignKey(User)
	ans_id = models.ForeignKey(user_answer, on_delete = models.CASCADE)
	comment_id = models.BigAutoField(primary_key = True, unique = True, null = False, blank = False)
	content = models.TextField(null = True, blank = True)
	created_on = models.DateTimeField(auto_now = False, auto_now_add = True)
	updated_on = models.DateTimeField(auto_now = True, auto_now_add = False)

	def __unicode__(self):
		return unicode(self.comment_id)

class answer_comment_on_comment(models.Model):
	user_id = models.ForeignKey(User)
	comment_id = models.ForeignKey(user_answer_comment, on_delete = models.CASCADE)
	content = models.TextField(null = True, blank = True)
	created_on = models.DateTimeField(auto_now = False, auto_now_add = True)
	updated_on = models.DateTimeField(auto_now = True, auto_now_add = False)

	def __unicode__(self):
		return unicode(self.comment_id)

class user_bookmark_problem(models.Model):
	user_id = models.ForeignKey(User)
	quest_id = models.ForeignKey(user_problem, on_delete = models.CASCADE)

	def __unicode__(self):
		return unicode(self.quest_id)



