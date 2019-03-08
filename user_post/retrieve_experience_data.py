from __future__ import unicode_literals
import os
from django.shortcuts import render, render_to_response, redirect
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from .models import *
from user_profile.models import user_profile_detail

import urllib2
from bs4 import BeautifulSoup





def experience_timeline_data(request, experience):
	current_user = User.objects.get(id = request.user.id)
	current_profile_id = current_user.username
	exp_count, current_exp_review = get_user_experience_review(experience, current_user)
	experience_author = get_user_expereince_details(experience)
	text, preview_link = get_some_user_experience_content(experience)
	data = {
		"user_profile_id": experience_author["user_profile_id"],
		"current_profile_id": current_profile_id,
		"experience_id": experience_author["experience_id"],
		"exp_title": experience_author["exp_title"],
		"exp_preview_content": text,
		"exp_preview_link": preview_link,
		"exp_tags": get_experience_tags(experience),
		"user_profile_name": experience_author["user_profile_name"],
		"user_profile_image": experience_author["user_profile_image"],
		"user_profile_intro": experience_author["user_profile_intro"],
		"exp_review_count": exp_count,
		"no_of_comments": get_experience_no_comments(experience),
		"current_exp_review": current_exp_review,
		"experience_comments": get_experience_comments(experience),
		"bookmark_status": get_exp_bookmark_status(experience, current_user),
	}
	return data



def get_complete_user_experience(request):
	if request.method == "GET" and request.is_ajax() and request.user.is_authenticated():
		exp_id = request.GET.get("exp_id")
		exp = user_experience.objects.get(exp_id = exp_id)
		data = {
			"exp_id": exp_id,
			"content": exp.content,
		}
		return JsonResponse(data)
	else:
		return HttpResponseRedirect("/page-not-found/")






def experience_page_exp_data(request, exp_id):
	if request.method == "GET" and request.is_ajax() and request.user.is_authenticated():
		current_user = User.objects.get(id = request.user.id)
		experience = user_experience.objects.get(exp_id = exp_id)
		current_profile_id = current_user.username
		exp_count, current_exp_review = get_user_experience_review(experience, current_user)
		experience_author = get_user_expereince_details(experience)
		data = {
			"user_profile_id": experience_author["user_profile_id"],
			"current_profile_id": current_profile_id,
			"experience_id": experience_author["experience_id"],
			"exp_title": experience_author["exp_title"],
			"exp_content": get_complete_user_experience_content(experience),
			"exp_tags": get_experience_tags(experience),
			"user_profile_name": experience_author["user_profile_name"],
			"user_profile_image": experience_author["user_profile_image"],
			"user_profile_intro": experience_author["user_profile_intro"],
			"exp_review_count": exp_count,
			"no_of_comments": get_experience_no_comments(experience),
			"current_exp_review": current_exp_review,
			"experience_comments": get_experience_comments(experience),
			"bookmark_status": get_exp_bookmark_status(experience, current_user),
		}
		return JsonResponse(data)
	else:
		return HttpResponseRedirect("/page-not-found/")






##########################################################################################################
#
#			All the useful functions are defined below
#
##########################################################################################################




def get_experience_comments(exp_id):
	users_comments = user_experience_comment.objects.filter(exp_id = exp_id)
	experience_comments = {}
	i = 0
	for user_comment in users_comments:
		complete_parent_comment = {}
		user_id = user_comment.user_id
		person_username = user_id.username
		person_name = "%s %s" %(user_id.first_name, user_id.last_name)
		parent_comment = {
			"name": person_name,
			"user_name": person_username,
			"content": user_comment.content,
			"comment_id": user_comment.comment_id
		}
		comments = experience_comment_on_comment.objects.filter(comment_id = user_comment.comment_id)
		if comments:
			j = 0
			children_comment = {}
			for comment in comments:
				user_id = comment.user_id
				person_username = user_id.username
				person_name = "%s %s" %(user_id.first_name, user_id.last_name)
				index_value = "reply_" + str(j)
				child_comment = {
					"name": person_name,
					"user_name": person_username,
					"content": comment.content,
					"comment_id": comment.id
				}
				j += 1
				children_comment[index_value] = child_comment
			complete_parent_comment["children_comment"] = children_comment
		complete_parent_comment["parent_comment"] = parent_comment
		experience_comments[i] = complete_parent_comment
		i += 1
	return experience_comments



def get_experience_tags(exp_id):
	experience_tags = user_experience_tag.objects.filter(exp_id = exp_id)
	if experience_tags: exp_tags = [x.tag  for x in experience_tags]
	else: exp_tags = []

	return exp_tags



def get_experience_no_comments(exp_id):
	total_comments = user_experience_comment.objects.filter(exp_id = exp_id)
	no_of_comments = total_comments.count()
	for comment in total_comments:
		comment_on_comments = experience_comment_on_comment.objects.filter(comment_id = comment).count()
		no_of_comments += comment_on_comments
	return no_of_comments



def get_user_experience_review(exp_id, current_user):
	experience_reviews = user_experience_review.objects.filter(exp_id = exp_id)
	if experience_reviews: exp_count = experience_reviews.count()
	else: exp_count = 0

	if user_experience_review.objects.filter(user_id = current_user, exp_id = exp_id): current_exp_review = True
	else: current_exp_review = False

	return (exp_count, current_exp_review)



def get_exp_bookmark_status(exp_id, current_user):
	bookmark_status_object = user_bookmark_experience.objects.filter(exp_id = exp_id, user_id = current_user)
	if bookmark_status_object: bookmark_status = True
	else: bookmark_status = False
	return bookmark_status



def get_complete_user_experience_content(exp_id):
	return exp_id.content



def get_some_user_experience_content(exp_id):
	soup = BeautifulSoup(exp_id.content)
	text = soup.text[:300]

	if soup.find("img"):
		link = soup.find("img")
		preview_link = link['src']
	else: preview_link = ""

	return (text, preview_link)



def get_user_expereince_details(exp_id):
	exp_user = exp_id.user_id
	user_profile = user_profile_detail.objects.get(user_id = exp_user)
	data = {}
	data["experience_id"] = exp_id.exp_id
	data["exp_title"] = exp_id.title
	if exp_id.visibility == True:
		data["user_profile_name"] = "%s %s" %(exp_user.first_name, exp_user.last_name)
		data["user_profile_image"] = "http://127.0.0.1:8000/media/%s" %(user_profile.profile_image)
		data["user_profile_intro"] = user_profile.user_intro
		data["user_profile_id"] = exp_user.username
	else:
		data["user_profile_name"] = "Anonymous User"
		data["user_profile_image"] = "http://127.0.0.1:8000/static/images/user_profile_male.jpg"
		data["user_profile_intro"] = "This is an anonymous user."
		data["user_profile_id"] = "anonymous"
	return data


