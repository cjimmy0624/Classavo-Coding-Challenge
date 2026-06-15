from rest_framework import generics, permissions
from rest_framework_simplejwt.views import TokenObtainPairView

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
import os
from openai import OpenAI

from .serializers import (
    UserRegistrationSerializer,
    CustomTokenObtainPairSerializer
)

# ----------------------------
# AUTH VIEWS (UNCHANGED)
# ----------------------------

class UserRegistrationView(generics.CreateAPIView):
    serializer_class = UserRegistrationSerializer
    permission_classes = [permissions.AllowAny]


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer


# ----------------------------
# AI VIEW (NEW)
# ----------------------------

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))


@csrf_exempt
def ask_ai(request):
    if request.method != "POST":
        return JsonResponse({"error": "POST only"}, status=400)

    try:
        data = json.loads(request.body)

        prompt = data.get("prompt", "")
        context = data.get("context", "")

        if not prompt:
            return JsonResponse({"error": "Prompt is required"}, status=400)

        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {
                    "role": "system",
                    "content": (
                        "You are a helpful tutor inside a learning platform. "
                        "Explain clearly and simply."
                    )
                },
                {
                    "role": "user",
                    "content": f"""
Context from chapter:
{context}

User question:
{prompt}
"""
                }
            ]
        )

        return JsonResponse({
            "answer": response.choices[0].message.content
        })

    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)