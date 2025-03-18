# OcéaPulse

## À propos du projet

OcéaPulse est une application mobile dédiée à la protection des océans, permettant aux utilisateurs de signaler les pollutions marines, de participer à des actions de nettoyage et de suivre leur impact environnemental.

## Fonctionnalités principales

- **Signalement de pollution** : Prenez une photo, localisez et partagez pour alerter la communauté
- **Participation aux actions** : Rejoignez des événements de nettoyage près de chez vous
- **Suivi d'impact** : Visualisez votre contribution et gagnez des récompenses

## Structure du projet

```
src/
├── assets/            # Images, icônes et autres ressources
├── components/        # Composants React réutilisables
│   ├── common/        # Composants génériques (boutons, inputs, etc.)
│   ├── layout/        # Composants de mise en page (header, footer, etc.)
│   ├── dashboard/     # Composants spécifiques au tableau de bord
│   └── onboarding/    # Composants pour l'onboarding
├── contexts/          # Contextes React pour la gestion d'état global
├── hooks/             # Hooks personnalisés
├── routes/            # Configuration des routes
├── screens/           # Écrans principaux de l'application
├── types/             # Types et interfaces TypeScript
└── utils/             # Fonctions utilitaires
```

## Technologies utilisées

- React
- TypeScript
- React Router
- Tailwind CSS
- Framer Motion
- Leaflet
- Vite

## Installation

1. Clonez le dépôt
   ```
   git clone https://github.com/votre-username/oceapulse.git
   cd oceapulse
   ```

2. Installez les dépendances
   ```
   npm install
   ```

3. Lancez le serveur de développement
   ```
   npm run dev
   ```

4. Construisez pour la production
   ```
   npm run build
   ```

## Design UI/UX

Le design de l'application est basé sur une palette de couleurs océaniques, avec un focus sur l'accessibilité et l'expérience utilisateur intuitive. L'application utilise Framer Motion pour des animations fluides et naturelles.

### Palette de couleurs
- **Primaire:** #1A73E8 (bleu océan)
- **Secondaire:** #00BFA5 (turquoise)
- **Accentuation:** #FF6D00 (orange)

## Mode démo

L'application fonctionne entièrement en mode démonstration, sans nécessiter de backend. Toutes les données sont simulées localement pour permettre une expérience utilisateur complète.

## Prochaines étapes

- Système de signalement complet
- Intégration de la géolocalisation
- Système de classification des déchets
- Visualisation détaillée des signalements 