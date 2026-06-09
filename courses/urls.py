from django.urls import path
from .views import (
    CourseListCreateView,
    CourseDetailView,
    ChapterListView,
    ChapterCreateView,
    ChapterDetailView,
    EnrollmentCreateView
)

urlpatterns = [
    path('courses/', CourseListCreateView.as_view()),
    path('courses/<int:pk>/', CourseDetailView.as_view()),

    path('courses/<int:course_id>/chapters/', ChapterListView.as_view()),
    path('courses/<int:course_id>/chapters/create/', ChapterCreateView.as_view()),

    path('chapters/<int:pk>/', ChapterDetailView.as_view()),

    path('courses/<int:course_id>/enroll/', EnrollmentCreateView.as_view()),

    path('chapters/<int:pk>/', ChapterDetailView.as_view()),

    path('chapters/<int:pk>/', ChapterUpdateView.as_view()),
path('chapters/<int:pk>/delete/', ChapterDeleteView.as_view()),
]