export const phase1 = {
  id: 1,
  title: "The Mask",
  category: "Ego",
  energyType: "Mind" as const,
  color: "#94A3B8", // Silver/Grey - reflection, introspection
  intro:
    "🕯️ Every being wears a mask. Yours is starting to slip. Answer without thinking — the first emotion is always the truest.",

  questions: [
    {
      id: 1,
      text: "When someone sincerely compliments you, {name}... how do you really feel?",
      provocativeComment: "Most people lie at this question. Not you, I hope?",
      options: [
        { label: "😐 You smile but want to disappear.", value: 0, feedback: "You still doubt your own light." },
        {
          label: "🙂 You say thank you, but you doubt it.",
          value: 1,
          feedback: "You want to be perfect, not just appreciated.",
        },
        { label: "😄 You shine and own it.", value: 3, feedback: "You accept recognition without guilt." },
        { label: "🧊 You change the subject.", value: -1, feedback: "You avoid the spotlight to avoid burning." },
      ],
    },
    {
      id: 2,
      text: "When you accomplish something important…",
      options: [
        {
          label: "🎭 You downplay it so you don't disturb anyone.",
          value: 0,
          feedback: "You hide behind humility to stay safe.",
        },
        {
          label: "⚡ You immediately seek the next challenge.",
          value: 2,
          feedback: "Action soothes you more than victory.",
        },
        { label: "🌟 You openly share your joy.", value: 3, feedback: "You vibrate through expression, not fear." },
        { label: "🤫 You'd rather no one knew.", value: -1, feedback: "You fear envy more than invisibility." },
      ],
    },
    {
      id: 3,
      text: "If someone criticizes you publicly, {name}…",
      provocativeComment: "This one reveals everything. Watch yourself.",
      options: [
        { label: "🔥 You boil inside but stay composed.", value: 0, feedback: "You turn pain into control." },
        { label: "💬 You respond calmly.", value: 3, feedback: "You've learned to separate your being from opinions." },
        {
          label: "🧍 You stay silent but replay it later.",
          value: 1,
          feedback: "You hold back to preserve your image.",
        },
        { label: "🧊 You cut ties and move on.", value: 2, feedback: "You protect your energy, not your ego." },
      ],
    },
    {
      id: 4,
      text: "You walk into a room full of strangers:",
      options: [
        {
          label: "😶 You fade into the background and observe.",
          value: 0,
          feedback: "The world feels hostile, so you choose silence.",
        },
        {
          label: "😏 You analyze who stands out the most.",
          value: 2,
          feedback: "Your gaze seeks social reference points.",
        },
        { label: "😃 You start conversations naturally.", value: 3, feedback: "You no longer need a mask to exist." },
        { label: "🧠 You think about how others see you.", value: 1, feedback: "Self-awareness becomes your cage." },
      ],
    },
    {
      id: 5,
      text: "When you look at yourself in the mirror, {name}:",
      options: [
        { label: "👀 You hunt for flaws.", value: 0, feedback: "You search for errors instead of truth." },
        {
          label: "💡 You see the version you want to become.",
          value: 2,
          feedback: "Your ideal inspires you — but also judges you.",
        },
        { label: "😎 You accept yourself as you are.", value: 3, feedback: "Acceptance has made you free." },
        { label: "🩶 You look without really seeing.", value: -1, feedback: "The reflection has become armor." },
      ],
    },
    {
      id: 6,
      text: "You prefer to be seen as:",
      options: [
        { label: "🧱 Strong and reliable.", value: 2, feedback: "You wear strength as a duty." },
        { label: "⚡ Brilliant and unique.", value: 1, feedback: "Your identity depends on standing out." },
        { label: "💎 Gentle and reassuring.", value: 3, feedback: "Your sincerity has become your power." },
        { label: "🕶️ Mysterious and unpredictable.", value: 0, feedback: "You hide fear behind mystery." },
      ],
    },
    {
      id: 7,
      text: "When you're alone for too long…",
      provocativeComment: "Interesting choice...",
      options: [
        { label: "🌫️ You feel useless.", value: 0, feedback: "Silence confronts you with your inner void." },
        { label: "🌿 You recharge in solitude.", value: 3, feedback: "Solitude feeds you — it's no longer a threat." },
        {
          label: "🔄 You start planning your next goals.",
          value: 2,
          feedback: "Your mind constantly searches for purpose.",
        },
        { label: "🔥 You escape boredom by planning ahead.", value: 1, feedback: "You fill the void with control." },
      ],
    },
    {
      id: 8,
      text: "When you meet someone more 'successful' than you, {name}:",
      options: [
        { label: "⚔️ You feel a touch of jealousy.", value: 1, feedback: "Comparison gives you a sense of identity." },
        {
          label: "🧠 You analyze how they did it.",
          value: 2,
          feedback: "Your awareness protects you from resentment.",
        },
        {
          label: "💬 You sincerely congratulate them.",
          value: 3,
          feedback: "You honor others without shrinking yourself.",
        },
        { label: "🕳️ You feel smaller inside.", value: 0, feedback: "Doubt still rules your reflection." },
      ],
    },
    {
      id: 9,
      text: "When someone dislikes you…",
      options: [
        { label: "🧊 You distance yourself immediately.", value: 2, feedback: "You choose peace over validation." },
        { label: "😈 You want to prove them wrong.", value: 1, feedback: "Revenge gives you a sense of control." },
        { label: "🤷 You truly don't care.", value: 3, feedback: "Authentic indifference — rare and solid." },
        { label: "🧠 You wonder what you did wrong.", value: 0, feedback: "You turn rejection into self-blame." },
      ],
    },
    {
      id: 10,
      text: "If LifeClock could show you your true inner face, {name}... would you want to see it?",
      provocativeComment: "Take your time. This question counts.",
      options: [
        { label: "😨 No, I'm afraid of what I'd see.", value: 0, feedback: "Truth still terrifies you." },
        { label: "🕯️ Yes, but slowly.", value: 1, feedback: "You open the door carefully." },
        { label: "⚡ Yes, even if it burns.", value: 3, feedback: "You prefer light over illusion." },
        { label: "😐 I don't believe in a 'true self'.", value: -1, feedback: "Cynicism shields your subconscious." },
      ],
    },
  ],

  evaluate(answers: Array<{ value: number; feedback: string }>) {
    const total = answers.reduce((sum, a) => sum + a.value, 0)
    let profile: {
      archetype: string
      description: string
      message: string
    }

    if (total <= 8) {
      profile = {
        archetype: "🧊 The Fugitive",
        description:
          "You hide your sensitivity behind distance. The fear of judgment isolates you, but your silence is a muffled scream.",
        message: "You don't want to be seen, yet you crave to be discovered.",
      }
    } else if (total <= 15) {
      profile = {
        archetype: "🎭 The Strategist",
        description:
          "You control your image with precision. You want love without dependence, admiration without exposure.",
        message: "You mastered your mask — but now it masters you.",
      }
    } else if (total <= 22) {
      profile = {
        archetype: "🔮 The Chameleon",
        description:
          "You adapt your face to the world — sincere, but unstable. Your authenticity shifts with the light.",
        message: "You change colors to be loved. The real you is waiting.",
      }
    } else {
      profile = {
        archetype: "🌞 The Transparent",
        description: "You embrace your truth without fear. Your vulnerability has become your strength.",
        message: "Your mask has melted. You've started to breathe again.",
      }
    }
    return { total, ...profile }
  },

  globalFeedback(total: number) {
    if (total < 10) return "🕯️ Your mask remains cold. Fear still protects you."
    if (total < 20) return "⚡ A crack appears. You're beginning to let yourself be seen."
    return "🌞 The mirror welcomes you. You no longer need to hide."
  },
}
