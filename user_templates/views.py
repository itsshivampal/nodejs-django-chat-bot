from __future__ import unicode_literals

from django.shortcuts import render, render_to_response, redirect, get_object_or_404
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.template import RequestContext

from .models import *

import base64
from random import randint



def home_page(request):
	if request.user.is_authenticated():
		return render_to_response("index.html")
	else:
		return redirect('/login/')


def topic_page(request, group_name):
	if request.user.is_authenticated():
		print group_name
		return render_to_response("general_pages/topic_page.html")
	else:
		return redirect('/login/')


def page_not_found(request):
	return render_to_response("general_pages/page_not_found.html")
	

def experience_page(request, exp_id):
	if request.user.is_authenticated():
		print exp_id
		return render_to_response("post_pages/experience_page.html")
	else:
		return redirect('/login/')

def discussion_page(request):
	if request.user.is_authenticated():
		return render_to_response("post_pages/discussion_page.html")
	else:
		return redirect('/login/')

def answer_write_page(request, quest_id):
	if request.user.is_authenticated():
		return render_to_response("post_pages/write_answer.html")
	else:
		return redirect('/login/')


def chat_page(request, username):
	if User.objects.filter(username = username):
		if request.user.is_authenticated():
			return render_to_response("general_pages/chat_page.html")
		else:
			return HttpResponseRedirect("/login/")
	else:
		return HttpResponseRedirect("/page-not-found/")



from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.core import serializers



def temp_page_data(request):
	numbers_list = range(1, 1000)
	page = int(request.GET.get("page"))
	print page
	paginator = Paginator(numbers_list, 20)

	try:
		numbers = paginator.page(page)
	except PageNotAnInteger:
		numbers = paginator.page(1)
	except EmptyPage:
		numbers = paginator.page(paginator.num_pages)

	data = {}
	c = 0
	for num in numbers:
		data[c] = num
		c += 1
	data["next_page"] = numbers.next_page_number()
	print numbers.next_page_number()
	return JsonResponse(data)





def temp_page(request):
	return render_to_response("temp.html")


