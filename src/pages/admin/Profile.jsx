// src/pages/admin/Profile.jsx
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  Save,
  Check,
  AlertCircle,
  Plus,
  X,
  User,
} from 'lucide-react'
import { supabase } from '../../lib/supabaseClient'
import { useProfile } from '../../lib/hooks'
import ImageUpload from '../../components/ImageUpload'

const ProfileEditor = () => {
  const { data: profile, loading: loadingProfile } = useProfile()

  const [form, setForm] = useState({
    full_name: '',
    tagline: '',
    bio_paragraphs: [],
    photo_url: '',
    email: '',
    phone: '',
    location: '',
    linkedin_url: '',
    github_url: '',
    telegram_url: '',
    availability_status: '',
    resume_url: '',
  })

  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (profile) {
      setForm({
        full_name: profile.full_name || '',
        tagline: profile.tagline || '',
        bio_paragraphs: profile.bio_paragraphs || [],
        photo_url: profile.photo_url || '',
        email: profile.email || '',
        phone: profile.phone || '',
        location: profile.location || '',
        linkedin_url: profile.linkedin_url || '',
        github_url: profile.github_url || '',
        telegram_url: profile.telegram_url || '',
        availability_status: profile.availability_status || '',
        resume_url: profile.resume_url || '',
      })
    }
  }, [profile])

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }))
    setSuccess(false)
  }

  const updateParagraph = (index, value) => {
    const next = [...form.bio_paragraphs]
    next[index] = value
    updateField('bio_paragraphs', next)
  }
  const addParagraph = () => {
    updateField('bio_paragraphs', [...form.bio_paragraphs, ''])
  }
  const removeParagraph = (index) => {
    const next = form.bio_paragraphs.filter((_, i) => i !== index)
    updateField('bio_paragraphs', next)
  }

  const handleSave = async () => {
    setSaving(true)
    setError('')
    setSuccess(false)

    try {
      const { error: updateError } = await supabase
        .from('profile')
        .update({
          ...form,
          updated_at: new Date().toISOString(),
        })
        .eq('id', 1)

      if (updateError) throw updateError

      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    } catch (err) {
      console.error('Save error:', err)
      setError(err.message || 'Failed to save changes.')
    } finally {
      setSaving(false)
    }
  }

  if (loadingProfile) {
    return (
      <section className="min-h-screen bg-[#f0f0ef] flex items-center justify-center">
        <div className="text-[#06b6d4] text-sm font-mono tracking-[0.25em] uppercase animate-pulse">
          Loading profile...
        </div>
      </section>
    )
  }

  return (
    <section className="min-h-screen bg-[#f0f0ef] text-[#111] pt-16 pb-24 px-6 lg:px-12">
      <div className="max-w-[900px] mx-auto">

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
              <User className="w-3.5 h-3.5 text-[#06b6d4]" strokeWidth={1.75} />
            </div>
            <p className="text-[9px] font-mono uppercase tracking-[0.25em] text-gray-500">
              // Admin · Profile
            </p>
          </div>

          <h1 className="font-display text-3xl md:text-4xl font-bold tracking-tight leading-tight">
            Profile Editor
          </h1>

          <div className="mt-2.5 relative h-[2px] w-full overflow-hidden">
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(90deg, #06b6d4, #a855f7, #06b6d4)',
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

        {/* SUCCESS / ERROR BANNERS */}
        {success && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 flex items-center gap-2 px-4 py-3 bg-green-50 border border-green-200 rounded-xl text-sm text-green-800"
          >
            <Check className="w-4 h-4" />
            Changes saved successfully.
          </motion.div>
        )}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 flex items-center gap-2 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-800"
          >
            <AlertCircle className="w-4 h-4" />
            {error}
          </motion.div>
        )}

        {/* FORM */}
        <div className="space-y-8">

          {/* Identity */}
          <Section title="Identity" desc="Your name, tagline, and photo">
            <Field label="Full Name">
              <input
                type="text"
                value={form.full_name}
                onChange={(e) => updateField('full_name', e.target.value)}
                className={inputClass}
                placeholder="Adonay Mussie"
              />
            </Field>

            <Field label="Tagline" hint="Short one-liner shown on the Home page">
              <textarea
                value={form.tagline}
                onChange={(e) => updateField('tagline', e.target.value)}
                rows={2}
                className={inputClass}
                placeholder="Cybersecurity professional passionate about..."
              />
            </Field>

            <ImageUpload
              label="Profile Photo"
              value={form.photo_url}
              onChange={(url) => updateField('photo_url', url)}
            />
          </Section>

          {/* Bio Paragraphs */}
          <Section
            title="Bio Paragraphs"
            desc="Each entry becomes a paragraph on the About page"
          >
            <div className="space-y-3">
              {form.bio_paragraphs.map((para, i) => (
                <div key={i} className="flex gap-2">
                  <textarea
                    value={para}
                    onChange={(e) => updateParagraph(i, e.target.value)}
                    rows={3}
                    className={inputClass + ' flex-1'}
                    placeholder={`Paragraph ${i + 1}`}
                  />
                  <button
                    type="button"
                    onClick={() => removeParagraph(i)}
                    className="shrink-0 p-2 self-start border border-red-200 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                    title="Remove paragraph"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}

              <button
                type="button"
                onClick={addParagraph}
                className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest px-4 py-2.5 border border-black/15 rounded-lg hover:bg-white hover:border-black/30 transition-all"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Paragraph
              </button>
            </div>
          </Section>

          {/* Contact */}
          <Section
            title="Contact Information"
            desc="Shown on the Contact page and in the profile card"
          >
            <div className="grid md:grid-cols-2 gap-4">
              <Field label="Email">
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => updateField('email', e.target.value)}
                  className={inputClass}
                  placeholder="you@example.com"
                />
              </Field>

              <Field label="Phone">
                <input
                  type="text"
                  value={form.phone}
                  onChange={(e) => updateField('phone', e.target.value)}
                  className={inputClass}
                  placeholder="0942162425"
                />
              </Field>

              <Field label="Location">
                <input
                  type="text"
                  value={form.location}
                  onChange={(e) => updateField('location', e.target.value)}
                  className={inputClass}
                  placeholder="Addis Ababa, Ethiopia"
                />
              </Field>

              <Field label="Availability Status">
                <input
                  type="text"
                  value={form.availability_status}
                  onChange={(e) =>
                    updateField('availability_status', e.target.value)
                  }
                  className={inputClass}
                  placeholder="Available for opportunities"
                />
              </Field>
            </div>
          </Section>

          {/* Social Links */}
          <Section title="Social Links" desc="Full URLs shown on the Contact page">
            <Field label="LinkedIn URL">
              <input
                type="url"
                value={form.linkedin_url}
                onChange={(e) => updateField('linkedin_url', e.target.value)}
                className={inputClass}
                placeholder="https://linkedin.com/in/username"
              />
            </Field>

            <Field label="GitHub URL">
              <input
                type="url"
                value={form.github_url}
                onChange={(e) => updateField('github_url', e.target.value)}
                className={inputClass}
                placeholder="https://github.com/username"
              />
            </Field>

            <Field label="Telegram URL">
              <input
                type="url"
                value={form.telegram_url}
                onChange={(e) => updateField('telegram_url', e.target.value)}
                className={inputClass}
                placeholder="https://t.me/username"
              />
            </Field>

            <Field label="Resume URL" hint="Optional — path to a PDF">
              <input
                type="text"
                value={form.resume_url}
                onChange={(e) => updateField('resume_url', e.target.value)}
                className={inputClass}
                placeholder="/resume.pdf"
              />
            </Field>
          </Section>

          {/* Save */}
          <div className="flex justify-end pt-4 border-t border-black/10">
            <button
              onClick={handleSave}
              disabled={saving}
              className="group relative inline-flex items-center gap-2 px-6 py-3.5 text-[#f0f0ef] text-[11px] font-mono uppercase tracking-widest rounded-xl transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
              style={{
                background: 'linear-gradient(180deg, #1a1a1a 0%, #0a0a0a 100%)',
                boxShadow:
                  'inset 0 1px 0 rgba(255,255,255,0.1), 0 1px 2px rgba(0,0,0,0.4)',
              }}
            >
              <span
                className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{
                  boxShadow:
                    '0 15px 40px -10px rgba(6,182,212,0.55), 0 0 0 1px rgba(6,182,212,0.35)',
                }}
              />
              {success ? (
                <>
                  <Check className="relative z-10 w-3.5 h-3.5" />
                  <span className="relative z-10">Saved</span>
                </>
              ) : (
                <>
                  <Save className="relative z-10 w-3.5 h-3.5" />
                  <span className="relative z-10">
                    {saving ? 'Saving...' : 'Save Changes'}
                  </span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

/* Reusable pieces */
const inputClass =
  'w-full px-3.5 py-2.5 bg-white border border-black/10 rounded-lg text-sm text-[#111] placeholder-gray-400 focus:outline-none focus:border-[#06b6d4] focus:shadow-[0_0_0_3px_rgba(6,182,212,0.15)] transition-all'

const Section = ({ title, desc, children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    className="bg-white border border-black/10 rounded-2xl p-6 md:p-8"
  >
    <div className="mb-6">
      <h2 className="font-display text-xl font-bold text-[#111] leading-tight">
        {title}
      </h2>
      {desc && (
        <p className="text-[12px] text-gray-500 mt-1 leading-snug">{desc}</p>
      )}
    </div>
    <div className="space-y-5">{children}</div>
  </motion.div>
)

const Field = ({ label, hint, children }) => (
  <div>
    <label className="block text-[10px] font-mono uppercase tracking-[0.2em] text-gray-600 mb-2">
      {label}
    </label>
    {children}
    {hint && (
      <p className="text-[10px] text-gray-400 mt-1 font-mono">{hint}</p>
    )}
  </div>
)

export default ProfileEditor