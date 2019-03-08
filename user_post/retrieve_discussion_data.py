from __future__ import unicode_literals
import os
from django.shortcuts import render, render_to_response, redirect
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from .models import *
from user_templates.models import *
from user_profile.models import user_profile_detail, user_follow

import urllib2
from bs4 import BeautifulSoup






def discussion_timeline_data(request, quest):
	current_user = User.objects.get(id = request.user.id)
	quest_content = quest.content
	quest_id = quest.quest_id
	data = {
		"quest_id": quest_id,
		"quest_content": quest_content,
		"quest_tags": get_quest_tags(quest),
		"user_answers": get_best_answer(quest, current_user),
		"bookmark_quest_status": get_quest_bookmark_status(quest, current_user),
	}
	data["quest_user_username"], data["quest_user_name"], data["quest_user_image"], data["quest_user_intro"] = get_user_post_detail(quest)

	return data




def discussion_page_quest_data(request, quest_id):
	current_user = User.objects.get(id = request.user.id)
	quest = user_problem.objects.get(quest_id = quest_id)

	quest_content = quest.content
	quest_id = quest.quest_id

	data = {
		"quest_id": quest_id,
		"quest_content": quest_content,
		"quest_tags": get_quest_tags(quest),
		"user_answers": get_all_user_answers(quest, current_user),
		"bookmark_quest_status": get_quest_bookmark_status(quest, current_user),
		"user_follow_status": get_user_follow_status(current_user, quest.user_id),
	}
	data["quest_user_username"], data["quest_user_name"], data["quest_user_image"], data["quest_user_intro"] = get_user_post_detail(quest)

	return JsonResponse(data)



##########################################################################################################
#
#			All the useful functions are defined below
#
##########################################################################################################


def get_user_follow_status(current_user, quest_user):
	print current_user.username
	print quest_user.username
	if quest_user.username == current_user.username: return "same"
	else:
		query = user_follow.objects.filter(user_id = current_user, user_following = quest_user)
		if query: return "following"
		else: return "not_following"



def get_complete_user_answer(request):
	if request.method == "GET" and request.is_ajax() and request.user.is_authenticated():
		ans_id = request.GET.get("ans_id")
		answer = user_answer.objects.get(ans_id = ans_id)
		data = {
			"ans_id": ans_id,
			"content": answer.content,
		}
		return JsonResponse(data)
	else:
		return HttpResponseRedirect("/page-not-found/")




def get_all_user_answers(quest, current_user):
	answer_query = user_answer.objects.filter(quest_id = quest)
	user_answers = {}
	if answer_query:
		j = 0
		for answer in answer_query:
			user_answers[j] = get_user_answer_data(answer, current_user)
			j += 1
	return user_answers



def get_best_answer(quest_id, current_user):
	answer_list = user_answer.objects.filter(quest_id = quest_id)
	if answer_list:
		score = 0
		best_answer = answer_list[0]
		for answer in answer_list:
			no_of_comments = get_no_of_comments(answer)
			agree_count, disagree_count = get_agree_disagree_count(answer)
			temp_score = no_of_comments + agree_count - disagree_count
			if score < temp_score:
				score = temp_score
				best_answer = answer
		best_answer_data = get_short_answer_data(best_answer, current_user)
		user_answers = {0: best_answer_data}
	else:
		user_answers = {}
	return user_answers



def get_short_answer_data(answer, current_user):
	answer_id = answer.ans_id
	ans_content = answer.content

	soup = BeautifulSoup(ans_content)
	text = soup.text[:300]
	if soup.find("img"):
		link = soup.find("img")
		preview_link = link['src']
	else:
		preview_link = ""

	data = {
		"answer_id": answer_id,
		"ans_preview_content": text,
		"ans_preview_link": preview_link,
		"no_of_comments": get_no_of_comments(answer),
		"answer_comments": get_answer_comments(answer),
	}
	data["user_profile_id"], data["user_profile_name"], data["user_profile_image"], data["user_profile_intro"] = get_user_post_detail(answer)
	data["agree_review_count"], data["disagree_review_count"] = get_agree_disagree_count(answer)	
	data["current_agree_review"], data["current_disagree_review"] = get_current_answer_review(answer, current_user)
	return data



def get_user_answer_data(answer, current_user):
	answer_id = answer.ans_id
	ans_content = answer.content
	data = {
		"answer_id": answer_id,
		"ans_preview_content": ans_content,
		"no_of_comments": get_no_of_comments(answer),
		"answer_comments": get_answer_comments(answer),
	}
	data["user_profile_id"], data["user_profile_name"], data["user_profile_image"], data["user_profile_intro"] = get_user_post_detail(answer)
	data["agree_review_count"], data["disagree_review_count"] = get_agree_disagree_count(answer)	
	data["current_agree_review"], data["current_disagree_review"] = get_current_answer_review(answer, current_user)
	return data



def get_quest_bookmark_status(quest, current_user):
	bookmark_status_object = user_bookmark_problem.objects.filter(quest_id = quest, user_id = current_user)
	if bookmark_status_object: bookmark_status = True
	else: bookmark_status = False
	return bookmark_status



def get_quest_tags(quest):
	question_tags = user_problem_tag.objects.filter(quest_id = quest)
	quest_tags = []
	if question_tags: quest_tags = [x.tag  for x in question_tags]
	return quest_tags



def get_answer_comments(answer):
	users_comments = user_answer_comment.objects.filter(ans_id = answer)
	answer_comments = {}
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
		answer_comments[i] = parent_comment
		i += 1
	return answer_comments



def get_no_of_comments(answer):
	users_comments = user_answer_comment.objects.filter(ans_id = answer)
	return users_comments.count()



def get_agree_disagree_count(answer):
	answer_agree_reviews = user_answer_review.objects.filter(ans_id = answer, agree = True)
	answer_disagree_reviews = user_answer_review.objects.filter(ans_id = answer, disagree = True)
	if answer_agree_reviews: agree_count = answer_agree_reviews.count()
	else: agree_count = 0

	if answer_disagree_reviews: disagree_count = answer_disagree_reviews.count()
	else: disagree_count = 0

	return (agree_count, disagree_count)



def get_current_answer_review(answer, current_user):
	if user_answer_review.objects.filter(user_id = current_user, agree = True, ans_id = answer): current_agree_review = True
	else: current_agree_review = False
	
	if user_answer_review.objects.filter(user_id = current_user, disagree = True, ans_id = answer): current_disagree_review = True
	else: current_disagree_review = False
	
	return (current_agree_review, current_disagree_review)




def get_user_post_detail(post):
	post_user = post.user_id
	user_profile = user_profile_detail.objects.get(user_id = post_user)
	if post.visibility == True:
		user_profile_name = "%s %s" %(post_user.first_name, post_user.last_name)
		user_profile_image = "http://127.0.0.1:8000/media/%s" %(user_profile.profile_image)
		user_profile_intro = user_profile.user_intro
		user_profile_id = post_user.username
	else:
		user_profile_name = "Anonymous User"
		user_profile_image = "http://127.0.0.1:8000/static/images/user_profile_male.jpg"
		user_profile_intro = "This is an anonymous user."
		user_profile_id = "anonymous"
	return (user_profile_id, user_profile_name, user_profile_image, user_profile_intro)












