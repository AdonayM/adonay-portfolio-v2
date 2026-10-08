// src/pages/admin/Profile.jsx
import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import {
  Save,
  Check,
  AlertCircle,
  Plus,
  X,
  User,
  Mail,
  Link2,
  FileText,
  Upload,
  Loader2,
} from 'lucide-react'
import { supabase } from '../../lib/supabaseClient'
import { useProfile } from '../../lib/hooks'
import ImageUpload from '../../components/ImageUpload'
import FileUpload from '../../components/FileUpload'

const BUCKET = 'portfolio-images'

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
  const [photoUploading, setPhotoUploading] = useState(false)
  const photoInputRef = useRef(null)

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

  /* Compact photo upload */
  const handlePhotoUpload = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      setError('Please select an image file.')
      return
    }
    if (file.size > 5 * 1024 * 1024) {
      setError('Image must be under 5MB.')
      return
    }

    setPhotoUploading(true)
    setError('')

    try {
      const ext = file.name.split('.').pop()
      const baseName = file.name
        .replace(/\.[^.]+$/, '')
        .replace(/[^a-zA-Z0-9-_]/g, '-')
        .slice(0, 40)
      const fileName = `${Date.now()}-${baseName}.${ext}`

      const { error: uploadError } = await supabase.storage
        .from(BUCKET)
        .upload(fileName, file, { cacheControl: '3600', upsert: false })
      if (uploadError) throw uploadError

      const { data: urlData } = supabase.storage
        .from(BUCKET)
        .getPublicUrl(fileName)

      updateField('photo_url', urlData.publicUrl)
    } catch (err) {
      setError(err.message || 'Upload failed.')
    } finally {
      setPhotoUploading(false)
      e.target.value = ''
    }
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
      setError(err.message || 'Failed to save changes.')
    } finally {
      setSaving(false)
    }
  }

  if (loadingProfile) {
    return (
      <div className="min-h-screen bg-[#f0f0ef] flex items-center justify-center">
        <div className="text-[#06b6d4] text-sm font-mono tracking-[0.25em] uppercase animate-pulse">
          Loading profile...
        </div>
      </div>
    )
  }

  return (
    <section className="min-h-screen bg-[#f0f0ef] text-[#111] pt-6 pb-16 px-6 lg:px-10">
      <div className="w-full max-w-[1600px]">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <h1 className="font-display text-2xl md:text-3xl font-bold tracking-tight leading-tight">
            Profile Editor
          </h1>
          <div className="mt-2 relative h-[2px] w-full overflow-hidden">
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
          <p className="text-sm text-gray-600 leading-relaxed mt-3 font-light">
            Manage your public identity, bio, and contact information.
          </p>
        </motion.div>

        {success && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 flex items-center gap-2 px-4 py-3 bg-green-50 border border-green-200 rounded-xl text-sm text-green-800"
          >
            <Check className="w-4 h-4" />
            Changes saved successfully.
          </motion.div>
        )}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 flex items-center gap-2 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-800"
          >
            <AlertCircle className="w-4 h-4" />
            {error}
          </motion.div>
        )}

        {/* TWO-COLUMN LAYOUT */}
        <div className="grid lg:grid-cols-12 gap-4 mb-6">

          {/* ══════ LEFT COLUMN ══════ */}
          <div className="lg:col-span-7 space-y-4">

            {/* Identity Card — with compact photo avatar */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-white border border-black/10 rounded-2xl p-6"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 rounded-lg bg-[#06b6d4]/10 border border-[#06b6d4]/30 flex items-center justify-center">
                  <User className="w-4 h-4 text-[#06b6d4]" strokeWidth={1.75} />
                </div>
                <div>
                  <h2 className="font-display text-lg font-bold leading-tight">
                    Identity
                  </h2>
                  <p className="text-[11px] font-mono text-gray-500">
                    Name, tagline, and profile photo
                  </p>
                </div>
              </div>

              {/* Compact photo + name row */}
              <div className="flex flex-col sm:flex-row gap-5 mb-5">
                {/* Photo avatar */}
                <div className="flex flex-col items-center gap-2 shrink-0">
                  <div className="relative w-28 h-28 rounded-xl overflow-hidden border-2 border-black/10 bg-[#f0f0ef]">
                    {form.photo_url ? (
                      <img
                        src={form.photo_url}
                        alt="Profile"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.style.display = 'none'
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <User className="w-10 h-10 text-gray-300" />
                      </div>
                    )}

                    {photoUploading && (
                      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center">
                        <Loader2 className="w-5 h-5 text-white animate-spin" />
                      </div>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => photoInputRef.current?.click()}
                    disabled={photoUploading}
                    className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest px-3 py-1.5 border border-black/15 rounded-md hover:bg-black/5 hover:border-black/30 transition-all disabled:opacity-60"
                  >
                    <Upload className="w-3 h-3" />
                    {photoUploading ? 'Uploading...' : 'Change'}
                  </button>

                  <input
                    ref={photoInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />

                  {form.photo_url && (
                    <button
                      type="button"
                      onClick={() => updateField('photo_url', '')}
                      className="text-[10px] font-mono uppercase tracking-widest text-red-500 hover:text-red-700 transition-colors"
                    >
                      Remove
                    </button>
                  )}
                </div>

                {/* Name + tagline fields */}
                <div className="flex-1 space-y-4 min-w-0">
                  <Field label="Full Name">
                    <input
                      type="text"
                      value={form.full_name}
                      onChange={(e) => updateField('full_name', e.target.value)}
                      className={inputClass}
                      placeholder="Adonay Mussie"
                    />
                  </Field>

                  <Field label="Tagline" hint="Short one-liner shown on Home">
                    <textarea
                      value={form.tagline}
                      onChange={(e) => updateField('tagline', e.target.value)}
                      rows={2}
                      className={inputClass}
                      placeholder="Cybersecurity professional passionate about..."
                    />
                  </Field>
                </div>
              </div>

              {/* Optional: manual URL fallback */}
              <details className="mt-2">
                <summary className="text-[10px] font-mono uppercase tracking-[0.2em] text-gray-500 cursor-pointer hover:text-[#111] transition-colors select-none">
                  Or paste photo URL manually
                </summary>
                <input
                  type="text"
                  value={form.photo_url}
                  onChange={(e) => updateField('photo_url', e.target.value)}
                  className={inputClass + ' mt-2'}
                  placeholder="https://..."
                />
              </details>
            </motion.div>

            {/* Bio Paragraphs Card */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.05 }}
              className="bg-white border border-black/10 rounded-2xl p-6"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 rounded-lg bg-[#a855f7]/10 border border-[#a855f7]/30 flex items-center justify-center">
                  <FileText
                    className="w-4 h-4 text-[#a855f7]"
                    strokeWidth={1.75}
                  />
                </div>
                <div>
                  <h2 className="font-display text-lg font-bold leading-tight">
                    Bio Paragraphs
                  </h2>
                  <p className="text-[11px] font-mono text-gray-500">
                    Each entry appears as a paragraph on the About page
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {form.bio_paragraphs.map((para, i) => (
                  <div key={i} className="flex gap-2">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="text-[10px] font-mono uppercase tracking-[0.2em] text-gray-500">
                          Paragraph #{i + 1}
                        </label>
                      </div>
                      <textarea
                        value={para}
                        onChange={(e) => updateParagraph(i, e.target.value)}
                        rows={3}
                        className={inputClass}
                        placeholder={`Paragraph ${i + 1}`}
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => removeParagraph(i)}
                      className="shrink-0 p-2 self-start mt-6 border border-red-200 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                      title="Remove paragraph"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={addParagraph}
                  className={addBtnClass}
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add Paragraph
                </button>
              </div>
            </motion.div>
          </div>

          {/* ══════ RIGHT COLUMN ══════ */}
          <div className="lg:col-span-5 space-y-4">

            {/* Contact Info Card */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="bg-white border border-black/10 rounded-2xl p-6"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 rounded-lg bg-[#10b981]/10 border border-[#10b981]/30 flex items-center justify-center">
                  <Mail
                    className="w-4 h-4 text-[#10b981]"
                    strokeWidth={1.75}
                  />
                </div>
                <div>
                  <h2 className="font-display text-lg font-bold leading-tight">
                    Contact Info
                  </h2>
                  <p className="text-[11px] font-mono text-gray-500">
                    Shown on the Contact page
                  </p>
                </div>
              </div>

              <div className="space-y-4">
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

                <Field
                  label="Availability Status"
                  hint="Shown on Home + Contact"
                >
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
            </motion.div>

            {/* Social Links Card */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="bg-white border border-black/10 rounded-2xl p-6"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 rounded-lg bg-[#2563eb]/10 border border-[#2563eb]/30 flex items-center justify-center">
                  <Link2
                    className="w-4 h-4 text-[#2563eb]"
                    strokeWidth={1.75}
                  />
                </div>
                <div>
                  <h2 className="font-display text-lg font-bold leading-tight">
                    Social Links
                  </h2>
                  <p className="text-[11px] font-mono text-gray-500">
                    Full URLs shown on the Contact page
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <Field label="LinkedIn URL">
                  <input
                    type="url"
                    value={form.linkedin_url}
                    onChange={(e) =>
                      updateField('linkedin_url', e.target.value)
                    }
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
                    onChange={(e) =>
                      updateField('telegram_url', e.target.value)
                    }
                    className={inputClass}
                    placeholder="https://t.me/username"
                  />
                </Field>
              </div>
            </motion.div>

            {/* CV & Resume Card */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="bg-white border border-black/10 rounded-2xl p-6"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 rounded-lg bg-[#f59e0b]/10 border border-[#f59e0b]/30 flex items-center justify-center">
                  <FileText
                    className="w-4 h-4 text-[#f59e0b]"
                    strokeWidth={1.75}
                  />
                </div>
                <div>
                  <h2 className="font-display text-lg font-bold leading-tight">
                    CV & Resume
                  </h2>
                  <p className="text-[11px] font-mono text-gray-500">
                    Private document — visible only in admin
                  </p>
                </div>
              </div>

              <FileUpload
                label="Resume / CV File"
                value={form.resume_url}
                onChange={(url) => updateField('resume_url', url)}
                accept="application/pdf"
                maxSize={10}
                hint="PDF · max 10MB · Stored in private bucket"
              />
            </motion.div>
          </div>
        </div>

        {/* SAVE BAR */}
        <div className="flex justify-end pt-6 mt-6 border-t border-black/10">
          <button
            onClick={handleSave}
            disabled={saving}
            className="group relative inline-flex items-center gap-2 px-6 py-3.5 text-[#f0f0ef] text-[11px] font-mono uppercase tracking-widest rounded-xl transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-60"
            style={{
              background: 'linear-gradient(180deg, #1a1a1a 0%, #0a0a0a 100%)',
              boxShadow:
                'inset 0 1px 0 rgba(255,255,255,0.1), 0 1px 2px rgba(0,0,0,0.4)',
            }}
          >
            {success ? (
              <>
                <Check className="w-3.5 h-3.5" /> Saved
              </>
            ) : (
              <>
                <Save className="w-3.5 h-3.5" />
                {saving ? 'Saving...' : 'Save Changes'}
              </>
            )}
          </button>
        </div>
      </div>
    </section>
  )
}

/* ─── Shared styles ─── */
const inputClass =
  'w-full px-3.5 py-2.5 bg-white border border-black/10 rounded-lg text-sm text-[#111] placeholder-gray-400 focus:outline-none focus:border-[#06b6d4] focus:shadow-[0_0_0_3px_rgba(6,182,212,0.15)] transition-all'

const addBtnClass =
  'inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest px-4 py-2.5 border border-black/15 rounded-lg hover:bg-white hover:border-black/30 transition-all'

const Field = ({ label, hint, children }) => (
  <div>
    <label className="block text-[10px] font-mono uppercase tracking-[0.2em] text-gray-600 mb-2">
      {label}
    </label>
    {children}
    {hint && <p className="text-[10px] text-gray-400 mt-1 font-mono">{hint}</p>}
  </div>
)

export default ProfileEditor