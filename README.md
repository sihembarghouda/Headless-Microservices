# PhoneTech — Architecture Headless & Microservices

## Présentation

PhoneTech est une vitrine e-commerce d’accessoires pour smartphones réalisée dans le cadre du module **Programmation Full Stack (Microservices)**.

Le projet repose sur une architecture découplée composée de :
- **Backend :** Strapi, CMS headless exposant une API REST.
- **Frontend :** Next.js, interface web consommant l’API Strapi.
- **Conteneurisation :** Docker et Docker Compose.

## Structure du projet

```text
TP-Headless-Microservices/
├── backend-accessoires/
│   └── Dockerfile
├── frontend-vitrine/
│   └── Dockerfile
├── docker-compose.yml
└── README.md
```

## Prérequis

- Docker Desktop
- Docker Compose

## Lancement du projet

Depuis le répertoire racine, exécuter :

```powershell
docker compose up -d --build
```

Vérifier l’état des services :

```powershell
docker compose ps
```

## Accès aux services

- Vitrine web : http://localhost:3001
- Administration Strapi : http://localhost:1337/admin
- API des produits : http://localhost:1337/api/products?populate=*

## Arrêt des services

```powershell
docker compose down
```

## Fonctionnalités

- Gestion des produits et des catégories avec Strapi.
- Exposition des données via une API REST.
- Affichage des produits dans une interface Next.js.
- Déploiement local des services avec Docker Compose.

## Dépôt GitHub

https://github.com/sihembarghouda/Headless-Microservices
