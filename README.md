# LifeClock

Un voyage mystique à travers 100 questions introspectives pour découvrir qui vous êtes vraiment.

## 🚀 Démarrage rapide

### Prérequis

- Node.js 20.x ou supérieur
- pnpm 8.x (ou npm avec `--legacy-peer-deps`)
- Une base de données Supabase
- Compte Stripe (pour les paiements)

### Installation

1. Cloner le repository :
```bash
git clone <repository-url>
cd lifeclock
```

2. Installer les dépendances :
```bash
npm install --legacy-peer-deps
# ou avec pnpm
pnpm install
```

3. Configurer les variables d'environnement :
```bash
cp env.example .env.local
# Éditer .env.local avec vos valeurs
```

4. Lancer le serveur de développement :
```bash
npm run dev
```

L'application sera accessible sur [http://localhost:3000](http://localhost:3000)

## 📋 Commandes disponibles

### Développement
- `npm run dev` - Lance le serveur de développement
- `npm run build` - Compile l'application pour la production
- `npm run start` - Lance le serveur de production

### Qualité de code
- `npm run lint` - Vérifie le code avec ESLint
- `npm run lint:fix` - Corrige automatiquement les erreurs ESLint
- `npm run format` - Formate le code avec Prettier
- `npm run format:check` - Vérifie le formatage sans modifier les fichiers

### Tests
- `npm test` - Lance les tests unitaires (Vitest)
- `npm run test:ui` - Lance les tests avec interface graphique
- `npm run test:coverage` - Génère un rapport de couverture de code
- `npm run test:e2e` - Lance les tests E2E (Playwright)
- `npm run test:e2e:ui` - Lance les tests E2E avec interface graphique

### Analyse
- `npm run analyze` - Analyse la taille du bundle avec webpack-bundle-analyzer

## 🔧 Configuration

### Variables d'environnement

Voir `env.example` pour la liste complète des variables d'environnement requises.

Variables essentielles :
- `NEXT_PUBLIC_SUPABASE_URL` - URL de votre projet Supabase
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Clé anonyme Supabase
- `STRIPE_SECRET_KEY` - Clé secrète Stripe
- `STRIPE_WEBHOOK_SECRET` - Secret du webhook Stripe
- `SENTRY_DSN` (optionnel) - DSN Sentry pour le monitoring des erreurs

### Base de données

Les scripts SQL sont disponibles dans le dossier `scripts/` :
1. `001_create_onboarding_table.sql` - Table d'onboarding
2. `002_create_reports_table.sql` - Table des rapports
3. `003_create_referrals_table.sql` - Table des parrainages

Exécutez-les dans l'ordre sur votre base de données Supabase.

## 🏗️ Architecture

```
lifeclock/
├── app/                    # Pages Next.js (App Router)
│   ├── api/               # Routes API
│   ├── onboarding/        # Page d'onboarding
│   ├── quiz/              # Page de quiz
│   └── result/             # Page de résultats
├── components/             # Composants React
│   └── ui/                # Composants UI réutilisables
├── lib/                    # Utilitaires et logique métier
│   ├── phases/            # Définitions des phases du quiz
│   ├── supabase/          # Client Supabase
│   └── validators/        # Schémas de validation Zod
├── tests/                  # Tests
│   ├── e2e/               # Tests E2E (Playwright)
│   └── setup.ts           # Configuration des tests
└── scripts/                # Scripts SQL
```

## 🧪 Tests

### Tests unitaires

Les tests unitaires sont écrits avec Vitest et testent la logique métier dans `lib/` :

```bash
npm test
```

### Tests E2E

Les tests E2E utilisent Playwright pour tester les parcours utilisateur complets :

```bash
npm run test:e2e
```

Les tests E2E sont automatiquement exécutés sur les PR vers `main` via GitHub Actions.

## 🚢 Déploiement

### Vercel (recommandé)

1. Connecter votre repository GitHub à Vercel
2. Configurer les variables d'environnement dans le dashboard Vercel
3. Déployer automatiquement à chaque push sur `main`

### Variables d'environnement pour la production

Assurez-vous de configurer :
- Toutes les variables d'environnement requises
- `NEXT_PUBLIC_BASE_URL` avec votre URL de production
- `SENTRY_DSN` pour le monitoring en production

## 🔒 Sécurité

- Headers de sécurité configurés dans `next.config.mjs`
- Validation des entrées API avec Zod
- Rate limiting sur les endpoints webhooks
- Pas de secrets dans le code source (utilisation de variables d'environnement)

## 📊 Observabilité

- **Sentry** : Monitoring des erreurs (optionnel, nécessite `SENTRY_DSN`)
- **Vercel Analytics** : Analytics d'utilisation intégré

## 🤝 Contribution

1. Créer une branche depuis `main`
2. Effectuer vos modifications
3. Les hooks Git (Husky) vérifieront automatiquement le code avant commit
4. Créer une Pull Request

Les tests et le linting sont automatiquement exécutés via GitHub Actions.

## 📝 License

Ce projet est privé.

