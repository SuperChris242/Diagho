from django.db import models
from django.core.exceptions import ValidationError
import logging
from datetime import datetime

logger = logging.getLogger('events')

class Event(models.Model):
    name = models.CharField(max_length=200, unique=True)
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['start_time']

    def clean(self):
        if self.start_time >= self.end_time:
            error_msg = f"La fin doit être après le début pour '{self.name}'"
            logger.error(error_msg)
            raise ValidationError(error_msg)

    def save(self, *args, **kwargs):
        is_new = self.pk is None
        try:
            # Vérifie les conflits avant de sauvegarder
            conflicts = Event.objects.exclude(pk=self.pk).filter(
                start_time__lt=self.end_time,
                end_time__gt=self.start_time
            )
            if conflicts.exists():
                conflict_names = [e.name for e in conflicts]
                error_msg = f"Conflit avec: {', '.join(conflict_names)}"
                logger.warning(error_msg)
            
            if is_new:
                logger.info(f"Nouvel événement: {self.name} ({self.start_time} - {self.end_time})")
            else:
                logger.info(f"Événement modifié: {self.name} ({self.start_time} - {self.end_time})")
            super().save(*args, **kwargs)
        except ValidationError as e:
            logger.error(f"Erreur de validation: {str(e)}")
            raise

    def delete(self, *args, **kwargs):
        logger.info(f"Suppression de l'événement: {self.name} ({self.start_time} - {self.end_time})")
        super().delete(*args, **kwargs)

    def __str__(self):
        return f"{self.name} ({self.start_time} - {self.end_time})"