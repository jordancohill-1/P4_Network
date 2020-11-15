from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    pass

class Post(models.Model):
    user = models.ForeignKey("User", on_delete=models.CASCADE, related_name="posts")
    text = models.TextField(blank=True)
    timestamp = models.DateTimeField(auto_now_add=True)
    is_follower = models.BooleanField(default=False)


    def serialize(self):
        return {
            "id": self.id,
            "username": self.user.username,
            "text": self.text,
            "timestamp": self.timestamp.strftime("%b %-d %Y, %-I:%M %p"),
            "is_follower": self.is_follower
        }

class Follow(models.Model):
    followed = models.ForeignKey("User", on_delete=models.CASCADE, related_name="user_followed")
    follower = models.ForeignKey("User", on_delete=models.CASCADE, related_name="user_follower")
    timestamp = models.DateTimeField(auto_now_add=True)

    def serialize(self):
        return {
            "id": self.id,
            "followed": self.followed.username,
            "follower": self.follower.username,
            "timestamp": self.timestamp.strftime("%b %-d %Y, %-I:%M %p"),

        }

class Like(models.Model):
    post = models.ForeignKey("Post", on_delete=models.CASCADE, related_name="liked_post")
    liker = models.ForeignKey("User", on_delete=models.CASCADE, related_name="post_liker")
    timestamp = models.DateTimeField(auto_now_add=True)

    def serialize(self):
        return {
            "id": self.id,
            "post": self.post,
            "liker": self.user,
            "timestamp": self.timestamp.strftime("%b %-d %Y, %-I:%M %p"),

        }

