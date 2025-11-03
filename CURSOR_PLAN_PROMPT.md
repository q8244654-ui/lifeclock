# PROMPT POUR CURSOR PLAN : Atteindre 100/100 en cohérence

## OBJECTIF
Compléter le refactoring du projet LifeClock pour atteindre **100/100 en cohérence** en finalisant l'internationalisation, le système de styles, et la centralisation des patterns audio.

## CONTEXTE ACTUEL
Le projet est actuellement à **85/100** en cohérence. Les phases 1-5 du refactoring initial sont terminées :
- ✅ Constantes centralisées (`lib/constants.ts`)
- ✅ Hooks centralisés (`useAudio`, `useAutoScroll`, `useLocalStorage`)
- ✅ Système de styles créé (`lib/style-system.ts`)
- ✅ i18n structure créée (`lib/i18n.ts`)
- ✅ Langue anglaise standardisée (hors admin)

## PHASE 6 : FINALISATION POUR 100/100

### TÂCHE 6.1 : Internationalisation complète des conversations (+2 points)

**Objectif** : Déplacer tous les messages hardcodés vers i18n

#### 6.1.1 : Étendre `lib/i18n.ts`

Ajouter dans `translations.en` et `translations.fr` :

```typescript
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

#### 6.1.2 : Refactorer `app/result/page.tsx`

Dans la fonction `startConversation()` :
- Remplacer tous les `addMessage("assistant", "texte hardcodé")` par `addMessage("assistant", t('conversation.result.start.userName', 'en').replace('{userName}', userName))`
- Utiliser `t()` avec remplacement des variables pour les messages dynamiques
- Exemple :
  ```typescript
  addMessage("assistant", 
    t('conversation.result.start.archetype', 'en')
      .replace('{archetype}', getArchetypeName(finalReport.archetype))
      .replace('{emoji}', getArchetypeEmoji(finalReport.archetype))
  )
  ```

Dans `handleMainCTA()`, `handleRefuse()`, `handleObjection()`, `handleFinalRefuse()` :
- Remplacer tous les messages hardcodés par des appels à `t()` avec les clés appropriées

#### 6.1.3 : Refactorer `app/onboarding/page.tsx`

Dans la fonction `startInvocation()` :
- Remplacer `addBotMessage("texte hardcodé")` par `addBotMessage(tArray('conversation.onboarding.invocation', index, 'en'))`
- Utiliser un index qui s'incrémente à chaque message

**Critères de succès** :
- ✅ Aucun message hardcodé dans `app/result/page.tsx`
- ✅ Aucun message hardcodé dans `app/onboarding/page.tsx`
- ✅ Toutes les traductions sont dans `lib/i18n.ts`
- ✅ Les variables sont correctement remplacées avec `.replace()`

---

### TÂCHE 6.2 : Système de styles complet (+3 points)

**Objectif** : Remplacer toutes les couleurs hardcodées par le style-system

#### 6.2.1 : Étendre `lib/style-system.ts`

Ajouter :

```typescript
export const colors = {
  // ... existant ...
  answerColors: {
    rarely: '#2C2C2E',
    sometimes: '#2C5282',
    often: '#3B82F6',
    always: '#0A84FF',
  },
  messageTypes: {
    normal: '#2C2C2E',
    motivationStart: '#F97316',
    motivationEnd: '#FB923C',
    revelationStart: '#EF4444',
    revelationEnd: '#F87171',
    introspectionStart: '#EAB308',
    introspectionEnd: '#FCD34D',
    humorStart: '#22C55E',
    humorEnd: '#4ADE80',
  },
} as const

export const buttonClasses = {
  // ... existant ...
  quizOption: `group relative overflow-hidden rounded-2xl bg-[#2C2C2E] px-6 py-4 text-left text-[17px] font-medium text-[#E5E5EA] shadow-lg transition-all hover:bg-[#3A3A3C] active:shadow-xl`,
  answer: (color: string) => `w-full px-6 py-3 text-white rounded-2xl text-[17px] leading-[22px] font-normal transition-all disabled:opacity-40 disabled:cursor-not-allowed`,
}

export const gradientClasses = {
  motivation: 'linear-gradient(135deg, #F97316 0%, #FB923C 100%)',
  revelation: 'linear-gradient(135deg, #EF4444 0%, #F87171 100%)',
  introspection: 'linear-gradient(135deg, #EAB308 0%, #FCD34D 100%)',
  humor: 'linear-gradient(135deg, #22C55E 0%, #4ADE80 100%)',
} as const
```

#### 6.2.2 : Refactorer `app/quiz/page.tsx`

Ligne 357 : Remplacer
```typescript
className="group relative overflow-hidden rounded-2xl bg-[#2C2C2E] px-6 py-4 text-left text-[17px] font-medium text-[#E5E5EA] shadow-lg transition-all hover:bg-[#3A3A3C] active:shadow-xl"
```

Par :
```typescript
className={buttonClasses.quizOption}
```

#### 6.2.3 : Refactorer `components/answer-buttons.tsx`

Remplacer les couleurs hardcodées :
```typescript
const answers = [
  { key: "R", label: "Rarement", value: 1, color: colors.answerColors.rarely },
  { key: "E", label: "Parfois", value: 2, color: colors.answerColors.sometimes },
  { key: "P", label: "Souvent", value: 3, color: colors.answerColors.often },
  { key: "S", label: "Toujours", value: 4, color: colors.answerColors.always },
]
```

Utiliser `buttonClasses.answer(color)` pour le className.

#### 6.2.4 : Refactorer `components/chat-message.tsx`

Dans `messageStyles`, remplacer les couleurs hardcodées par :
```typescript
const messageStyles = {
  normal: {
    background: colors.messageTypes.normal,
    color: colors.textPrimary.replace('text-', ''), // "#E5E5EA"
    // ...
  },
  motivation: {
    background: gradientClasses.motivation,
    // ...
  },
  // ... etc
}
```

#### 6.2.5 : Vérifier autres fichiers

Chercher `bg-[#`, `text-[#`, `border-[#` dans `app/` et `components/` (hors admin) et remplacer par le style-system.

**Critères de succès** :
- ✅ Aucune couleur hardcodée `#[0-9A-F]` dans les fichiers app/components (hors admin)
- ✅ Toutes les couleurs utilisent `colors.*` ou `gradientClasses.*`
- ✅ Tous les boutons utilisent `buttonClasses.*`

---

### TÂCHE 6.3 : Patterns audio centralisés (+1 point)

**Objectif** : Centraliser le pattern de vibration spécial

#### 6.3.1 : Étendre `hooks/use-audio.ts`

Ajouter :

```typescript
export function useAudio() {
  // ... code existant ...

  const playRevelation = useCallback(() => {
    playSound(SOUNDS.TAP, AUDIO.DEFAULT_VOLUME)
    vibrate([50, 100, 50]) // Pattern spécial pour révélations/motivation
  }, [playSound, vibrate])
  
  const playMotivation = useCallback(() => {
    playSound(SOUNDS.TAP, AUDIO.DEFAULT_VOLUME)
    vibrate([50, 100, 50]) // Même pattern
  }, [playSound, vibrate])

  return {
    // ... existant ...
    playRevelation,
    playMotivation,
  }
}
```

#### 6.3.2 : Refactorer `app/result/page.tsx`

Lignes 113-119 : Remplacer
```typescript
if (messageType === "revelation" || messageType === "motivation") {
  if (typeof navigator !== "undefined" && navigator.vibrate) {
    navigator.vibrate([50, 100, 50])
  }
}
```

Par :
```typescript
const { playRevelation, playMotivation } = useAudio()

// Dans addMessage :
if (messageType === "revelation") {
  playRevelation()
} else if (messageType === "motivation") {
  playMotivation()
}
```

**Critères de succès** :
- ✅ Aucun appel direct à `navigator.vibrate()` dans les composants
- ✅ Tous les patterns audio sont dans `useAudio`
- ✅ `app/result/page.tsx` utilise les nouvelles fonctions

---

## VALIDATION FINALE

### Checklist de vérification

1. **Internationalisation**
   - [ ] `grep -r "addMessage.*\"" app/result` ne retourne que des appels à `t()`
   - [ ] `grep -r "addBotMessage.*\"" app/onboarding` ne retourne que des appels à `tArray()`
   - [ ] Toutes les clés i18n sont utilisées

2. **Système de styles**
   - [ ] `grep -r "bg-\[#" app/ components/` ne retourne rien (hors admin)
   - [ ] `grep -r "text-\[#" app/ components/` ne retourne rien (hors admin)
   - [ ] Toutes les couleurs viennent de `style-system.ts`

3. **Audio**
   - [ ] `grep -r "navigator.vibrate" app/ components/` ne retourne rien (hors hooks)
   - [ ] `grep -r "new Audio" app/ components/` ne retourne rien (hors hooks)

4. **Tests**
   - [ ] Les pages fonctionnent correctement
   - [ ] Les messages s'affichent avec les traductions
   - [ ] Les sons et vibrations fonctionnent
   - [ ] Les styles sont cohérents

## INSTRUCTIONS IMPORTANTES

1. **Ordre d'exécution** : Respecter l'ordre des tâches (6.1 → 6.2 → 6.3)
2. **Ne pas casser l'existant** : Tester après chaque modification
3. **Types TypeScript** : Tous les ajouts doivent être typés
4. **Commentaires** : Ajouter des commentaires pour les logiques complexes
5. **Exceptions** : Les pages admin (`app/admin/*`) peuvent garder le français et les styles hardcodés

## CRITÈRES DE SUCCÈS FINAUX

✅ 100% des messages utilisent i18n
✅ 100% des couleurs utilisent le style-system
✅ 100% des patterns audio sont centralisés
✅ Aucune duplication de code
✅ Aucune fonctionnalité cassée
✅ Cohérence 100/100 atteinte

## NOTE FINALE

Après ces modifications, le projet devrait atteindre **91-100/100** en cohérence selon le niveau de détail appliqué dans l'implémentation.

