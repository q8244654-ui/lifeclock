// Centralized style system for LifeClock
// Note: Tailwind requires full class names, so we provide complete class strings

export const spacing = {
  chatBubble: 'px-4 py-2',
  buttonPrimary: 'px-6 py-4',
  buttonSecondary: 'px-4 py-3',
  buttonSmall: 'px-3 py-1',
  card: 'p-5',
  cardLarge: 'p-8',
  input: 'px-5 py-3.5',
  container: 'px-4 py-6',
  header: 'px-4 py-3',
} as const

export const typography = {
  chatMessage: 'text-[17px] leading-[22px]',
  button: 'text-[17px] font-medium',
  timestamp: 'text-[12px]',
  title: 'text-2xl font-semibold',
} as const

export const borderRadius = {
  button: 'rounded-2xl',
  input: 'rounded-3xl',
  card: 'rounded-xl',
  badge: 'rounded-lg',
} as const

export const colors = {
  background: 'bg-black',
  card: 'bg-[#2C2C2E]',
  cardHover: 'hover:bg-[#3A3A3C]',
  border: 'border-white/5',
  borderThick: 'border-white/10',
  textPrimary: 'text-[#E5E5EA]',
  textSecondary: 'text-[#8E8E93]',
  textMuted: 'text-[#AEAEB2]',
  answerColors: {
    rarely: '#2C2C2E',
    sometimes: '#2C5282',
    often: '#3B82F6',
    always: '#0A84FF',
  },
  messageTypes: {
    normal: '#2C2C2E',
    motivationStart: '#F97316',
    motivationEnd: '#FB923C',
    revelationStart: '#EF4444',
    revelationEnd: '#F87171',
    introspectionStart: '#EAB308',
    introspectionEnd: '#FCD34D',
    humorStart: '#22C55E',
    humorEnd: '#4ADE80',
  },
} as const

// Complete class combinations for common components
export const buttonClasses = {
  primary: `group relative overflow-hidden rounded-2xl bg-[#2C2C2E] px-6 py-4 text-[17px] font-medium text-[#E5E5EA] shadow-lg transition-all hover:bg-[#3A3A3C] active:shadow-xl`,
  input: `flex-1 rounded-3xl bg-[#2C2C2E] px-5 py-3.5 text-[17px] text-[#E5E5EA] placeholder:text-[#8E8E93] outline-none ring-2 ring-transparent shadow-lg transition-all focus:bg-[#3A3A3C] focus:ring-[#0A84FF]`,
  quizOption: `group relative overflow-hidden rounded-2xl bg-[#2C2C2E] px-6 py-4 text-left text-[17px] font-medium text-[#E5E5EA] shadow-lg transition-all hover:bg-[#3A3A3C] active:shadow-xl`,
  answer: (color: string) => `w-full px-6 py-3 text-white rounded-2xl text-[17px] leading-[22px] font-normal transition-all disabled:opacity-40 disabled:cursor-not-allowed`,
} as const

export const gradientClasses = {
  motivation: 'linear-gradient(135deg, #F97316 0%, #FB923C 100%)',
  revelation: 'linear-gradient(135deg, #EF4444 0%, #F87171 100%)',
  introspection: 'linear-gradient(135deg, #EAB308 0%, #FCD34D 100%)',
  humor: 'linear-gradient(135deg, #22C55E 0%, #4ADE80 100%)',
} as const

