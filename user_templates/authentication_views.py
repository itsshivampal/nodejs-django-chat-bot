from __future__ import unicode_literals

from django.shortcuts import render, render_to_response, redirect, get_object_or_404
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.template import RequestContext

from django.views.decorators.csrf import csrf_exempt

from .models import *
from user_profile.models import user_profile_detail, user_detail, user_subscription

import base64
from random import randint



def login_page(request):
	if request.user.is_authenticated():
		return redirect('/')
	else:
		return render_to_response("authentication_pages/login_page.html")

def signup_page(request):
	if request.user.is_authenticated():
		return redirect('/')
	else:
		return render_to_response("authentication_pages/signup_page.html")

def forget_password_page(request):
	if request.user.is_authenticated():
		return redirect('/')
	else:
		return render_to_response('authentication_pages/forget_password.html')


def forget_change_password_page(request, email_encrypt, count):
	if request.user.is_authenticated():
		return redirect('/')
	else:
		email_encrypt = str(email_encrypt)
		count = int(count)
		for i in range(count):
			email_encrypt += "="
		try:
			email_decrypt = email_encrypt.decode("base64", "strict")
			if User.objects.filter(email = email_decrypt):
				return render_to_response('authentication_pages/forget_change_password.html')
			else:
				return HttpResponseRedirect("/page-not-found/")
		except:
			return HttpResponseRedirect("/page-not-found/")






# *********************************************************************************************************
'''
Section : In this section, I wrote functions for login and signup of user
'''
# *********************************************************************************************************


@csrf_exempt
def verify_signup_details(request):
	if request.method == "POST" and request.is_ajax():
		first_name = request.POST.get("first_name")
		last_name = request.POST.get("last_name")
		username = request.POST.get("username")
		user_email = request.POST.get("user_email")
		user_password = request.POST.get("user_password")
		if User.objects.filter(email = user_email, username = username):
			data = {
				"status" : 400,
			}
		elif User.objects.filter(email = user_email):
			data = {
				"status" : 401,
			}
		elif User.objects.filter(username = username):
			data = {
				"status" : 402,
			}
		else:
			query = User.objects.create_user(username = username,
											email = user_email,
											password = user_password,
											first_name = first_name,
											last_name = last_name
										)
			query.save()
			
			# query1 = User.objects.get(username = username)
			query1 = user_subscription(user_id = query)
			query2 = user_profile_detail(user_id = query)
			query3 = user_detail(user_id = query)

			query1.save()
			query2.save()
			query3.save()

			user = authenticate(username = username, password = user_password)
			login(request, user)
			data = {
				"status" : 200
			}
		return JsonResponse(data)


@csrf_exempt
def verify_login_details(request):
	if request.method == "POST" and request.is_ajax():
		user_login = request.POST.get("user_login")
		password = request.POST.get("user_password")
		entry_type = request.POST.get("type")
		if entry_type=="username":
			user = authenticate(username = user_login, password = password)
			if user is not None:
				login(request, user)
				data = {"status" : 0}
			else:
				data = {"status" : 1}
		elif entry_type=="email":
			if User.objects.filter(email = user_login):
				username = User.objects.get(email = user_login).username
				user = authenticate(username = username, password = password)
				if user is not None:
					login(request, user)
					data = {"status" : 0}
				else:
					data = {"status" : 2}
			else:
				data = {"status" : 2}
		return JsonResponse(data)


@csrf_exempt
def forget_password_email(request):
	if request.method == "POST" and request.is_ajax():
		user_email_id = request.POST.get("user_email_id")
		print user_email_id
		if User.objects.filter(email = user_email_id):
			user_email_encrypt = user_email_id.encode("base64", "strict")[:-1]
			email_length = len(user_email_encrypt)
			count = 0
			for i in range(email_length):
				if user_email_encrypt[-i-1] == "=":
					count += 1
				else:
					break
			if count != 0:
				user_email_encrypt = user_email_encrypt[:-count]
			change_password_link = "http://127.0.0.1:8000/change-password/"+user_email_encrypt+"-"+str(count)+"/"
			print change_password_link
			# send link to email
			data = {
				"status" : 1,
				"change_password_link" : change_password_link,
			}
		else:
			data = {"status" : 0}
		return JsonResponse(data)
	else:
		return HttpResponseRedirect("/page-not-found/")


@csrf_exempt
def forget_change_password(request):
	if request.method == "POST" and request.is_ajax():
		user_email_string = request.POST.get("email_string")
		new_password = request.POST.get("new_password")


		email_encrypt, count = user_email_string.split("-")
		count = int(count)
		for i in range(count):
			email_encrypt += "="
		email_decrypt = email_encrypt.decode("base64", "strict")

		query = User.objects.get(email = email_decrypt)
		query.set_password(new_password)
		query.save()
		data = {"status" : 1}
		
		return JsonResponse(data)
	else:
		return HttpResponseRedirect("/page-not-found/")


def logout_user(request):
	if request.user.is_authenticated():
		logout(request)
		return redirect('/')
	else:
		return render_to_response("login_signup.html")
