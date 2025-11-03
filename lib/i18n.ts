// i18n structure for LifeClock
// Defaults to English

export const translations = {
  en: {
    common: {
      error: 'An error occurred',
      retry: 'Try again',
      backHome: 'Back to home',
      loading: 'Loading...',
    },
    generating: {
      steps: [
        "Uh... {name}, did you think it was over?",
        "Your answers reveal what you hide.",
        "10,000 souls analyzed. You're not like the others.",
        "Your essence is unveiled. No turning back.",
        "Patterns emerge. You'll understand.",
        "The truth scares you, {name}. That's normal.",
        "Your body speaks. Your soul listens.",
        "The seal is placed on your being.",
        "Breathe. What you're about to see will change everything.",
        "It's ready. You are {ready}.",
      ],
      warning: "Your report is being built. Every second counts. Don't close this page.",
    },
    errors: {
      generic: 'An error occurred',
      unexpected: 'An unexpected error occurred',
      retry: 'Try again',
      backHome: 'Back to home',
      description: "Sorry, something didn't work. You can try reloading this section.",
      persistent: 'Please try again. If the problem persists, return to the home page.',
    },
    onboarding: {
      title: 'Welcome',
      namePrompt: 'What is your name?',
      agePrompt: 'How old are you?',
      emailPrompt: 'What is your email?',
    },
    quiz: {
      title: 'Quiz',
      next: 'Next',
      previous: 'Previous',
      submit: 'Submit',
    },
    result: {
      title: 'Your results',
      viewReport: 'View report',
      downloadPDF: 'Download PDF',
    },
    conversation: {
      result: {
        start: {
          userName: '{userName}.',
          stillHere: "You're still here.",
          questions: '100 questions. 100 doors opened.',
          dontKnow: "But you don't yet know what they reveal.",
          forExample: 'For example...',
          andAlso: 'And also...',
          surface: 'This is just the surface.',
          reportContains: 'Your report contains 47 revelations.',
          archetype: 'Your archetype: **{archetype} {emoji}**',
          score: 'Your score: **{score}/100**',
          mostImportantly: 'But most importantly...',
          threeForces: '3 invisible forces control your life.',
          shadow: '🔒 **Your Shadow** — what you refuse to see',
          fear: '🔒 **Your Fear** — what paralyzes you',
          power: '🔒 **Your Power** — what you dare not use',
          allInReport: "They're all in your report.",
          twoPaths: '{userName}, you have two paths.',
          firstPath: '**The first**: you leave. You forget. You continue.',
          secondPath: '**The second**: you see everything. The 47 revelations. Your blueprint.',
          fleeOrFace: 'So... do you flee or do you face it?',
        },
        mainCTA: {
          userWants: 'I want to see everything',
          goodChoice: 'Good choice.',
          revelations: '47 revelations. Your Shadow. Your Fear. Your Power.',
          therapy: '5 years of therapy = $10,000. Your LifeClock = $47.',
          expires: '⏳ Expires in {time}.',
          ready: 'Ready?',
        },
        refuse: {
          userRefuses: 'No, I prefer not to know',
          wait: 'Wait.',
          whyHesitate: 'Why are you hesitating?',
        },
        objection: {
          price: {
            user: 'The price',
            mirror: 'The price is the mirror of courage.',
            cost: '$47. Less than a dinner. More than a lifetime.',
            invested: 'You invested 20 minutes. This report is the fruit.',
            souls: '10,000 souls have taken this step.',
          },
          worth: {
            user: "I don't know if it's worth it",
            afraid: "That's what those who are afraid to see themselves say.",
            notPDF: "This isn't a PDF. It's a mirror.",
            clarity: 'How much is clarity about who you are worth?',
            neverKnow: 'Most will never know.',
          },
          time: {
            user: 'I need time',
            precisely: 'Time. Precisely.',
            change: 'You change every second.',
            captures: 'This report captures who you are NOW.',
            gone: 'In 15 minutes, this moment will be gone.',
          },
          ready: 'So, {userName}... ready?',
        },
        finalRefuse: {
          user: 'No, really',
          notReady: "You weren't ready.",
          timeWaits: 'But time waits for you.',
          seeYou: 'See you soon, {userName}.',
        },
      },
      onboarding: {
        invocation: [
          'Uh...',
          'What are you doing here?',
          'No, seriously.',
          'Why are you here, now, at this precise moment?',
          'Most people spend their lives running from these kinds of questions.',
          'You came looking for them.',
          'Interesting.',
          "Well. Since you're here...",
          "I'm LifeClock.",
          "And if you stay, I'll show you something few people have the courage to see:",
          'You. The real you.',
          'Not the image you project.',
          'Not the version you tell.',
          'You.',
          'So... are you staying?',
          'Or do you prefer to keep pretending?',
        ],
      },
    },
  },
  fr: {
    common: {
      error: 'Une erreur est survenue',
      retry: 'Réessayer',
      backHome: 'Retour à l\'accueil',
      loading: 'Chargement...',
    },
    generating: {
      steps: [
        "Euuh... {name}, tu pensais que c'était fini ?",
        "Tes réponses révèlent ce que tu caches.",
        "10 000 âmes analysées. Tu n'es pas comme les autres.",
        "Ton essence se dévoile. Pas de retour en arrière.",
        "Les patterns émergent. Tu vas comprendre.",
        "La vérité fait peur, {name}. C'est normal.",
        "Ton corps parle. Ton âme écoute.",
        "Le sceau se pose sur ton être.",
        "Respire. Ce que tu vas voir va tout changer.",
        "C'est prêt. Tu es {ready}.",
      ],
      warning: "Ton rapport se construit. Chaque seconde compte. Ne ferme pas cette page.",
    },
    errors: {
      generic: 'Une erreur est survenue',
      unexpected: 'Une erreur inattendue est survenue',
      retry: 'Réessayer',
      backHome: 'Retour à l\'accueil',
      description: 'Désolé, quelque chose n\'a pas fonctionné. Vous pouvez réessayer de charger cette section.',
      persistent: 'Veuillez réessayer. Si le problème persiste, revenez à l\'accueil.',
    },
    onboarding: {
      title: 'Bienvenue',
      namePrompt: 'Quel est votre nom ?',
      agePrompt: 'Quel est votre âge ?',
      emailPrompt: 'Quel est votre email ?',
    },
    quiz: {
      title: 'Quiz',
      next: 'Suivant',
      previous: 'Précédent',
      submit: 'Soumettre',
    },
    result: {
      title: 'Vos résultats',
      viewReport: 'Voir le rapport',
      downloadPDF: 'Télécharger PDF',
    },
    conversation: {
      result: {
        start: {
          userName: '{userName}.',
          stillHere: 'Tu es toujours là.',
          questions: '100 questions. 100 portes ouvertes.',
          dontKnow: "Mais tu ne sais pas encore ce qu'elles révèlent.",
          forExample: 'Par exemple...',
          andAlso: 'Et aussi...',
          surface: 'Ceci n est que la surface.',
          reportContains: 'Ton rapport contient 47 révélations.',
          archetype: 'Ton archétype : **{archetype} {emoji}**',
          score: 'Ton score : **{score}/100**',
          mostImportantly: 'Mais plus important encore...',
          threeForces: '3 forces invisibles contrôlent ta vie.',
          shadow: '🔒 **Ton Ombre** — ce que tu refuses de voir',
          fear: '🔒 **Ta Peur** — ce qui te paralyse',
          power: '🔒 **Ton Pouvoir** — ce que tu n oses pas utiliser',
          allInReport: 'Elles sont toutes dans ton rapport.',
          twoPaths: '{userName}, tu as deux chemins.',
          firstPath: '**Le premier** : tu pars. Tu oublies. Tu continues.',
          secondPath: '**Le second** : tu vois tout. Les 47 révélations. Ton plan.',
          fleeOrFace: 'Donc... tu fuis ou tu y fais face ?',
        },
        mainCTA: {
          userWants: 'Je veux tout voir',
          goodChoice: 'Bon choix.',
          revelations: '47 révélations. Ton Ombre. Ta Peur. Ton Pouvoir.',
          therapy: '5 ans de thérapie = 10 000 $. Ton LifeClock = 47 $.',
          expires: '⏳ Expire dans {time}.',
          ready: 'Prêt ?',
        },
        refuse: {
          userRefuses: 'Non, je préfère ne pas savoir',
          wait: 'Attends.',
          whyHesitate: 'Pourquoi hésites-tu ?',
        },
        objection: {
          price: {
            user: 'Le prix',
            mirror: 'Le prix est le miroir du courage.',
            cost: '47 $. Moins qu un dîner. Plus qu une vie.',
            invested: 'Tu as investi 20 minutes. Ce rapport en est le fruit.',
            souls: '10 000 âmes ont franchi ce pas.',
          },
          worth: {
            user: "Je ne sais pas si ça vaut le coup",
            afraid: 'C est ce que disent ceux qui ont peur de se voir.',
            notPDF: "Ce n est pas un PDF. C est un miroir.",
            clarity: 'Combien vaut la clarté sur qui tu es ?',
            neverKnow: 'La plupart ne le sauront jamais.',
          },
          time: {
            user: 'J ai besoin de temps',
            precisely: 'Le temps. Précisément.',
            change: 'Tu changes chaque seconde.',
            captures: 'Ce rapport capture qui tu es MAINTENANT.',
            gone: 'Dans 15 minutes, ce moment sera passé.',
          },
          ready: 'Donc, {userName}... prêt ?',
        },
        finalRefuse: {
          user: 'Non, vraiment',
          notReady: 'Tu n étais pas prêt.',
          timeWaits: 'Mais le temps t attend.',
          seeYou: 'À bientôt, {userName}.',
        },
      },
      onboarding: {
        invocation: [
          'Euh...',
          'Qu est-ce que tu fais ici ?',
          'Non, sérieusement.',
          'Pourquoi es-tu ici, maintenant, à ce moment précis ?',
          'La plupart des gens passent leur vie à fuir ce genre de questions.',
          'Tu es venu les chercher.',
          'Intéressant.',
          'Eh bien. Puisque tu es là...',
          'Je suis LifeClock.',
          'Et si tu restes, je te montrerai quelque chose que peu de gens ont le courage de voir :',
          'Toi. Le vrai toi.',
          'Pas l image que tu projettes.',
          'Pas la version que tu racontes.',
          'Toi.',
          'Alors... tu restes ?',
          'Ou préfères-tu continuer à faire semblant ?',
        ],
      },
    },
  },
} as const

export type Locale = 'en' | 'fr'
export type TranslationKey = keyof typeof translations.en

export function t(key: string, locale: Locale = 'en'): string | string[] {
  const keys = key.split('.')
  let value: any = translations[locale]
  
  for (const k of keys) {
    value = value?.[k]
    if (value === undefined) {
      return key // Return key as fallback
    }
  }
  
  return value // Return string or array
}

// Helper to get array item from translation
export function tArray(key: string, index: number, locale: Locale = 'en'): string {
  const value = t(key, locale)
  if (Array.isArray(value)) {
    return value[index] || key
  }
  return typeof value === 'string' ? value : key
}

// Helper to get nested translations (string only)
export function getTranslation(path: string, locale: Locale = 'en'): string {
  const value = t(path, locale)
  return typeof value === 'string' ? value : path
}

