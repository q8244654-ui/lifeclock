# Dossier pour PDFs statiques

Ce dossier contient les fichiers PDF statiques qui peuvent être téléchargés directement depuis votre application.

## Utilisation

Placez vos fichiers PDF ici, par exemple :

- `mon-fichier.pdf`
- `guide-utilisateur.pdf`
- `documentation.pdf`

## Dans votre code React/Next.js

Utilisez le composant `StaticPDFDownloadButton` :

```tsx
import StaticPDFDownloadButton from '@/components/static-pdf-download-button'

// Exemple simple
<StaticPDFDownloadButton
  filename="mon-fichier.pdf"
/>

// Avec personnalisation
<StaticPDFDownloadButton
  filename="mon-fichier.pdf"
  downloadName="Mon-Fichier-Personnalise.pdf"
  label="Télécharger le guide"
  variant="primary"
/>
```

## Accès direct via HTML

Vous pouvez aussi utiliser un lien HTML simple :

```html
<a
  href="/docs/mon-fichier.pdf"
  download="mon-fichier.pdf"
  className="px-4 py-2 bg-blue-600 text-white rounded"
>
  Télécharger le PDF
</a>
```

💡 Le mot-clé `download` force le téléchargement au lieu d'ouvrir le PDF dans le navigateur.
