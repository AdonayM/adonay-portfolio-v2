// src/pages/admin/Education.jsx
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Save,
  Check,
  AlertCircle,
  Plus,
  Trash2,
} from 'lucide-react'
import { supabase } from '../../lib/supabaseClient'
import { useEducation } from '../../lib/hooks'
import ConfirmModal from '../../components/ConfirmModal'

const EducationEditor = () => {
  const { data: education, loading } = useEducation()
  const [items, setItems] = useState([])
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const [deleteTarget, setDeleteTarget] = useState(null)

  useEffect(() => {
    if (education) setItems(education.map((e) => ({ ...e })))
  }, [education])

  const updateField = (index, field, value) => {
    setItems((prev) => {
      const next = [...prev]
      next[index] = { ...next[index], [field]: value }
      return next
    })
    setSuccess(false)
  }

  const addItem = () => {
    setItems((prev) => [
      ...prev,
      {
        id: `new-${Date.now()}`,
        institution: '',
        degree: '',
        period: '',
        cgpa: '',
        description: '',
        display_order: prev.length + 1,
        _isNew: true,
      },
    ])
  }

  const confirmDelete = async () => {
    if (!deleteTarget) return
    const { item, index } = deleteTarget
    if (!item._isNew && item.id) {
      const { error } = await supabase
        .from('education')
        .delete()
        .eq('id', item.id)
      if (error) {
        setError(error.message)
        setDeleteTarget(null)
        return
      }
    }
    setItems((prev) => prev.filter((_, i) => i !== index))
    setDeleteTarget(null)
  }

  const handleSave = async () => {
    setSaving(true)
    setError('')
    setSuccess(false)
    try {
      for (let i = 0; i < items.length; i++) {
        const item = items[i]
        const payload = {
          institution: item.institution,
          degree: item.degree,
          period: item.period,
          cgpa: item.cgpa || null,
          description: item.description,
          display_order: i + 1,
        }
        if (item._isNew) {
          const { error } = await supabase.from('education').insert(payload)
          if (error) throw error
        } else {
          const { error } = await supabase
            .from('education')
            .update(payload)
            .eq('id', item.id)
          if (error) throw error
        }
      }
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
      setTimeout(() => window.location.reload(), 500)
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <Loader text="Loading education..." />

  return (
    <>
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
              Education Editor
            </h1>
            <div className="mt-2 relative h-[2px] w-full overflow-hidden">
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
            <p className="text-sm text-gray-600 leading-relaxed mt-3 font-light">
              Manage your academic timeline. Order matters — first item appears
              at the top.
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

          {/* 2-COLUMN GRID OF ENTRIES */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
            {items.map((item, i) => (
              <motion.div
                key={item.id || i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white border border-black/10 rounded-2xl p-5 relative flex flex-col"
              >
                {/* Card header */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-gray-400">
                    #{i + 1}
                  </span>
                  <button
                    onClick={() => setDeleteTarget({ item, index: i })}
                    className="shrink-0 p-1.5 border border-red-200 bg-red-50 text-red-600 rounded-md hover:bg-red-100 transition-colors"
                    title="Remove"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Vertical fields */}
                <div className="space-y-3">
                  <Field label="Institution">
                    <input
                      className={inputClass}
                      value={item.institution}
                      onChange={(e) =>
                        updateField(i, 'institution', e.target.value)
                      }
                      placeholder="Bahirdar University"
                    />
                  </Field>

                  <Field label="Degree">
                    <input
                      className={inputClass}
                      value={item.degree}
                      onChange={(e) => updateField(i, 'degree', e.target.value)}
                      placeholder="Bachelor of Computer Engineering"
                    />
                  </Field>

                  <div className="grid grid-cols-2 gap-3">
                    <Field label="Period">
                      <input
                        className={inputClass}
                        value={item.period}
                        onChange={(e) =>
                          updateField(i, 'period', e.target.value)
                        }
                        placeholder="2022 – 2026"
                      />
                    </Field>
                    <Field label="CGPA">
                      <input
                        className={inputClass}
                        value={item.cgpa || ''}
                        onChange={(e) => updateField(i, 'cgpa', e.target.value)}
                        placeholder="3.68 / 4.0"
                      />
                    </Field>
                  </div>

                  <Field label="Description">
                    <textarea
                      className={inputClass}
                      rows={2}
                      value={item.description}
                      onChange={(e) =>
                        updateField(i, 'description', e.target.value)
                      }
                      placeholder="Focused on computer architecture..."
                    />
                  </Field>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Add button */}
          <button onClick={addItem} className={addBtnClass}>
            <Plus className="w-3.5 h-3.5" />
            Add Education
          </button>

          {/* Save bar */}
          <div className="flex justify-end pt-8 mt-8 border-t border-black/10">
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

      <ConfirmModal
        isOpen={!!deleteTarget}
        title="Delete this entry?"
        message={`"${deleteTarget?.item?.institution || 'This entry'}" will be permanently removed from your education timeline.`}
        confirmText="Delete"
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </>
  )
}

/* ═══════════════════════════════════════════════════════
   SHARED COMPONENTS + STYLES (used by all editors)
   ═══════════════════════════════════════════════════════ */

export const inputClass =
  'w-full px-3.5 py-2.5 bg-white border border-black/10 rounded-lg text-sm text-[#111] placeholder-gray-400 focus:outline-none focus:border-[#06b6d4] focus:shadow-[0_0_0_3px_rgba(6,182,212,0.15)] transition-all'

export const addBtnClass =
  'inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest px-4 py-2.5 border border-black/15 rounded-lg hover:bg-white hover:border-black/30 transition-all'

export const Loader = ({ text }) => (
  <div className="min-h-screen bg-[#f0f0ef] flex items-center justify-center">
    <div className="text-[#06b6d4] text-sm font-mono tracking-[0.25em] uppercase animate-pulse">
      {text}
    </div>
  </div>
)

export const Field = ({ label, hint, children }) => (
  <div>
    <label className="block text-[10px] font-mono uppercase tracking-[0.2em] text-gray-600 mb-2">
      {label}
    </label>
    {children}
    {hint && <p className="text-[10px] text-gray-400 mt-1 font-mono">{hint}</p>}
  </div>
)

/* Kept for compatibility with other pages that import it */
export const ItemCard = ({ index, onRemove, children }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
    className="bg-white border border-black/10 rounded-2xl p-5 relative flex flex-col"
  >
    <div className="flex items-center justify-between mb-4">
      <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-gray-400">
        #{index + 1}
      </span>
      <button
        onClick={onRemove}
        className="shrink-0 p-1.5 border border-red-200 bg-red-50 text-red-600 rounded-md hover:bg-red-100 transition-colors"
      >
        <Trash2 className="w-3.5 h-3.5" />
      </button>
    </div>
    <div className="space-y-3">{children}</div>
  </motion.div>
)

export const AdminPageShell = ({
  icon: Icon,
  label,
  title,
  desc,
  success,
  error,
  children,
}) => (
  <section className="min-h-screen bg-[#f0f0ef] text-[#111] pt-6 pb-16 px-6 lg:px-10">
    <div className="w-full max-w-[1600px]">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-8"
      >
        <h1 className="font-display text-2xl md:text-3xl font-bold tracking-tight leading-tight">
          {title}
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
        {desc && (
          <p className="text-sm text-gray-600 leading-relaxed mt-3 font-light">
            {desc}
          </p>
        )}
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

      {children}
    </div>
  </section>
)

export const SaveBar = ({ onSave, saving, success }) => (
  <div className="flex justify-end pt-8 mt-8 border-t border-black/10">
    <button
      onClick={onSave}
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
)

export default EducationEditor