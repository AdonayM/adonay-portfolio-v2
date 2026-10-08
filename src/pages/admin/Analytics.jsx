// src/pages/admin/Analytics.jsx
import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ComposableMap,
  Geographies,
  Geography,
} from 'react-simple-maps'
import {
  ArrowLeft,
  BarChart3,
  Users,
  Eye,
  Globe2,
  Monitor,
  Smartphone,
  Tablet,
  TrendingUp,
} from 'lucide-react'
import { usePageViews } from '../../lib/hooks'

const GEO_URL =
  'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json'

/* ═══════════════════════════════════════════════════════
   Country utilities
   ═══════════════════════════════════════════════════════ */
const regionNames =
  typeof Intl !== 'undefined' && Intl.DisplayNames
    ? new Intl.DisplayNames(['en'], { type: 'region' })
    : null

const getCountryName = (iso) => {
  if (!iso || iso.length !== 2) return 'Unknown'
  try {
    return regionNames?.of(iso.toUpperCase()) || iso
  } catch {
    return iso
  }
}

const getFlag = (iso) => {
  if (!iso || iso.length !== 2) return '🌐'
  try {
    return String.fromCodePoint(
      ...iso
        .toUpperCase()
        .split('')
        .map((c) => 127397 + c.charCodeAt(0))
    )
  } catch {
    return '🌐'
  }
}

/* ═══════════════════════════════════════════════════════
   Country matching — robust (handles Ethiopia's "-99")
   ═══════════════════════════════════════════════════════ */
const findCountryData = (geo, countryList) => {
  const p = geo.properties

  const isoCandidates = [p.iso_a2, p.ISO_A2].filter(
    (v) => v && v !== '-99' && v.length === 2
  )
  for (const iso of isoCandidates) {
    const found = countryList.find((c) => c.iso === iso.toUpperCase())
    if (found) return found
  }

  const nameCandidates = [p.name, p.NAME, p.ADMIN, p.admin].filter(Boolean)
  for (const name of nameCandidates) {
    const normalized = String(name).toLowerCase().trim()
    const found = countryList.find(
      (c) => getCountryName(c.iso).toLowerCase().trim() === normalized
    )
    if (found) return found
  }

  return null
}

/* ═══════════════════════════════════════════════════════
   Heat color scale
   ═══════════════════════════════════════════════════════ */
const getHeatColor = (count, max) => {
  if (!count || !max) return null
  const ratio = Math.min(count / max, 1)
  if (ratio < 0.25) return 'rgba(6, 182, 212, 0.45)'
  if (ratio < 0.5) return 'rgba(6, 182, 212, 0.65)'
  if (ratio < 0.75) return 'rgba(6, 182, 212, 0.85)'
  if (ratio < 1) return 'rgba(96, 130, 220, 0.9)'
  return 'rgba(168, 85, 247, 0.95)'
}

const Analytics = () => {
  const { data: pageViews, loading } = usePageViews()
  const [hoveredCountry, setHoveredCountry] = useState(null)
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 })

  /* ─── Compute aggregated stats ─── */
  const stats = useMemo(() => {
    if (!pageViews) return null

    /* ══════════════════════════════════════════════════
       Overall unique visitors (all sessions across the site)
       ══════════════════════════════════════════════════ */
    const allSessions = new Set(
      pageViews.map((v) => v.session_id).filter(Boolean)
    )
    const uniqueVisitors = allSessions.size

    /* ══════════════════════════════════════════════════
       COUNTRY aggregation — count UNIQUE SESSIONS per country
       (not total page views)
       ══════════════════════════════════════════════════ */
    const sessionsByCountry = {}
    pageViews.forEach((v) => {
      if (!v.country || !v.session_id) return
      const iso = v.country.toUpperCase()
      if (!sessionsByCountry[iso]) sessionsByCountry[iso] = new Set()
      sessionsByCountry[iso].add(v.session_id)
    })

    const countryList = Object.entries(sessionsByCountry)
      .map(([iso, sessions]) => ({ iso, count: sessions.size }))
      .sort((a, b) => b.count - a.count)

    const maxCountryCount = countryList[0]?.count || 1

    /* ══════════════════════════════════════════════════
       DEVICES — count unique sessions per device
       ══════════════════════════════════════════════════ */
    const sessionsByDevice = {}
    pageViews.forEach((v) => {
      const d = v.device || 'unknown'
      if (!sessionsByDevice[d]) sessionsByDevice[d] = new Set()
      if (v.session_id) sessionsByDevice[d].add(v.session_id)
    })

    const devices = {}
    Object.entries(sessionsByDevice).forEach(([device, sessions]) => {
      devices[device] = sessions.size
    })

    /* ══════════════════════════════════════════════════
       TOP PAGES — count total views per page (this stays as views)
       ══════════════════════════════════════════════════ */
    const byPath = {}
    pageViews.forEach((v) => {
      byPath[v.path] = (byPath[v.path] || 0) + 1
    })

    const topPages = Object.entries(byPath)
      .map(([path, count]) => ({ path, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5)

    return {
      totalViews: pageViews.length,
      uniqueVisitors,
      countries: countryList,
      maxCountryCount,
      devices,
      topPages,
    }
  }, [pageViews])

  if (loading) {
    return (
      <section className="min-h-screen bg-[#f0f0ef] flex items-center justify-center">
        <div className="text-[#06b6d4] text-sm font-mono tracking-[0.25em] uppercase animate-pulse">
          Loading analytics...
        </div>
      </section>
    )
  }

  if (!pageViews || pageViews.length === 0) {
    return (
      <section className="min-h-screen bg-[#f0f0ef] text-[#111] pt-16 pb-24 px-6 lg:px-12">
        <div className="max-w-[1200px] mx-auto">
          <Link
            to="/admin"
            className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-[0.2em] text-gray-500 hover:text-[#111] mb-6 transition-colors group"
          >
            <ArrowLeft className="w-3 h-3 group-hover:-translate-x-0.5 transition-transform" />
            Back to Dashboard
          </Link>
          <h1 className="font-display text-3xl md:text-4xl font-bold">
            Analytics
          </h1>
          <p className="text-sm text-gray-500 font-mono mt-4">
            No data yet. Visit your live site in incognito mode to start
            collecting.
          </p>
        </div>
      </section>
    )
  }

  /* Total visitors across all countries (sum of unique per country) */
  const totalUniqueVisitors = stats.uniqueVisitors

  return (
    <section className="min-h-screen bg-[#f0f0ef] text-[#111] pt-16 pb-24 px-6 lg:px-12">
      <div className="max-w-[1200px] mx-auto">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Link
            to="/admin"
            className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-[0.2em] text-gray-500 hover:text-[#111] mb-6 transition-colors group"
          >
            <ArrowLeft className="w-3 h-3 group-hover:-translate-x-0.5 transition-transform" />
            Back to Dashboard
          </Link>

          <div className="flex items-center gap-2 flex-wrap mb-2">
            <div className="p-1 bg-white border border-black/10 rounded">
              <BarChart3
                className="w-3.5 h-3.5 text-[#06b6d4]"
                strokeWidth={1.75}
              />
            </div>
            <p className="text-[9px] font-mono uppercase tracking-[0.25em] text-gray-500">
              // Admin · Analytics
            </p>
          </div>

          <h1 className="font-display text-3xl md:text-4xl font-bold tracking-tight leading-tight">
            Visitor Analytics
          </h1>

          <div className="mt-2.5 relative h-[2px] w-full overflow-hidden">
            <div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(90deg, #06b6d4, #a855f7, #06b6d4)',
                boxShadow: '0 0 15px rgba(6,182,212,0.4)',
              }}
            />
            <motion.div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.95) 50%, transparent 100%)',
                backgroundSize: '40% 100%',
                backgroundRepeat: 'no-repeat',
              }}
              animate={{ backgroundPosition: ['-50% 0%', '150% 0%'] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'linear' }}
            />
          </div>
        </motion.div>

        {/* STATS ROW */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          <StatCard
            icon={Users}
            label="Unique Visitors"
            value={totalUniqueVisitors}
            accent="#06b6d4"
          />
          <StatCard
            icon={Eye}
            label="Page Views"
            value={stats.totalViews}
            accent="#a855f7"
          />
          <StatCard
            icon={Globe2}
            label="Countries"
            value={stats.countries.length}
            accent="#2563eb"
          />
          <StatCard
            icon={TrendingUp}
            label="Top Country"
            value={
              stats.countries[0]
                ? `${getFlag(stats.countries[0].iso)} ${getCountryName(
                    stats.countries[0].iso
                  )}`
                : '—'
            }
            accent="#10b981"
            small
          />
        </div>

        {/* WORLD MAP */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white border border-black/10 rounded-2xl p-6 md:p-8 mb-6 relative"
        >
          <div className="flex items-start justify-between mb-6 flex-wrap gap-2">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gray-500 mb-1">
                // Visitors Around the World
              </p>
              <h2 className="font-display text-xl font-bold">
                Global Traffic Map
              </h2>
              <p className="text-[11px] font-mono text-gray-500 mt-1">
                Each country shows unique visitors (1 visit = 1 count)
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[9px] font-mono uppercase tracking-widest text-gray-500">
                Few
              </span>
              <div className="flex h-2 rounded overflow-hidden border border-black/10">
                <div className="w-6" style={{ background: 'rgba(6,182,212,0.45)' }} />
                <div className="w-6" style={{ background: 'rgba(6,182,212,0.65)' }} />
                <div className="w-6" style={{ background: 'rgba(6,182,212,0.85)' }} />
                <div className="w-6" style={{ background: 'rgba(96,130,220,0.9)' }} />
                <div className="w-6" style={{ background: 'rgba(168,85,247,0.95)' }} />
              </div>
              <span className="text-[9px] font-mono uppercase tracking-widest text-gray-500">
                Many
              </span>
            </div>
          </div>

          <div className="relative" style={{ fontFamily: 'system-ui, sans-serif' }}>
            <ComposableMap
              projectionConfig={{ scale: 147 }}
              width={900}
              height={400}
              style={{ width: '100%', height: 'auto' }}
            >
              <Geographies geography={GEO_URL}>
                {({ geographies }) =>
                  geographies.map((geo) => {
                    const match = findCountryData(geo, stats.countries)
                    const count = match?.count
                    const iso = match?.iso

                    const isHovered = hoveredCountry?.iso === iso && count

                    let fillColor = '#e8e8e8'
                    if (count) {
                      fillColor = isHovered
                        ? '#06b6d4'
                        : getHeatColor(count, stats.maxCountryCount)
                    }

                    return (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        fill={fillColor}
                        stroke={count ? '#7c9aa8' : '#d4d4d4'}
                        strokeWidth={0.5}
                        onMouseEnter={(e) => {
                          if (count) {
                            const svg = e.target.ownerSVGElement
                            const rect = svg.getBoundingClientRect()
                            setHoveredCountry({
                              iso,
                              count,
                              name: getCountryName(iso),
                            })
                            setTooltipPos({
                              x: e.clientX - rect.left,
                              y: e.clientY - rect.top,
                            })
                          }
                        }}
                        onMouseMove={(e) => {
                          if (hoveredCountry) {
                            const svg = e.target.ownerSVGElement
                            const rect = svg.getBoundingClientRect()
                            setTooltipPos({
                              x: e.clientX - rect.left,
                              y: e.clientY - rect.top,
                            })
                          }
                        }}
                        onMouseLeave={() => setHoveredCountry(null)}
                        style={{
                          outline: 'none',
                          cursor: count ? 'pointer' : 'default',
                        }}
                      />
                    )
                  })
                }
              </Geographies>
            </ComposableMap>

            {/* Tooltip */}
            {hoveredCountry && (
              <div
                className="absolute pointer-events-none bg-[#111] text-[#f0f0ef] text-[11px] font-mono rounded-lg px-3 py-2 shadow-xl border border-white/10 whitespace-nowrap z-10"
                style={{
                  left: tooltipPos.x + 12,
                  top: tooltipPos.y + 12,
                }}
              >
                <span className="mr-1.5">{getFlag(hoveredCountry.iso)}</span>
                <span className="text-[#06b6d4] font-bold">
                  {hoveredCountry.name}
                </span>
                <span className="mx-2 opacity-30">·</span>
                <span>
                  {hoveredCountry.count}{' '}
                  {hoveredCountry.count === 1 ? 'visitor' : 'visitors'}
                </span>
              </div>
            )}
          </div>
        </motion.div>

        {/* BOTTOM GRID */}
        <div className="grid lg:grid-cols-12 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="lg:col-span-5 bg-white border border-black/10 rounded-2xl p-6"
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gray-500 mb-4">
              // Top Countries · by Visitors
            </p>

            {stats.countries.length === 0 ? (
              <p className="text-sm font-mono text-gray-400">No data</p>
            ) : (
              <div className="space-y-3">
                {stats.countries.slice(0, 8).map((c, i) => (
                  <div key={c.iso}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[13px] font-medium flex items-center gap-2">
                        <span className="text-base">{getFlag(c.iso)}</span>
                        {getCountryName(c.iso)}
                      </span>
                      <span className="text-[11px] font-mono text-gray-500">
                        {c.count}{' '}
                        {c.count === 1 ? 'visitor' : 'visitors'}
                      </span>
                    </div>
                    <div className="h-1.5 bg-black/5 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{
                          width: `${(c.count / stats.maxCountryCount) * 100}%`,
                        }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.8,
                          delay: 0.2 + i * 0.05,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="h-full rounded-full"
                        style={{
                          background:
                            'linear-gradient(90deg, #06b6d4, #a855f7)',
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-7 space-y-4"
          >
            <div className="bg-white border border-black/10 rounded-2xl p-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gray-500 mb-4">
                // Devices · by Visitors
              </p>
              <div className="grid grid-cols-3 gap-3">
                <DeviceStat
                  icon={Monitor}
                  label="Desktop"
                  count={stats.devices.desktop || 0}
                  total={totalUniqueVisitors}
                  color="#06b6d4"
                />
                <DeviceStat
                  icon={Smartphone}
                  label="Mobile"
                  count={stats.devices.mobile || 0}
                  total={totalUniqueVisitors}
                  color="#a855f7"
                />
                <DeviceStat
                  icon={Tablet}
                  label="Tablet"
                  count={stats.devices.tablet || 0}
                  total={totalUniqueVisitors}
                  color="#2563eb"
                />
              </div>
            </div>

            <div className="bg-white border border-black/10 rounded-2xl p-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gray-500 mb-4">
                // Top Pages · by Views
              </p>
              <div className="space-y-2">
                {stats.topPages.map((p, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between py-1.5 border-b border-black/5 last:border-0"
                  >
                    <span className="text-[12px] font-mono text-[#111]">
                      {p.path}
                    </span>
                    <span className="text-[11px] font-mono text-gray-500">
                      {p.count} views
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/* Reusable pieces */

const StatCard = ({ icon: Icon, label, value, accent, small }) => (
  <motion.div
    initial={{ opacity: 0, y: 15 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
    className="bg-white border border-black/10 rounded-xl p-5 hover:border-black/30 hover:shadow-[0_15px_40px_-20px_rgba(0,0,0,0.2)] transition-all"
  >
    <div className="flex items-center gap-2 mb-3">
      <div
        className="w-7 h-7 rounded-lg flex items-center justify-center"
        style={{
          backgroundColor: `${accent}15`,
          border: `1px solid ${accent}40`,
          color: accent,
        }}
      >
        <Icon className="w-3.5 h-3.5" strokeWidth={1.75} />
      </div>
      <p className="text-[9px] font-mono uppercase tracking-[0.2em] text-gray-500">
        {label}
      </p>
    </div>
    <p
      className={`font-display font-bold tracking-tight text-[#111] ${
        small ? 'text-base truncate' : 'text-2xl md:text-3xl'
      }`}
    >
      {value}
    </p>
  </motion.div>
)

const DeviceStat = ({ icon: Icon, label, count, total, color }) => {
  const pct = total ? Math.round((count / total) * 100) : 0
  return (
    <div className="text-center">
      <div
        className="w-9 h-9 rounded-lg flex items-center justify-center mx-auto mb-2"
        style={{
          backgroundColor: `${color}15`,
          border: `1px solid ${color}40`,
          color,
        }}
      >
        <Icon className="w-4 h-4" strokeWidth={1.75} />
      </div>
      <p className="font-display text-lg font-bold text-[#111]">{pct}%</p>
      <p className="text-[9px] font-mono uppercase tracking-widest text-gray-500 mt-0.5">
        {label}
      </p>
    </div>
  )
}

export default Analytics