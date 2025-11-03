// Generate a unique referral code based on email
export function generateReferralCode(email: string): string {
  // Create a simple hash from email
  const hash = email.split("").reduce((acc, char) => {
    return char.charCodeAt(0) + ((acc << 5) - acc)
  }, 0)

  // Convert to base36 and take first 8 characters
  const code = Math.abs(hash).toString(36).toUpperCase().slice(0, 8)

  // Add random suffix for uniqueness
  const suffix = Math.random().toString(36).substring(2, 5).toUpperCase()

  return `${code}${suffix}`
}
