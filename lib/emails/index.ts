import { Resend } from 'resend'
import type {
  PaymentConfirmationData,
  AbandonedCartData,
  ReferralCommissionData,
  WelcomeEmailData,
  PaymentFailedData,
  CheckoutCancelledData,
  CommissionPaidData,
  QuizAbandonmentData,
  AffiliateSummaryData,
  AdminNotificationData,
  ReactivationData,
  ReportRecoveryData,
} from './types'
import {
  getPaymentConfirmationTemplate,
  getAbandonedCartTemplate,
  getReferralCommissionTemplate,
  getWelcomeEmailTemplate,
  getPaymentFailedTemplate,
  getCheckoutCancelledTemplate,
  getCommissionPaidTemplate,
  getQuizAbandonmentTemplate,
  getAffiliateSummaryTemplate,
  getReactivationTemplate,
  getReportRecoveryTemplate,
  getAdminNewPaymentTemplate,
  getAdminMilestoneTemplate,
} from './templates'
// PDF generator is imported dynamically to avoid Next.js client-side bundling issues

const resendApiKey = process.env.RESEND_API_KEY
const fromEmail = process.env.RESEND_FROM_EMAIL || 'noreply@lifeclock.quest'
const adminEmail = process.env.ADMIN_EMAIL

if (!resendApiKey) {
  console.warn('RESEND_API_KEY is not set. Email functionality will be disabled.')
} else {
  // Validate API key format (should start with 're_')
  if (!resendApiKey.startsWith('re_')) {
    console.error('[Email] RESEND_API_KEY format appears invalid. Expected format: re_xxxxxxxx')
  } else {
    console.log('[Email] Resend API key configured, from email:', fromEmail)
  }
}

const resend = resendApiKey ? new Resend(resendApiKey) : null

async function sendEmail(to: string, subject: string, html: string, attachments?: Array<{ filename: string; content: Buffer | string }>) {
  if (!resend) {
    console.warn(`[Email] Would send to ${to}: ${subject}`)
    return { success: false, error: 'Resend not configured' }
  }

  try {
    console.log(`[Email] Attempting to send email to ${to} with subject: ${subject}`)
    
    const result = await resend.emails.send({
      from: fromEmail,
      to,
      subject,
      html,
      attachments: attachments?.map((att) => ({
        filename: att.filename,
        content: typeof att.content === 'string' ? Buffer.from(att.content) : att.content,
      })),
    })

    // Type guard pour vérifier si result contient une erreur
    if (result && typeof result === 'object' && 'error' in result && result.error) {
      const error = result.error
      const errorMessage = typeof error === 'object' 
        ? JSON.stringify(error, null, 2)
        : String(error)
      console.error('[Email] Error sending email:', {
        to,
        subject,
        error: errorMessage,
        fullError: error,
      })
      return { success: false, error: errorMessage }
    }

    if ('data' in result && result.data?.id) {
      console.log(`[Email] Successfully sent email to ${to} - ID: ${result.data.id}`)
      return { success: true, id: result.data.id }
    } else {
      console.warn(`[Email] Email sent but no ID returned for ${to}`, result)
      return { success: true, id: undefined }
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    const errorStack = error instanceof Error ? error.stack : undefined
    console.error('[Email] Exception sending email:', {
      to,
      subject,
      error: errorMessage,
      stack: errorStack,
      fullError: error,
    })
    return { success: false, error: errorMessage }
  }
}

export async function sendPaymentConfirmationEmail(data: PaymentConfirmationData) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
    const reportUrl = data.reportUrl || `${baseUrl}/report`
    const booksUrl = data.booksUrl || `${baseUrl}/books`
    const bonusUrl = data.bonusUrl || `${baseUrl}/bonus/new-testament`

    let pdfBuffer: Buffer | null = null
    try {
      // Dynamic import to avoid Next.js client-side bundling
      const { generateReportPDF } = await import('./pdf-generator')
      pdfBuffer = await generateReportPDF(data.reportData, data.forces, data.revelations, data.userName)
    } catch (error) {
      console.error('[Email] Error generating PDF:', error)
      // Continue without PDF if generation fails
    }

    const html = getPaymentConfirmationTemplate({
      userName: data.userName,
      reportUrl,
      booksUrl,
      bonusUrl,
    })

    const attachments = pdfBuffer
      ? [
          {
            filename: `LifeClock-${data.userName}-${Date.now()}.pdf`,
            content: pdfBuffer,
          },
        ]
      : undefined

    return await sendEmail(data.email, 'Your LifeClock Report is Ready', html, attachments)
  } catch (error) {
    console.error('[Email] Error in sendPaymentConfirmationEmail:', error)
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
  }
}

export async function sendAbandonedCartEmail(data: AbandonedCartData) {
  try {
    const html = getAbandonedCartTemplate({
      userName: data.userName,
      resultUrl: data.resultUrl,
      todayCount: data.todayCount,
    })

    return await sendEmail(data.email, "Don't Miss Your LifeClock Report", html)
  } catch (error) {
    console.error('[Email] Error in sendAbandonedCartEmail:', error)
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
  }
}

export async function sendReferralCommissionEmail(data: ReferralCommissionData) {
  try {
    // Get referrer name from onboarding data if available
    // For now, use email as userName fallback
    const userName = data.referrerEmail.split('@')[0]

    const html = getReferralCommissionTemplate({
      userName,
      referredEmail: data.referredEmail,
      commissionAmount: data.commissionAmount,
    })

    return await sendEmail(data.referrerEmail, 'You Earned a Commission!', html)
  } catch (error) {
    console.error('[Email] Error in sendReferralCommissionEmail:', error)
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
  }
}

export async function sendWelcomeEmail(data: WelcomeEmailData) {
  try {
    const html = getWelcomeEmailTemplate({
      userName: data.userName,
      quizUrl: data.quizUrl,
      todayCount: data.todayCount,
    })

    return await sendEmail(data.email, 'Welcome to LifeClock', html)
  } catch (error) {
    console.error('[Email] Error in sendWelcomeEmail:', error)
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
  }
}

export async function sendPaymentFailedEmail(data: PaymentFailedData) {
  try {
    const html = getPaymentFailedTemplate({
      userName: data.userName,
      failureReason: data.failureReason,
      retryUrl: data.retryUrl,
    })

    return await sendEmail(data.email, 'Payment Issue - Try Again', html)
  } catch (error) {
    console.error('[Email] Error in sendPaymentFailedEmail:', error)
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
  }
}

export async function sendCheckoutCancelledEmail(data: CheckoutCancelledData) {
  try {
    const html = getCheckoutCancelledTemplate({
      userName: data.userName,
      resultUrl: data.resultUrl,
    })

    return await sendEmail(data.email, 'Your LifeClock Report is Waiting', html)
  } catch (error) {
    console.error('[Email] Error in sendCheckoutCancelledEmail:', error)
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
  }
}

export async function sendCommissionPaidEmail(data: CommissionPaidData) {
  try {
    const html = getCommissionPaidTemplate({
      userName: data.userName,
      amount: data.amount,
    })

    return await sendEmail(data.email, 'Your Commission Has Been Paid', html)
  } catch (error) {
    console.error('[Email] Error in sendCommissionPaidEmail:', error)
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
  }
}

export async function sendQuizAbandonmentEmail(data: QuizAbandonmentData) {
  try {
    const html = getQuizAbandonmentTemplate({
      userName: data.userName,
      quizUrl: data.quizUrl,
      todayCount: data.todayCount,
    })

    return await sendEmail(data.email, 'Complete Your LifeClock Journey', html)
  } catch (error) {
    console.error('[Email] Error in sendQuizAbandonmentEmail:', error)
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
  }
}

export async function sendAffiliateSummaryEmail(data: AffiliateSummaryData) {
  try {
    const html = getAffiliateSummaryTemplate({
      userName: data.userName,
      period: data.period,
      stats: data.stats,
    })

    return await sendEmail(data.email, `Your LifeClock Referral Summary - ${data.period}`, html)
  } catch (error) {
    console.error('[Email] Error in sendAffiliateSummaryEmail:', error)
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
  }
}

export async function sendAdminNewPaymentEmail(data: AdminNotificationData) {
  if (!adminEmail) {
    console.warn('[Email] ADMIN_EMAIL not configured, skipping admin notification')
    return { success: false, error: 'ADMIN_EMAIL not configured' }
  }

  try {
    if (data.type === 'new_payment') {
      const html = getAdminNewPaymentTemplate({
        email: data.data.email || '',
        amount: data.data.amount || 0,
        referralCode: data.data.referralCode,
      })

      return await sendEmail(adminEmail, 'New Payment Received', html)
    }
    return { success: false, error: 'Invalid notification type' }
  } catch (error) {
    console.error('[Email] Error in sendAdminNewPaymentEmail:', error)
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
  }
}

export async function sendAdminMilestoneEmail(data: AdminNotificationData) {
  if (!adminEmail) {
    console.warn('[Email] ADMIN_EMAIL not configured, skipping milestone notification')
    return { success: false, error: 'ADMIN_EMAIL not configured' }
  }

  try {
    if (data.type === 'milestone' && data.data.milestone) {
      const html = getAdminMilestoneTemplate({
        milestone: data.data.milestone,
        stats: data.data.stats || {},
      })

      return await sendEmail(adminEmail, `Milestone Reached: ${data.data.milestone}`, html)
    }
    return { success: false, error: 'Invalid milestone data' }
  } catch (error) {
    console.error('[Email] Error in sendAdminMilestoneEmail:', error)
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
  }
}

export async function sendReactivationEmail(data: ReactivationData) {
  try {
    const html = getReactivationTemplate({
      userName: data.userName,
      resultUrl: data.resultUrl,
      discountPercent: data.discountPercent,
      todayCount: data.todayCount,
    })

    return await sendEmail(data.email, 'Last Chance: Your LifeClock Report', html)
  } catch (error) {
    console.error('[Email] Error in sendReactivationEmail:', error)
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
  }
}

export async function sendReportRecoveryEmail(data: ReportRecoveryData) {
  try {
    const html = getReportRecoveryTemplate({
      userName: data.userName,
      reportUrl: data.reportUrl,
    })

    return await sendEmail(data.email, 'Access Your LifeClock Report', html)
  } catch (error) {
    console.error('[Email] Error in sendReportRecoveryEmail:', error)
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
  }
}

