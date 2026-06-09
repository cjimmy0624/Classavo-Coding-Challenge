from django.urls import path
from .views import (
    CourseListCreateView,
    CourseDetailView,
    ChapterListView,
    ChapterCreateView,
    ChapterDetailView,
    ChapterUpdateView,
    ChapterDeleteView,
    EnrollmentCreateView,
    StudentEnrolledCoursesView
)

urlpatterns = [
    # COURSES
    path('courses/', CourseListCreateView.as_view()),
    path('courses/<int:pk>/', CourseDetailView.as_view()),

    # CHAPTERS
    path('courses/<int:course_id>/chapters/', ChapterListView.as_view()),
    path('courses/<int:course_id>/chapters/create/', ChapterCreateView.as_view()),

    # SINGLE CHAPTER
    path('chapters/<int:pk>/', ChapterDetailView.as_view()),
    path('chapters/<int:pk>/update/', ChapterUpdateView.as_view()),
    path('chapters/<int:pk>/delete/', ChapterDeleteView.as_view()),

    # ENROLLMENT
    path('courses/<int:course_id>/enroll/', EnrollmentCreateView.as_view()),
    path("student/courses/", StudentEnrolledCoursesView.as_view()),
]