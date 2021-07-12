# O'quiz

## Parcours, Sprint 3

### Pouvoir répondre aux questions d’un quiz

- Commencer par dupliquer la view 'quiz'. Renommer la copie "play_quiz"
- Transformer la view "play_quiz" pour qu'elle contienne un formulaire POST.
- Chaque réponse possible doit être un bouton radio.
- Nommer correctement les boutons radio pour qu'on ne puisse pas choisir plusieurs réponses à la même question.
- Mais on doit quand même pouvoir répondre à toutes les questions !

<details>
<summary>Un peu d'aide</summary>

Voici à quoi doit ressembler le HTML "renderisé" :

```HTML
<div class="col-12">
    <label class="badge level level--débutant">Débutant</label>
    <h4>
        Dans le film d'animation L'Âge de glace, qu'est-ce qui échappe à l'écureuil Scrat ?
    </h4>
    <ul class="list-unstyled ml-5">
        <li>
            <input type="radio" name="question_1" id="answer_1_1" value="1">
            <label for="answer_1_1">Un gland</label>
        </li>
        <li>
            <input type="radio" name="question_1" id="answer_1_2" value="2">
            <label for="answer_1_2">Une pierre</label>
        </li>
        <li>
            <input type="radio" name="question_1" id="answer_1_3" value="3">
            <label for="answer_1_3">Un os</label>
        </li>
        <li>
            <input type="radio" name="question_1" id="answer_1_4" value="4">
            <label for="answer_1_4">Une bille</label>
        </li>
    </ul>
</div>
```
</details>

Dans la route `/quiz/:id`, tester si un utilisateur est connecté. Si c'est le cas, on renvoie la view "play_quiz". Sinon on renvoie la view sans formulaire ("quiz")

Coder ensuite la route POST qui va gérer la soumission du formulaire.

### Pouvoir visualiser mon score

Dans la route qui gère la soumission du formulaire, comparer les données utilisateurs aux bonnes réponses des questions du Quizz.

Chaque bonne réponse donne un point (on ne s'occupe pas de la difficulté de la question).

Renvoyer ensuite une belle view avec le résultat !

### Pouvoir visualiser les bonnes et mauvaises réponses que j’ai donné

Modifier la view précédente pour y intégrer quelles étaient les bonnes et les mauvaises réponses de l'utilisateur.

### Bonus 1 : Ajouter un nouveau Tag

CETTE FONCTIONNALITÉ NE DOIT ÊTRE ACCESSIBLE QU'AUX ADMINS !

- 2 nouvelles routes ("get" et "post")
- un formulaire
- ¯\\\_(ツ)_/¯ pour le reste à toi de jouer.

### Bonus 2 : Modifier un Tag existant

CETTE FONCTIONNALITÉ NE DOIT ÊTRE ACCESSIBLE QU'AUX ADMINS !

### Bonus 3 (AKA "bonus de la mort") : Associer un Tag à un Quiz

CETTE FONCTIONNALITÉ NE DOIT ÊTRE ACCESSIBLE QU'AUX ADMINS !

---

Fini les tests ! Maintenant qu'on a des super modèles, on va brancher tout ça dans une archi Express !

### Mise en place de l'archi

- npm est votre ami : installer les dépendances nécessaires
- point d'entrée de l'application : `index.js` (on y fait les réglages habituels pour express)
- un router (dans `app`)
- un dossier controllers (dans `app`)
- un controller `mainController`
- on oublie pas les fichiers statiques (notamment le CSS)
- et plus si nécessaire...

### Page d'accueil

L'intégration est fournie !

Commencer par découper l'intégration en views façon EJS.
Pensez à supprimer les fichiers html, si vous définissez le repertoire `integration/` comme répertoire des statiques.
Sinon vous allez afficher par défaut le contenu du fichier `index.html` lors de l'appel à `http://localhost:xxxx/`

Ensuite, créer la route et la méthode correspondante dans le controller "mainController".

### Visualiser les titres, les sous-titres et les auteurs des quizzes sur la page d’accueil

Remplacer les fausses données "en dur" par les données issues des Models !

Ici, se servir de Sequelize est une bonne idée (cf [les associations](https://sequelize.org/master/manual/eager-loading.html)).

### Pouvoir accéder aux questions d’un quiz

Il va falloir une nouvelle route (`/quiz/:id`).

Coder la méthode correspondante dans un nouveau controlleur (`quizController`).

Ici aussi, Sequelize va être bien pratique...

1. pouvoir visualiser la difficulté de chaque question

2. visualiser tous les sujets rattachés au quiz

### pouvoir visualiser tous les sujets

Nouvelle route (`/tags`)

Nouveau controller (`tagController`)

### pouvoir visualiser tous les quizzes pour un sujet donné

Astuce : utiliser le model Tag, et se servir des "includes" de Sequelize pour en déduire les quizzes concernées !

### :v: Bonus facile : Ajouter tous les liens qui pourraent manqués

Il y a surement des endroits ou il serait intéressant de pouvoir cliquer, afin de rendre la navigation plus fluide.

### :skull_and_crossbones::clock4: Bonus de la mort où j'ai une semaine devant moi et je savais pas quoi faire : formulaires

Rajouter les formulaires d'inscription et de connexion.
Avec tout ce qui est nécessaire (Ajout en base de données, login en session plus ou moins longue)