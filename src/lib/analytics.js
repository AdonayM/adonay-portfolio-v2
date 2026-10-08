// src/lib/analytics.js
// Fire-and-forget pageview tracking. Doesn't block the UI.

/**
 * Track a pageview. Silent failure — tracking must never break the site.
 */
export async function trackPageView(path) {
  // Don't track admin pages
  if (path.startsWith('/admin')) return

  // Get or create an anonymous session ID for this browser tab
  let sessionId = sessionStorage.getItem('_sid')
  if (!sessionId) {
    sessionId =
      typeof crypto !== 'undefined' && crypto.randomUUID
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(36).slice(2)}`
    sessionStorage.setItem('_sid', sessionId)
  }

  try {
    // Fire and forget — do not await
    fetch('/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        path,
        referrer: document.referrer || 'direct',
        session_id: sessionId,
        user_agent: navigator.userAgent,
      }),
      keepalive: true, // Allows the request to outlive the page if user navigates away
    }).catch(() => {
      // Silent fail
    })
  } catch {
    // Silent fail
  }
}