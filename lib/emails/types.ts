export interface EmailOptions {
  to: string
  subject: string
  html: string
  attachments?: Array<{
    filename: string
    content: Buffer | string
    type?: string
  }>
}

export interface PaymentConfirmationData {
  email: string
  userName: string
  reportData: any
  forces: any
  revelations: any[]
  reportUrl?: string
  booksUrl?: string
  bonusUrl?: string
}

export interface AbandonedCartData {
  email: string
  userName: string
  resultUrl: string
  todayCount?: number
}

export interface ReferralCommissionData {
  referrerEmail: string
  referredEmail: string
  commissionAmount: number
  referralCode: string
}

export interface WelcomeEmailData {
  email: string
  userName: string
  quizUrl: string
  todayCount?: number
}

export interface PaymentFailedData {
  email: string
  userName: string
  failureReason?: string
  retryUrl: string
}

export interface CheckoutCancelledData {
  email: string
  userName: string
  resultUrl: string
}

export interface CommissionPaidData {
  email: string
  userName: string
  amount: number
  paymentMethod?: string
}

export interface QuizAbandonmentData {
  email: string
  userName: string
  quizUrl: string
  todayCount?: number
}

export interface AffiliateSummaryData {
  email: string
  userName: string
  period: string
  stats: {
    totalReferrals: number
    pendingCount: number
    completedCount: number
    paidCount: number
    revenueGenerated: number
    amountToPay: number
    amountPaid: number
  }
}

export interface AdminNotificationData {
  type: 'new_payment' | 'milestone'
  data: {
    email?: string
    amount?: number
    referralCode?: string
    milestone?: string
    stats?: any
  }
}

export interface ReactivationData {
  email: string
  userName: string
  resultUrl: string
  discountPercent?: number
  todayCount?: number
}

export interface ReportRecoveryData {
  email: string
  userName: string
  reportUrl: string
}

