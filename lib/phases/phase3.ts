export const phase3 = {
  id: 3,
  title: "The Desire",
  category: "Fire",
  energyType: "Drive" as const,
  color: "#EF4444", // Red/Orange - fire, passion, burning desire
  intro:
    "🔥 Desire is not weakness — it's direction. But only if you learn to ride it, not drown in it. Answer with honesty — what truly pulls your strings?",

  questions: [
    {
      id: 1,
      text: "When you want something deeply…",
      options: [
        {
          label: "🔥 You can't think about anything else.",
          value: 0,
          feedback: "Obsession gives you focus — and blindness.",
        },
        {
          label: "🌪️ You plan how to get it step by step.",
          value: 2,
          feedback: "You channel fire into precision — dangerous and powerful.",
        },
        {
          label: "💬 You talk about it until it feels real.",
          value: 1,
          feedback: "Desire becomes your story before your reality.",
        },
        {
          label: "🌊 You let it come naturally if it's meant for you.",
          value: 3,
          feedback: "You no longer chase — you attract.",
        },
      ],
    },
    {
      id: 2,
      text: "When you see someone living your dream…",
      options: [
        { label: "😠 You feel envy and pressure.", value: 0, feedback: "You confuse inspiration with comparison." },
        {
          label: "🧠 You study how they did it.",
          value: 2,
          feedback: "You turn jealousy into fuel — wisdom through imitation.",
        },
        {
          label: "💬 You celebrate them genuinely.",
          value: 3,
          feedback: "You understand abundance is not a zero-sum game.",
        },
        {
          label: "😐 You feel distant and detached.",
          value: 1,
          feedback: "You protect yourself from longing by numbing it.",
        },
      ],
    },
    {
      id: 3,
      text: "When you get what you wanted…",
      options: [
        { label: "😶 You feel empty again.", value: 0, feedback: "You crave the chase, not the prize." },
        {
          label: "💫 You enjoy it and then evolve.",
          value: 3,
          feedback: "You turn desire into growth — mastery in motion.",
        },
        {
          label: "🔄 You immediately want something bigger.",
          value: 1,
          feedback: "Hunger keeps you alive, but restless.",
        },
        {
          label: "🧘 You slow down to appreciate it deeply.",
          value: 2,
          feedback: "You've learned that gratitude feeds desire, not kills it.",
        },
      ],
    },
    {
      id: 4,
      text: "If love and ambition collided, you would…",
      options: [
        { label: "🔥 Choose ambition — love can wait.", value: 0, feedback: "Your fire consumes connection." },
        {
          label: "🌹 Choose love — success means nothing without it.",
          value: 2,
          feedback: "Your heart leads, even when it hurts.",
        },
        {
          label: "⚖️ Try to balance both, even if it kills you.",
          value: 3,
          feedback: "You chase harmony inside the storm.",
        },
        { label: "🧊 Avoid both — too risky to lose control.", value: 1, feedback: "Fear disguises itself as logic." },
      ],
    },
    {
      id: 5,
      text: "What drives you the most?",
      options: [
        { label: "💰 Recognition and wealth.", value: 1, feedback: "You measure worth through mirrors and numbers." },
        {
          label: "🔥 The thrill of achieving what few dare.",
          value: 2,
          feedback: "You crave the impossible — it's your element.",
        },
        {
          label: "💡 The need to create something meaningful.",
          value: 3,
          feedback: "You are driven by purpose, not applause.",
        },
        { label: "😐 Avoiding failure at all costs.", value: 0, feedback: "Fear is your hidden fuel." },
      ],
    },
    {
      id: 6,
      text: "When desire becomes overwhelming…",
      options: [
        { label: "🧊 You suppress it completely.", value: 0, feedback: "Control kills your vitality." },
        { label: "🔥 You act impulsively.", value: 1, feedback: "You feed the flame faster than you can direct it." },
        {
          label: "🧘 You observe it until it fades or transforms.",
          value: 3,
          feedback: "You've mastered the fire instead of fearing it.",
        },
        { label: "💬 You rationalize it away.", value: 2, feedback: "Your mind negotiates with your instincts." },
      ],
    },
    {
      id: 7,
      text: "If success meant losing some people in your life…",
      options: [
        { label: "💀 I'd still go all in.", value: 2, feedback: "You burn bridges to build kingdoms." },
        {
          label: "💔 I'd hesitate — I value connection too much.",
          value: 1,
          feedback: "Your heart negotiates with your ambition.",
        },
        {
          label: "🧠 I'd find a way to have both.",
          value: 3,
          feedback: "You seek evolution without destruction — rare wisdom.",
        },
        { label: "😐 I'd rather stay comfortable.", value: 0, feedback: "You trade destiny for peace." },
      ],
    },
    {
      id: 8,
      text: "How do you react to delayed gratification?",
      options: [
        { label: "🔥 I hate waiting — I need it now.", value: 0, feedback: "Patience feels like punishment." },
        {
          label: "🧠 I distract myself by working harder.",
          value: 2,
          feedback: "You weaponize time to stay in control.",
        },
        {
          label: "🕰️ I trust that what's meant will come.",
          value: 3,
          feedback: "You've aligned with the rhythm of the universe.",
        },
        { label: "😶 I lose motivation quickly.", value: 1, feedback: "Desire without direction drains you." },
      ],
    },
    {
      id: 9,
      text: "When you fall in love with an idea or a person…",
      options: [
        {
          label: "💭 You idealize them until they disappoint you.",
          value: 0,
          feedback: "You love the reflection more than the reality.",
        },
        {
          label: "💬 You obsessively talk about them.",
          value: 1,
          feedback: "You verbalize passion to feel in control.",
        },
        { label: "🔥 You take action, no hesitation.", value: 3, feedback: "Desire becomes creation — pure fire." },
        {
          label: "🧘 You feel deeply, but stay detached.",
          value: 2,
          feedback: "You've learned to love without possession.",
        },
      ],
    },
    {
      id: 10,
      text: "If LifeClock could measure your fire, it would find that you…",
      options: [
        { label: "🕯️ Burn for what's missing.", value: 0, feedback: "Desire defines your pain." },
        { label: "⚡ Burn for what's possible.", value: 2, feedback: "You turn imagination into movement." },
        { label: "🔥 Burn for everything, all at once.", value: 1, feedback: "Intensity gives you identity." },
        {
          label: "🌞 Burn steadily — warm, not wild.",
          value: 3,
          feedback: "You've learned that true fire doesn't consume — it sustains.",
        },
      ],
    },
  ],

  evaluate(answers: Array<{ value: number }>) {
    const total = answers.reduce((sum, a) => sum + a.value, 0)
    let profile: {
      archetype: string
      description: string
      message: string
    }

    if (total <= 8) {
      profile = {
        archetype: "🔥 The Addict of Fire",
        description: "Desire rules you. You chase the high, not the truth. Your hunger creates progress — and chaos.",
        message: "You don't love what you want. You love the wanting itself.",
      }
    } else if (total <= 15) {
      profile = {
        archetype: "💭 The Dream-Chaser",
        description: "You live through visions and emotion. Desire motivates you, but sometimes blinds you.",
        message: "You chase horizons, but forget the ground beneath you.",
      }
    } else if (total <= 22) {
      profile = {
        archetype: "⚡ The Alchemist",
        description: "You transform desire into creation. You know how to balance passion with intention.",
        message: "Your fire builds — it no longer burns.",
      }
    } else {
      profile = {
        archetype: "🌞 The Embodied Flame",
        description: "You've merged hunger with peace. Your desire doesn't control you — it guides you.",
        message: "You are desire without desperation.",
      }
    }
    return { total, ...profile }
  },

  globalFeedback(total: number) {
    if (total < 10)
      return "🔥 You burn fast and bright — but the light fades quickly. Learn to breathe inside your fire."
    if (total < 20) return "⚡ Desire drives you. Balance it with patience, and it becomes power."
    return "🌞 Your fire is steady — creation without destruction."
  },
}
