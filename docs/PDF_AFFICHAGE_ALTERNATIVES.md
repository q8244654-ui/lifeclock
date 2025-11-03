# Alternatives pour afficher les PDFs aux utilisateurs

Actuellement, votre application force le **téléchargement** des PDFs via `Content-Disposition: attachment`. Voici plusieurs alternatives pour **afficher** les PDFs directement dans le navigateur.

## 1. Affichage inline dans le navigateur (Plus simple)

### Option A : Modifier les routes pour permettre l'affichage inline

Modifier les headers HTTP pour utiliser `inline` au lieu de `attachment` :

```typescript
// Dans app/docs/[filename]/route.ts et app/books/[filename]/route.ts
'Content-Disposition': `inline; filename="${encodeURIComponent(decodedFilename)}"`
```

**Avantages :**

- ✅ Simple à implémenter
- ✅ Utilise le visualiseur PDF natif du navigateur
- ✅ Pas de dépendances supplémentaires
- ✅ Fonctionne sur mobile et desktop

**Inconvénients :**

- ❌ Expérience utilisateur dépend du navigateur
- ❌ Pas de contrôle sur l'interface

### Option B : Ajouter un paramètre de requête pour choisir le mode

Permettre de choisir entre téléchargement et affichage via un paramètre :

```typescript
const disposition = searchParams.get('mode') === 'view' ? 'inline' : 'attachment'
'Content-Disposition': `${disposition}; filename="${encodeURIComponent(decodedFilename)}"`
```

## 2. Iframe Embed (Recommandé pour une intégration simple)

Afficher le PDF dans une iframe directement dans votre page :

```tsx
<iframe src="/docs/mon-fichier.pdf" width="100%" height="600px" className="border rounded-lg" />
```

**Avantages :**

- ✅ Simple à utiliser
- ✅ Le PDF reste dans votre interface
- ✅ Navigation et zoom natifs du navigateur

**Inconvénients :**

- ❌ Taille fixe de l'iframe (mais peut être responsive)
- ❌ Certains navigateurs mobiles peuvent avoir des problèmes

## 3. Modal avec Iframe (Meilleure UX)

Afficher le PDF dans une modal overlay :

```tsx
// Composant PDFModal
'use client'

import { useState } from 'react'
import { X } from 'lucide-react'

export default function PDFModal({ filename, isOpen, onClose }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-6xl h-[90vh] relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 shadow-lg"
        >
          <X className="w-6 h-6" />
        </button>
        <iframe src={`/docs/${filename}`} className="w-full h-full rounded-lg" title={filename} />
      </div>
    </div>
  )
}
```

**Avantages :**

- ✅ Excellente expérience utilisateur
- ✅ Le PDF s'ouvre dans une overlay élégante
- ✅ Facile à fermer
- ✅ Responsive

## 4. Bibliothèque react-pdf (Contrôle total)

Utiliser `react-pdf` pour un contrôle total sur le rendu :

```bash
npm install react-pdf
```

```tsx
'use client'

import { Document, Page, pdfjs } from 'react-pdf'
import 'react-pdf/dist/esm/Page/AnnotationLayer.css'
import 'react-pdf/dist/esm/Page/TextLayer.css'

// Configuration pour le worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`

export default function PDFViewer({ filename }) {
  const [numPages, setNumPages] = useState(null)
  const [pageNumber, setPageNumber] = useState(1)

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages)
  }

  return (
    <div>
      <Document file={`/docs/${filename}`} onLoadSuccess={onDocumentLoadSuccess}>
        <Page pageNumber={pageNumber} />
      </Document>
      <div className="controls">
        <button onClick={() => setPageNumber(pageNumber - 1)} disabled={pageNumber <= 1}>
          Précédent
        </button>
        <span>
          Page {pageNumber} sur {numPages}
        </span>
        <button onClick={() => setPageNumber(pageNumber + 1)} disabled={pageNumber >= numPages}>
          Suivant
        </button>
      </div>
    </div>
  )
}
```

**Avantages :**

- ✅ Contrôle total sur l'affichage
- ✅ Navigation personnalisée
- ✅ Zoom, recherche, annotations possibles
- ✅ Peut extraire le texte pour la recherche

**Inconvénients :**

- ❌ Plus complexe à implémenter
- ❌ Dépendance supplémentaire (~500KB)
- ❌ Peut être plus lent sur mobile

## 5. Conversion en images (Pour un contrôle maximum)

Convertir chaque page du PDF en image et afficher comme un carrousel :

```tsx
// Nécessite pdf-lib ou pdf.js côté serveur
// Plus complexe mais offre un contrôle total
```

**Avantages :**

- ✅ Contrôle pixel par pixel
- ✅ Peut ajouter des effets, filtres, etc.
- ✅ Fonctionne même si le navigateur ne supporte pas PDF

**Inconvénients :**

- ❌ Beaucoup plus complexe
- ❌ Plus lourd en ressources serveur
- ❌ Perte de fonctionnalités natives (recherche, copie, etc.)

## 6. Service externe (Pour les cas avancés)

Utiliser un service comme :

- **Adobe PDF Embed API** (gratuit, limité)
- **Google Docs Viewer** (ne fonctionne plus vraiment)
- **PDF.js Viewer** (Mozilla, open source)

## Recommandations

### Pour votre cas d'usage (LifeClock) :

1. **Solution simple et efficace** :
   - Modal avec iframe (#3)
   - Permet de garder l'option téléchargement
   - UX moderne et professionnelle

2. **Solution flexible** :
   - Ajouter un paramètre `?mode=view` dans les routes
   - Permettre aux utilisateurs de choisir entre télécharger ou voir

3. **Pour des besoins avancés** :
   - Utiliser `react-pdf` si vous voulez des fonctionnalités comme recherche, zoom personnalisé, annotations

## Prochaines étapes

Des composants d'exemple sont disponibles dans `/components/pdf-viewer/` pour tester ces différentes approches.
