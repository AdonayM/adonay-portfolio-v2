// api/track.js
// Vercel serverless function — receives pageviews from the client,
// reads country from Vercel's built-in headers, writes to Supabase.

import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  {
    auth: { persistSession: false, autoRefreshToken: false },
  }
)

export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' })
  }

  try {
    const { path, referrer, session_id, user_agent } = req.body || {}

    if (!path) {
      return res.status(400).json({ ok: false, error: 'Missing path' })
    }

    // Skip admin routes
    if (path.startsWith('/admin')) {
      return res.status(200).json({ ok: true, skipped: true })
    }

    // Country / city from Vercel's edge headers (free, automatic)
    const country = req.headers['x-vercel-ip-country'] || null
    const city = req.headers['x-vercel-ip-city'] || null

    // Parse user agent
    const ua = user_agent || req.headers['user-agent'] || ''
    const device = parseDevice(ua)
    const browser = parseBrowser(ua)
    const os = parseOS(ua)

    // Insert into Supabase (service_role bypasses RLS)
    const { error } = await supabase.from('page_views').insert({
      path,
      referrer: referrer || 'direct',
      country,
      city,
      device,
      browser,
      os,
      session_id,
    })

    if (error) throw error

    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error('[track] error:', err)
    return res.status(500).json({ ok: false })
  }
}

/* ───── User-agent parsers ───── */

function parseDevice(ua) {
  if (!ua) return 'desktop'
  if (/ipad|tablet/i.test(ua)) return 'tablet'
  if (/mobile|android|iphone/i.test(ua)) return 'mobile'
  return 'desktop'
}

function parseBrowser(ua) {
  if (!ua) return 'other'
  if (/edg/i.test(ua)) return 'edge'
  if (/opr|opera/i.test(ua)) return 'opera'
  if (/chrome|crios/i.test(ua)) return 'chrome'
  if (/firefox|fxios/i.test(ua)) return 'firefox'
  if (/safari/i.test(ua)) return 'safari'
  return 'other'
}

function parseOS(ua) {
  if (!ua) return 'other'
  if (/windows/i.test(ua)) return 'windows'
  if (/mac os|macintosh/i.test(ua)) return 'macos'
  if (/android/i.test(ua)) return 'android'
  if (/iphone|ipad|ipod|ios/i.test(ua)) return 'ios'
  if (/linux/i.test(ua)) return 'linux'
  return 'other'
}