from __future__ import unicode_literals

from django.shortcuts import render, render_to_response, redirect, get_object_or_404
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse



def about_us_page(request):
	return render_to_response("miscllaneous_pages/about_us.html")

def faqs_page(request):
	return render_to_response("miscllaneous_pages/faqs.html")

def about_company_page(request):
	return render_to_response("miscllaneous_pages/about_company.html")

def business_with_us_page(request):
	return render_to_response("miscllaneous_pages/business_with_us.html")

def career_with_us_page(request):
	return render_to_response("miscllaneous_pages/career_with_us.html")

def contact_us_page(request):
	return render_to_response("miscllaneous_pages/contact_us.html")

def privacy_policy_page(request):
	return render_to_response("miscllaneous_pages/privacy_policy.html")

def terms_and_conditions_page(request):
	return render_to_response("miscllaneous_pages/terms_and_conditions.html")