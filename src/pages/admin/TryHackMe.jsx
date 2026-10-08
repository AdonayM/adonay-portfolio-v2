// src/pages/admin/TryHackMe.jsx
import { useState, useEffect } from 'react'
import { Plus, Target, Save, Check } from 'lucide-react'
import { supabase } from '../../lib/supabaseClient'
import { useThmStats, useThmBadges } from '../../lib/hooks'
import {
  AdminPageShell,
  ItemCard,
  Field,
  inputClass,
  addBtnClass,
  Loader,
} from './Education'
import ConfirmModal from '../../components/ConfirmModal'

const TryHackMeEditor = () => {
  const { data: statsData, loading: loadingStats } = useThmStats()
  const { data: badgesData, loading: loadingBadges } = useThmBadges()

  const [stats, setStats] = useState({
    username: '',
    profile_url: '',
    rank_value: 0,
    percentile: '',
    rooms_completed: 0,
    badges_count: 0,
    streak_days: 0,
  })
  const [badges, setBadges] = useState([])
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const [deleteTarget, setDeleteTarget] = useState(null)

  useEffect(() => {
    if (statsData) setStats({ ...statsData })
  }, [statsData])

  useEffect(() => {
    if (badgesData) setBadges(badgesData.map((b) => ({ ...b })))
  }, [badgesData])

  const updateStats = (field, value) => {
    setStats((prev) => ({ ...prev, [field]: value }))
    setSuccess(false)
  }

  const updateBadge = (i, field, value) => {
    setBadges((prev) => {
      const next = [...prev]
      next[i] = { ...next[i], [field]: value }
      return next
    })
    setSuccess(false)
  }

  const addBadge = () => {
    setBadges((prev) => [
      ...prev,
      {
        id: `new-${Date.now()}`,
        name: '',
        description: '',
        rarity: '',
        color: '#06b6d4',
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
        .from('thm_badges')
        .delete()
        .eq('id', item.id)
      if (error) {
        setError(error.message)
        setDeleteTarget(null)
        return
      }
    }
    setBadges((prev) => prev.filter((_, i) => i !== index))
    setDeleteTarget(null)
  }

  const handleSave = async () => {
    setSaving(true)
    setError('')
    try {
      const { error: statsError } = await supabase
        .from('thm_stats')
        .update({
          username: stats.username,
          profile_url: stats.profile_url,
          rank_value: Number(stats.rank_value) || 0,
          percentile: stats.percentile,
          rooms_completed: Number(stats.rooms_completed) || 0,
          badges_count: Number(stats.badges_count) || 0,
          streak_days: Number(stats.streak_days) || 0,
          updated_at: new Date().toISOString(),
        })
        .eq('id', 1)
      if (statsError) throw statsError

      for (let i = 0; i < badges.length; i++) {
        const item = badges[i]
        const payload = {
          name: item.name,
          description: item.description,
          rarity: item.rarity,
          color: item.color,
          display_order: i + 1,
        }
        if (item._isNew) {
          const { error } = await supabase.from('thm_badges').insert(payload)
          if (error) throw error
        } else {
          const { error } = await supabase
            .from('thm_badges')
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

  if (loadingStats || loadingBadges) {
    return <Loader text="Loading TryHackMe data..." />
  }

  return (
    <>
      <AdminPageShell
        backTo="/admin"
        icon={Target}
        label="// Admin · TryHackMe"
        title="TryHackMe Editor"
        desc="Manage your stats and badge collection. Stats appear on the TryHackMe project page."
        success={success}
        error={error}
      >
        {/* Stats */}
        <div className="bg-white border border-black/10 rounded-2xl p-6 md:p-8 mb-6">
          <h2 className="font-display text-xl font-bold mb-6">Stats</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <Field label="Username">
              <input
                className={inputClass}
                value={stats.username}
                onChange={(e) => updateStats('username', e.target.value)}
              />
            </Field>
            <Field label="Profile URL">
              <input
                className={inputClass}
                value={stats.profile_url}
                onChange={(e) => updateStats('profile_url', e.target.value)}
              />
            </Field>
            <Field label="Rank (number)">
              <input
                type="number"
                className={inputClass}
                value={stats.rank_value}
                onChange={(e) => updateStats('rank_value', e.target.value)}
              />
            </Field>
            <Field label="Percentile">
              <input
                className={inputClass}
                value={stats.percentile}
                onChange={(e) => updateStats('percentile', e.target.value)}
                placeholder="Top 1%"
              />
            </Field>
            <Field label="Rooms Completed">
              <input
                type="number"
                className={inputClass}
                value={stats.rooms_completed}
                onChange={(e) =>
                  updateStats('rooms_completed', e.target.value)
                }
              />
            </Field>
            <Field label="Badges Count">
              <input
                type="number"
                className={inputClass}
                value={stats.badges_count}
                onChange={(e) => updateStats('badges_count', e.target.value)}
              />
            </Field>
            <Field label="Streak (days)">
              <input
                type="number"
                className={inputClass}
                value={stats.streak_days}
                onChange={(e) => updateStats('streak_days', e.target.value)}
              />
            </Field>
          </div>
        </div>

        {/* Badges */}
        <div className="mb-6">
          <h2 className="font-display text-xl font-bold mb-4">
            Badges ({badges.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {badges.map((item, i) => (
              <ItemCard
                key={item.id || i}
                index={i}
                onRemove={() => setDeleteTarget({ item, index: i })}
              >
                <div className="grid md:grid-cols-2 gap-4">
                  <Field label="Badge Name">
                    <input
                      className={inputClass}
                      value={item.name}
                      onChange={(e) => updateBadge(i, 'name', e.target.value)}
                    />
                  </Field>
                  <Field label="Rarity (e.g. Rare: 4.6%)">
                    <input
                      className={inputClass}
                      value={item.rarity || ''}
                      onChange={(e) =>
                        updateBadge(i, 'rarity', e.target.value)
                      }
                    />
                  </Field>
                </div>
                <Field label="Description">
                  <textarea
                    className={inputClass}
                    rows={2}
                    value={item.description || ''}
                    onChange={(e) =>
                      updateBadge(i, 'description', e.target.value)
                    }
                  />
                </Field>
                <Field label="Color (hex)">
                  <input
                    className={inputClass}
                    value={item.color}
                    onChange={(e) => updateBadge(i, 'color', e.target.value)}
                    placeholder="#06b6d4"
                  />
                </Field>
              </ItemCard>
            ))}

            <button onClick={addBadge} className={addBtnClass}>
              <Plus className="w-3.5 h-3.5" />
              Add Badge
            </button>
          </div>
        </div>

        {/* Save */}
        <div className="flex justify-end pt-6 mt-6 border-t border-black/10">
          <button
            onClick={handleSave}
            disabled={saving}
            className="group relative inline-flex items-center gap-2 px-6 py-3.5 text-[#f0f0ef] text-[11px] font-mono uppercase tracking-widest rounded-xl transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-60"
            style={{
              background: 'linear-gradient(180deg, #1a1a1a 0%, #0a0a0a 100%)',
            }}
          >
            {success ? (
              <>
                <Check className="w-3.5 h-3.5" /> Saved
              </>
            ) : (
              <>
                <Save className="w-3.5 h-3.5" />{' '}
                {saving ? 'Saving...' : 'Save All'}
              </>
            )}
          </button>
        </div>
      </AdminPageShell>

      <ConfirmModal
        isOpen={!!deleteTarget}
        title="Delete this badge?"
        message={`"${deleteTarget?.item?.name || 'This badge'}" will be permanently removed.`}
        confirmText="Delete"
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </>
  )
}

export default TryHackMeEditor