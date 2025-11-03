export const phase10 = {
  id: 10,
  title: "Legacy",
  category: "Transmission",
  energyType: "Spirit" as const,
  color: "#9333EA", // Purple/Amethyst - wisdom, transmission, royal heritage
  intro:
    "🌅 Every heartbeat writes a sentence in the story of your life. Legacy isn't what you leave behind — it's what you awaken in others while you're still here. Let's see what story your time is writing.",

  questions: [
    {
      id: 1,
      text: "When you imagine your last day on Earth, what emotion dominates?",
      options: [
        { label: "😨 Fear — I'm not ready.", value: 0, feedback: "You fear unfinished symphonies — not death itself." },
        { label: "😔 Regret — I could have done more.", value: 1, feedback: "You feel the ache of unused potential." },
        {
          label: "🌿 Peace — I gave what I came to give.",
          value: 3,
          feedback: "You measure life in depth, not years.",
        },
        { label: "🔥 Pride — I lived intensely.", value: 2, feedback: "You equate impact with fire, not roots." },
      ],
    },
    {
      id: 2,
      text: "When people remember you, what would you want them to feel?",
      options: [
        { label: "💡 Inspired to act.", value: 3, feedback: "You wish to ignite light in others — true legacy." },
        { label: "❤️ Loved and connected.", value: 2, feedback: "You want your memory to heal, not impress." },
        { label: "🏆 Respect for my success.", value: 1, feedback: "You crave recognition more than remembrance." },
        {
          label: "😐 Nothing — I don't care what happens after.",
          value: 0,
          feedback: "Indifference hides fear of being forgotten.",
        },
      ],
    },
    {
      id: 3,
      text: "When you help someone, you usually…",
      options: [
        {
          label: "💬 Expect them to notice or thank me.",
          value: 1,
          feedback: "You trade help for validation — a silent contract.",
        },
        {
          label: "🌿 Do it because it feels right.",
          value: 3,
          feedback: "You understand giving as self-extension, not loss.",
        },
        {
          label: "🤔 Analyze if they 'deserve' it.",
          value: 2,
          feedback: "You give with discernment — wise but conditional.",
        },
        { label: "😐 Rarely do it — I'm focused on my path.", value: 0, feedback: "You see isolation as efficiency." },
      ],
    },
    {
      id: 4,
      text: "How do you measure success now?",
      options: [
        { label: "💰 In results and possessions.", value: 0, feedback: "You still weigh worth in weight and numbers." },
        { label: "🏆 In respect and influence.", value: 1, feedback: "You value echo more than essence." },
        { label: "🌿 In alignment and peace.", value: 3, feedback: "Your metric is harmony — the rarest wealth." },
        { label: "💡 In growth and lessons learned.", value: 2, feedback: "You measure evolution, not accumulation." },
      ],
    },
    {
      id: 5,
      text: "When you see young people chasing what you once did, you feel…",
      options: [
        {
          label: "😠 Irritated — they don't understand life yet.",
          value: 0,
          feedback: "You've turned experience into superiority.",
        },
        { label: "😌 Nostalgic — I remember that fire.", value: 1, feedback: "You miss the chaos that built you." },
        {
          label: "🌿 Proud — the torch keeps burning.",
          value: 3,
          feedback: "You recognize continuity as immortality.",
        },
        {
          label: "🧠 Detached — it's their journey, not mine.",
          value: 2,
          feedback: "You accept separation with serenity.",
        },
      ],
    },
    {
      id: 6,
      text: "When you achieve something great, what's your instinct?",
      options: [
        { label: "🔥 Celebrate loudly — I've earned it.", value: 1, feedback: "You equate victory with validation." },
        { label: "🌙 Reflect quietly on the path.", value: 3, feedback: "You find joy in process, not applause." },
        { label: "💬 Teach others how to do it too.", value: 2, feedback: "You multiply success by sharing it." },
        { label: "😐 Move on to the next goal.", value: 0, feedback: "You skip celebration — stuck in doing." },
      ],
    },
    {
      id: 7,
      text: "If you could leave one message for humanity, it would be:",
      options: [
        { label: "💀 'Wake up — time is running out.'", value: 0, feedback: "You teach urgency, not trust." },
        {
          label: "🌞 'Remember — you are already enough.'",
          value: 3,
          feedback: "You transmit peace through presence.",
        },
        {
          label: "⚙️ 'Build, create, and never settle.'",
          value: 2,
          feedback: "You push humanity toward motion — noble fire.",
        },
        { label: "❤️ 'Love, even when it hurts.'", value: 1, feedback: "You pass down compassion through courage." },
      ],
    },
    {
      id: 8,
      text: "When you think of your life's impact, you…",
      options: [
        {
          label: "😔 Doubt that it matters.",
          value: 0,
          feedback: "You underestimate how presence ripples beyond logic.",
        },
        {
          label: "🧠 Hope it mattered to a few people.",
          value: 1,
          feedback: "You think legacy in small, tender scales.",
        },
        {
          label: "🌿 Feel peace — every act counts.",
          value: 3,
          feedback: "You trust resonance more than recognition.",
        },
        { label: "🔥 Feel driven to make it huge.", value: 2, feedback: "Your legacy still wears ambition's flame." },
      ],
    },
    {
      id: 9,
      text: "If the world forgot your name tomorrow…",
      options: [
        { label: "💀 I'd feel erased.", value: 0, feedback: "You confuse being remembered with being real." },
        { label: "😔 I'd accept it — but it would hurt.", value: 1, feedback: "Attachment fades slower than form." },
        {
          label: "🌙 I'd smile — life remembers in other ways.",
          value: 3,
          feedback: "You've let go of the illusion of permanence.",
        },
        {
          label: "🧠 I'd start again — legacy is ongoing.",
          value: 2,
          feedback: "You understand immortality as iteration.",
        },
      ],
    },
    {
      id: 10,
      text: "If LifeClock could show your legacy, it would reveal that you…",
      options: [
        { label: "💀 Chased noise but lost the melody.", value: 0, feedback: "You achieved more than you became." },
        { label: "⚡ Built, but forgot to breathe.", value: 1, feedback: "You left monuments — not memories." },
        {
          label: "🌿 Inspired others to rise.",
          value: 3,
          feedback: "You turned your life into a signal, not a statue.",
        },
        { label: "🌞 Became a quiet example of balance.", value: 2, feedback: "You proved peace can lead, too." },
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
        archetype: "💀 The Achiever Lost in Noise",
        description: "You built towers but forgot the sky. You lived for impact, not imprint.",
        message: "Your story is still loud — but not yet heard. Build less — mean more.",
      }
    } else if (total <= 15) {
      profile = {
        archetype: "🔥 The Builder of Echoes",
        description: "You seek remembrance, not resonance. Your fire inspires, but burns fast.",
        message: "Legacy is not applause — it's continuity.",
      }
    } else if (total <= 22) {
      profile = {
        archetype: "🌿 The Gardener of Souls",
        description: "You plant seeds you'll never see bloom. You create silently, trusting time.",
        message: "You've learned that what lasts is what you give away.",
      }
    } else {
      profile = {
        archetype: "🌞 The Eternal Flame",
        description: "You've transcended legacy. You *are* the transmission — love, wisdom, and creation embodied.",
        message: "You don't leave a mark. You leave a light.",
      }
    }
    return { total, ...profile }
  },

  globalFeedback(total: number) {
    if (total < 10) return "💀 You've achieved much, but significance awaits depth."
    if (total < 20) return "🔥 You're shifting from ambition to meaning. Keep refining the signal."
    return "🌞 You've become what you sought to create — timeless presence."
  },
}
