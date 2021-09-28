# XYZ-Ingénierie

L'objectif de ce projet est de réaliser une application Web avec la technologie [Angular](https://angular.io/) pour la capitalisation des références commerciales d'une société d'ingénierie française. Le cahier des charges de ce projet est disponible dans ce repository.

## Clonage du projet

- Téléchargez le projet

```bash
git clone https://github.com/NicolasDesnoust/XYZ-ANGULAR-STJ-ILD-DESNOUST-LY.git
cd XYZ-ANGULAR-STJ-ILD-DESNOUST-LY
```

## Installation du projet

- Utilisez le package [npm](https://www.npmjs.com/) pour installer.

```bash
npm install
```

## Démarrage du projet

- Démarrez le projet

```bash
npm run quick
```

## Connexion

Pour tester au complet les fonctionnalités de l'application, le profil administrateur ci-dessous est mis à votre disposition:

```
login = compte.test@gmail.com
password = comptetest
```

## Suivi du cahier des charges

### Json Server

- Le back-end a été mocké avec Json-server.

### Firebase

- Authentification via un service tierce

### Ecriture de tests

- Les tests unitaires et e2e n'ont pas été écrits.

### Utilisation d'une solution d'abstraction CSS

- Le projet utilise du SASS et du SCSS. Il utilise aussi Bulma et FontAwesome pour faciliter la création de l'interface.

## Industrialisation de l'Application

- Le projet n'est pas industrialisé.

## Authentification

- L'authentification est réalisé via un service tierce (Firebase) et tous les profils demandés ont été implémentés. L'accès aux pages est donc restreint en fonction de ces premiers.

## Ecrans disponibles

- L'application contient toutes les pages requises au minimum, à savoir:
  - Une page d’accueil permettant de rechercher l’ensemble des informations publiques des
    références commerciales
  - Une page d’affichage d’une référence permettant d’afficher l’ensemble des informations
    publiques des références commerciales
  - Une page d’authentification
  - Une page de recherche permettant de rechercher l’ensemble des informations publiques et
    confidentielles des références commerciales accessible à tous les salariés
  - Une page d’affichage d’une référence permettant d’afficher l’ensemble des informations
    publiques et confidentielles accessible à tous les salariés
  - Une page de création/édition de référence accessible aux chefs de projet
  - Une page de création/édition de comptes accessible aux administrateurs

## Export au format PDF

L'export des références commerciales n'a pas été implémenté.

## Ressources requises

- [vs code](https://code.visualstudio.com/download)
- [node](https://nodejs.org/en/)
- [npm](https://www.npmjs.com/)
- [Firebase](https://firebase.google.com/)
- [Bulma](https://bulma.io/)
- [FontAwesome](https://bulma.io/)

## License

[MIT](https://choosealicense.com/licenses/mit/)
