'use client'

import { useEffect } from 'react'
import * as Sentry from '@sentry/nextjs'
import { t } from '@/lib/i18n'

export default function Error(props: {
	error: Error & { digest?: string }
	reset: () => void
}) {
	const { error, reset } = props

	useEffect(() => {
		// Log error for debugging
		console.error(error)
		// Send error to Sentry if configured
		if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
			Sentry.captureException(error)
		}
	}, [error])
	
	return (
		<div className="min-h-[50vh] flex flex-col items-center justify-center gap-4 px-6 text-center">
			<h1 className="text-2xl font-semibold">{t('errors.generic')}</h1>
			<p className="text-muted-foreground max-w-prose">
				{t('errors.description')}
			</p>
			<div className="flex items-center gap-3">
				<button
					className="inline-flex items-center justify-center rounded-md bg-foreground px-4 py-2 text-background text-sm font-medium hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-ring"
					onClick={() => reset()}
				>
					{t('errors.retry')}
				</button>
				<button
					className="inline-flex items-center justify-center rounded-md border px-4 py-2 text-sm font-medium hover:bg-accent focus:outline-none focus:ring-2 focus:ring-ring"
					onClick={() => (window.location.href = '/')}
				>
					{t('errors.backHome')}
				</button>
			</div>
			{error?.digest && (
				<p className="text-xs text-muted-foreground">Code: {error.digest}</p>
			)}
		</div>
	)
}


