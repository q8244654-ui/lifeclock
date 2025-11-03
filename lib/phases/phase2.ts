export const phase2 = {
  id: 2,
  title: "The Control",
  category: "Fear",
  energyType: "Mind" as const,
  color: "#3B82F6", // Blue steel - control, structure, mental cold
  intro:
    "⏳ Control feels safe, but safety often costs your freedom. Answer instinctively — where does your control begin, and where does it end?",

  questions: [
    {
      id: 1,
      text: "When plans suddenly change, {name}…",
      provocativeComment: "You can lie to me. But can you lie to yourself?",
      options: [
        { label: "😤 You panic and try to restore order.", value: 0, feedback: "You equate chaos with danger." },
        { label: "🧠 You quickly rebuild a new plan.", value: 2, feedback: "Flexibility keeps your power intact." },
        { label: "😐 You adapt and move on.", value: 3, feedback: "You've learned to surf uncertainty." },
        {
          label: "🤷 You freeze and wait for others to decide.",
          value: 1,
          feedback: "Indecision disguises hidden control — waiting for the world to act for you.",
        },
      ],
    },
    {
      id: 2,
      text: "You realize something went wrong because of you.",
      options: [
        { label: "💥 You obsess over every detail.", value: 0, feedback: "Perfectionism is your punishment ritual." },
        { label: "🧩 You analyze, learn, and move on.", value: 3, feedback: "You transform guilt into mastery." },
        {
          label: "😔 You blame yourself quietly.",
          value: 1,
          feedback: "Responsibility without compassion breeds exhaustion.",
        },
        {
          label: "😎 You pretend it never happened.",
          value: -1,
          feedback: "Denial keeps your illusion of control alive.",
        },
      ],
    },
    {
      id: 3,
      text: "When someone does things differently from you, {name}…",
      provocativeComment: "This answer says more about you than them.",
      options: [
        { label: "🔥 You correct them immediately.", value: 0, feedback: "You control to feel safe, not efficient." },
        { label: "🧘 You let them try and learn.", value: 3, feedback: "True control is trusting the process." },
        { label: "🤔 You compare silently.", value: 1, feedback: "Judgment is your quiet weapon." },
        { label: "😅 You intervene later with advice.", value: 2, feedback: "You disguise control as guidance." },
      ],
    },
    {
      id: 4,
      text: "When the outcome is uncertain…",
      options: [
        { label: "😬 You imagine every worst scenario.", value: 0, feedback: "Fear is your way of feeling prepared." },
        {
          label: "🧭 You act anyway, uncertainty excites you.",
          value: 3,
          feedback: "You trust momentum more than safety.",
        },
        {
          label: "💭 You wait for a 'sign' before moving.",
          value: 1,
          feedback: "You hand your power to the invisible.",
        },
        {
          label: "📋 You double-check every variable.",
          value: 2,
          feedback: "Logic gives you the illusion of control.",
        },
      ],
    },
    {
      id: 5,
      text: "If someone takes control in your place, {name}…",
      options: [
        { label: "😡 You resist immediately.", value: 0, feedback: "Dominance feels like survival." },
        { label: "🧩 You observe how they handle it.", value: 2, feedback: "You learn by letting go — a rare skill." },
        { label: "😶 You withdraw silently.", value: 1, feedback: "Retreat is your subtle rebellion." },
        {
          label: "🙏 You feel relieved.",
          value: 3,
          feedback: "You no longer need to rule everything to feel valuable.",
        },
      ],
    },
    {
      id: 6,
      text: "When you can't predict the future…",
      provocativeComment: "You're answering fast. Too fast. Are you really thinking?",
      options: [
        { label: "🕰️ You plan obsessively.", value: 0, feedback: "Preparation has replaced faith." },
        {
          label: "🌊 You surrender to what comes.",
          value: 3,
          feedback: "Flow replaces fear — control evolves into presence.",
        },
        {
          label: "📅 You make a backup plan, just in case.",
          value: 2,
          feedback: "You mix logic with intuition — balanced control.",
        },
        { label: "😐 You ignore it until it's too late.", value: -1, feedback: "Avoidance is inverted control." },
      ],
    },
    {
      id: 7,
      text: "How do you feel when someone else drives the car?",
      options: [
        { label: "😬 I want to grab the wheel.", value: 0, feedback: "Trust is your hardest test." },
        { label: "😅 I watch the road and breathe.", value: 1, feedback: "Your vigilance never sleeps." },
        { label: "😎 I relax, music on.", value: 3, feedback: "Letting go feels like freedom now." },
        { label: "😐 I close my eyes and endure it.", value: 2, feedback: "You fake surrender, but still calculate." },
      ],
    },
    {
      id: 8,
      text: "When things go better than expected, {name}…",
      options: [
        { label: "🤨 You worry it won't last.", value: 0, feedback: "Your mind mistrusts peace." },
        { label: "😊 You enjoy it fully.", value: 3, feedback: "You allow happiness without control." },
        { label: "🧠 You immediately plan to sustain it.", value: 2, feedback: "Even joy becomes a project." },
        { label: "😐 You feel strangely empty.", value: 1, feedback: "Control fed you — calm leaves a void." },
      ],
    },
    {
      id: 9,
      text: "If someone surprises you emotionally…",
      options: [
        { label: "😶 You freeze, unsure what to do.", value: 1, feedback: "Emotion without control feels like chaos." },
        { label: "💬 You express your surprise honestly.", value: 3, feedback: "You welcome spontaneity as truth." },
        {
          label: "😏 You act like you expected it.",
          value: 0,
          feedback: "Image over authenticity — the strategist returns.",
        },
        { label: "🧠 You analyze the reason behind it.", value: 2, feedback: "Understanding gives you safety." },
      ],
    },
    {
      id: 10,
      text: "What scares you the most, {name}?",
      provocativeComment: "Be honest. The truth is waiting.",
      options: [
        { label: "💀 Losing control of yourself.", value: 0, feedback: "Your power depends on resistance." },
        { label: "🌫️ Not knowing what comes next.", value: 1, feedback: "Uncertainty still whispers fear." },
        { label: "🕊️ Letting go and trusting life.", value: 2, feedback: "Surrender feels both terrifying and sacred." },
        {
          label: "🔥 Realizing you were never in control.",
          value: 3,
          feedback: "That truth could finally set you free.",
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
        archetype: "🧩 The Controller",
        description: "You grip reality with both hands. Control protects you from chaos, but also from growth.",
        message: "You mistake safety for mastery. The tighter you hold, the less you feel.",
      }
    } else if (total <= 15) {
      profile = {
        archetype: "⚙️ The Planner",
        description: "You seek stability through structure. Predictability comforts you, but sometimes cages you.",
        message: "You manage well, but you rarely flow.",
      }
    } else if (total <= 22) {
      profile = {
        archetype: "🌬️ The Balancer",
        description: "You dance between order and surrender. You control when needed, release when wise.",
        message: "You bend, so you never break.",
      }
    } else {
      profile = {
        archetype: "🌊 The Flow-Master",
        description: "You've transcended control. You act from trust, not fear. The universe moves through you.",
        message: "You don't control the tide — you surf it.",
      }
    }
    return { total, ...profile }
  },

  globalFeedback(total: number) {
    if (total < 10) return "🕰️ Your grip is iron — but even iron rusts. Let the current move once."
    if (total < 20) return "⚡ You're learning to balance control and faith."
    return "🌊 You've found flow. Control has become clarity."
  },
}
