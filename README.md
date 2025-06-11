# 🎓 Plateforme Pédagogique - Simulation Moodle

## 📋 Description

Cette plateforme pédagogique est une simulation de Moodle développée avec **Angular 15**. Elle propose un système complet de gestion d'apprentissage en ligne avec trois rôles d'utilisateurs distincts : administrateur, enseignant et étudiant.

## ✨ Fonctionnalités

### 🔐 Authentification
- Connexion sécurisée avec validation des formulaires
- Gestion des rôles (Admin, Enseignant, Étudiant)
- Gardes de route pour protéger les accès
- Redirection automatique selon le rôle

### 👥 Gestion des Utilisateurs
- Inscription des étudiants
- Gestion des profils utilisateurs
- Liste et administration des utilisateurs
- Statistiques des utilisateurs

### 📚 Gestion des Cours
- CRUD complet des cours (pour les enseignants)
- Inscription/désinscription aux cours (pour les étudiants)
- Affichage du contenu pédagogique
- Support de ressources multimédias (PDF, images, liens)

### 📊 Tableaux de Bord
- **Étudiant** : Suivi de progression, cours inscrits
- **Enseignant** : Statistiques des cours, gestion des étudiants
- **Admin** : Vue d'ensemble de la plateforme

## 🏗️ Architecture

```
src/app/
├── core/                     # Services et gardes principaux
│   ├── guards/              # Gardes d'authentification et de rôles
│   ├── models/              # Interfaces et modèles de données
│   └── services/            # Services (Auth, User, Course)
├── features/                # Modules fonctionnels
│   ├── auth/               # Module d'authentification
│   ├── dashboard/          # Tableaux de bord par rôle
│   ├── courses/            # Gestion des cours
│   └── users/              # Gestion des utilisateurs
└── shared/                 # Composants réutilisables
```

## 🚀 Installation et Lancement

### Prérequis
- Node.js (version 14 ou supérieure)
- npm (inclus avec Node.js)
- Angular CLI 15

### Étapes d'installation

1. **Installer les dépendances**
   ```bash
   npm install
   ```

2. **Lancer le serveur de développement**
   ```bash
   ng serve
   ```
   ou
   ```bash
   npm start
   ```

3. **Ouvrir l'application**
   - Naviguer vers `http://localhost:4200`
   - L'application se rechargera automatiquement si vous modifiez les fichiers sources

### Autres commandes utiles

- **Build de production**
  ```bash
  ng build --configuration production
  ```

- **Exécuter les tests**
  ```bash
  ng test
  ```

- **Analyser le code**
  ```bash
  ng lint
  ```

## 🔑 Comptes de Démonstration

Pour tester l'application, utilisez ces comptes prédéfinis :

| Rôle | Email | Mot de passe | Accès |
|------|-------|--------------|--------|
| **Admin** | admin@plateforme.com | password123 | Administration complète |
| **Enseignant** | prof@plateforme.com | password123 | Gestion des cours |
| **Étudiant** | etudiant@plateforme.com | password123 | Consultation et inscription |

## 🛠️ Technologies Utilisées

- **Framework** : Angular 15
- **Langage** : TypeScript
- **Styles** : SCSS
- **Formulaires** : Reactive Forms
- **Routing** : Angular Router avec Lazy Loading
- **Architecture** : Modulaire avec injection de dépendances

## 📁 Structure des Modules

### Core Module
- **AuthService** : Gestion de l'authentification
- **UserService** : Gestion des utilisateurs
- **CourseService** : Gestion des cours
- **AuthGuard** : Protection des routes authentifiées
- **RoleGuard** : Protection basée sur les rôles

### Feature Modules
- **AuthModule** : Login et inscription
- **DashboardModule** : Tableaux de bord par rôle
- **CoursesModule** : Gestion complète des cours
- **UsersModule** : Administration des utilisateurs

### Shared Module
- Composants réutilisables (Header, Footer, etc.)

## 🔄 Flux d'Authentification

1. **Connexion** : Saisie des identifiants
2. **Validation** : Vérification côté client et serveur (simulé)
3. **Redirection** : Selon le rôle de l'utilisateur
   - Admin → `/dashboard/admin`
   - Enseignant → `/dashboard/teacher`
   - Étudiant → `/dashboard/student`

## 🚧 Développement

### Ajouter une nouvelle fonctionnalité

1. **Créer un composant**
   ```bash
   ng generate component features/nom-module/nom-composant
   ```

2. **Créer un service**
   ```bash
   ng generate service core/services/nom-service
   ```

3. **Créer un module**
   ```bash
   ng generate module features/nom-module --routing
   ```

### Standards de code
- Utiliser TypeScript strict
- Nommer les fichiers en kebab-case
- Suivre les conventions Angular
- Documenter les services et composants complexes

## 🔒 Sécurité

- Validation des formulaires côté client
- Gardes de route pour la protection des accès
- Gestion des tokens d'authentification (simulation)
- Protection contre les accès non autorisés

## 📈 Évolutions Futures

- [ ] Intégration d'un backend réel (Node.js/Express, .NET, etc.)
- [ ] Système de notifications
- [ ] Chat en temps réel
- [ ] Gestion avancée des ressources
- [ ] Système de notes et d'évaluations
- [ ] Interface mobile responsive améliorée
- [ ] Internationalisation (i18n)

## 🤝 Contribution

Pour contribuer au projet :

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commiter les changements (`git commit -m 'Add AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📝 Licence

Ce projet est développé à des fins éducatives.

## 📞 Support

Pour toute question ou problème, veuillez créer une issue dans le repository.

---

**Développé avec ❤️ pour l'apprentissage Angular**
