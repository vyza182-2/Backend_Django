from rest_framework import serializers
from .models import Visitor


class VisitorSerializer(serializers.ModelSerializer):
    name = serializers.CharField(required=False, write_only=True)
    website = serializers.CharField(required=False, allow_blank=True, write_only=True)

    class Meta:
        model = Visitor
        fields = ['id', 'full_name', 'name', 'mobile', 'email', 'website', 'created_at']
        read_only_fields = ['id', 'created_at']
        extra_kwargs = {
            'full_name': {'required': False}
        }

    def validate(self, attrs):
        # Honeypot spam check - strip out website field
        website = attrs.pop('website', '')
        if website:
            raise serializers.ValidationError({"website": "Bot detected."})

        name = attrs.pop('name', None)
        if name and not attrs.get('full_name'):
            attrs['full_name'] = name.strip()

        if not attrs.get('full_name'):
            raise serializers.ValidationError({"full_name": "Full name is required."})

        return attrs

    def create(self, validated_data):
        validated_data.pop('website', None)
        validated_data.pop('name', None)
        return super().create(validated_data)

