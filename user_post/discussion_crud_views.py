from __future__ import unicode_literals
import os
from django.shortcuts import render, render_to_response, redirect
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from .models import *
from user_templates.models import *
from user_profile.models import user_profile_detail
from .retrieve_discussion_data import *

import urllib2
from bs4 import BeautifulSoup





def create_user_problem(request):
	if request.method == "POST" and request.is_ajax() and request.user.is_authenticated():
		user_id = User.objects.get(id = request.user.id)
		content = request.POST.get("content")
		tags = request.POST.get("tags")
		visibility = True if request.POST.get("visibility") == "true" else False
		query = user_problem(user_id = user_id, content = content, visibility = visibility)
		query.save()
		if tags != "":	create_user_problem_tag(tags, query)
		data = {"status" : True}
		return JsonResponse(data)
	else:
		return HttpResponseRedirect("/page-not-found/")

def create_user_problem_tag(tags, quest_id):
	tags = tags.split(",")
	for tag in tags:
		query = user_problem_tag(quest_id = quest_id, tag = tag)
		query.save()



def delete_user_problem(request):
	if request.method == "POST" and request.is_ajax() and request.is_authenticated():
		user_id = User.objects.get(id = request.user.id)
		quest_id = request.POST.get("quest_id")
		query1 = user_problem.objects.get(user_id = user_id, quest_id = quest_id)
		query2 = user_problem_tag.objects.filter(quest_id = query1)
		query2.delete()
		query1.delete()
		return JsonResponse({"status": True})
	else:
		return HttpResponseRedirect("/page-not-found/")


def user_answer_create(request):
	if request.method == "POST" and request.is_ajax() and request.user.is_authenticated():
		user_id = User.objects.get(id = request.user.id)
		quest_id = request.POST.get("quest_id")
		quest_id = user_problem.objects.get(quest_id = quest_id)
		content = request.POST.get("content")
		visibility = True if request.POST.get("visibility") == "true" else False
		query = user_answer(user_id = user_id, quest_id = quest_id, content = content, visibility = visibility)
		query.save()
		data = {status: True}
		return JsonResponse(data)
	else:
		return HttpResponseRedirect("/page-not-found/")

# delete user answer
# update user answer



def get_user_answer_review(request):
	if request.method == "POST" and request.is_ajax() and request.user.is_authenticated():
		user_id = User.objects.get(id = request.user.id)
		agree = True if request.POST.get("agree") == "true" else False
		disagree = True if request.POST.get("disagree") == "true" else False
		answer = user_answer.objects.get(ans_id = request.POST.get("ans_id"))
		query1, query2 = user_answer_review.objects.update_or_create(user_id = user_id, ans_id = answer, defaults={'agree': agree, 'disagree': disagree})
		
		answer_agree_reviews = user_answer_review.objects.filter(ans_id = answer, agree = True)
		answer_disagree_reviews = user_answer_review.objects.filter(ans_id = answer, disagree = True)
		agree_count = answer_agree_reviews.count() if answer_agree_reviews else 0
		disagree_count = answer_disagree_reviews.count() if answer_disagree_reviews else 0

		data = {
			"agree" :agree,
			"disagree":disagree,
			"agree_count":agree_count,
			"disagree_count":disagree_count,
		}
		return JsonResponse(data)
	else:
		return HttpResponseRedirect("/page-not-found/")



def create_user_bookmark_problem(request):
	if request.method == "POST" and request.is_ajax() and request.user.is_authenticated():
		user_id = User.objects.get(id = request.user.id)
		quest_id = user_problem.objects.get(quest_id = request.POST.get("quest_id"))
		user_bookmark_problem(user_id = user_id, quest_id = quest_id).save()
		data = {"status": True}
		return JsonResponse(data)
	else:
		return HttpResponseRedirect("/page-not-found/")


def delete_user_bookmark_problem(request):
	if request.method == "POST" and request.is_ajax() and request.user.is_authenticated():
		user_id = User.objects.get(id = request.user.id)
		quest_id = user_problem.objects.get(quest_id = request.POST.get("quest_id"))
		user_bookmark_problem.objects.get(user_id = user_id, quest_id = quest_id).delete()
		data = {"status": False}
		return JsonResponse(data)
	else:
		return HttpResponseRedirect("/page-not-found/")




def create_user_answer_comment(request):
	# if request.method == "POST" and request.is_ajax() and request.is_authenticated():
	user_id = User.objects.get(id = request.user.id)
	ans_id = user_answer.objects.get(ans_id = request.POST.get("ans_id"))
	content = request.POST.get("content")
	query = user_answer_comment(user_id = user_id, ans_id = ans_id, content = content)
	query.save()
	data = {
		"name": "%s %s" %(user_id.first_name, user_id.last_name),
		"user_name": user_id.username,
		"content": content,
		"comment_id": query.comment_id,
		"no_of_comments":user_answer_comment.objects.filter(ans_id = ans_id).count(),
	}
	return JsonResponse(data)
	# else:
	# 	return HttpResponseRedirect("/page-not-found/")


def delete_user_answer_comment(request):
	if request.method == "POST" and request.is_ajax() and request.is_authenticated():
		user_id = User.objects.get(id = request.user.id)
		comment_id = request.POST.get("comment_id")
		user_answer_comment.objects.get(user_id = user_id, comment_id = comment_id).delete()
		data = {"status": True}
		return JsonResponse(data)
	else:
		return HttpResponseRedirect("/page-not-found/")

