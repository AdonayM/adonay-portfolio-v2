// src/pages/admin/Projects.jsx
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Plus,
  Trash2,
  Save,
  Check,
  AlertCircle,
  ChevronDown,
} from 'lucide-react'
import { supabase } from '../../lib/supabaseClient'
import { useProjects } from '../../lib/hooks'
import { inputClass, addBtnClass, Loader, Field } from './Education'
import ImageUpload from '../../components/ImageUpload'
import ConfirmModal from '../../components/ConfirmModal'

const KINDS = ['security', 'web', 'mobile', 'award']

const ProjectsEditor = () => {
  const { data: projectsData, loading } = useProjects()
  const [projects, setProjects] = useState([])
  const [details, setDetails] = useState({})
  const [selected, setSelected] = useState(null)
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  /* Load projects + auto-select first one */
  useEffect(() => {
    if (projectsData && projectsData.length > 0) {
      const mapped = projectsData.map((p) => ({ ...p }))
      setProjects(mapped)
      if (!selected) setSelected(mapped[0])
    }
  }, [projectsData])

  /* Load details for the selected project */
  useEffect(() => {
    if (!selected) return
    if (details[selected.slug]) return

    const fetch = async () => {
      const { data } = await supabase
        .from('project_details')
        .select('*')
        .eq('project_slug', selected.slug)
        .maybeSingle()

      setDetails((prev) => ({
        ...prev,
        [selected.slug]: data || {
          project_slug: selected.slug,
          tagline: '',
          intro: '',
          challenge: '',
          build: '',
          highlights: [],
          takeaway: '',
          specs: [],
          screenshots: [],
          video_url: '',
          framework: [],
          key_features: [],
          tech_stack_detail: [],
        },
      }))
    }
    fetch()
  }, [selected, details])

  const updateProject = (field, value) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === selected.id ? { ...p, [field]: value } : p))
    )
    setSelected((prev) => ({ ...prev, [field]: value }))
    setSuccess(false)
  }

  const updateDetail = (field, value) => {
    setDetails((prev) => ({
      ...prev,
      [selected.slug]: { ...prev[selected.slug], [field]: value },
    }))
    setSuccess(false)
  }

  const addProject = () => {
    const newProject = {
      id: `new-${Date.now()}`,
      slug: '',
      title: '',
      subtitle: '',
      category: '',
      kind: 'web',
      description: '',
      tech_stack: [],
      accent: '#06b6d4',
      image_url: '',
      github_url: '',
      live_url: '',
      display_order: projects.length + 1,
      _isNew: true,
    }
    setProjects((prev) => [...prev, newProject])
    setSelected(newProject)
  }

  const confirmDeleteProject = async () => {
    if (!selected) return

    if (!selected._isNew) {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', selected.id)
      if (error) {
        setError(error.message)
        setShowDeleteModal(false)
        return
      }
    }
    const remaining = projects.filter((p) => p.id !== selected.id)
    setProjects(remaining)
    setSelected(remaining[0] || null)
    setShowDeleteModal(false)
  }

  const handleSave = async () => {
    if (!selected) return
    setSaving(true)
    setError('')

    try {
      const projectPayload = {
        slug: selected.slug,
        title: selected.title,
        subtitle: selected.subtitle,
        category: selected.category,
        kind: selected.kind,
        description: selected.description,
        tech_stack: selected.tech_stack || [],
        accent: selected.accent,
        image_url: selected.image_url,
        github_url: selected.github_url,
        live_url: selected.live_url,
        display_order: selected.display_order,
      }

      if (selected._isNew) {
        const { error } = await supabase
          .from('projects')
          .insert(projectPayload)
        if (error) throw error
      } else {
        const { error } = await supabase
          .from('projects')
          .update(projectPayload)
          .eq('id', selected.id)
        if (error) throw error
      }

      const d = details[selected.slug] || {}
      const detailsPayload = {
        project_slug: selected.slug,
        tagline: d.tagline || '',
        intro: d.intro || '',
        challenge: d.challenge || '',
        build: d.build || '',
        highlights: d.highlights || [],
        takeaway: d.takeaway || '',
        specs: d.specs || [],
        screenshots: d.screenshots || [],
        video_url: d.video_url || '',
        framework: d.framework || [],
        key_features: d.key_features || [],
        tech_stack_detail: d.tech_stack_detail || [],
        updated_at: new Date().toISOString(),
      }

      const { error: detailsError } = await supabase
        .from('project_details')
        .upsert(detailsPayload, { onConflict: 'project_slug' })
      if (detailsError) throw detailsError

      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <Loader text="Loading projects..." />

  return (
    <>
      <section className="min-h-screen bg-[#f0f0ef] text-[#111] pt-6 pb-16 px-4 lg:px-6">
        <div className="w-full">

          {/* HEADER — compact */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-5"
          >
            <h1 className="font-display text-2xl md:text-3xl font-bold tracking-tight leading-tight">
              Projects Editor
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
          </motion.div>

          {success && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 flex items-center gap-2 px-4 py-3 bg-green-50 border border-green-200 rounded-xl text-sm text-green-800"
            >
              <Check className="w-4 h-4" />
              Changes saved successfully.
            </motion.div>
          )}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 flex items-center gap-2 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-800"
            >
              <AlertCircle className="w-4 h-4" />
              {error}
            </motion.div>
          )}

          {/* MAIN LAYOUT — full width list + editor */}
          <div className="grid grid-cols-12 gap-4">

            {/* LEFT: Project list */}
            <div className="col-span-12 md:col-span-5 lg:col-span-4 space-y-2">
              {projects.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setSelected(p)}
                  className={`w-full text-left px-4 py-3 rounded-xl border transition-all ${
                    selected?.id === p.id
                      ? 'bg-white border-[#06b6d4] shadow-[0_0_0_3px_rgba(6,182,212,0.15)]'
                      : 'bg-white/60 border-black/10 hover:border-black/30 hover:bg-white'
                  }`}
                >
                  <p className="font-display text-[15px] font-bold text-[#111] truncate">
                    {p.title || 'Untitled'}
                  </p>
                  <p className="text-[11px] font-mono text-gray-500 truncate">
                    {p.slug || '(no slug)'}
                  </p>
                </button>
              ))}

              <button
                onClick={addProject}
                className={addBtnClass + ' w-full justify-center'}
              >
                <Plus className="w-3.5 h-3.5" /> Add Project
              </button>
            </div>

            {/* RIGHT: Editor */}
            <div className="col-span-12 md:col-span-7 lg:col-span-8">
              {selected ? (
                <motion.div
                  key={selected.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  {/* Grid Card section */}
                  <div className="bg-white border border-black/10 rounded-2xl p-5 md:p-6">
                    <div className="flex items-start justify-between mb-5">
                      <h2 className="font-display text-lg font-bold">
                        Grid Card
                      </h2>
                      <button
                        onClick={() => setShowDeleteModal(true)}
                        className="shrink-0 p-2 border border-red-200 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                        title="Delete Project"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Field label="Slug (URL)">
                        <input
                          className={inputClass}
                          value={selected.slug}
                          onChange={(e) =>
                            updateProject('slug', e.target.value)
                          }
                          placeholder="n4yctf"
                        />
                      </Field>
                      <Field label="Title">
                        <input
                          className={inputClass}
                          value={selected.title}
                          onChange={(e) =>
                            updateProject('title', e.target.value)
                          }
                          placeholder="N4yCTF"
                        />
                      </Field>
                      <Field label="Subtitle">
                        <input
                          className={inputClass}
                          value={selected.subtitle || ''}
                          onChange={(e) =>
                            updateProject('subtitle', e.target.value)
                          }
                          placeholder="TOCTOU Race Condition"
                        />
                      </Field>
                      <Field label="Category">
                        <input
                          className={inputClass}
                          value={selected.category || ''}
                          onChange={(e) =>
                            updateProject('category', e.target.value)
                          }
                          placeholder="Security Tool"
                        />
                      </Field>
                      <Field label="Kind (icon)">
                        <select
                          className={inputClass}
                          value={selected.kind}
                          onChange={(e) =>
                            updateProject('kind', e.target.value)
                          }
                        >
                          {KINDS.map((k) => (
                            <option key={k} value={k}>
                              {k}
                            </option>
                          ))}
                        </select>
                      </Field>
                      <Field label="Accent Color">
                        <input
                          className={inputClass}
                          value={selected.accent}
                          onChange={(e) =>
                            updateProject('accent', e.target.value)
                          }
                          placeholder="#06b6d4"
                        />
                      </Field>
                    </div>

                    <div className="mt-4">
                      <Field label="Description">
                        <textarea
                          className={inputClass}
                          rows={2}
                          value={selected.description || ''}
                          onChange={(e) =>
                            updateProject('description', e.target.value)
                          }
                        />
                      </Field>
                    </div>

                    <div className="mt-4">
                      <Field label="Tech Stack (comma-separated)">
                        <input
                          className={inputClass}
                          value={(selected.tech_stack || []).join(', ')}
                          onChange={(e) =>
                            updateProject(
                              'tech_stack',
                              e.target.value
                                .split(',')
                                .map((s) => s.trim())
                                .filter(Boolean)
                            )
                          }
                          placeholder="React 18, TypeScript, Node"
                        />
                      </Field>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      <Field label="GitHub URL">
                        <input
                          className={inputClass}
                          value={selected.github_url || ''}
                          onChange={(e) =>
                            updateProject('github_url', e.target.value)
                          }
                        />
                      </Field>
                      <Field label="Live URL">
                        <input
                          className={inputClass}
                          value={selected.live_url || ''}
                          onChange={(e) =>
                            updateProject('live_url', e.target.value)
                          }
                        />
                      </Field>
                    </div>

                    <div className="mt-4">
                      <ImageUpload
                        label="Project Grid Image (thumbnail)"
                        value={selected.image_url || ''}
                        onChange={(url) => updateProject('image_url', url)}
                      />
                    </div>
                  </div>

                  {/* Case study section */}
                  <div className="bg-white border border-black/10 rounded-2xl p-5 md:p-6">
                    <details className="group">
                      <summary className="flex items-center justify-between cursor-pointer list-none">
                        <h2 className="font-display text-lg font-bold">
                          Case Study Details
                        </h2>
                        <ChevronDown className="w-4 h-4 text-gray-400 group-open:rotate-180 transition-transform" />
                      </summary>

                      <div className="space-y-4 mt-5">
                        <Field label="Tagline">
                          <textarea
                            className={inputClass}
                            rows={2}
                            value={details[selected.slug]?.tagline || ''}
                            onChange={(e) =>
                              updateDetail('tagline', e.target.value)
                            }
                          />
                        </Field>

                        <Field label="Intro">
                          <textarea
                            className={inputClass}
                            rows={3}
                            value={details[selected.slug]?.intro || ''}
                            onChange={(e) =>
                              updateDetail('intro', e.target.value)
                            }
                          />
                        </Field>

                        <Field label="Challenge (pull-quote)">
                          <textarea
                            className={inputClass}
                            rows={3}
                            value={details[selected.slug]?.challenge || ''}
                            onChange={(e) =>
                              updateDetail('challenge', e.target.value)
                            }
                          />
                        </Field>

                        <Field label="Build">
                          <textarea
                            className={inputClass}
                            rows={3}
                            value={details[selected.slug]?.build || ''}
                            onChange={(e) =>
                              updateDetail('build', e.target.value)
                            }
                          />
                        </Field>

                        <Field label="Highlights (one per line)">
                          <textarea
                            className={inputClass}
                            rows={4}
                            value={(
                              details[selected.slug]?.highlights || []
                            ).join('\n')}
                            onChange={(e) =>
                              updateDetail(
                                'highlights',
                                e.target.value.split('\n').filter(Boolean)
                              )
                            }
                          />
                        </Field>

                        <Field label="Takeaway">
                          <textarea
                            className={inputClass}
                            rows={2}
                            value={details[selected.slug]?.takeaway || ''}
                            onChange={(e) =>
                              updateDetail('takeaway', e.target.value)
                            }
                          />
                        </Field>

                        <Field label="Screenshots (one URL per line)">
                          <textarea
                            className={inputClass}
                            rows={3}
                            value={(
                              details[selected.slug]?.screenshots || []
                            ).join('\n')}
                            onChange={(e) =>
                              updateDetail(
                                'screenshots',
                                e.target.value.split('\n').filter(Boolean)
                              )
                            }
                            placeholder="/projects/n4yctf-1.png"
                          />
                        </Field>

                        <Field label="Video URL (optional)">
                          <input
                            className={inputClass}
                            value={details[selected.slug]?.video_url || ''}
                            onChange={(e) =>
                              updateDetail('video_url', e.target.value)
                            }
                            placeholder="/projects/expense-tracker-demo.mp4"
                          />
                        </Field>

                        <Field label="Specs (Label | Value, one per line)">
                          <textarea
                            className={inputClass}
                            rows={4}
                            value={(details[selected.slug]?.specs || [])
                              .map((s) => `${s.label} | ${s.value}`)
                              .join('\n')}
                            onChange={(e) => {
                              const specs = e.target.value
                                .split('\n')
                                .map((line) => {
                                  const [label, ...rest] = line.split('|')
                                  return {
                                    label: label?.trim(),
                                    value: rest.join('|').trim(),
                                  }
                                })
                                .filter((s) => s.label)
                              updateDetail('specs', specs)
                            }}
                          />
                        </Field>

                        <Field label="Framework (one per line)">
                          <textarea
                            className={inputClass}
                            rows={2}
                            value={(
                              details[selected.slug]?.framework || []
                            ).join('\n')}
                            onChange={(e) =>
                              updateDetail(
                                'framework',
                                e.target.value.split('\n').filter(Boolean)
                              )
                            }
                          />
                        </Field>

                        <Field label="Key Features (one per line)">
                          <textarea
                            className={inputClass}
                            rows={3}
                            value={(
                              details[selected.slug]?.key_features || []
                            ).join('\n')}
                            onChange={(e) =>
                              updateDetail(
                                'key_features',
                                e.target.value.split('\n').filter(Boolean)
                              )
                            }
                          />
                        </Field>

                        <Field label="Tech Stack Detail (one per line)">
                          <textarea
                            className={inputClass}
                            rows={3}
                            value={(
                              details[selected.slug]?.tech_stack_detail || []
                            ).join('\n')}
                            onChange={(e) =>
                              updateDetail(
                                'tech_stack_detail',
                                e.target.value.split('\n').filter(Boolean)
                              )
                            }
                          />
                        </Field>
                      </div>
                    </details>
                  </div>

                  {/* Save button */}
                  <div className="flex justify-end">
                    <button
                      onClick={handleSave}
                      disabled={saving}
                      className="group relative inline-flex items-center gap-2 px-6 py-3.5 text-[#f0f0ef] text-[11px] font-mono uppercase tracking-widest rounded-xl transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-60"
                      style={{
                        background:
                          'linear-gradient(180deg, #1a1a1a 0%, #0a0a0a 100%)',
                      }}
                    >
                      {success ? (
                        <>
                          <Check className="w-3.5 h-3.5" /> Saved
                        </>
                      ) : (
                        <>
                          <Save className="w-3.5 h-3.5" />{' '}
                          {saving ? 'Saving...' : 'Save Project'}
                        </>
                      )}
                    </button>
                  </div>
                </motion.div>
              ) : (
                <div className="flex items-center justify-center py-32 bg-white/50 border border-dashed border-black/20 rounded-2xl">
                  <p className="text-sm font-mono text-gray-500">
                    No projects yet — click "Add Project" to create one
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <ConfirmModal
        isOpen={showDeleteModal}
        title="Delete this project?"
        message={`"${selected?.title || 'This project'}" and all its case study details will be permanently removed.`}
        confirmText="Delete Project"
        onConfirm={confirmDeleteProject}
        onCancel={() => setShowDeleteModal(false)}
      />
    </>
  )
}

export default ProjectsEditor