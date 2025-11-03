export const phase8 = {
  id: 8,
  title: "Discipline",
  category: "Mastery",
  energyType: "Mind" as const,
  color: "#0EA5E9", // Cyan/Blue - mastery, focus, clarity
  intro:
    "⚔️ Discipline isn't punishment — it's proof. The difference between potential and destiny is repetition. Let's see how often you keep your own promises.",

  questions: [
    {
      id: 1,
      text: "When motivation fades, what happens?",
      options: [
        {
          label: "💀 I stop — I wait for it to come back.",
          value: 0,
          feedback: "You depend on emotion, not decision.",
        },
        {
          label: "⚙️ I push through a little, but it's hard.",
          value: 1,
          feedback: "You fight resistance, but not yet yourself.",
        },
        { label: "🔥 I act anyway — I trust my process.", value: 3, feedback: "You've replaced mood with momentum." },
        {
          label: "🧠 I plan around it strategically.",
          value: 2,
          feedback: "You systematize effort — disciplined intelligence.",
        },
      ],
    },
    {
      id: 2,
      text: "When you fail at something important…",
      options: [
        { label: "😩 I give up for a while.", value: 0, feedback: "You confuse rest with retreat." },
        {
          label: "📖 I analyze what went wrong.",
          value: 2,
          feedback: "Reflection keeps your failure alive — but useful.",
        },
        { label: "⚡ I get back up immediately.", value: 3, feedback: "You've built recovery into identity." },
        { label: "😐 I pretend it doesn't matter.", value: 1, feedback: "You numb pain to avoid learning." },
      ],
    },
    {
      id: 3,
      text: "How consistent are you with your routines?",
      options: [
        {
          label: "😬 Only when I feel good.",
          value: 0,
          feedback: "Emotion dictates rhythm — chaos disguised as choice.",
        },
        {
          label: "🧩 Most of the time — I try my best.",
          value: 2,
          feedback: "You're building muscle — one imperfect rep at a time.",
        },
        {
          label: "🔥 Always — it's who I am now.",
          value: 3,
          feedback: "You've become the routine — discipline embodied.",
        },
        { label: "😐 I hate routines — they bore me.", value: 1, feedback: "Freedom without structure is erosion." },
      ],
    },
    {
      id: 4,
      text: "When no one is watching, you…",
      options: [
        { label: "😶 Relax the rules — it doesn't matter.", value: 0, feedback: "Integrity ends where eyes begin." },
        {
          label: "🧠 Stay disciplined, but allow small escapes.",
          value: 2,
          feedback: "Moderation is your quiet rebellion.",
        },
        {
          label: "⚔️ Stay sharp — self-respect is the audience.",
          value: 3,
          feedback: "You've learned that private victories shape public fate.",
        },
        {
          label: "😅 Do just enough to not feel guilty.",
          value: 1,
          feedback: "Your conscience keeps you from collapse — barely.",
        },
      ],
    },
    {
      id: 5,
      text: "When faced with long, hard goals…",
      options: [
        { label: "😩 I lose focus after a few weeks.", value: 0, feedback: "You mistake duration for difficulty." },
        { label: "⚙️ I break them into small steps.", value: 2, feedback: "You engineer endurance." },
        { label: "🔥 I commit fully until it's done.", value: 3, feedback: "Devotion has replaced doubt." },
        { label: "🧊 I procrastinate until urgency hits.", value: 1, feedback: "You flirt with chaos to feel alive." },
      ],
    },
    {
      id: 6,
      text: "What do you do when you don't feel like doing anything?",
      options: [
        {
          label: "😴 I rest and give myself permission.",
          value: 1,
          feedback: "You protect energy — but risk inertia.",
        },
        { label: "💪 I act small — just one task.", value: 3, feedback: "Momentum is built, not found." },
        {
          label: "🧠 I trick myself into starting.",
          value: 2,
          feedback: "You use psychology as a tool — wise warrior.",
        },
        {
          label: "💀 I do nothing — I shut down.",
          value: 0,
          feedback: "Inaction becomes identity if repeated too often.",
        },
      ],
    },
    {
      id: 7,
      text: "Your relationship with self-discipline feels like…",
      options: [
        { label: "🔗 A prison — I hate pressure.", value: 0, feedback: "You confuse structure with slavery." },
        { label: "💥 A battle — I win sometimes, lose others.", value: 1, feedback: "Conflict precedes command." },
        { label: "🧭 A compass — it keeps me aligned.", value: 3, feedback: "Discipline has evolved into devotion." },
        { label: "⚙️ A craft — I refine it every day.", value: 2, feedback: "You're shaping habit into art." },
      ],
    },
    {
      id: 8,
      text: "When you make a promise to yourself…",
      options: [
        {
          label: "😔 I break it often — I forgive myself later.",
          value: 0,
          feedback: "Self-forgiveness without correction breeds decay.",
        },
        {
          label: "🧠 I try to keep it, but I get distracted.",
          value: 1,
          feedback: "You mean well — intention without system.",
        },
        { label: "🔥 I keep it, even when it hurts.", value: 3, feedback: "Your word is weight — unbreakable steel." },
        { label: "⚙️ I build accountability systems.", value: 2, feedback: "You've turned promise into process." },
      ],
    },
    {
      id: 9,
      text: "If you fail three days in a row, you…",
      options: [
        { label: "💀 Feel worthless — start over someday.", value: 0, feedback: "Shame is not a strategy." },
        { label: "🧩 Reset the system and try again.", value: 2, feedback: "You iterate, not implode." },
        {
          label: "🔥 Return immediately — failure is feedback.",
          value: 3,
          feedback: "You've mastered rebound speed — the secret of consistency.",
        },
        { label: "😶 Ignore it — pretend it didn't happen.", value: 1, feedback: "Avoidance delays accountability." },
      ],
    },
    {
      id: 10,
      text: "If LifeClock could measure your discipline, it would reveal that you…",
      options: [
        { label: "😴 Rely on luck, not structure.", value: 0, feedback: "Entropy disguised as faith." },
        {
          label: "🧠 Try to stay consistent, but drift easily.",
          value: 1,
          feedback: "You live between effort and excuse.",
        },
        { label: "⚙️ Create systems to protect focus.", value: 2, feedback: "You engineer freedom through routine." },
        {
          label: "🔥 Embody discipline — no longer forced, but chosen.",
          value: 3,
          feedback: "You've turned habit into holiness.",
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
        archetype: "💤 The Drifter",
        description: "You move when moved. You confuse flow with drift — freedom with avoidance.",
        message: "Your potential sleeps inside repetition. Wake it with rhythm, not rage.",
      }
    } else if (total <= 15) {
      profile = {
        archetype: "⚙️ The Apprentice",
        description: "You've tasted structure, but not yet obedience to yourself. You train your will daily.",
        message: "Keep building. Discipline isn't domination — it's liberation.",
      }
    } else if (total <= 22) {
      profile = {
        archetype: "🔥 The Craftsman",
        description: "You design your life deliberately. You act by principle, not impulse.",
        message: "You no longer chase motivation — you manufacture it.",
      }
    } else {
      profile = {
        archetype: "⚔️ The Warrior Monk",
        description: "You've merged stillness and strength. Routine is sacred, and every action carries meaning.",
        message: "You no longer do — you *become*.",
      }
    }
    return { total, ...profile }
  },

  globalFeedback(total: number) {
    if (total < 10) return "💤 You drift in cycles of guilt and rest. Discipline is not pain — it's precision."
    if (total < 20) return "⚙️ You're sculpting structure from chaos. Keep forging — repetition reveals truth."
    return "⚔️ You've mastered the edge between will and peace. Discipline now breathes inside you."
  },
}
