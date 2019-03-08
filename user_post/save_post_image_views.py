# -*- coding: utf-8 -*-
from __future__ import unicode_literals
import os
from django.shortcuts import render, render_to_response, redirect
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from .models import *
from user_templates.models import *
from user_profile.models import user_profile_detail

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))



def save_user_exp_post_image(request):
	if request.method == "POST" and request.is_ajax() and request.user.is_authenticated():
		user_id = request.user
		username = user_id.username
		post_image = request.FILES.get("image")
		image_name = post_image.name

		directory = os.path.join(BASE_DIR, "media_cdn/experience_images/")
		if not os.path.exists(directory):
			os.makedirs(directory)

		file_name = "experience_images/" + image_name
		file_location = "media_cdn/" + file_name

		filehandler = open(file_location, "wb")
		while 1:
			chunk = post_image.file.read(100000)
			if not chunk:
				break
			filehandler.write(chunk)
		filehandler.close()

		image_url = "http://127.0.0.1:8000/media/%s" %(file_name)

		data = {
			"image_url" : image_url,
			"status" : 200
		}
		return JsonResponse(data)
	else:
		return HttpResponseRedirect("/page-not-found/")


def save_user_discuss_post_image(request):
	if request.method == "POST" and request.is_ajax() and request.user.is_authenticated():
		user_id = User.objects.get(id = request.user.id)
		username = user_id.username
		post_image = request.FILES.get("image")
		image_name = post_image.name

		directory = os.path.join(BASE_DIR, "media_cdn/discussion_images/")
		if not os.path.exists(directory):
			os.makedirs(directory)

		file_name = "discussion_images/" + image_name
		file_location = "media_cdn/" + file_name

		filehandler = open(file_location, "wb")
		while 1:
			chunk = post_image.file.read(100000)
			if not chunk:
				break
			filehandler.write(chunk)
		filehandler.close()

		image_url = "http://127.0.0.1:8000/media/%s" %(file_name)

		data = {
			"image_url" : image_url,
			"status" : 200
		}
		return JsonResponse(data)
	else:
		return HttpResponseRedirect("/page-not-found/")


def save_user_answer_post_image(request):
	if request.method == "POST" and request.is_ajax() and request.user.is_authenticated():
		user_id = User.objects.get(id = request.user.id)
		username = user_id.username
		post_image = request.FILES.get("image")
		image_name = post_image.name

		directory = os.path.join(BASE_DIR, "media_cdn/answer_images/")
		if not os.path.exists(directory):
			os.makedirs(directory)

		file_name = "answer_images/" + image_name
		file_location = "media_cdn/" + file_name

		filehandler = open(file_location, "wb")
		while 1:
			chunk = post_image.file.read(100000)
			if not chunk:
				break
			filehandler.write(chunk)
		filehandler.close()

		image_url = "http://127.0.0.1:8000/media/%s" %(file_name)

		data = {
			"image_url" : image_url,
			"status" : 200
		}
		return JsonResponse(data)
	else:
		return HttpResponseRedirect("/page-not-found/")