// src/pages/admin/Certifications.jsx
import { useState, useEffect } from 'react'
import { Plus, Award } from 'lucide-react'
import { supabase } from '../../lib/supabaseClient'
import { useAchievements } from '../../lib/hooks'
import {
  AdminPageShell,
  SaveBar,
  ItemCard,
  Field,
  inputClass,
  addBtnClass,
  Loader,
} from './Education'
import ImageUpload from '../../components/ImageUpload'
import ConfirmModal from '../../components/ConfirmModal'

const CertificationsEditor = () => {
  const { data: achievements, loading } = useAchievements()
  const [items, setItems] = useState([])
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const [deleteTarget, setDeleteTarget] = useState(null)

  useEffect(() => {
    if (achievements) setItems(achievements.map((a) => ({ ...a })))
  }, [achievements])

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
        title: '',
        issuer: '',
        date_earned: '',
        description: '',
        image_url: '',
        credential_url: '',
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
        .from('achievements')
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
    try {
      for (let i = 0; i < items.length; i++) {
        const item = items[i]
        const payload = {
          title: item.title,
          issuer: item.issuer,
          date_earned: item.date_earned || null,
          description: item.description,
          image_url: item.image_url,
          credential_url: item.credential_url || null,
          display_order: i + 1,
        }
        if (item._isNew) {
          const { error } = await supabase.from('achievements').insert(payload)
          if (error) throw error
        } else {
          const { error } = await supabase
            .from('achievements')
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

  if (loading) return <Loader text="Loading certifications..." />

  return (
    <>
      <AdminPageShell
        backTo="/admin"
        icon={Award}
        label="// Admin · Certifications"
        title="Certifications Editor"
        desc="Manage your certificates and achievements. Upload a certificate image or paste a URL."
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
                <Field label="Title">
                  <input
                    className={inputClass}
                    value={item.title}
                    onChange={(e) => updateField(i, 'title', e.target.value)}
                    placeholder="CCNAv7: Introduction to Networks"
                  />
                </Field>
                <Field label="Issuer">
                  <input
                    className={inputClass}
                    value={item.issuer || ''}
                    onChange={(e) => updateField(i, 'issuer', e.target.value)}
                    placeholder="Cisco"
                  />
                </Field>
                <Field label="Date Earned">
                  <input
                    type="date"
                    className={inputClass}
                    value={item.date_earned || ''}
                    onChange={(e) =>
                      updateField(i, 'date_earned', e.target.value)
                    }
                  />
                </Field>
                <Field label="Credential URL (optional)">
                  <input
                    className={inputClass}
                    value={item.credential_url || ''}
                    onChange={(e) =>
                      updateField(i, 'credential_url', e.target.value)
                    }
                    placeholder="https://credly.com/..."
                  />
                </Field>
              </div>

              <Field label="Description">
                <textarea
                  className={inputClass}
                  rows={2}
                  value={item.description || ''}
                  onChange={(e) =>
                    updateField(i, 'description', e.target.value)
                  }
                  placeholder="Developed foundational knowledge of networking..."
                />
              </Field>

              <ImageUpload
                label="Certificate Image"
                value={item.image_url || ''}
                onChange={(url) => updateField(i, 'image_url', url)}
              />
            </ItemCard>
          ))}

          <button onClick={addItem} className={addBtnClass}>
            <Plus className="w-3.5 h-3.5" />
            Add Certification
          </button>
        </div>

        <SaveBar onSave={handleSave} saving={saving} success={success} />
      </AdminPageShell>

      <ConfirmModal
        isOpen={!!deleteTarget}
        title="Delete this certification?"
        message={`"${deleteTarget?.item?.title || 'This certification'}" will be permanently removed.`}
        confirmText="Delete"
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </>
  )
}

export default CertificationsEditor