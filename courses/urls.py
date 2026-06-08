from django.urls import path
from .views import CourseListView, CourseCreateView,CourseDetailView, ChapterListView,ChapterCreateView,ChapterDetailView, EnrollmentCreateView

urlpatterns = [
    path('', CourseListView.as_view(), name='course-list'), #List of all courses URL
    path('create/', CourseCreateView.as_view(), name='course-create'), #Creating a new course URL

    path('<int:pk>/', CourseDetailView.as_view(), name='course-detail'), #Detail view of a specific course URL

    path('<int:course_id>/chapters/', ChapterListView.as_view(), name='chapter-list'), #List of chapters in a course URL
    path('<int:course_id>/chapters/create/', ChapterCreateView.as_view(), name='chapter-create'), #Creating a new chapter in a course URL
    path('<int:course_id>/chapters/<int:pk>/', ChapterDetailView.as_view(), name='chapter-detail'), #Detail view of a specific chapter URL
    path('<int:course_id>/enroll/', EnrollmentCreateView.as_view(), name='enrollment-create'), #Enrolling in a course URL
]
