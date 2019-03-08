from __future__ import unicode_literals

from django.shortcuts import render, render_to_response, redirect, get_object_or_404
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.template import RequestContext

from .models import *

import base64
from random import randint



def user_profile_page(request, username):
	if User.objects.filter(username = username):
		if request.user.is_authenticated():
			user = request.user.username
			if user == username:
				return render_to_response("profile_pages/user_profile.html")
			else:
				pass
				# return render_to_response("not_user_profile.html")
		else:
			return HttpResponseRedirect('/login')
	else:
		return HttpResponseRedirect('/page-not-found/')


def user_follow_page(request, username):
	if User.objects.filter(username = username):
		if request.user.is_authenticated():
			user = request.user.username
			if user == username:
				return render_to_response("profile_pages/user_profile_follow.html")
			else:
				pass
				# return render_to_response("not_user_profile_follow.html")
		else:
			return HttpResponseRedirect("/login/")
	else:
		return HttpResponseRedirect("/page-not-found/")

def user_follower_page(request, username):
	if User.objects.filter(username = username):
		if request.user.is_authenticated():
			user = request.user.username
			if user == username:
				return render_to_response("profile_pages/user_profile_follower.html")
			else:
				pass
				# return render_to_response("not_user_profile_follower.html")
		else:
			return HttpResponseRedirect("/login/")
	else:
		return HttpResponseRedirect("/page-not-found/")


def user_about_page(request, username):
	if User.objects.filter(username = username):
		if request.user.is_authenticated():
			user = request.user.username
			if user == username:
				return render_to_response("profile_pages/user_profile_about.html")
			else:
				pass
				# return render_to_response("not_user_profile_about.html")
		else:
			return HttpResponseRedirect("/login/")
	else:
		return HttpResponseRedirect("/page-not-found/")




def settings_page_views(request, username):
	if User.objects.filter(username = username):
		if request.user.is_authenticated():
			user = request.user.username
			if user == username:
				return render_to_response("profile_pages/settings_page.html")
			else:
				return HttpResponseRedirect("/page-not-found/")
		else:
			return HttpResponseRedirect("/login/")
	else:
		return HttpResponseRedirect("/page-not-found/")