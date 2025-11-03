function getLogoUrl(): string {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
  return `${baseUrl}/Life__1_-removebg-preview.png`
}

export function getBaseEmailTemplate(content: string, userName?: string): string {
  const logoUrl = getLogoUrl()
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>LifeClock</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      background-color: #0D1117;
      color: #E5E7EB;
      line-height: 1.6;
    }
    .email-container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #111827;
      border-radius: 12px;
      overflow: hidden;
    }
    .email-header {
      background: linear-gradient(135deg, #1F2937 0%, #111827 100%);
      padding: 40px 30px;
      text-align: center;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }
    .logo {
      max-width: 200px;
      height: auto;
      margin-bottom: 20px;
    }
    .email-body {
      padding: 40px 30px;
    }
    .email-footer {
      background-color: #0D1117;
      padding: 30px;
      text-align: center;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      font-size: 12px;
      color: #9CA3AF;
    }
    .button {
      display: inline-block;
      padding: 14px 28px;
      background: linear-gradient(135deg, #3B82F6 0%, #8B5CF6 50%, #EC4899 100%);
      color: white;
      text-decoration: none;
      border-radius: 8px;
      font-weight: 600;
      margin: 20px 0;
      text-align: center;
    }
    .button:hover {
      opacity: 0.9;
    }
    .greeting {
      font-size: 18px;
      font-weight: 600;
      margin-bottom: 20px;
      color: #F3F4F6;
    }
    .content {
      color: #D1D5DB;
      font-size: 16px;
      margin-bottom: 20px;
    }
    .highlight {
      color: #60A5FA;
      font-weight: 600;
    }
    .amount {
      font-size: 24px;
      font-weight: bold;
      color: #34D399;
      margin: 10px 0;
    }
    @media only screen and (max-width: 600px) {
      .email-container {
        width: 100% !important;
      }
      .email-body {
        padding: 30px 20px !important;
      }
      .button {
        display: block;
        width: 100%;
      }
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="email-header">
      <img src="${logoUrl}" alt="LifeClock" class="logo" />
    </div>
    <div class="email-body">
      ${userName ? `<div class="greeting">Hello ${userName},</div>` : ''}
      <div class="content">
        ${content}
      </div>
    </div>
    <div class="email-footer">
      <p>LifeClock - Discover Your Inner Maturity</p>
      <p style="margin-top: 10px; color: #6B7280;">
        You're receiving this email because you started your LifeClock journey.
      </p>
    </div>
  </div>
</body>
</html>
`
}

export function getPaymentConfirmationTemplate(data: {
  userName: string
  reportUrl?: string
  booksUrl?: string
  bonusUrl?: string
}): string {
  const content = `
    <p>Your payment has been confirmed. Your complete LifeClock report is attached to this email.</p>
    <p>This report contains:</p>
    <ul>
      <li>Your Life Index and archetype</li>
      <li>47 personalized revelations</li>
      <li>Your 3 Hidden Forces (Shadow, Fear, Power)</li>
      <li>Complete phase analysis</li>
      <li>Your life curve visualization</li>
      <li>10 free personalized ebooks (one per phase)</li>
    </ul>
    
    <div style="margin: 30px 0;">
      ${data.bonusUrl ? `
        <p style="margin-bottom: 15px;"><a href="${data.bonusUrl}" class="button" style="font-size: 16px; padding: 16px 32px; display: inline-block; text-align: center; width: 100%; max-width: 400px; background: linear-gradient(135deg, #E5C97E 0%, #d4b169 100%); color: #0A0A0A;">Access New Testament Bonus</a></p>
      ` : ''}
      ${data.booksUrl ? `
        <p style="margin-bottom: 15px;"><a href="${data.booksUrl}" class="button" style="font-size: 16px; padding: 16px 32px; display: inline-block; text-align: center; width: 100%; max-width: 400px;">Download Your 10 Books</a></p>
      ` : ''}
      ${data.reportUrl ? `
        <p style="margin-bottom: 15px; text-align: center;">
          <a href="${data.reportUrl}" style="display: inline-block; padding: 12px 24px; border: 2px solid rgba(255, 255, 255, 0.3); color: #E5E7EB; text-decoration: none; border-radius: 8px; font-weight: 600; transition: all 0.3s;">View My Full Report</a>
        </p>
      ` : ''}
    </div>
    
    <p>Take your time to explore these insights. They reveal patterns that have shaped your journey.</p>
    
    <div style="background: rgba(34, 197, 94, 0.1); border: 1px solid rgba(34, 197, 94, 0.3); border-radius: 12px; padding: 20px; margin: 30px 0;">
      <h3 style="color: #22C55E; font-size: 18px; font-weight: bold; margin-bottom: 10px;">Satisfait ou remboursé - 7 jours</h3>
      <p style="color: #D1D5DB; margin-bottom: 10px;">Not satisfied? Get a full refund within 7 days.</p>
      <p style="color: #D1D5DB; margin-bottom: 5px;">No questions asked.</p>
      <p style="color: #D1D5DB; margin-bottom: 15px;">To request a refund, simply reply to this email within 7 days.</p>
      <p style="font-size: 12px; color: #6B7280; margin: 0;">Terms and conditions apply. See refund policy for details.</p>
    </div>
    
    <p style="margin-top: 30px; font-style: italic; color: #9CA3AF;">
      "Time is no longer counted. It belongs to you."
    </p>
  `
  return getBaseEmailTemplate(content, data.userName)
}

export function getAbandonedCartTemplate(data: {
  userName: string
  resultUrl: string
  todayCount?: number
}): string {
  const count = data.todayCount ?? 1589
  const formattedCount = count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
  
  const content = `
    <p style="font-size: 20px; font-weight: bold; color: #F3F4F6; margin-bottom: 20px;">Your report is still waiting...</p>
    <p>You started something powerful, but didn't finish it.</p>
    <p>Your LifeClock report is waiting. <span class="highlight">47 revelations</span> that will change how you see yourself.</p>
    <p>You've already invested 20 minutes. Don't let that moment slip away.</p>
    
    <div style="background: rgba(255,255,255,0.05); border-radius: 8px; padding: 15px; margin: 20px 0; text-align: center;">
      <p style="color: #60A5FA; font-size: 14px; margin: 0;"><strong>${formattedCount}</strong> personnes ont reçu aujourd'hui leur rapport + 10 ebooks personnalisés</p>
    </div>
    
    <p><a href="${data.resultUrl}" class="button" style="font-size: 16px; padding: 16px 32px;">Complete Your Purchase</a></p>
    
    <div style="background: rgba(34, 197, 94, 0.1); border: 1px solid rgba(34, 197, 94, 0.3); border-radius: 8px; padding: 15px; margin: 20px 0;">
      <p style="color: #22C55E; font-weight: 600; margin-bottom: 5px;">Satisfait ou remboursé - 7 jours</p>
      <p style="color: #D1D5DB; font-size: 14px; margin: 0;">Not satisfied? Full refund within 7 days. No questions asked.</p>
    </div>
    
    <p style="font-size: 14px; color: #FBBF24; font-weight: 600;">⏳ This offer expires soon. Don't miss your chance to discover what your answers reveal.</p>
  `
  return getBaseEmailTemplate(content, data.userName)
}

export function getReferralCommissionTemplate(data: {
  userName: string
  referredEmail: string
  commissionAmount: number
}): string {
  const content = `
    <p>Great news! Someone used your referral link and completed their purchase.</p>
    <p><strong>Referred:</strong> ${data.referredEmail}</p>
    <p class="amount">$${data.commissionAmount.toFixed(2)}</p>
    <p>This commission will be added to your account. You can track your earnings in your LifeClock dashboard.</p>
    <p>Keep sharing your unique link to earn more commissions!</p>
  `
  return getBaseEmailTemplate(content, data.userName)
}

export function getWelcomeEmailTemplate(data: {
  userName: string
  quizUrl: string
  todayCount?: number
}): string {
  const count = data.todayCount ?? 1589
  const formattedCount = count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
  
  const content = `
    <p>Welcome to LifeClock, ${data.userName}.</p>
    <p>You're about to embark on a journey of self-discovery. Through <span class="highlight">100 carefully crafted questions</span>, you'll uncover patterns that have shaped your life.</p>
    <p>Your answers will reveal:</p>
    <ul>
      <li>Your Life Index (your inner maturity)</li>
      <li>Your archetype and dominant energy</li>
      <li>47 personalized revelations</li>
      <li>Your 3 Hidden Forces</li>
      <li>10 free personalized ebooks (one per phase)</li>
    </ul>
    
    <div style="background: rgba(255,255,255,0.05); border-radius: 8px; padding: 15px; margin: 20px 0; text-align: center;">
      <p style="color: #60A5FA; font-size: 14px; margin: 0;"><strong>${formattedCount}</strong> personnes ont fait le voyage aujourd'hui</p>
    </div>
    
    <p><a href="${data.quizUrl}" class="button">Start Your Journey</a></p>
    <p style="color: #9CA3AF;">Take your time. Be honest. These questions are mirrors.</p>
  `
  return getBaseEmailTemplate(content, data.userName)
}

export function getPaymentFailedTemplate(data: {
  userName: string
  failureReason?: string
  retryUrl: string
}): string {
  const content = `
    <p>We encountered an issue processing your payment.</p>
    ${data.failureReason ? `<p><strong>Reason:</strong> ${data.failureReason}</p>` : ''}
    <p>Don't worry - your report is still waiting for you. Please try again:</p>
    <p><a href="${data.retryUrl}" class="button">Retry Payment</a></p>
    <p style="font-size: 14px; color: #9CA3AF;">If the problem persists, please contact our support team.</p>
  `
  return getBaseEmailTemplate(content, data.userName)
}

export function getCheckoutCancelledTemplate(data: {
  userName: string
  resultUrl: string
}): string {
  const content = `
    <p>We noticed you didn't complete your purchase.</p>
    <p>Your LifeClock report contains insights that could change everything. <span class="highlight">47 revelations</span> about who you are, hidden in your answers.</p>
    <p>You've come this far. Don't turn back now.</p>
    <p><a href="${data.resultUrl}" class="button">Complete Your Purchase</a></p>
    
    <div style="background: rgba(34, 197, 94, 0.1); border: 1px solid rgba(34, 197, 94, 0.3); border-radius: 8px; padding: 15px; margin: 20px 0;">
      <p style="color: #22C55E; font-weight: 600; margin-bottom: 5px;">Try risk-free with our 7-day money-back guarantee</p>
      <p style="color: #D1D5DB; font-size: 14px; margin: 0;">Satisfied or refunded within 7 days.</p>
    </div>
    
    <p style="color: #9CA3AF; font-size: 14px;">Remember: this isn't just a PDF. It's a mirror.</p>
  `
  return getBaseEmailTemplate(content, data.userName)
}

export function getCommissionPaidTemplate(data: {
  userName: string
  amount: number
}): string {
  const content = `
    <p>Your commission has been paid!</p>
    <p class="amount">$${data.amount.toFixed(2)}</p>
    <p>This payment has been processed and should appear in your account shortly.</p>
    <p>Thank you for being part of the LifeClock community and helping others discover themselves.</p>
    <p>Keep sharing - there are more commissions waiting for you!</p>
  `
  return getBaseEmailTemplate(content, data.userName)
}

export function getQuizAbandonmentTemplate(data: {
  userName: string
  quizUrl: string
  todayCount?: number
}): string {
  const count = data.todayCount ?? 1589
  const formattedCount = count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
  
  const content = `
    <p style="font-size: 20px; font-weight: bold; color: #F3F4F6; margin-bottom: 20px;">You started something powerful...</p>
    <p>You started your LifeClock journey but didn't complete it.</p>
    <p>Those <span class="highlight">100 questions</span> you began are waiting. Each one is a door to understanding yourself better.</p>
    <p><strong>100 questions = 47 revelations</strong> that will change how you see yourself.</p>
    <p>Don't let this moment pass. Your answers will reveal patterns that have been invisible until now.</p>
    
    <div style="background: rgba(255,255,255,0.05); border-radius: 8px; padding: 15px; margin: 20px 0; text-align: center;">
      <p style="color: #60A5FA; font-size: 14px; margin: 0;"><strong>${formattedCount}</strong> personnes ont complété leur quiz aujourd'hui</p>
    </div>
    
    <p><a href="${data.quizUrl}" class="button" style="font-size: 16px; padding: 16px 32px;">Continue Your Journey</a></p>
    <p style="color: #9CA3AF;">It takes about 20 minutes. But what you'll discover lasts a lifetime.</p>
  `
  return getBaseEmailTemplate(content, data.userName)
}

export function getAffiliateSummaryTemplate(data: {
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
}): string {
  const content = `
    <p>Here's your referral summary for ${data.period}:</p>
    <div style="background: rgba(255,255,255,0.05); border-radius: 8px; padding: 20px; margin: 20px 0;">
      <p><strong>Total Referrals:</strong> ${data.stats.totalReferrals}</p>
      <p><strong>Pending:</strong> ${data.stats.pendingCount}</p>
      <p><strong>Completed:</strong> ${data.stats.completedCount}</p>
      <p><strong>Paid Out:</strong> ${data.stats.paidCount}</p>
      <p style="margin-top: 20px;"><strong>Revenue Generated:</strong> <span class="amount">$${data.stats.revenueGenerated}</span></p>
      <p><strong>Commissions Earned:</strong> <span class="highlight">$${data.stats.amountPaid.toFixed(2)}</span></p>
      ${data.stats.amountToPay > 0 ? `<p><strong>Pending Payout:</strong> <span class="highlight">$${data.stats.amountToPay.toFixed(2)}</span></p>` : ''}
    </div>
    <p>Keep sharing your unique link to grow your earnings!</p>
  `
  return getBaseEmailTemplate(content, data.userName)
}

export function getReactivationTemplate(data: {
  userName: string
  resultUrl: string
  discountPercent?: number
  todayCount?: number
}): string {
  const discountText = data.discountPercent 
    ? `<p style="font-size: 18px; font-weight: bold; color: #FBBF24;">Special Offer: ${data.discountPercent}% OFF</p>`
    : ''
  const count = data.todayCount ?? 1589
  const formattedCount = count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
  
  const content = `
    <p>This is your last chance, ${data.userName}.</p>
    <p>Your LifeClock report has been waiting. Those <span class="highlight">47 revelations</span> are yours to discover.</p>
    ${discountText}
    <p>You've seen the surface. Now see everything.</p>
    
    <div style="background: rgba(255,255,255,0.05); border-radius: 8px; padding: 15px; margin: 20px 0; text-align: center;">
      <p style="color: #60A5FA; font-size: 14px; margin: 0;"><strong>${formattedCount}</strong> personnes ont reçu aujourd'hui leur rapport</p>
    </div>
    
    <p><a href="${data.resultUrl}" class="button">Claim Your Report Now</a></p>
    
    <div style="background: rgba(34, 197, 94, 0.1); border: 1px solid rgba(34, 197, 94, 0.3); border-radius: 8px; padding: 15px; margin: 20px 0;">
      <p style="color: #22C55E; font-weight: 600; margin-bottom: 5px;">Risk-free: Satisfait ou remboursé - 7 jours</p>
      <p style="color: #D1D5DB; font-size: 14px; margin: 0;">Full refund within 7 days if not satisfied.</p>
    </div>
    
    <p style="color: #9CA3AF; font-size: 14px;">This offer won't last. Don't let it slip away.</p>
    <p style="color: #EF4444; font-weight: 600; font-size: 14px;">This is your last chance to see your 47 revelations.</p>
  `
  return getBaseEmailTemplate(content, data.userName)
}

export function getReportRecoveryTemplate(data: {
  userName: string
  reportUrl: string
}): string {
  const content = `
    <p>You requested access to your LifeClock report.</p>
    <p>Click the link below to view your complete report with all your revelations, insights, and hidden forces.</p>
    <p><a href="${data.reportUrl}" class="button">Access Your Report</a></p>
    <p style="color: #9CA3AF; font-size: 14px;">This link is secure and will give you full access to your saved report.</p>
  `
  return getBaseEmailTemplate(content, data.userName)
}

export function getAdminNewPaymentTemplate(data: {
  email: string
  amount: number
  referralCode?: string
}): string {
  const content = `
    <p><strong>New Payment Received</strong></p>
    <p><strong>Customer Email:</strong> ${data.email}</p>
    <p class="amount">$${data.amount.toFixed(2)}</p>
    ${data.referralCode ? `<p><strong>Referral Code:</strong> ${data.referralCode}</p>` : ''}
    <p style="font-size: 12px; color: #9CA3AF;">Payment completed at ${new Date().toLocaleString()}</p>
  `
  return getBaseEmailTemplate(content)
}

export function getAdminMilestoneTemplate(data: {
  milestone: string
  stats: any
}): string {
  const content = `
    <p style="font-size: 20px; font-weight: bold; color: #34D399;">🎉 Milestone Reached!</p>
    <p><strong>${data.milestone}</strong></p>
    <div style="background: rgba(255,255,255,0.05); border-radius: 8px; padding: 20px; margin: 20px 0;">
      ${JSON.stringify(data.stats, null, 2).split('\n').map(line => `<p style="margin: 5px 0; font-family: monospace; font-size: 12px;">${line}</p>`).join('')}
    </div>
    <p>Congratulations on reaching this milestone!</p>
  `
  return getBaseEmailTemplate(content)
}

