// src/pages/admin/Experience.jsx
import { useState, useEffect } from 'react'
import { Plus, X, Briefcase } from 'lucide-react'
import { supabase } from '../../lib/supabaseClient'
import { useExperience } from '../../lib/hooks'
import {
  AdminPageShell,
  SaveBar,
  ItemCard,
  Field,
  inputClass,
  addBtnClass,
  Loader,
} from './Education'
import ConfirmModal from '../../components/ConfirmModal'

const ExperienceEditor = () => {
  const { data: experience, loading } = useExperience()
  const [items, setItems] = useState([])
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const [deleteTarget, setDeleteTarget] = useState(null)

  useEffect(() => {
    if (experience)
      setItems(
        experience.map((e) => ({
          ...e,
          highlights: e.highlights || [],
        }))
      )
  }, [experience])

  const updateField = (i, field, value) => {
    setItems((prev) => {
      const next = [...prev]
      next[i] = { ...next[i], [field]: value }
      return next
    })
    setSuccess(false)
  }

  const addItem = () => {
    setItems((prev) => [
      ...prev,
      {
        id: `new-${Date.now()}`,
        company: '',
        role: '',
        focus: '',
        period: '',
        location: '',
        description: '',
        highlights: [],
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
        .from('experience')
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

  const addHighlight = (i) => {
    setItems((prev) => {
      const next = [...prev]
      next[i] = { ...next[i], highlights: [...next[i].highlights, ''] }
      return next
    })
  }

  const updateHighlight = (itemIndex, hlIndex, value) => {
    setItems((prev) => {
      const next = [...prev]
      const highlights = [...next[itemIndex].highlights]
      highlights[hlIndex] = value
      next[itemIndex] = { ...next[itemIndex], highlights }
      return next
    })
    setSuccess(false)
  }

  const removeHighlight = (itemIndex, hlIndex) => {
    setItems((prev) => {
      const next = [...prev]
      next[itemIndex] = {
        ...next[itemIndex],
        highlights: next[itemIndex].highlights.filter(
          (_, i) => i !== hlIndex
        ),
      }
      return next
    })
  }

  const handleSave = async () => {
    setSaving(true)
    setError('')
    try {
      for (let i = 0; i < items.length; i++) {
        const item = items[i]
        const payload = {
          company: item.company,
          role: item.role,
          focus: item.focus,
          period: item.period,
          location: item.location,
          description: item.description,
          highlights: item.highlights,
          display_order: i + 1,
        }
        if (item._isNew) {
          const { error } = await supabase.from('experience').insert(payload)
          if (error) throw error
        } else {
          const { error } = await supabase
            .from('experience')
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

  if (loading) return <Loader text="Loading experience..." />

  return (
    <>
      <AdminPageShell
        backTo="/admin"
        icon={Briefcase}
        label="// Admin · Experience"
        title="Experience Editor"
        desc="Manage your work history. Each job can have a list of highlights."
        success={success}
        error={error}
      >
        <div className="space-y-4">
          {items.map((item, i) => (
            <ItemCard
              key={item.id || i}
              index={i}
              onRemove={() => setDeleteTarget({ item, index: i })}
            >
              <div className="grid md:grid-cols-2 gap-4">
                <Field label="Company">
                  <input
                    className={inputClass}
                    value={item.company}
                    onChange={(e) => updateField(i, 'company', e.target.value)}
                    placeholder="CBE IS Security"
                  />
                </Field>
                <Field label="Role">
                  <input
                    className={inputClass}
                    value={item.role}
                    onChange={(e) => updateField(i, 'role', e.target.value)}
                    placeholder="Vulnerability Assessment & Penetration Testing"
                  />
                </Field>
                <Field label="Focus">
                  <input
                    className={inputClass}
                    value={item.focus}
                    onChange={(e) => updateField(i, 'focus', e.target.value)}
                    placeholder="Application & DevSecOps Security"
                  />
                </Field>
                <Field label="Period">
                  <input
                    className={inputClass}
                    value={item.period}
                    onChange={(e) => updateField(i, 'period', e.target.value)}
                    placeholder="2024 – Present"
                  />
                </Field>
                <Field label="Location">
                  <input
                    className={inputClass}
                    value={item.location}
                    onChange={(e) => updateField(i, 'location', e.target.value)}
                    placeholder="Addis Ababa, Ethiopia"
                  />
                </Field>
              </div>

              <Field label="Description">
                <textarea
                  className={inputClass}
                  rows={3}
                  value={item.description}
                  onChange={(e) =>
                    updateField(i, 'description', e.target.value)
                  }
                  placeholder="Conducted vulnerability assessments..."
                />
              </Field>

              <div>
                <label className="block text-[10px] font-mono uppercase tracking-[0.2em] text-gray-600 mb-2">
                  Highlights
                </label>
                <div className="space-y-2">
                  {item.highlights.map((h, hi) => (
                    <div key={hi} className="flex gap-2">
                      <input
                        className={inputClass + ' flex-1'}
                        value={h}
                        onChange={(e) =>
                          updateHighlight(i, hi, e.target.value)
                        }
                        placeholder={`Highlight ${hi + 1}`}
                      />
                      <button
                        onClick={() => removeHighlight(i, hi)}
                        className="shrink-0 p-2 border border-red-200 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() => addHighlight(i)}
                    className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest px-3 py-2 border border-black/15 rounded-lg hover:bg-white hover:border-black/30 transition-all"
                  >
                    <Plus className="w-3 h-3" />
                    Add Highlight
                  </button>
                </div>
              </div>
            </ItemCard>
          ))}

          <button onClick={addItem} className={addBtnClass}>
            <Plus className="w-3.5 h-3.5" />
            Add Experience
          </button>
        </div>

        <SaveBar onSave={handleSave} saving={saving} success={success} />
      </AdminPageShell>

      <ConfirmModal
        isOpen={!!deleteTarget}
        title="Delete this job?"
        message={`"${deleteTarget?.item?.company || 'This entry'}" and all its highlights will be permanently removed.`}
        confirmText="Delete"
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </>
  )
}

export default ExperienceEditor