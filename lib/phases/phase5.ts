export const phase5 = {
  id: 5,
  title: "Time",
  category: "Mortality",
  energyType: "Spirit" as const,
  color: "#8B5CF6", // Violet/Indigo - mystery, eternity, mortality
  intro: "⏳ You don't lack time — you lack presence. Let's see how you dance with the seconds you've been given.",

  questions: [
    {
      id: 1,
      text: "When you think about your future…",
      options: [
        {
          label: "😬 You feel anxious about wasting time.",
          value: 1,
          feedback: "You measure life in deadlines, not days.",
        },
        {
          label: "🧭 You plan every step carefully.",
          value: 2,
          feedback: "Order comforts you — but sometimes cages you.",
        },
        {
          label: "🌊 You trust life to unfold naturally.",
          value: 3,
          feedback: "You've begun to flow with time, not against it.",
        },
        { label: "😐 You avoid thinking about it.", value: 0, feedback: "Avoidance is fear disguised as peace." },
      ],
    },
    {
      id: 2,
      text: "When you're bored, what do you do?",
      options: [
        { label: "📱 Scroll endlessly.", value: 0, feedback: "You escape time instead of feeling it." },
        { label: "💭 Reflect or daydream.", value: 2, feedback: "You use emptiness as fuel for imagination." },
        { label: "🌿 Go for a walk or breathe.", value: 3, feedback: "You know stillness is not waste." },
        { label: "🧩 Start something new immediately.", value: 1, feedback: "You fight stillness with stimulation." },
      ],
    },
    {
      id: 3,
      text: "Do you often feel like you're running out of time?",
      options: [
        {
          label: "🔥 Always. It's my biggest fear.",
          value: 0,
          feedback: "You chase life as if it's fleeing from you.",
        },
        { label: "⏳ Sometimes, but it motivates me.", value: 2, feedback: "Mortality sharpens your focus." },
        { label: "🌙 Rarely — I trust my rhythm.", value: 3, feedback: "You've stopped racing the clock." },
        {
          label: "🤷 Not really. I don't think about it.",
          value: 1,
          feedback: "You numb the pressure with distraction.",
        },
      ],
    },
    {
      id: 4,
      text: "When you wake up in the morning…",
      options: [
        { label: "😩 You dread the day ahead.", value: 0, feedback: "You carry yesterday's fatigue into today." },
        { label: "🧠 You start planning immediately.", value: 2, feedback: "You mistake control for clarity." },
        {
          label: "💫 You feel grateful and grounded.",
          value: 3,
          feedback: "You start your day in alignment, not anxiety.",
        },
        {
          label: "😐 You just go through motions.",
          value: 1,
          feedback: "Habit replaces intention — quietly stealing time.",
        },
      ],
    },
    {
      id: 5,
      text: "When you look back at your past year…",
      options: [
        { label: "💀 I barely remember it — it flew by.", value: 0, feedback: "Autopilot stole your hours." },
        { label: "📈 I grew, even through mistakes.", value: 3, feedback: "You see time as teacher, not thief." },
        { label: "🔁 It felt repetitive and dull.", value: 1, feedback: "You lived, but without direction." },
        {
          label: "💡 It had highs and lows — both meaningful.",
          value: 2,
          feedback: "You honor contrast — that's wisdom.",
        },
      ],
    },
    {
      id: 6,
      text: "How do you react when things take longer than expected?",
      options: [
        { label: "😠 I lose patience fast.", value: 0, feedback: "Impatience hides fear of losing control." },
        { label: "😐 I get frustrated but adapt.", value: 1, feedback: "You tolerate delay without embracing it." },
        {
          label: "🧘 I trust timing — it always reveals purpose.",
          value: 3,
          feedback: "You've made peace with divine pacing.",
        },
        {
          label: "⚙️ I try to optimize the process.",
          value: 2,
          feedback: "Efficiency gives you comfort — even in waiting.",
        },
      ],
    },
    {
      id: 7,
      text: "Your relationship with deadlines is…",
      options: [
        { label: "🔥 Stressful — I always feel late.", value: 0, feedback: "Time owns you through urgency." },
        {
          label: "🧠 Organized — I meet them precisely.",
          value: 2,
          feedback: "You use structure to control uncertainty.",
        },
        {
          label: "🌿 Balanced — I deliver without pressure.",
          value: 3,
          feedback: "You've turned time into an ally, not an enemy.",
        },
        { label: "😅 Chaotic — I work best under pressure.", value: 1, feedback: "You confuse adrenaline for flow." },
      ],
    },
    {
      id: 8,
      text: "When you have free time, you…",
      options: [
        {
          label: "📱 Fill it immediately with tasks or screens.",
          value: 0,
          feedback: "You fear silence — the true mirror of time.",
        },
        {
          label: "🧘 Use it to recharge intentionally.",
          value: 3,
          feedback: "You rest with awareness — rare mastery.",
        },
        { label: "😶 Waste it, then feel guilty.", value: 1, feedback: "You live between doing and regretting." },
        { label: "🌞 Let it flow without guilt or goal.", value: 2, feedback: "Freedom is your rhythm now." },
      ],
    },
    {
      id: 9,
      text: "If LifeClock showed how much time you truly *live* (not just exist), you'd see that you…",
      options: [
        { label: "💀 Spend most days half-awake.", value: 0, feedback: "Routine has replaced wonder." },
        { label: "💫 Are present more often than before.", value: 2, feedback: "Awareness is growing inside you." },
        {
          label: "🌞 Live fully — every day feels intentional.",
          value: 3,
          feedback: "You don't count days, you fill them.",
        },
        { label: "😐 Don't know — time feels foggy.", value: 1, feedback: "Disconnection disguises itself as calm." },
      ],
    },
    {
      id: 10,
      text: "If time were a person standing before you right now, what would you say?",
      options: [
        { label: "⏰ 'Please slow down.'", value: 1, feedback: "You fear the speed, not the passage." },
        { label: "🙏 'Thank you for teaching me.'", value: 3, feedback: "You've made peace with impermanence." },
        { label: "😢 'I've wasted too much of you.'", value: 0, feedback: "Regret is your echo of awareness." },
        { label: "💬 'Let's create something together.'", value: 2, feedback: "You've turned time into partnership." },
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
        archetype: "⌛ The Chaser",
        description: "You run against time instead of with it. You measure worth by speed, not presence.",
        message: "You don't fear death — you fear stillness.",
      }
    } else if (total <= 15) {
      profile = {
        archetype: "🕰️ The Scheduler",
        description: "You try to master time through structure. You achieve much — but forget to live between tasks.",
        message: "You plan beautifully, but rarely pause to feel it.",
      }
    } else if (total <= 22) {
      profile = {
        archetype: "🌿 The Harmonizer",
        description: "You understand the rhythm of things. You work with time, not against it.",
        message: "You flow between creation and rest — that's freedom.",
      }
    } else {
      profile = {
        archetype: "🌞 The Timeless Soul",
        description: "You no longer chase or count. You live from depth, not duration. Every second feels eternal.",
        message: "Time doesn't move you — you move through it.",
      }
    }
    return { total, ...profile }
  },

  globalFeedback(total: number) {
    if (total < 10) return "⏳ You fight time — and it always wins. Try listening instead of running."
    if (total < 20) return "🕰️ You're learning to trust time's intelligence."
    return "🌞 You've transcended urgency. Time is no longer your master."
  },
}
