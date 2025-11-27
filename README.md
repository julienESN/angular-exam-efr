# TopAchatLike - Application E-commerce Angular

## 👥 Contributeurs

- Esnault Julien
- Clément Suire
- Gaalad Filatre
- Sofiane Fares

## 📋 Description

TopAchatLike est une application e-commerce développée en Angular permettant de parcourir un catalogue de produits informatiques (claviers, souris, casques, écrans, accessoires), de les ajouter au panier et de procéder au paiement.

### Fonctionnalités

- **Catalogue** : Parcourir la liste des produits disponibles
- **Détail produit** : Voir les informations détaillées d'un produit (description, spécifications, prix, stock)
- **Panier** : Ajouter/supprimer des produits, modifier les quantités
- **Authentification** : Système de login pour accéder à certaines fonctionnalités
- **Paiement** : Finaliser sa commande

### Technologies utilisées

- Angular 20
- SCSS pour le style
- JSON Server comme backend mock (API REST)
- RxJS pour la gestion des données asynchrones

## 🚀 Installation et lancement

### Prérequis

- Node.js (version 22 ou supérieure)
- npm

### Installation des dépendances

```bash
npm install
```

### Lancer l'application

#### Option 1 : Lancer le frontend et le backend simultanément (recommandé)

```bash
npm run dev
```

Cette commande lance :

- Le serveur Angular sur `http://localhost:4200`
- Le serveur JSON (backend) sur `http://localhost:3000`

#### Option 2 : Lancer séparément

**Terminal 1 - Backend :**

```bash
npm run backend
```

**Terminal 2 - Frontend :**

```bash
npm run start
```

### Accès à l'application

- **Application** : http://localhost:4200
- **API Backend** : http://localhost:3000

### Compte de test

- Email : `test@test.com`
- Mot de passe : `123456`
