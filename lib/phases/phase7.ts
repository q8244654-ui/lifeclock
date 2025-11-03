export const phase7 = {
  id: 7,
  title: "The Body",
  category: "Presence",
  energyType: "Heart" as const,
  color: "#10B981", // Green/Emerald - life, presence, grounding
  intro:
    "⚙️ Your body is your first memory — and your last truth. It knows before you do when you're lying, loving, or lost. Let's listen to it.",

  questions: [
    {
      id: 1,
      text: "When you feel stress in your body, what do you usually do?",
      options: [
        {
          label: "😶 Ignore it — I just push through.",
          value: 0,
          feedback: "You've taught your body silence, and it obeys too well.",
        },
        {
          label: "🧠 Rationalize it — 'It's nothing serious.'",
          value: 1,
          feedback: "You treat signals as noise — logic over intuition.",
        },
        {
          label: "🌿 Pause, breathe, and check in.",
          value: 3,
          feedback: "You've learned that calm is not luxury — it's language.",
        },
        {
          label: "💬 Complain but don't change anything.",
          value: 2,
          feedback: "You hear your body, but fear its truth.",
        },
      ],
    },
    {
      id: 2,
      text: "How do you relate to physical pain?",
      options: [
        {
          label: "🔥 I endure it — pain means I'm strong.",
          value: 0,
          feedback: "You confuse resilience with repression.",
        },
        {
          label: "💊 I fix it fast — no time for weakness.",
          value: 1,
          feedback: "You patch symptoms but ignore roots.",
        },
        {
          label: "🌊 I listen — pain always has a message.",
          value: 3,
          feedback: "You see pain as a teacher, not an enemy.",
        },
        { label: "🧘 I give it space and softness.", value: 2, feedback: "You heal through attention, not control." },
      ],
    },
    {
      id: 3,
      text: "Your sleep pattern says that you…",
      options: [
        {
          label: "🌒 Fight rest — it feels like lost time.",
          value: 0,
          feedback: "You run from stillness like it's death.",
        },
        { label: "🕰️ Sleep only when everything's done.", value: 1, feedback: "You trade dreams for deadlines." },
        { label: "🌙 Respect sleep — it's sacred maintenance.", value: 3, feedback: "You honor recovery as creation." },
        {
          label: "😐 Sleep irregularly — no real rhythm.",
          value: 2,
          feedback: "Your inner clock reflects your chaos.",
        },
      ],
    },
    {
      id: 4,
      text: "When you look at your reflection naked, you…",
      options: [
        { label: "😔 Feel critical or ashamed.", value: 0, feedback: "You see flaws, not form." },
        {
          label: "😐 Feel neutral — it's just a body.",
          value: 1,
          feedback: "You've detached from embodiment to avoid judgment.",
        },
        {
          label: "🌿 Feel gratitude — it carries you daily.",
          value: 3,
          feedback: "You see your body as temple, not cage.",
        },
        { label: "💭 Focus on what to 'fix.'", value: 2, feedback: "Improvement replaces intimacy." },
      ],
    },
    {
      id: 5,
      text: "Your relationship with food is mostly…",
      options: [
        {
          label: "🍔 Emotional — I eat when stressed or sad.",
          value: 0,
          feedback: "You use nourishment as anesthesia.",
        },
        {
          label: "🥗 Functional — just fuel for the machine.",
          value: 1,
          feedback: "You've turned life into logistics.",
        },
        {
          label: "🌾 Conscious — I respect what I consume.",
          value: 3,
          feedback: "You've merged biology with awareness.",
        },
        {
          label: "😅 Erratic — I forget to eat or overdo it.",
          value: 2,
          feedback: "Your rhythm follows emotion, not energy.",
        },
      ],
    },
    {
      id: 6,
      text: "When your body sends signals of fatigue, you…",
      options: [
        { label: "💪 Push harder — discipline first.", value: 0, feedback: "You confuse burnout with bravery." },
        { label: "😴 Rest briefly, then resume.", value: 1, feedback: "You rest to restart, not to restore." },
        { label: "🌙 Truly rest — no guilt.", value: 3, feedback: "You trust pause as part of performance." },
        { label: "📅 Schedule rest later.", value: 2, feedback: "You manage fatigue like a task, not a need." },
      ],
    },
    {
      id: 7,
      text: "When your heart races or your breath shortens, you…",
      options: [
        { label: "😬 Panic — something's wrong.", value: 0, feedback: "You meet sensations with fear, not curiosity." },
        {
          label: "🧠 Analyze the cause calmly.",
          value: 2,
          feedback: "You bring reason to reaction — grounded awareness.",
        },
        {
          label: "🧘 Breathe deeper — you know it passes.",
          value: 3,
          feedback: "You've befriended your body's storms.",
        },
        { label: "😐 Ignore it — it happens often.", value: 1, feedback: "You've normalized alarm — dangerous peace." },
      ],
    },
    {
      id: 8,
      text: "How do you use movement or exercise?",
      options: [
        { label: "🏋️ To punish myself or prove worth.", value: 0, feedback: "You turn vitality into penance." },
        { label: "🚶 To maintain balance and clarity.", value: 3, feedback: "You move to remember you're alive." },
        {
          label: "⚡ To feel control over my body.",
          value: 2,
          feedback: "You channel control through repetition — better, but rigid.",
        },
        { label: "😅 Rarely — I don't prioritize it.", value: 1, feedback: "Disconnection breeds stagnation." },
      ],
    },
    {
      id: 9,
      text: "Your body is speaking — what word describes its voice?",
      options: [
        { label: "💀 Silence.", value: 0, feedback: "You've muted the messenger." },
        { label: "⚡ Noise.", value: 1, feedback: "Your signals scream from neglect." },
        { label: "🌿 Whispers.", value: 2, feedback: "You're starting to listen." },
        { label: "🌞 Music.", value: 3, feedback: "Harmony — body and mind finally in tune." },
      ],
    },
    {
      id: 10,
      text: "If LifeClock could scan your body's energy right now, it would say:",
      options: [
        { label: "💀 'You're surviving, not living.'", value: 0, feedback: "Vitality lost to vigilance." },
        { label: "🧠 'You're thinking too much to feel.'", value: 1, feedback: "Mind over matter — and it shows." },
        {
          label: "🌊 'You're flowing — integrated and aware.'",
          value: 3,
          feedback: "You inhabit yourself — that's rare.",
        },
        {
          label: "🌙 'You're halfway home — almost aligned.'",
          value: 2,
          feedback: "You sense harmony, but haven't surrendered yet.",
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
        archetype: "💀 The Disconnected Vessel",
        description: "You live in your head, far from your body. Exhaustion is your language — numbness your armor.",
        message: "You think — therefore you forget to feel.",
      }
    } else if (total <= 15) {
      profile = {
        archetype: "⚡ The Overcontroller",
        description: "You treat your body like a machine. You manage it, not inhabit it.",
        message: "You perform wellness instead of embodying it.",
      }
    } else if (total <= 22) {
      profile = {
        archetype: "🌿 The Listener",
        description: "You respect your body's wisdom and rhythm. You trust sensations more than schedules.",
        message: "You've made peace between instinct and intellect.",
      }
    } else {
      profile = {
        archetype: "🌞 The Embodied Spirit",
        description: "You move through life in full awareness. Your body and soul are one instrument — tuned to truth.",
        message: "You no longer live inside your body. You *are* your body.",
      }
    }
    return { total, ...profile }
  },

  globalFeedback(total: number) {
    if (total < 10) return "💀 You've silenced your body — but it never stops speaking."
    if (total < 20) return "⚡ You're learning to respect the body as ally, not obstacle."
    return "🌞 You live inside your rhythm — grounded, alive, whole."
  },
}
