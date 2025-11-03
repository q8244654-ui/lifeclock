# Prompt pour v0 - Template PDF LifeClock

Créer un template HTML/CSS élégant pour un rapport PDF LifeClock avec les spécifications suivantes :

## Contexte
Rapport PDF de type "livre" avec fond sombre (#0A0A0A), texte blanc (#FFFFFF), et design moderne/premium.

## Structure du document

### Page de titre (Cover Page)
- Titre principal : "LifeClock" (grand, en bleu/cyan #60A5FA)
- Sous-titre : Nom de l'utilisateur (texte blanc)
- Card centrale avec :
  - Life Index : "XX/100" (très grand, en bleu, bold)
  - Stage : Texte de stage (ex: "The Awakening") (blanc, bold)
  - Tagline : "It's not your age. It's your inner maturity." (italic, blanc)
  - Divider (ligne subtile)
  - Dominant Energy : Nom de l'énergie (ex: "Mind") (en violet #A78BFA)

### Section "The 3 Hidden Forces"
- Titre de section avec underline coloré
- 3 cards séparées pour :
  - 🌑 Your Shadow (violet #A78BFA)
  - 😨 Your Fear (rose #F472B6)
  - ⚡ Your Power (doré #E5C97E)
- Chaque card contient : titre, phase, et insight (texte long)

### Page chapitre "The 47 Revelations"
- Page dédiée avec :
  - Grand titre "The 47 Revelations" (en deux lignes)
  - Divider élégant
  - Sous-titre italic : "You think you know yourself? Here are 47 truths your unconscious let slip through."

### Section Révélations (47 items)
- Cards pour chaque révélation avec :
  - Barre verticale colorée à gauche (couleur selon catégorie)
  - Icône + titre de la révélation (couleur selon catégorie)
  - Badge catégorie (ex: "PHASE", "ENERGY", etc.)
  - Texte d'insight (long texte, blanc, line-height 1.65)

Couleurs des catégories :
- phase: bleu #60A5FA
- energy: violet #A78BFA
- pattern: rose #F472B6
- extreme: rouge #EF4444
- contradiction: violet foncé #8B5CF6
- force: doré #E5C97E

## Design System

### Couleurs
- Background: #0A0A0A (noir très foncé)
- Cards: #1C1C1E (gris très foncé)
- Texte principal: #FFFFFF (blanc pur)
- Texte secondaire: #FFFFFF (blanc aussi)
- Texte muted: #E5E5EA (gris très clair)
- Bordure: #38383A (gris foncé)

### Typographie
- Font: Helvetica ou système
- Titres principaux: 32-36px, bold
- Sous-titres: 14-16px
- Texte body: 10.5-11px
- Line-height: 1.65 pour le texte long

### Cards
- Background: #1C1C1E
- Border radius: 6-8px
- Border subtile: rgba(56, 56, 58, 0.6)
- Padding: 12px
- Shadow subtile pour profondeur

### Marges (page type livre)
- Marges asymétriques :
  - Intérieure (gutter): 30mm
  - Extérieure: 20mm
  - Haut/Bas: 25mm

### En-têtes et pieds de page
- Ligne subtile en haut/bas
- "LifeClock Report" en haut (côté extérieur)
- Numéro de page en bas (côté extérieur)
- Citation centrée en bas : "Time is no longer counted. It belongs to you." (en doré)

## Format de sortie

Créer un template HTML/CSS complet avec :
- Structure sémantique claire
- CSS moderne avec variables CSS pour les couleurs
- Design responsive (optimisé pour A4 portrait 210x297mm)
- Prêt pour conversion PDF (éviter les éléments qui ne s'impriment pas bien)
- Classes réutilisables pour les différents éléments

Le template doit être prêt à recevoir les données dynamiques (nom utilisateur, lifeIndex, forces, révélations) via des placeholders ou des variables JavaScript.

