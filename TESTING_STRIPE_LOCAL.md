# Guide : Tester Stripe en Local

Ce guide explique comment tester l'intégration Stripe de manière complète en développement local.

## Prérequis

1. Un compte Stripe (gratuit)
2. Stripe CLI installé sur votre machine
3. Les variables d'environnement configurées avec des clés de test

## Étape 1 : Installer Stripe CLI

### macOS
```bash
brew install stripe/stripe-cli/stripe
```

### Linux
```bash
# Télécharger depuis https://stripe.com/docs/stripe-cli
# Ou utiliser le script d'installation
```

### Windows
```bash
# Télécharger depuis https://stripe.com/docs/stripe-cli
```

### Vérifier l'installation
```bash
stripe --version
```

## Étape 2 : Se connecter à Stripe CLI

```bash
stripe login
```

Cette commande ouvrira votre navigateur pour authentifier Stripe CLI avec votre compte Stripe.

## Étape 3 : Configurer les variables d'environnement

Créez un fichier `.env.local` à la racine du projet (ou mettez à jour votre `.env` existant) avec vos clés de test Stripe :

```env
# Stripe - Clés de TEST (mode développement)
STRIPE_SECRET_KEY=sk_test_your_secret_key_here
STRIPE_WEBHOOK_SECRET=whsec_...  # Sera généré par Stripe CLI à l'étape suivante
LIFECLOCK_PRICE_ID=price_your_test_price_id

# Application
NEXT_PUBLIC_BASE_URL=http://localhost:3000
NODE_ENV=development
```

### Où trouver vos clés de test ?

1. Allez sur [Stripe Dashboard](https://dashboard.stripe.com/test/apikeys)
2. Dans l'onglet "Test data", copiez votre **Secret key** (`sk_test_...`)
3. Créez un produit avec un prix dans Stripe Dashboard
4. Copiez le **Price ID** (`price_...`)

## Étape 4 : Configurer le webhook local avec Stripe CLI

Le webhook est le point critique pour tester en local. Stripe CLI permet de forwarder les événements Stripe vers votre serveur local.

### Démarrer le forwarding des webhooks

```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

Cette commande va :
- Créer un endpoint webhook temporaire
- Forwarder tous les événements Stripe vers votre serveur local
- Afficher le **Webhook Signing Secret** (`whsec_...`)

### Copier le Webhook Signing Secret

Lorsque vous exécutez `stripe listen`, vous verrez quelque chose comme :

```
> Ready! Your webhook signing secret is whsec_xxxxxxxxxxxxxxxxxxxxx (^C to quit)
```

**Copiez cette valeur** et mettez-la dans votre `.env.local` :

```env
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxxxxxxxxxx
```

⚠️ **Important** : Le secret change à chaque fois que vous relancez `stripe listen`. Vous devrez le mettre à jour dans votre `.env.local`.

## Étape 5 : Démarrer votre application Next.js

Dans un **autre terminal**, démarrez votre serveur de développement :

```bash
npm run dev
# ou
pnpm dev
# ou
yarn dev
```

Votre application devrait être accessible sur `http://localhost:3000`.

## Étape 6 : Tester le flux de paiement complet

### 6.1 Tester la création d'une session de checkout

1. Naviguez vers votre application : `http://localhost:3000`
2. Complétez le quiz/onboarding
3. Arrivez sur la page `/result`
4. Cliquez sur le bouton CTA pour payer
5. Vous devriez être redirigé vers Stripe Checkout (mode test)

### 6.2 Utiliser les cartes de test Stripe

Dans Stripe Checkout, utilisez ces cartes de test :

#### ✅ Paiement réussi
```
Numéro de carte : 4242 4242 4242 4242
Date d'expiration : N'importe quelle date future (ex: 12/34)
CVC : N'importe quel 3 chiffres (ex: 123)
Code postal : N'importe quel code postal valide (ex: 12345)
```

#### ❌ Paiement refusé
```
Numéro de carte : 4000 0000 0000 0002
Date d'expiration : N'importe quelle date future
CVC : N'importe quel 3 chiffres
```

#### 🔐 3D Secure (requiert authentification)
```
Numéro de carte : 4000 0027 6000 3184
Date d'expiration : N'importe quelle date future
CVC : N'importe quel 3 chiffres
```

Pour plus de cartes de test : https://stripe.com/docs/testing

### 6.3 Vérifier le webhook

Après le paiement :
1. Vérifiez le terminal où tourne `stripe listen` - vous devriez voir les événements
2. Vérifiez le terminal où tourne `npm run dev` - vous devriez voir les logs du webhook
3. Vérifiez que vous êtes redirigé vers `/report` après le paiement

## Étape 7 : Tester différents événements

Stripe CLI permet de déclencher des événements manuellement :

```bash
# Simuler un paiement réussi
stripe trigger checkout.session.completed

# Simuler un paiement échoué
stripe trigger payment_intent.payment_failed
```

Ces commandes envoient des événements de test directement à votre endpoint webhook local.

## Résolution de problèmes

### Le webhook ne fonctionne pas

1. **Vérifiez que Stripe CLI est bien connecté** : `stripe listen` doit être actif
2. **Vérifiez l'URL du webhook** : doit pointer vers `localhost:3000/api/stripe/webhook`
3. **Vérifiez le secret** : `STRIPE_WEBHOOK_SECRET` doit correspondre à celui affiché par `stripe listen`
4. **Redémarrez votre serveur Next.js** après avoir changé `STRIPE_WEBHOOK_SECRET`

### Erreur "Bad signature" dans les logs

Cela signifie que le `STRIPE_WEBHOOK_SECRET` ne correspond pas. Vérifiez que :
- Vous avez bien copié le secret affiché par `stripe listen`
- Votre fichier `.env.local` est bien chargé (redémarrez le serveur Next.js)

### Les événements ne sont pas reçus

1. Vérifiez que `stripe listen` est toujours actif
2. Vérifiez les logs dans le terminal Stripe CLI
3. Vérifiez que votre serveur Next.js est bien démarré sur le port 3000

### Tester avec différents scénarios

```bash
# Voir tous les événements disponibles
stripe trigger --help

# Tester avec des métadonnées personnalisées
stripe trigger checkout.session.completed \
  --override checkout.session:metadata.referral_code=TEST123 \
  --override checkout.session:metadata.referred_email=test@example.com
```

## Commandes utiles

```bash
# Lister les événements reçus
stripe events list

# Voir les détails d'un événement
stripe events retrieve evt_xxxxxxxxxxxxx

# Tester différents événements de paiement
stripe trigger checkout.session.completed
stripe trigger payment_intent.payment_failed
stripe trigger payment_intent.succeeded
```

## Workflow recommandé pour le développement

1. **Terminal 1** : Lancer `stripe listen --forward-to localhost:3000/api/stripe/webhook`
2. **Terminal 2** : Lancer `npm run dev`
3. **Terminal 3** : (Optionnel) Tester manuellement avec `stripe trigger`

## Différence entre Test Mode et Live Mode

- **Test Mode** : Utilisez `sk_test_...` et les cartes de test. Aucun paiement réel ne sera effectué.
- **Live Mode** : Utilisez `sk_live_...` pour les vrais paiements. ⚠️ **Attention** : Ne testez jamais en Live Mode sans être sûr !

## Ressources

- [Documentation Stripe CLI](https://stripe.com/docs/stripe-cli)
- [Cartes de test Stripe](https://stripe.com/docs/testing)
- [Guide des webhooks Stripe](https://stripe.com/docs/webhooks)
- [Dashboard Stripe (Test Mode)](https://dashboard.stripe.com/test)

## Checklist rapide

- [ ] Stripe CLI installé et connecté
- [ ] Variables d'environnement configurées avec des clés de test
- [ ] `stripe listen` actif et secret copié
- [ ] Serveur Next.js démarré
- [ ] Testé avec une carte de test
- [ ] Webhook reçu et traité correctement


