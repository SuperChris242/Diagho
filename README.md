# Project Name: Projet Diagho Event Planner

## Description

Event Planner est une application permettant de gérer des événements, de vérifier les conflits d'événements. Le projet se compose d'un back-end développé avec Django et Django REST framework, d'un front-end développé avec React, TypeScript, et Tailwind CSS et d'une base de donnée mysql.

## Technologies utilisées

### Back-end
- **Django** : Framework Python pour le développement web.
- **Django REST Framework** : Pour exposer des API RESTful.
- **MySQL** : Base de données relationnelle utilisée pour stocker les données des événements.
- **python-decouple** : Pour gérer les variables d'environnement (fichier `.env`).

### Front-end
- **React** : Librairie JavaScript pour construire l'interface utilisateur.
- **TypeScript** : Surcouche de JavaScript pour ajouter des types.
- **Tailwind CSS** : Framework CSS utilitaire pour un design rapide et flexible.
- **Axios** : Bibliothèque HTTP pour effectuer des requêtes API.

## Installation

### Back-end (Django)

1. **Clonez le projet** :

   ```bash
   git clone https://github.com/SuperChris242/Diagho.git
   cd back
- puis activer l environnement virtuel
   python -m venv venv
   source venv/bin/activate  # Sur Linux/macOS
   venv\Scripts\activate  # Sur Windows
-  ensuite vous faite un cd sur Diagho
   pip install -r requirements.txt
   pour l installation des dépendances 
-  Créez un fichier .env
    DB_NAME=votre_nom_de_base
    DB_USER=votre_utilisateur
    DB_PASSWORD=votre_mot_de_passe
    DB_HOST=localhost
    DB_PORT=3306
    SECRET_KEY=your_secret_key
    DEBUG=True
-  Créer les tables
    python manage.py migrate

-  Pour Demarrer le serveur
    python manage.py runserver

### Front-end (React)

-  Allez dans le dossier front
    cd front
-  Installez les dépendances 
    npm init -y
    npm install axios tailwindcss typescript
    npx tailwindcss init
-  Lancez l'application React 
    npm start

### Utilisation
#### Back-end 
 L'API expose plusieurs endpoints pour gérer les événements, y compris :

- GET /api/events/ : Récupérer tous les événements.
- GET /api/events/{id}/ : Récupérer un événement par son ID.
- POST /api/events/ : Ajouter un événement.
- GET /api/events/find_conflicts/ : Récupérer les événements en conflit.
- DELETE /api/events/{id}/
  
#### Front-end 
 Le front-end vous permet d'ajouter, de modifier et de supprimer des événements, ainsi que de consulter les conflits d'événements.