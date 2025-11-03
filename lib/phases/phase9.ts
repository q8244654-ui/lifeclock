export const phase9 = {
  id: 9,
  title: "Faith",
  category: "Transcendence",
  energyType: "Spirit" as const,
  color: "#FEF3C7", // White/Golden light - transcendence, divine light
  intro:
    "🌙 Faith begins where control ends. It's not about believing in something — it's about remembering that you're part of everything. Let's see how much trust flows through you.",

  questions: [
    {
      id: 1,
      text: "When life doesn't go as planned…",
      options: [
        {
          label: "😡 I fight until I force an outcome.",
          value: 0,
          feedback: "You wrestle with life instead of dancing with it.",
        },
        { label: "😔 I lose hope for a while.", value: 1, feedback: "You confuse disappointment with destiny." },
        {
          label: "🌿 I trust it has meaning, even if I don't see it yet.",
          value: 3,
          feedback: "You've learned the serenity of uncertainty.",
        },
        {
          label: "🧠 I try to rationalize everything.",
          value: 2,
          feedback: "You think your way through the unknown — not always a bridge, sometimes a wall.",
        },
      ],
    },
    {
      id: 2,
      text: "Do you believe things happen for a reason?",
      options: [
        {
          label: "💀 No — life is random.",
          value: 0,
          feedback: "Your logic shields you from chaos, but also from wonder.",
        },
        {
          label: "🤔 Maybe — I like to think so.",
          value: 1,
          feedback: "You hope for meaning but still negotiate with doubt.",
        },
        {
          label: "🌌 Yes — everything connects in invisible ways.",
          value: 3,
          feedback: "You see pattern in paradox — faith as perception.",
        },
        { label: "🧠 Only when it benefits me.", value: 2, feedback: "Conditional faith — controlled surrender." },
      ],
    },
    {
      id: 3,
      text: "When something miraculous or lucky happens, you…",
      options: [
        { label: "😐 Call it coincidence.", value: 0, feedback: "You fear believing too much." },
        { label: "😅 Smile, but doubt it.", value: 1, feedback: "You flirt with magic, but keep your guard." },
        { label: "🌟 Feel gratitude and awe.", value: 3, feedback: "You've reopened the child's eye — pure wonder." },
        {
          label: "🧠 Try to explain it rationally.",
          value: 2,
          feedback: "You honor the mystery, but still measure it.",
        },
      ],
    },
    {
      id: 4,
      text: "What does 'faith' mean to you?",
      options: [
        { label: "💀 Blind belief — not for me.", value: 0, feedback: "You reject surrender as weakness." },
        { label: "💬 Hope in something greater.", value: 1, feedback: "You reach upward, but without full release." },
        {
          label: "🌊 Trust in life's intelligence.",
          value: 3,
          feedback: "You let the river carry you, not drown you.",
        },
        { label: "🧠 A mindset that helps resilience.", value: 2, feedback: "You intellectualize the sacred." },
      ],
    },
    {
      id: 5,
      text: "When you can't control an outcome…",
      options: [
        { label: "😬 I panic or overthink.", value: 0, feedback: "You still confuse surrender with danger." },
        { label: "🧠 I plan alternatives immediately.", value: 2, feedback: "You negotiate with the void." },
        { label: "🧘 I breathe and wait.", value: 3, feedback: "You've mastered the art of patience." },
        { label: "😐 I distract myself.", value: 1, feedback: "Avoidance hides as calm." },
      ],
    },
    {
      id: 6,
      text: "When someone betrays your trust…",
      options: [
        { label: "💀 I close off completely.", value: 0, feedback: "You protect safety by isolating love." },
        { label: "😔 I forgive but never forget.", value: 1, feedback: "Memory outweighs mercy." },
        {
          label: "🌿 I release and move forward.",
          value: 3,
          feedback: "You've learned that bitterness poisons the holder first.",
        },
        { label: "🧠 I observe and detach.", value: 2, feedback: "Forgiveness through distance — wisdom's defense." },
      ],
    },
    {
      id: 7,
      text: "How do you interpret silence from the universe?",
      options: [
        { label: "😡 As rejection.", value: 0, feedback: "You see delay as denial." },
        { label: "🤔 As uncertainty.", value: 1, feedback: "You wait, but without presence." },
        { label: "🌙 As redirection.", value: 3, feedback: "You've made peace with divine timing." },
        { label: "🧘 As space to listen.", value: 2, feedback: "You turn absence into meditation." },
      ],
    },
    {
      id: 8,
      text: "Do you believe in destiny?",
      options: [
        { label: "💀 No — we make everything ourselves.", value: 0, feedback: "You worship control, not creation." },
        {
          label: "🧠 Partly — we shape paths within fate.",
          value: 2,
          feedback: "You merge free will with flow — a rare equilibrium.",
        },
        {
          label: "🌞 Yes — I feel guided by something beyond logic.",
          value: 3,
          feedback: "You've surrendered to orchestration.",
        },
        { label: "😐 I used to, but not anymore.", value: 1, feedback: "Disillusionment hides an old believer." },
      ],
    },
    {
      id: 9,
      text: "When you think about death, you feel…",
      options: [
        {
          label: "😨 Fear — I avoid the thought.",
          value: 0,
          feedback: "You resist the only truth that never betrays.",
        },
        { label: "🧠 Curiosity — I wonder what's beyond.", value: 2, feedback: "You question with calm reverence." },
        {
          label: "🌞 Peace — it's just another transformation.",
          value: 3,
          feedback: "You've transcended the illusion of ending.",
        },
        { label: "😔 Sadness — I'm not ready yet.", value: 1, feedback: "Attachment softens faith's horizon." },
      ],
    },
    {
      id: 10,
      text: "If LifeClock revealed your level of faith, it would show that you…",
      options: [
        { label: "💀 Rely only on yourself.", value: 0, feedback: "Independence without trust is exhaustion." },
        {
          label: "😐 Believe sometimes — when things are easy.",
          value: 1,
          feedback: "Your faith is fair-weather — still conditional.",
        },
        {
          label: "🧘 Trust life even when it makes no sense.",
          value: 3,
          feedback: "You've fused courage with surrender.",
        },
        {
          label: "🌿 Balance belief and action naturally.",
          value: 2,
          feedback: "You move between trust and will — sacred rhythm.",
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
        archetype: "💀 The Rational Skeptic",
        description: "You believe only in what you can measure. Control feels safer than mystery.",
        message: "Logic gave you clarity, but stole your peace. Mystery is not your enemy — it's your missing limb.",
      }
    } else if (total <= 15) {
      profile = {
        archetype: "🕯️ The Questioner",
        description: "You sense something greater, but hesitate to name it. You live between intellect and intuition.",
        message: "Faith doesn't start with answers — it starts with surrender.",
      }
    } else if (total <= 22) {
      profile = {
        archetype: "🌿 The Believer",
        description: "You trust the invisible rhythm of existence. You see alignment in chaos.",
        message: "Your calm is proof that you no longer need proof.",
      }
    } else {
      profile = {
        archetype: "🌞 The Infinite Soul",
        description: "You've dissolved the boundary between you and life. You act as the universe, not within it.",
        message: "You no longer believe — you *remember*.",
      }
    }
    return { total, ...profile }
  },

  globalFeedback(total: number) {
    if (total < 10) return "💀 You still fight the unknown. Faith begins where control breaks."
    if (total < 20) return "🕯️ You're opening to the invisible. Doubt is not weakness — it's the door."
    return "🌞 You've merged trust and truth. You no longer seek — you are found."
  },
}
