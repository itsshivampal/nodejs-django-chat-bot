# -*- coding: utf-8 -*-
from __future__ import unicode_literals
import os
from django.shortcuts import render, render_to_response, redirect
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
import urllib2
from bs4 import BeautifulSoup

from .models import *
from user_profile.models import user_profile_detail
from .retrieve_experience_data import *
from .retrieve_discussion_data import *



def user_timeline_post(request):
	if request.method == "GET" and request.is_ajax() and request.user.is_authenticated():
		data = {}
		i = 0
		all_experience = user_experience.objects.all()
		all_discussion = user_problem.objects.all()
		for experience in all_experience:
			data[i] = {
				"content": experience_timeline_data(request, experience),
				"post_type": "experience"
			}
			i += 1
		for discussion in all_discussion:
			data[i] = {
				"content": discussion_timeline_data(request, discussion),
				"post_type": "discussion"
			}
			i += 1
		return JsonResponse(data)
	else:
		return HttpResponseRedirect("/page-not-found/")

def user_experience_recommendation(request, exp_id):
	if request.method == "GET" and request.is_ajax() and request.user.is_authenticated():
		exp_recom_list = user_experience.objects.all().order_by('?')[:5]
		data = {}
		i = 0
		for exp in exp_recom_list:
			data[i] = {
				"tags": get_experience_tags(exp),
				"title": exp.title,
				"id": exp.exp_id,
			}
			i += 1
		return JsonResponse(data)
	else:
		return HttpResponseRedirect("/page-not-found/")

def user_discussion_recommendation(request, quest_id):
	if request.method == "GET" and request.is_ajax() and request.user.is_authenticated():
		print quest_id
		quest_recom_list = user_problem.objects.all().order_by('?')[:5]
		data = {}
		i = 0
		for quest in quest_recom_list:
			question = quest.content
			question = BeautifulSoup(question).text[:200]
			data[i] = {
				"tags": get_quest_tags(quest),
				"question": question,
				"id": quest.quest_id,
			}
			i += 1
		return JsonResponse(data)
	else:
		return HttpResponseRedirect("/page-not-found/")






