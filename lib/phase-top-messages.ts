type TopPercentageMessage = {
  message: string
  percentage: number
}

const topPercentageMessages: TopPercentageMessage[] = [
  {
    message: "🔥 Wow, you're in the top 12%... most people give up before you.",
    percentage: 12,
  },
  {
    message: "😏 Not bad. Top 18%. Keep going, let's see if you can hold on.",
    percentage: 18,
  },
  {
    message: "⚡ Impressive. Top 15%. You're making the average look pathetic.",
    percentage: 15,
  },
  {
    message: "🎯 Top 10%. Most people quit at question 2. You're still here. Interesting.",
    percentage: 10,
  },
  {
    message: "💎 Top 22%. You're digging deeper than most dare to.",
    percentage: 22,
  },
  {
    message: "🧠 Top 14%. Your honesty is refreshing. And rare.",
    percentage: 14,
  },
  {
    message: "🌊 Top 19%. You're swimming against the current. Keep going.",
    percentage: 19,
  },
  {
    message: "🔥 Top 11%. You're not hiding. That's... unusual.",
    percentage: 11,
  },
  {
    message: "😎 Top 16%. Most people lie to themselves here. You didn't.",
    percentage: 16,
  },
  {
    message: "⚡ Top 13%. Your answers are getting more revealing. I like it.",
    percentage: 13,
  },
  {
    message: "🎭 Top 21%. You're peeling back layers. Most never even try.",
    percentage: 21,
  },
  {
    message: "💫 Top 17%. You're in rare territory now. Don't disappoint.",
    percentage: 17,
  },
  {
    message: "🔥 Top 9%. You're exposing truths most people bury. Brave.",
    percentage: 9,
  },
  {
    message: "😏 Top 20%. Still going? Most would have stopped by now.",
    percentage: 20,
  },
  {
    message: "⚡ Top 15%. Your vulnerability is showing. Good.",
    percentage: 15,
  },
  {
    message: "🌙 Top 23%. You're digging into the shadows. Most stay in the light.",
    percentage: 23,
  },
  {
    message: "🔥 Top 8%. Only 8% of people get this far without self-deception.",
    percentage: 8,
  },
  {
    message: "💎 Top 18%. You're being honest when it hurts. Respect.",
    percentage: 18,
  },
  {
    message: "😎 Top 12%. Most people build walls. You're tearing yours down.",
    percentage: 12,
  },
  {
    message: "⚡ Top 16%. You're not running from the truth. Refreshing.",
    percentage: 16,
  },
  {
    message: "🔥 Top 14%. Your self-awareness is cutting through the noise.",
    percentage: 14,
  },
  {
    message: "🎯 Top 19%. You're answering without filters. That's top tier.",
    percentage: 19,
  },
  {
    message: "💫 Top 11%. Most people lie at this point. You didn't.",
    percentage: 11,
  },
  {
    message: "😏 Top 22%. You're getting comfortable with discomfort. That's power.",
    percentage: 22,
  },
  {
    message: "⚡ Top 13%. Your honesty is rare. And dangerous.",
    percentage: 13,
  },
  {
    message: "🔥 Top 17%. Most people protect themselves here. You're exposing yourself.",
    percentage: 17,
  },
  {
    message: "💎 Top 20%. You're in the minority of people who face themselves.",
    percentage: 20,
  },
  {
    message: "🎭 Top 15%. Your answers are revealing more than you think.",
    percentage: 15,
  },
  {
    message: "⚡ Top 10%. You're pushing past where most stop. Keep going.",
    percentage: 10,
  },
  {
    message: "🔥 Top 24%. You're exploring depths most never reach.",
    percentage: 24,
  },
  {
    message: "😎 Top 16%. Your self-reflection is brutal. I approve.",
    percentage: 16,
  },
  {
    message: "💫 Top 12%. Most people wear masks. You're taking yours off.",
    percentage: 12,
  },
  {
    message: "⚡ Top 18%. You're being real when it's easier to pretend.",
    percentage: 18,
  },
  {
    message: "🔥 Top 14%. Your vulnerability is your strength. Top 14% understand that.",
    percentage: 14,
  },
]

const motivationMessages: string[] = [
  "💪 Keep going! You're doing amazing.",
  "🔥 You're on fire! Don't stop now.",
  "✨ Your progress is impressive. Continue!",
  "🌟 You're uncovering deep truths. Keep pushing forward.",
  "🚀 Every answer brings you closer to clarity. Keep going!",
  "💎 Your honesty is powerful. Stay strong.",
  "⚡ You're building something meaningful. Don't give up!",
  "🎯 You're on the right path. Keep moving forward.",
  "💫 Your self-reflection is inspiring. Continue!",
  "🌊 You're navigating deep waters. You've got this!",
  "🔥 You're not backing down. That's courage. Keep going!",
  "✨ Your vulnerability is strength. Continue your journey.",
  "🌟 You're doing something most people never do. Keep it up!",
  "💪 Every step forward counts. You're making progress!",
  "🚀 You're going deeper than most dare. Don't stop!",
  "💎 Your commitment is showing. Keep pushing!",
  "⚡ You're asking the hard questions. That's bravery. Continue!",
  "🎯 Your journey is unfolding beautifully. Keep going!",
  "💫 You're facing yourself with honesty. That's powerful. Don't stop!",
  "🌊 You're in the flow. Stay with it!",
  "🔥 Your courage is inspiring. Keep moving forward!",
  "✨ You're building momentum. Don't let it fade. Continue!",
  "🌟 Every answer is a step toward understanding. Keep going!",
  "💪 You're stronger than you think. Keep pushing!",
  "🚀 Your self-awareness is growing. Stay on this path!",
]

/**
 * Returns a random motivation message
 * These messages appear every 4 answers during the quiz phases
 */
export function getMotivationMessage(): string {
  const randomIndex = Math.floor(Math.random() * motivationMessages.length)
  return motivationMessages[randomIndex]
}

/**
 * Returns a random top percentage message
 * These messages appear every 3 answers during the quiz phases
 */
export function getTopPercentageMessage(): string {
  const randomIndex = Math.floor(Math.random() * topPercentageMessages.length)
  return topPercentageMessages[randomIndex].message
}

