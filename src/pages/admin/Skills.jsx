// src/pages/admin/Skills.jsx
import { useState, useEffect } from 'react'
import { Plus, Wrench } from 'lucide-react'
import { supabase } from '../../lib/supabaseClient'
import { useSkills } from '../../lib/hooks'
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

const SKILL_ICONS = ['shield', 'globe', 'code', 'factory', 'file-text', 'award', 'briefcase']

const SkillsEditor = () => {
  const { data: skills, loading } = useSkills()
  const [items, setItems] = useState([])
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const [deleteTarget, setDeleteTarget] = useState(null)

  useEffect(() => {
    if (skills) setItems(skills.map((s) => ({ ...s })))
  }, [skills])

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
        name: '',
        level: 'Intermediate',
        color: '#06b6d4',
        icon_name: 'shield',
        hover_description: '',
        display_order: prev.length + 1,
        _isNew: true,
      },
    ])
  }

  const confirmDelete = async () => {
    if (!deleteTarget) return
    const { item, index } = deleteTarget
    if (!item._isNew && item.id) {
      const { error } = await supabase.from('skills').delete().eq('id', item.id)
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
    try {
      for (let i = 0; i < items.length; i++) {
        const item = items[i]
        const payload = {
          name: item.name,
          level: item.level,
          color: item.color,
          icon_name: item.icon_name,
          hover_description: item.hover_description,
          display_order: i + 1,
        }
        if (item._isNew) {
          const { error } = await supabase.from('skills').insert(payload)
          if (error) throw error
        } else {
          const { error } = await supabase
            .from('skills')
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

  if (loading) return <Loader text="Loading skills..." />

  return (
    <>
      <AdminPageShell
        backTo="/admin"
        icon={Wrench}
        label="// Admin · Skills"
        title="Skills Editor"
        desc="Add or remove skills. Hover description shows when a visitor hovers a skill on the About page."
        success={success}
        error={error}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
          {items.map((item, i) => (
            <ItemCard
              key={item.id || i}
              index={i}
              onRemove={() => setDeleteTarget({ item, index: i })}
            >
              <div className="grid md:grid-cols-2 gap-4">
                <Field label="Skill Name">
                  <input
                    className={inputClass}
                    value={item.name}
                    onChange={(e) => updateField(i, 'name', e.target.value)}
                    placeholder="Penetration Testing"
                  />
                </Field>
                <Field label="Level">
                  <select
                    className={inputClass}
                    value={item.level}
                    onChange={(e) => updateField(i, 'level', e.target.value)}
                  >
                    <option>Beginner</option>
                    <option>Intermediate</option>
                    <option>Advanced</option>
                    <option>Expert</option>
                  </select>
                </Field>
                <Field label="Icon">
                  <select
                    className={inputClass}
                    value={item.icon_name}
                    onChange={(e) =>
                      updateField(i, 'icon_name', e.target.value)
                    }
                  >
                    {SKILL_ICONS.map((ic) => (
                      <option key={ic} value={ic}>
                        {ic}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label="Accent Color (hex)">
                  <input
                    type="text"
                    className={inputClass}
                    value={item.color}
                    onChange={(e) => updateField(i, 'color', e.target.value)}
                    placeholder="#06b6d4"
                  />
                </Field>
              </div>
              <Field label="Hover Description">
                <textarea
                  className={inputClass}
                  rows={2}
                  value={item.hover_description || ''}
                  onChange={(e) =>
                    updateField(i, 'hover_description', e.target.value)
                  }
                  placeholder="More than 100 websites and APIs penetration tested."
                />
              </Field>
            </ItemCard>
          ))}

          <button onClick={addItem} className={addBtnClass}>
            <Plus className="w-3.5 h-3.5" />
            Add Skill
          </button>
        </div>

        <SaveBar onSave={handleSave} saving={saving} success={success} />
      </AdminPageShell>

      <ConfirmModal
        isOpen={!!deleteTarget}
        title="Delete this skill?"
        message={`"${deleteTarget?.item?.name || 'This skill'}" will be permanently removed.`}
        confirmText="Delete"
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </>
  )
}

export default SkillsEditor