export const phase4 = {
  id: 4,
  title: "Love",
  category: "Heart",
  energyType: "Heart" as const,
  color: "#EC4899", // Rose/Magenta - love, heart, tenderness
  intro:
    "💓 Love is the most powerful force — and the most misunderstood. Let's see not who you love… but how you love.",

  questions: [
    {
      id: 1,
      text: "When someone truly loves you, how do you react?",
      options: [
        { label: "😨 You pull away — it feels dangerous.", value: 0, feedback: "You mistake love for risk." },
        {
          label: "🙂 You accept it, but quietly doubt it.",
          value: 1,
          feedback: "You crave love but question its permanence.",
        },
        { label: "💫 You open up fully.", value: 3, feedback: "You understand that love expands when shared." },
        {
          label: "😐 You act like it's nothing special.",
          value: 2,
          feedback: "You protect your heart by pretending it's normal.",
        },
      ],
    },
    {
      id: 2,
      text: "When you love someone deeply…",
      options: [
        { label: "🔥 You give everything — even too much.", value: 0, feedback: "You confuse love with self-erasure." },
        { label: "⚖️ You give and receive equally.", value: 3, feedback: "You've found the art of reciprocal love." },
        {
          label: "🧊 You give slowly, waiting to be sure.",
          value: 2,
          feedback: "You love with calculation, not fear.",
        },
        { label: "💭 You think more than you feel.", value: 1, feedback: "Your mind supervises your heart." },
      ],
    },
    {
      id: 3,
      text: "If you feel rejected by someone you love…",
      options: [
        { label: "💔 You chase them even harder.", value: 0, feedback: "You turn pain into pursuit." },
        { label: "🧘 You accept it and let go.", value: 3, feedback: "You choose peace over possession." },
        {
          label: "🧠 You try to understand what went wrong.",
          value: 2,
          feedback: "Reason replaces resentment — healing through clarity.",
        },
        { label: "🧊 You pretend not to care.", value: 1, feedback: "Your armor hides your wound." },
      ],
    },
    {
      id: 4,
      text: "When someone doesn't meet your expectations…",
      options: [
        { label: "😡 You feel betrayed.", value: 0, feedback: "You confuse love with loyalty to your script." },
        { label: "💬 You communicate honestly.", value: 3, feedback: "Love matures through truth, not guessing." },
        { label: "😐 You withdraw and go silent.", value: 1, feedback: "Your silence becomes your shield." },
        { label: "🤝 You adjust and understand.", value: 2, feedback: "You let compassion override ego." },
      ],
    },
    {
      id: 5,
      text: "In a relationship, you fear most:",
      options: [
        { label: "💀 Being abandoned.", value: 0, feedback: "Fear of loss runs deeper than love itself." },
        { label: "😶 Losing yourself.", value: 2, feedback: "You protect your identity inside connection." },
        { label: "💔 Being misunderstood.", value: 1, feedback: "You crave emotional precision, not just affection." },
        { label: "🌿 Becoming too comfortable.", value: 3, feedback: "You know comfort kills fire — and growth." },
      ],
    },
    {
      id: 6,
      text: "When you fight with someone you care about…",
      options: [
        { label: "🔥 You explode, then regret it.", value: 0, feedback: "Anger masks your fear of rejection." },
        {
          label: "🧊 You shut down until things cool off.",
          value: 1,
          feedback: "Distance feels safer than confrontation.",
        },
        { label: "💬 You talk it through quickly.", value: 3, feedback: "You value connection over being right." },
        { label: "🧠 You analyze every word later.", value: 2, feedback: "Reflection saves you — but delays healing." },
      ],
    },
    {
      id: 7,
      text: "When you see affection between others, you…",
      options: [
        { label: "💔 Feel left out.", value: 0, feedback: "You measure love as scarcity." },
        { label: "😊 Feel warm and inspired.", value: 3, feedback: "Love multiplies in your presence." },
        { label: "😐 Feel nothing special.", value: 1, feedback: "You keep your emotions neutral to stay safe." },
        {
          label: "🧠 Compare it to your own experiences.",
          value: 2,
          feedback: "You intellectualize what others feel.",
        },
      ],
    },
    {
      id: 8,
      text: "Do you believe love should be easy?",
      options: [
        {
          label: "💤 Yes — if it's hard, it's wrong.",
          value: 0,
          feedback: "You confuse peace with absence of growth.",
        },
        { label: "⚡ No — real love demands effort.", value: 3, feedback: "You embrace the labor of intimacy." },
        { label: "🧘 Sometimes — but not forced.", value: 2, feedback: "You balance harmony with honesty." },
        {
          label: "🤷 I don't really believe in 'love' anymore.",
          value: 1,
          feedback: "Disappointment disguised as wisdom.",
        },
      ],
    },
    {
      id: 9,
      text: "When you love, what's your hidden expectation?",
      options: [
        { label: "❤️ To be saved.", value: 0, feedback: "You want love to fix what's broken inside." },
        { label: "🌿 To grow together.", value: 3, feedback: "You see love as evolution, not rescue." },
        { label: "✨ To feel chosen.", value: 1, feedback: "Validation still fuels your affection." },
        { label: "🧘 To experience peace.", value: 2, feedback: "You seek stillness in shared chaos." },
      ],
    },
    {
      id: 10,
      text: "If LifeClock could show how you love, it would reveal that you…",
      options: [
        {
          label: "💀 Fear love but crave it endlessly.",
          value: 0,
          feedback: "You orbit the flame but never touch it.",
        },
        { label: "💞 Love deeply but inconsistently.", value: 1, feedback: "Your intensity is both gift and curse." },
        {
          label: "🌹 Love consciously — even when it hurts.",
          value: 3,
          feedback: "You know that love and pain are twins of growth.",
        },
        {
          label: "🌊 Love freely — without needing to own.",
          value: 2,
          feedback: "You've transcended attachment into connection.",
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
        archetype: "🧊 The Guarded Heart",
        description: "You fear love's unpredictability. You wear distance as armor, but longing as perfume.",
        message: "You want to be loved without being seen.",
      }
    } else if (total <= 15) {
      profile = {
        archetype: "💔 The Romantic Survivor",
        description: "You've been burned and built walls. Yet beneath the ashes, your heart still glows.",
        message: "You still believe — but carefully.",
      }
    } else if (total <= 22) {
      profile = {
        archetype: "🌹 The Conscious Lover",
        description:
          "You love with both courage and clarity. You allow others to be free while staying true to yourself.",
        message: "You know that love is not ownership — it's presence.",
      }
    } else {
      profile = {
        archetype: "🌊 The Unconditional Soul",
        description: "You've merged compassion with strength. You love from wholeness, not from need.",
        message: "You no longer love to fill a void — you love to expand the world.",
      }
    }
    return { total, ...profile }
  },

  globalFeedback(total: number) {
    if (total < 10) return "💔 Your heart is cautious. Let it breathe — pain is not your enemy, numbness is."
    if (total < 20) return "🌹 You're learning to love with awareness — not fantasy."
    return "🌊 Love flows through you — no fear, no control, only presence."
  },
}
