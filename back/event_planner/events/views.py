from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.core.exceptions import ValidationError
from .models import Event
from .serializers import EventSerializer
import logging

logger = logging.getLogger('events')

class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=False)

        try:
            self.perform_create(serializer)
        except ValidationError as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def perform_create(self, serializer):
        logger.info(f"Création d'événement: {serializer.validated_data['name']}")
        serializer.save()

    @action(detail=False, methods=['get'])
    def find_conflicts(self, request):
        events = self.get_queryset()
        conflicts = {}
        event_dict = {}

        for event in events:
            event_dict[event.id] = EventSerializer(event).data

        for event in events:
            conflicting_events = events.filter(
                start_time__lt=event.end_time,
                end_time__gt=event.start_time
            ).exclude(id=event.id)
            if conflicting_events.exists():
                conflicts[event.id] = {
                    'event': event_dict[event.id],
                    'conflicts_with': list({event.id: event_dict[event.id] for event in conflicting_events}.values())
                }

        return Response(list(conflicts.values()))