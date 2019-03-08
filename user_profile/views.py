# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render, render_to_response, redirect
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
import base64
import os
from .models import *
from user_templates.models import *
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from django.db.models import Q


BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
# Create your views here.





def save_profile_image(request):
	if request.method == "POST" and request.is_ajax():
		requested_user = request.user
		username = requested_user.username
		image_base64 = request.POST.get("image")
		format, imgstr = image_base64.split(';base64,')
		image_data = imgstr.decode("base64")

		directory = os.path.join(BASE_DIR, "media_cdn/profile_images/", username)
		if not os.path.exists(directory):
			os.makedirs(directory)

		file_name = "profile_images/" + username + "/user_profile" ".png"
		file_location = "media_cdn/" + file_name

		filehandler = open(file_location, "wb+")
		filehandler.write(image_data)
		filehandler.close()

		query = user_profile_detail.objects.get(user_id = requested_user)
		query.profile_image = file_name
		query.save()
		data = {
			"image_url" : "http://127.0.0.1:8000/media/" + file_name
		}
		return JsonResponse(data)



def get_user_dashboard(request, username):
	if request.method == "POST" and request.is_ajax():
		requested_user = User.objects.get(username = username)
		query = user_profile_detail.objects.get(user_id = requested_user)
		# query1 = user_dashboard_image.objects.get(user_id = requested_user)
		data = {
			"user_image" : "http://127.0.0.1:8000/media/%s" %(query.profile_image),
			"user_intro" : query.user_intro,
			"user_name" : "%s %s" %(requested_user.first_name, requested_user.last_name),
		}
		return JsonResponse(data)



def save_user_edit_profile(request):
	if request.method == "POST" and request.is_ajax():
		requested_user = request.user
		user_first_name = request.POST.get("user_first_name")
		user_last_name = request.POST.get("user_last_name")
		user_mobile = request.POST.get("user_mobile")
		user_gender = request.POST.get("user_gender")
		user_dob = request.POST.get("user_date_of_birth")
		user_bio = request.POST.get("user_bio")

		print user_bio

		query1 = User.objects.get(id = requested_user.id)
		query1.first_name = user_first_name
		query1.last_name = user_last_name
		query1.save()

		query2 = user_detail.objects.get(user_id = requested_user)
		query2.mobile = user_mobile
		query2.gender = user_gender
		query2.date_of_birth = user_dob
		query2.user_bio = user_bio
		query2.save()
		data = {
			"status" : True
		}
		return JsonResponse(data)


def send_user_settings_data(request):
	if request.method == "POST" and request.is_ajax():
		requested_user = request.user
		details = user_detail.objects.get(user_id = requested_user)
		subscription = user_subscription.objects.get(user_id = requested_user)
		data = {
			"user_username" : requested_user.username,
			"user_email" : requested_user.email,
			"user_first_name" : requested_user.first_name,
			"user_last_name" : requested_user.last_name,
			"user_mobile" : details.mobile,
			"user_gender" : details.gender,
			"user_dob" : details.date_of_birth,
			"user_bio" : details.user_bio,
			"email_subs": subscription.email_subscribe,
			"sms_subs": subscription.sms_subscribe,
		}
		return JsonResponse(data)
		

def request_change_password(request):
	if request.method == "POST" and request.is_ajax():
		requested_user = request.user
		old_password = request.POST.get("old_password")
		new_password = request.POST.get("new_password")
		user = authenticate(username = requested_user.username, password = old_password)
		if user is not None:
			query = User.objects.get(username = requested_user.username)
			query.set_password(new_password)
			query.save()
			data = {
				"status" : True
			}
		else:
			data = {
				"status" : False
			}
		return JsonResponse(data)



def save_user_subscription_data(request):
	if request.method == "POST" and request.is_ajax():
		user_id = User.objects.get(id = request.user.id)
		email_subscription = request.POST.get("email_subscription")
		sms_subscription = request.POST.get("sms_subscription")

		email_subscription = True if email_subscription=="true" else False
		sms_subscription = True if sms_subscription == "true" else False

		query = user_subscription.objects.get(user_id = user_id)
		query.email_subscribe = email_subscription
		query.sms_subscribe = sms_subscription
		query.save()

		data = {
			"status": True
		}
		return JsonResponse(data)




def header_data_api(request):
	requested_user = request.user
	username = requested_user.username
	query = user_profile_detail.objects.get(user_id = requested_user)
	profile_image = query.profile_image
	data = {
		"username": username,
		"profile_image": "http://127.0.0.1:8000/media/%s" %(profile_image),
		"first_name": requested_user.first_name,
		"last_name": requested_user.last_name,
	}
	return JsonResponse(data)






















def add_user_follow(request, username):
	if request.method == "POST" and request.is_ajax() and request.user.is_authenticated():
		user1 = request.user
		user2 = User.objects.get(username = username)
		user_follow(user_id = user1, user_following = user2).save()
		return JsonResponse({"status" : True})
	else:
		return HttpResponseRedirect("/page-not-found/")

def delete_user_follow(request, username):
	if request.method == "POST" and request.is_ajax() and request.user.is_authenticated():
		user1 = request.user
		user2 = User.objects.get(username = username)
		user_follow.objects.get(user_id = user1, user_following = user2).delete()
		return JsonResponse({"status" : True})
	else:
		return HttpResponseRedirect("/page-not-found/")


def user_follow_list(request, username):
	if request.method == "GET" and request.is_ajax() and request.user.is_authenticated():
		current_user = request.user
		profile_user = User.objects.get(username = username)
		data = {}
		if current_user.username != profile_user.username:
			is_user_follow = user_follow.objects.filter(user_id = current_user, user_following = profile_user)
			if is_user_follow:
				follow_list = user_follow.objects.filter(user_following = profile_user)
				i = 0
				for query_user_follow in follow_list:
					query_user = query_user_follow.user_id
					user_image = user_profile_detail.objects.get(user_id = query_user)
					data[i] = {
						"name": "%s %s" %(query_user.first_name, query_user.last_name),
						"username": query_user.username,
						"profile_image": "http://127.0.0.1:8000/media/%s" %(user_image.profile_image),
						"follow_status": get_user_follow_status(current_user, query_user),
					}
					i += 1
		else:
			follow_list = user_follow.objects.filter(user_following = profile_user)
			i = 0
			for query_user_follow in follow_list:
				query_user = query_user_follow.user_id
				user_image = user_profile_detail.objects.get(user_id = query_user)
				data[i] = {
					"name": "%s %s" %(query_user.first_name, query_user.last_name),
					"username": query_user.username,
					"profile_image": "http://127.0.0.1:8000/media/%s" %(user_image.profile_image),
					"follow_status": "following",
				}
				i += 1
		return JsonResponse(data)
	else:
		return HttpResponseRedirect("/page-not-found/")

def user_following_list():
	pass

def user_follow_recommendation():
	pass





def get_user_follow_status(current_user, another_user):
	if user_follow.objects.filter(user_id = current_user, user_following = another_user):
		return "following"
	else: return "not_following"











def send_follow_details(request, username):
	# if request.method == "POST" and request.is_ajax():
	requested_user = request.user
	if username == requested_user.username:
		query = user_follow.objects.filter(user_id = requested_user)
		following_list = {}
		c = 0
		for user in query:
			query1 = User.objects.get(username = user.user_following)
			# query2 = user_profile_detail.objects.get(user_id = user.user_following)
			following = {
				"user_username" : query1.username,
				"user_full_name" : "%s %s" %(query1.first_name, query1.last_name),
				"user_image" : "../../static/images/image1.jpg",
				"user_intro" : "Student at IIT Kanpur",
				"user_profile_link" : "http://127.0.0.1:8000/user-shivampa/",
				"relation" : "Following",
			}
			following_list[c] = following
			c += 1
		data = following_list
		return JsonResponse(data)
	else:
		profile_user = User.objects.get(username = username)
		query = user_follow.objects.filter(user_id = profile_user)
		following_list = {}
		c = 0
		for user in query:
			query1 = User.objects.get(username = user.user_following)
			# query2 = user_profile_detail.objects.get(user_id = user.user_following)
			
			if user_follow.objects.filter(user_id = requested_user, user_following = user.user_following):
				relation = "Following"
			else:
				relation = "Follow"

			# print user_follow.objects.filter(user_id = requested_user, user_following = user)

			following = {
				"user_username" : query1.username,
				"user_full_name" : "%s %s" %(query1.first_name, query1.last_name),
				"user_image" : "../../static/images/image1.jpg",
				"user_intro" : "This is dummy intro which is used for just testing purpose.",
				"user_profile_link" : "http://127.0.0.1:8000/user-shivampa/",
				"relation" : relation,
			}
			following_list[c] = following
			c += 1
		data = following_list
		return JsonResponse(data)

















def get_user_chat_status(request):
	present_chat_user = request.GET.get("present_chat_user")
	user1 = User.objects.get(username = present_chat_user)
	user2 = User.objects.get(username = request.user.username)

	query = user_chat_session.objects.filter(Q(user1 = user1, user2 = user2) | Q(user2 = user1, user1 = user2))
	if query:
		query1 = query[0]
		if query1.status == "0":
			data = {"status": query1.status}
		elif query1.status == "1":
			if query1.action_user_id == user2:
				data = {"status": 1, "requested_action_user": True}
			else:
				data = {"status": 1, "requested_action_user": False}
		elif query1.status == "2":
			data = {"status": 2}
		elif query1.status == "3":
			data = {"status": 3}
		elif query1.status == "4":
			if query1.action_user_id == user2:
				data = {"status": 1, "requested_action_user": True}
			else:
				data = {"status": 1, "requested_action_user": False}
	else:
		data = {"status": 0}

	return JsonResponse(data)

def start_chat_request(request):
	present_chat_user = request.GET.get("present_chat_user")
	user1 = User.objects.get(username = present_chat_user)
	user2 = User.objects.get(username = request.user.username)
	query = user_chat_session.objects.filter(Q(user1 = user1, user2 = user2) | Q(user2 = user1, user1 = user2))

	if query:
		print "have record"
		query1 = query[0]
		query1.status = "1"
		query1.action_user_id = user2
		query1.save()
	else:
		print "creating new record"
		save_query = user_chat_session(user1 = user1, user2 = user2, status = 1, action_user_id = user2)
		save_query.save()

	data = {
		"status": 1
	}

	return JsonResponse(data)


def accept_chat_request(request):
	present_chat_user = request.GET.get("present_chat_user")
	user1 = User.objects.get(username = present_chat_user)
	user2 = User.objects.get(username = request.user.username)
	query = user_chat_session.objects.filter(Q(user1 = user1, user2 = user2) | Q(user2 = user1, user1 = user2))

	query1 = query[0]
	query1.status = "2"
	query1.action_user_id = user2
	query1.save()

	data = {
		"status": 2
	}

	return JsonResponse(data)


def decline_chat_request(request):
	present_chat_user = request.GET.get("present_chat_user")
	user1 = User.objects.get(username = present_chat_user)
	user2 = User.objects.get(username = request.user.username)
	query = user_chat_session.objects.filter(Q(user1 = user1, user2 = user2) | Q(user2 = user1, user1 = user2))

	query1 = query[0]
	query1.status = "3"
	query1.action_user_id = user2
	query1.save()

	data = {
		"status": 2
	}

	return JsonResponse(data)


def block_chat_request(request):
	present_chat_user = request.GET.get("present_chat_user")
	user1 = User.objects.get(username = present_chat_user)
	user2 = User.objects.get(username = request.user.username)
	query = user_chat_session.objects.filter(Q(user1 = user1, user2 = user2) | Q(user2 = user1, user1 = user2))

	query1 = query[0]
	query1.status = "4"
	query1.action_user_id = user2
	query1.save()

	data = {
		"status": 2
	}

	return JsonResponse(data)

def cancel_block_chat_request(request):
	present_chat_user = request.GET.get("present_chat_user")
	user1 = User.objects.get(username = present_chat_user)
	user2 = User.objects.get(username = request.user.username)
	query = user_chat_session.objects.filter(Q(user1 = user1, user2 = user2) | Q(user2 = user1, user1 = user2))

	query1 = query[0]
	query1.status = "0"
	query1.action_user_id = user2
	query1.save()

	data = {
		"status": 2
	}

	return JsonResponse(data)

def get_chat_session_data(request):
	present_chat_user = request.GET.get("present_chat_user")
	user1 = User.objects.get(username = present_chat_user)
	user2 = User.objects.get(username = request.user.username)
	query = user_chat_session.objects.filter(Q(user1 = user1, user2 = user2) | Q(user2 = user1, user1 = user2))

	query1 = query[0]
	data = {
		"chat_id": query1.chat_id,
		"chat_from": user2.username,
	}

	return JsonResponse(data)



