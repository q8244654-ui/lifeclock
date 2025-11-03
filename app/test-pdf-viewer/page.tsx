'use client'

import { useState } from 'react'
import { PDFModal, PDFViewButton, PDFIframeEmbed } from '@/components/pdf-viewer'
import StaticPDFDownloadButton from '@/components/static-pdf-download-button'

/**
 * Page de démonstration pour tester différentes méthodes d'affichage de PDF
 *
 * Visitez /test-pdf-viewer pour voir toutes les options disponibles
 */
export default function TestPDFViewerPage() {
  const [modalOpen, setModalOpen] = useState(false)
  const testFileName = 'The New Testament.pdf'

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white p-8">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Démonstration - Affichage de PDF</h1>
          <p className="text-gray-400">
            Différentes façons d&apos;afficher les PDFs aux utilisateurs
          </p>
        </div>

        {/* Méthode 1: Bouton avec Modal */}
        <section className="bg-[#1A1A1A] p-6 rounded-lg space-y-4">
          <h2 className="text-2xl font-semibold mb-4">1. Bouton avec Modal (Recommandé)</h2>
          <p className="text-gray-400 mb-4">
            Affiche le PDF dans une modal élégante. L&apos;utilisateur peut voir le PDF sans quitter
            la page.
          </p>
          <div className="flex flex-wrap gap-4">
            <PDFViewButton filename={testFileName} label="Voir dans une modal" variant="primary" />
            <PDFViewButton
              filename={testFileName}
              label="Voir avec style secondaire"
              variant="secondary"
            />
          </div>
          <div className="mt-4 p-4 bg-[#0A0A0A] rounded">
            <code className="text-sm text-gray-300">
              {`<PDFViewButton filename="${testFileName}" />`}
            </code>
          </div>
        </section>

        {/* Méthode 2: Iframe directe */}
        <section className="bg-[#1A1A1A] p-6 rounded-lg space-y-4">
          <h2 className="text-2xl font-semibold mb-4">2. Iframe directe</h2>
          <p className="text-gray-400 mb-4">
            Affiche le PDF directement dans la page avec une iframe. Simple et efficace.
          </p>
          <PDFIframeEmbed filename={testFileName} height="500px" />
          <div className="mt-4 p-4 bg-[#0A0A0A] rounded">
            <code className="text-sm text-gray-300">
              {`<PDFIframeEmbed filename="${testFileName}" height="500px" />`}
            </code>
          </div>
        </section>

        {/* Méthode 3: Lien direct (affichage inline) */}
        <section className="bg-[#1A1A1A] p-6 rounded-lg space-y-4">
          <h2 className="text-2xl font-semibold mb-4">3. Lien direct (Affichage inline)</h2>
          <p className="text-gray-400 mb-4">
            Ouvre le PDF dans un nouvel onglet du navigateur avec le visualiseur natif.
          </p>
          <a
            href={`/docs/${encodeURIComponent(testFileName)}?mode=view`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Ouvrir le PDF dans un nouvel onglet
          </a>
          <div className="mt-4 p-4 bg-[#0A0A0A] rounded">
            <code className="text-sm text-gray-300">
              {`<a href="/docs/${testFileName}?mode=view" target="_blank">Ouvrir le PDF</a>`}
            </code>
          </div>
        </section>

        {/* Méthode 4: Téléchargement (méthode actuelle) */}
        <section className="bg-[#1A1A1A] p-6 rounded-lg space-y-4">
          <h2 className="text-2xl font-semibold mb-4">4. Téléchargement (Méthode actuelle)</h2>
          <p className="text-gray-400 mb-4">
            Télécharge le PDF directement. C&apos;est la méthode actuellement utilisée dans votre
            app.
          </p>
          <StaticPDFDownloadButton
            filename={testFileName}
            label="Télécharger le PDF"
            variant="primary"
          />
          <div className="mt-4 p-4 bg-[#0A0A0A] rounded">
            <code className="text-sm text-gray-300">
              {`<StaticPDFDownloadButton filename="${testFileName}" />`}
            </code>
          </div>
        </section>

        {/* Comparaison */}
        <section className="bg-[#1A1A1A] p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Comparaison des méthodes</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="p-3">Méthode</th>
                  <th className="p-3">Avantages</th>
                  <th className="p-3">Inconvénients</th>
                  <th className="p-3">Cas d&apos;usage</th>
                </tr>
              </thead>
              <tbody className="text-gray-300">
                <tr className="border-b border-gray-800">
                  <td className="p-3 font-semibold">Modal</td>
                  <td className="p-3">
                    <ul className="list-disc list-inside space-y-1 text-green-400">
                      <li>Meilleure UX</li>
                      <li>Rester sur la page</li>
                      <li>Design cohérent</li>
                    </ul>
                  </td>
                  <td className="p-3">
                    <ul className="list-disc list-inside space-y-1 text-red-400">
                      <li>Légèrement plus complexe</li>
                    </ul>
                  </td>
                  <td className="p-3">Affichage temporaire, consultation rapide</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="p-3 font-semibold">Iframe</td>
                  <td className="p-3">
                    <ul className="list-disc list-inside space-y-1 text-green-400">
                      <li>Simple à implémenter</li>
                      <li>Intégration native</li>
                    </ul>
                  </td>
                  <td className="p-3">
                    <ul className="list-disc list-inside space-y-1 text-red-400">
                      <li>Taille fixe</li>
                      <li>Peut être problématique sur mobile</li>
                    </ul>
                  </td>
                  <td className="p-3">Affichage permanent dans la page</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="p-3 font-semibold">Lien direct</td>
                  <td className="p-3">
                    <ul className="list-disc list-inside space-y-1 text-green-400">
                      <li>Très simple</li>
                      <li>Utilise le visualiseur natif</li>
                    </ul>
                  </td>
                  <td className="p-3">
                    <ul className="list-disc list-inside space-y-1 text-red-400">
                      <li>Quitte la page</li>
                      <li>Expérience variable selon navigateur</li>
                    </ul>
                  </td>
                  <td className="p-3">Consultation approfondie</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold">Téléchargement</td>
                  <td className="p-3">
                    <ul className="list-disc list-inside space-y-1 text-green-400">
                      <li>Accès offline</li>
                      <li>Partage facile</li>
                    </ul>
                  </td>
                  <td className="p-3">
                    <ul className="list-disc list-inside space-y-1 text-red-400">
                      <li>Nécessite de télécharger</li>
                      <li>Peut être bloqué par le navigateur</li>
                    </ul>
                  </td>
                  <td className="p-3">Archivage, partage</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Note technique */}
        <section className="bg-[#1A1A1A] p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Note technique</h2>
          <p className="text-gray-400 mb-2">
            Les routes <code className="text-blue-400">/docs/[filename]</code> et{' '}
            <code className="text-blue-400">/books/[filename]</code> acceptent maintenant un
            paramètre <code className="text-blue-400">?mode=view</code> pour afficher le PDF inline
            au lieu de le télécharger.
          </p>
          <p className="text-gray-400">
            Par défaut (sans paramètre), le comportement reste le téléchargement pour maintenir la
            compatibilité.
          </p>
        </section>
      </div>
    </div>
  )
}
