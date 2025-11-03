# Roadmap pour atteindre 100/100 en cohérence

## État actuel : 85/100

### ✅ Points forts (déjà fait)
- Constantes centralisées ✅
- Hooks centralisés ✅
- localStorage centralisé ✅
- Scroll centralisé ✅
- Langue anglaise (hors admin) ✅

### ❌ Points à améliorer (-15 points)

---

## 🎯 Étape 1 : Internationalisation complète (8/10 → 10/10) | +2 points

### 1.1 Ajouter les traductions de conversation dans `lib/i18n.ts`

```typescript
// À ajouter dans translations.en et translations.fr
conversation: {
  result: {
    start: {
      userName: "{userName}.",
      stillHere: "You're still here.",
      questions: "100 questions. 100 doors opened.",
      dontKnow: "But you don't yet know what they reveal.",
      forExample: "For example...",
      andAlso: "And also...",
      surface: "This is just the surface.",
      reportContains: "Your report contains 47 revelations.",
      archetype: "Your archetype: **{archetype} {emoji}**",
      score: "Your score: **{score}/100**",
      mostImportantly: "But most importantly...",
      threeForces: "3 invisible forces control your life.",
      shadow: "🔒 **Your Shadow** — what you refuse to see",
      fear: "🔒 **Your Fear** — what paralyzes you",
      power: "🔒 **Your Power** — what you dare not use",
      allInReport: "They're all in your report.",
      twoPaths: "{userName}, you have two paths.",
      firstPath: "**The first**: you leave. You forget. You continue.",
      secondPath: "**The second**: you see everything. The 47 revelations. Your blueprint.",
      fleeOrFace: "So... do you flee or do you face it?",
    },
    mainCTA: {
      userWants: "I want to see everything",
      goodChoice: "Good choice.",
      revelations: "47 revelations. Your Shadow. Your Fear. Your Power.",
      therapy: "5 years of therapy = $10,000. Your LifeClock = $47.",
      expires: "⏳ Expires in {time}.",
      ready: "Ready?",
    },
    refuse: {
      userRefuses: "No, I prefer not to know",
      wait: "Wait.",
      whyHesitate: "Why are you hesitating?",
    },
    objection: {
      price: {
        user: "The price",
        mirror: "The price is the mirror of courage.",
        cost: "$47. Less than a dinner. More than a lifetime.",
        invested: "You invested 20 minutes. This report is the fruit.",
        souls: "10,000 souls have taken this step.",
      },
      worth: {
        user: "I don't know if it's worth it",
        afraid: "That's what those who are afraid to see themselves say.",
        notPDF: "This isn't a PDF. It's a mirror.",
        clarity: "How much is clarity about who you are worth?",
        neverKnow: "Most will never know.",
      },
      time: {
        user: "I need time",
        precisely: "Time. Precisely.",
        change: "You change every second.",
        captures: "This report captures who you are NOW.",
        gone: "In 15 minutes, this moment will be gone.",
      },
      ready: "So, {userName}... ready?",
    },
    finalRefuse: {
      user: "No, really",
      notReady: "You weren't ready.",
      timeWaits: "But time waits for you.",
      seeYou: "See you soon, {userName}.",
    },
  },
  onboarding: {
    invocation: [
      "Uh...",
      "What are you doing here?",
      "No, seriously.",
      "Why are you here, now, at this precise moment?",
      "Most people spend their lives running from these kinds of questions.",
      "You came looking for them.",
      "Interesting.",
      "Well. Since you're here...",
      "I'm LifeClock.",
      "And if you stay, I'll show you something few people have the courage to see:",
      "You. The real you.",
      "Not the image you project.",
      "Not the version you tell.",
      "You.",
      "So... are you staying?",
      "Or do you prefer to keep pretending?",
    ],
  },
}
```

### 1.2 Refactorer `app/result/page.tsx`
- Remplacer tous les `addMessage("assistant", "texte hardcodé")` par `addMessage("assistant", t('conversation.result.start.userName', 'en').replace('{userName}', userName))`
- Utiliser `tArray('conversation.onboarding.invocation', index)` pour les messages d'invocation

### 1.3 Refactorer `app/onboarding/page.tsx`
- Remplacer tous les `addBotMessage("texte hardcodé")` par `addBotMessage(tArray('conversation.onboarding.invocation', index))`

**Impact :** +2 points (internationalisation complète)

---

## 🎨 Étape 2 : Système de styles complet (7/10 → 10/10) | +3 points

### 2.1 Étendre `lib/style-system.ts`

Ajouter les couleurs manquantes :

```typescript
export const colors = {
  background: 'bg-black',
  card: 'bg-[#2C2C2E]',
  cardHover: 'hover:bg-[#3A3A3C]',
  border: 'border-white/5',
  borderThick: 'border-white/10',
  textPrimary: 'text-[#E5E5EA]',
  textSecondary: 'text-[#8E8E93]',
  textMuted: 'text-[#AEAEB2]',
  // Ajouter :
  answerColors: {
    rarely: '#2C2C2E',
    sometimes: '#2C5282',
    often: '#3B82F6',
    always: '#0A84FF',
  },
  messageTypes: {
    normal: '#2C2C2E',
    motivation: 'linear-gradient(135deg, #F97316 0%, #FB923C 100%)',
    revelation: 'linear-gradient(135deg, #EF4444 0%, #F87171 100%)',
    introspection: 'linear-gradient(135deg, #EAB308 0%, #FCD34D 100%)',
    humor: 'linear-gradient(135deg, #22C55E 0%, #4ADE80 100%)',
  },
} as const

export const buttonClasses = {
  primary: `group relative overflow-hidden rounded-2xl bg-[#2C2C2E] px-6 py-4 text-[17px] font-medium text-[#E5E5EA] shadow-lg transition-all hover:bg-[#3A3A3C] active:shadow-xl`,
  input: `flex-1 rounded-3xl bg-[#2C2C2E] px-5 py-3.5 text-[17px] text-[#E5E5EA] placeholder:text-[#8E8E93] outline-none ring-2 ring-transparent shadow-lg transition-all focus:bg-[#3A3A3C] focus:ring-[#0A84FF]`,
  quizOption: `group relative overflow-hidden rounded-2xl bg-[#2C2C2E] px-6 py-4 text-left text-[17px] font-medium text-[#E5E5EA] shadow-lg transition-all hover:bg-[#3A3A3C] active:shadow-xl`,
} as const
```

### 2.2 Refactorer `app/quiz/page.tsx`
- Ligne 357 : Remplacer `bg-[#2C2C2E]` par `buttonClasses.quizOption` ou `colors.card`
- Ligne 360 : Utiliser le style-system pour les couleurs

### 2.3 Refactorer `components/answer-buttons.tsx`
- Remplacer les couleurs hardcodées par `colors.answerColors`
- Utiliser `buttonClasses.primary` ou créer `buttonClasses.answer`

### 2.4 Refactorer `components/chat-message.tsx`
- Ligne 39-72 : Utiliser `colors.messageTypes` au lieu de couleurs hardcodées
- Centraliser les styles dans le style-system

### 2.5 Vérifier autres composants
- `components/share-section.tsx` : Utiliser le style-system
- `components/typing-indicator.tsx` : Utiliser le style-system

**Impact :** +3 points (système de styles complet)

---

## 🔊 Étape 3 : Patterns audio spéciaux (9/10 → 10/10) | +1 point

### 3.1 Étendre `hooks/use-audio.ts`

Ajouter le pattern de vibration spécial :

```typescript
export function useAudio() {
  // ... code existant ...
  
  const playRevelation = useCallback(() => {
    playSound(SOUNDS.TAP, AUDIO.DEFAULT_VOLUME)
    vibrate([50, 100, 50]) // Pattern spécial pour révélations
  }, [playSound, vibrate])
  
  const playMotivation = useCallback(() => {
    playSound(SOUNDS.TAP, AUDIO.DEFAULT_VOLUME)
    vibrate([50, 100, 50]) // Même pattern
  }, [playSound, vibrate])

  return {
    playSound,
    vibrate,
    playWithVibration,
    playPop: () => playWithVibration(SOUNDS.POP, VIBRATION.LIGHT),
    playSend: () => playWithVibration(SOUNDS.SEND, VIBRATION.LIGHT),
    playComplete: () => playWithVibration(SOUNDS.COMPLETE, VIBRATION.MEDIUM),
    playChime: () => playWithVibration(SOUNDS.CHIME, VIBRATION.MEDIUM),
    playRevelation, // Nouveau
    playMotivation, // Nouveau
  }
}
```

### 3.2 Refactorer `app/result/page.tsx`
- Ligne 113-119 : Remplacer le code hardcodé par :
```typescript
if (messageType === "revelation" || messageType === "motivation") {
  playRevelation()
}
```

**Impact :** +1 point (patterns audio centralisés)

---

## 📊 Résumé

| Étape | Fichiers modifiés | Points gagnés | Difficulté |
|-------|-------------------|---------------|------------|
| 1. Internationalisation | `lib/i18n.ts`, `app/result/page.tsx`, `app/onboarding/page.tsx` | +2 | ⭐⭐⭐ |
| 2. Système de styles | `lib/style-system.ts`, `app/quiz/page.tsx`, `components/answer-buttons.tsx`, `components/chat-message.tsx` | +3 | ⭐⭐ |
| 3. Patterns audio | `hooks/use-audio.ts`, `app/result/page.tsx` | +1 | ⭐ |
| **TOTAL** | | **+6 points** | |

**Résultat final : 85 + 6 = 91/100 minimum**

### Score détaillé après corrections

| Critère | Avant | Après | Gain |
|---------|-------|-------|------|
| Constantes | 10/10 ✅ | 10/10 ✅ | 0 |
| Hooks | 10/10 ✅ | 10/10 ✅ | 0 |
| localStorage | 9/10 | 9/10 | 0 |
| Scroll | 10/10 ✅ | 10/10 ✅ | 0 |
| Audio/vibration | 9/10 | 10/10 ✅ | +1 |
| Styles | 7/10 | 10/10 ✅ | +3 |
| Internationalisation | 8/10 | 10/10 ✅ | +2 |
| Langue | 9/10 | 10/10 ✅ | 0 |
| **TOTAL** | **72/80** | **79/80** | **+6** |

**Score final : ~91/100 (98.9%)**

Pour atteindre 100/100, il reste à :
- Vérifier qu'aucun texte hardcodé ne subsiste
- Vérifier qu'aucune couleur hardcodée ne subsiste
- Vérifier la cohérence globale et les cas edge

### ⚠️ Points supplémentaires à vérifier

Après avoir appliqué les 3 étapes ci-dessus, vérifier :

1. **Tous les textes hardcodés sont-ils traduits ?**
   - Vérifier tous les composants pour du texte restant
   - Utiliser `grep` pour trouver les strings hardcodées

2. **Toutes les couleurs utilisent-elles le style-system ?**
   - Chercher `bg-[#`, `text-[#`, `border-[#` dans tout le code
   - Remplacer par les constantes du style-system

3. **Tous les patterns audio sont-ils centralisés ?**
   - Vérifier qu'aucun composant n'appelle directement `navigator.vibrate` ou `new Audio`

4. **Cohérence finale**
   - Lancer les tests
   - Vérifier qu'aucune fonctionnalité n'est cassée
   - Documenter les exceptions (comme `lib/tracking.ts`)

## 🎯 Estimation finale

Après avoir complété les 3 étapes principales :
- **91/100** minimum garanti
- Potentiel **95-100/100** selon le niveau de détails appliqué

Les 9 points restants dépendent de :
- Qualité d'implémentation (détails manquants)
- Gestion des cas edge
- Documentation et cohérence globale
