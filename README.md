# antonain.github.io

Mon portfolio personnel — site statique (HTML / CSS / JS), sans framework.

## Structure

```
index.html              Page unique (structure du site)
assets/css/style.css    Styles (thème sombre minimaliste)
assets/js/main.js       Données + rendu (projets, skills, contacts)
assets/img/*            Image utilisées sut la page
.nojekyll               Désactive Jekyll → GitHub sert les fichiers tels quels
```

## Modifier le contenu

Tout le contenu dynamique se trouve en haut de `assets/js/main.js` :

- `INTERESTS`   — la liste de tes centres d'interêts
- `PROJECTS`    — tes projets (titre, description, tags, liens repo/démo)
- `CONTACTS`    — tes liens de contact
