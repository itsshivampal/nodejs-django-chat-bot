from __future__ import unicode_literals
import os
from django.shortcuts import render, render_to_response, redirect
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
import urllib2
from bs4 import BeautifulSoup

from .models import *
from user_templates.models import *
from user_profile.models import user_profile_detail
from .retrieve_experience_data import *



# Below APIs are for creating, updating and deleting user experience

def create_user_experience(request):
	if request.method == "POST" and request.is_ajax() and request.user.is_authenticated():
		user_id = User.objects.get(id = request.user.id)
		title = request.POST.get("title")
		content = request.POST.get("content")
		tags = request.POST.get("tags")
		visibility = True if request.POST.get("visibility") == "true" else False
		
		query = user_experience(user_id = user_id, title = title, content = content, visibility = visibility)
		query.save()
		if tags != "":	create_user_experience_tag(tags, query)
		data = {"status" : True}
		return JsonResponse(data)
	else:
		return HttpResponseRedirect("/page-not-found/")



def create_user_experience_tag(tags, exp_id):
	tags = tags.split(",")
	for tag in tags:
		query = user_experience_tag(exp_id = exp_id, tag = tag)
		query.save()



def update_user_experience(request):
	if request.method == "POST" and request.is_ajax() and request.user.is_authenticated():
		user_id = User.objects.get(id = request.user.id)
		exp_id = request.POST.get("exp_id")

		query = user_experience.objects.get(user_id = user_id, exp_id = exp_id)
		query.title = request.POST.get("title")
		query.content = request.POST.get("content")
		query.visibility = True if request.POST.get("visibility") == "true" else False
		query.save()

		tags = request.POST.get("tags")
		if tags != "":	update_user_experience_tag(tags, query)
		data = {"status" : True}
		return JsonResponse(data)
	else:
		return HttpResponseRedirect("/page-not-found/")


def update_user_experience_tag(tags, exp_id):
	user_experience_tag.objects.filter(exp_id = exp_id).delete()
	create_user_experience_tag(tags, exp_id)
	


def delete_user_experience(request):
	if request.method == "POST" and request.is_ajax() and request.user.is_authenticated():
		user_id = User.objects.get(id = request.user.id)
		exp_id = request.POST.get("exp_id")
		user_experience.objects.get(user_id = user_id, exp_id = exp_id).delete()
		user_experience_tag.objects.filter(exp_id = exp_id).delete()
		data = {"status" : True}
		return JsonResponse(data)
	else:
		return HttpResponseRedirect("/page-not-found/")





# Below 2 APIs are for creating user experience review

def create_user_experience_review(request):
	if request.method == "POST" and request.is_ajax() and request.user.is_authenticated():
		user_id = User.objects.get(id = request.user.id)
		exp_id = request.POST.get("exp_id")
		exp_id = user_experience.objects.get(exp_id = exp_id)
		user_experience_review(user_id = user_id, exp_id = exp_id).save()
		data = {
			"exp_review_count": get_no_of_reviews(exp_id),
			"current_exp_review": True,
		}
		return JsonResponse(data)
	else:
		return HttpResponseRedirect("/page-not-found/")

def delete_user_experience_review(request):
	if request.method == "POST" and request.is_ajax() and request.user.is_authenticated():
		user_id = User.objects.get(id = request.user.id)
		exp_id = request.POST.get("exp_id")
		exp_id = user_experience.objects.get(exp_id = exp_id)
		user_experience_review.objects.get(user_id = user_id, exp_id = exp_id).delete()
		data = {
			"exp_review_count": get_no_of_reviews(exp_id),
			"current_exp_review": False,
		}
		return JsonResponse(data)
	else:
		return HttpResponseRedirect("/page-not-found/")


def get_no_of_reviews(exp_id):
	experience_reviews = user_experience_review.objects.filter(exp_id = exp_id)
	if experience_reviews: exp_count = experience_reviews.count()
	else: exp_count = 0
	return exp_count



# Below 2 APIs are for creating and deleting user bookmark experience

def create_user_bookmark_experience(request):
	if request.method == "POST" and request.is_ajax() and request.user.is_authenticated():
		user_id = User.objects.get(id = request.user.id)
		exp_id = request.POST.get("exp_id")
		exp_id = user_experience.objects.get(exp_id = exp_id)
		user_bookmark_experience(user_id = user_id, exp_id = exp_id).save()
		data = {"status": True}
		return JsonResponse(data)
	else:
		return HttpResponseRedirect("/page-not-found/")



def delete_user_bookmark_experience(request):
	if request.method == "POST" and request.is_ajax() and request.user.is_authenticated():
		user_id = User.objects.get(id = request.user.id)
		exp_id = request.POST.get("exp_id")
		exp_id = user_experience.objects.get(exp_id = exp_id)
		user_bookmark_experience.objects.get(user_id = user_id, exp_id = exp_id).delete()
		data = {"status": False}
		return JsonResponse(data)
	else:
		return HttpResponseRedirect("/page-not-found/")



# Below 2 APIs are for creating comment on experience

def create_user_experience_comment(request):
	if request.method == "POST" and request.is_ajax() and request.user.is_authenticated():
		user_id = User.objects.get(id = request.user.id)
		exp_id = request.POST.get("exp_id")
		exp_id = user_experience.objects.get(exp_id = exp_id)
		content = request.POST.get("content")
		query = user_experience_comment(user_id = user_id, exp_id = exp_id, content = content)
		query.save()
		data = {
			"name": "%s %s" %(user_id.first_name, user_id.last_name),
			"user_name": user_id.username,
			"content": content,
			"comment_id": query.comment_id,
			"no_of_comments": get_experience_no_comments(exp_id),
		}
		return JsonResponse(data)
	else:
		return HttpResponseRedirect("/page-not-found/")



def create_experience_comment_on_comment(request):
	if request.method == "POST" and request.is_ajax() and request.user.is_authenticated():
		user_id = User.objects.get(id = request.user.id)
		comment_id = request.POST.get("comment_id")
		comment_id = user_experience_comment.objects.get(comment_id = comment_id)
		content = request.POST.get("content")
		query = experience_comment_on_comment(user_id = user_id, comment_id = comment_id, content = content)
		query.save()
		data = {
			"name": "%s %s" %(user_id.first_name, user_id.last_name),
			"user_name": user_id.username,
			"content": content,
			"comment_id": query.id,
			# "no_of_comments": get_experience_no_comments(exp_id),
		}
		return JsonResponse(data)
	else:
		return HttpResponseRedirect("/page-not-found/")



def get_experience_no_comments(exp_id):
	total_comments = user_experience_comment.objects.filter(exp_id = exp_id)
	no_of_comments = total_comments.count()
	for comment in total_comments:
		comment_on_comments = experience_comment_on_comment.objects.filter(comment_id = comment).count()
		no_of_comments += comment_on_comments
	return no_of_comments




# Below 2 APIs are for deleting comment

def delete_experience_comment_on_comment(request):
	if request.method == "POST" and request.is_ajax() and request.user.is_authenticated():
		user_id = User.objects.get(id = request.user.id)
		comment_id = user_experience_comment.objects.get(comment_id = request.POST.get("comment_id"))
		child_comment_id = request.POST.get("child_comment_id")
		experience_comment_on_comment.objects.get(user_id = user_id, comment_id = comment_id, id = child_comment_id).delete()
		data = {"status": True}
		return JsonResponse(data)
	else:
		return HttpResponseRedirect("/page-not-found/")



def delete_user_experience_comment(request):
	if request.method == "POST" and request.is_ajax() and request.user.is_authenticated():
		user_id = User.objects.get(id = request.user.id)
		exp_id = request.POST.get("exp_id")
		exp_id = user_experience.objects.get(exp_id = exp_id)
		comment_id = request.POST.get("comment_id")
		user_experience_comment.objects.get(user_id = user_id, exp_id = exp_id, comment_id = comment_id).delete()
		data = {"status": True}
		return JsonResponse(data)
	else:
		return HttpResponseRedirect("/page-not-found/")




