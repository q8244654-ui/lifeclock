export const phase6 = {
  id: 6,
  title: "Money",
  category: "Material",
  energyType: "Drive" as const,
  color: "#F59E0B", // Gold/Yellow - wealth, material, prosperity
  intro:
    "💸 Money reveals what you truly believe about yourself. It doesn't change you — it amplifies what's already there. Let's see what it amplifies in you.",

  questions: [
    {
      id: 1,
      text: "When you think about wealth, what comes to mind first?",
      options: [
        {
          label: "😬 Corruption and greed.",
          value: 0,
          feedback: "You equate power with danger — your beliefs limit your permission to receive.",
        },
        {
          label: "💼 Stability and independence.",
          value: 2,
          feedback: "You see money as a foundation — not a master.",
        },
        { label: "🔥 Freedom and adventure.", value: 3, feedback: "You associate wealth with possibility, not fear." },
        {
          label: "💭 Success, but for others — not me.",
          value: 1,
          feedback: "You still see abundance as belonging to 'them,' not 'you.'",
        },
      ],
    },
    {
      id: 2,
      text: "When you receive unexpected money…",
      options: [
        { label: "😐 You feel undeserving.", value: 0, feedback: "You still link money to moral worth." },
        { label: "😅 You're grateful but cautious.", value: 1, feedback: "You enjoy abundance, but with suspicion." },
        { label: "💫 You celebrate openly.", value: 3, feedback: "You let gratitude expand what arrives." },
        {
          label: "🧠 You instantly plan how to use or invest it.",
          value: 2,
          feedback: "You pair emotion with logic — prosperity thinking.",
        },
      ],
    },
    {
      id: 3,
      text: "How do you feel about people who are rich?",
      options: [
        { label: "😤 Most didn't earn it fairly.", value: 0, feedback: "You hold judgment that blocks attraction." },
        {
          label: "😐 It depends on what they do with it.",
          value: 2,
          feedback: "You focus on impact, not envy — emotional maturity.",
        },
        { label: "🤩 They inspire me to aim higher.", value: 3, feedback: "You see wealth as expansion, not threat." },
        {
          label: "🤷 I don't think about them.",
          value: 1,
          feedback: "You disconnect from comparison to avoid discomfort.",
        },
      ],
    },
    {
      id: 4,
      text: "When you spend money on yourself…",
      options: [
        { label: "😔 You feel guilt right after.", value: 0, feedback: "You confuse self-worth with sacrifice." },
        { label: "🧠 You justify it logically.", value: 1, feedback: "You allow pleasure only through reason." },
        {
          label: "💎 You feel proud — it's a vote for your future self.",
          value: 3,
          feedback: "You associate money with alignment, not indulgence.",
        },
        {
          label: "💬 You compare your spending to others.",
          value: 2,
          feedback: "You seek validation through reflection, not intention.",
        },
      ],
    },
    {
      id: 5,
      text: "What scares you most about losing money?",
      options: [
        { label: "💀 Becoming powerless.", value: 0, feedback: "You tie survival to control." },
        { label: "😔 Feeling ashamed.", value: 1, feedback: "You see money as proof of worth." },
        { label: "🧩 Not being able to rebuild fast enough.", value: 2, feedback: "You fear stagnation, not loss." },
        {
          label: "🌿 Nothing — I trust I can always recreate.",
          value: 3,
          feedback: "You've transcended the fear of lack.",
        },
      ],
    },
    {
      id: 6,
      text: "When someone earns more than you…",
      options: [
        { label: "😠 You feel unfairly treated.", value: 0, feedback: "Scarcity distorts your sense of justice." },
        { label: "🧠 You analyze how they did it.", value: 2, feedback: "You turn comparison into calibration." },
        {
          label: "🤝 You feel genuinely happy for them.",
          value: 3,
          feedback: "You understand money as a mirror, not a threat.",
        },
        { label: "😶 You tell yourself you don't care.", value: 1, feedback: "You protect pride by denying desire." },
      ],
    },
    {
      id: 7,
      text: "When you invest money…",
      options: [
        {
          label: "😬 You panic and overthink.",
          value: 0,
          feedback: "Fear outweighs faith — you don't trust your own judgment.",
        },
        {
          label: "📊 You calculate carefully, then act.",
          value: 2,
          feedback: "You balance instinct and intellect — a strategist's mind.",
        },
        {
          label: "🚀 You act fast when opportunity appears.",
          value: 3,
          feedback: "You trust momentum — that's the investor's intuition.",
        },
        { label: "💭 You hesitate until it's too late.", value: 1, feedback: "You lose more to indecision than risk." },
      ],
    },
    {
      id: 8,
      text: "If you suddenly became rich overnight…",
      options: [
        { label: "😨 I'd worry about losing it.", value: 0, feedback: "You fear abundance as much as scarcity." },
        {
          label: "🧠 I'd manage it wisely and strategically.",
          value: 2,
          feedback: "You'd turn fortune into foundation.",
        },
        { label: "😎 I'd enjoy it fully and give back.", value: 3, feedback: "You'd let joy and generosity coexist." },
        { label: "😐 I'd feel like an impostor.", value: 1, feedback: "Wealth still feels foreign to your identity." },
      ],
    },
    {
      id: 9,
      text: "When you think about financial freedom…",
      options: [
        { label: "💼 It feels unrealistic.", value: 0, feedback: "You dream with doubt — that splits your focus." },
        {
          label: "🧭 It feels possible if I stay consistent.",
          value: 2,
          feedback: "You see freedom as process, not miracle.",
        },
        {
          label: "🌞 It feels inevitable — it's my destiny.",
          value: 3,
          feedback: "You've integrated abundance into your identity.",
        },
        {
          label: "😅 It feels far away, but motivating.",
          value: 1,
          feedback: "Hope without belief delays manifestation.",
        },
      ],
    },
    {
      id: 10,
      text: "If LifeClock showed how you treat money, it would reveal that you…",
      options: [
        {
          label: "💀 Fear losing it more than not having it.",
          value: 0,
          feedback: "You live in defense, not creation.",
        },
        {
          label: "💬 Talk about it, but rarely act boldly.",
          value: 1,
          feedback: "Words replace movement — comfort zone economics.",
        },
        {
          label: "⚡ Respect it, multiply it, release it.",
          value: 3,
          feedback: "You master money through motion, not possession.",
        },
        { label: "🌿 Use it, but never let it define you.", value: 2, feedback: "You see money as tool, not temple." },
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
        archetype: "💀 The Scarcity Keeper",
        description: "You live from survival, not creation. You fear money's power — so it fears you back.",
        message: "You've made lack your identity. Let go of fear — and wealth will follow curiosity.",
      }
    } else if (total <= 15) {
      profile = {
        archetype: "💭 The Cautious Earner",
        description: "You manage, save, plan — but rarely leap. You keep wealth close, but never intimate.",
        message: "Money trusts boldness more than caution.",
      }
    } else if (total <= 22) {
      profile = {
        archetype: "📈 The Builder",
        description:
          "You use money consciously — it works for you, not through you. You balance abundance and purpose.",
        message: "You build wealth like a craft — patient, precise, powerful.",
      }
    } else {
      profile = {
        archetype: "🌞 The Prosperous Mind",
        description:
          "You've merged wealth with wisdom. You no longer chase — you attract, circulate, and multiply with ease.",
        message: "You are no longer earning — you are expanding.",
      }
    }
    return { total, ...profile }
  },

  globalFeedback(total: number) {
    if (total < 10) return "💀 You fear money's shadow — but it's only a reflection of your own power."
    if (total < 20) return "💼 You're learning to master wealth without worshiping it."
    return "🌞 You embody prosperity — calm, confident, creative."
  },
}
