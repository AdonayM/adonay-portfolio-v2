// src/pages/admin/Files.jsx
import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Upload,
  FileText,
  Download,
  Trash2,
  FileArchive,
  AlertCircle,
  Check,
  FolderOpen,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { supabase } from '../../lib/supabaseClient'
import { useAdminFiles } from '../../lib/hooks'
import ConfirmModal from '../../components/ConfirmModal'

const BUCKET = 'admin-documents'

const FilesManager = () => {
  const { data: files, loading } = useAdminFiles()
  const [uploading, setUploading] = useState(false)
  const [uploadName, setUploadName] = useState('')
  const [uploadDescription, setUploadDescription] = useState('')
  const [uploadType, setUploadType] = useState('cv')
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [downloading, setDownloading] = useState(null)

  const resetForm = () => {
    setUploadName('')
    setUploadDescription('')
    setUploadType('cv')
  }

  const handleUpload = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (file.size > 20 * 1024 * 1024) {
      setError('File must be under 20MB.')
      return
    }

    setUploading(true)
    setError('')

    try {
      // Generate unique storage path
      const ext = file.name.split('.').pop()
      const baseName = file.name
        .replace(/\.[^.]+$/, '')
        .replace(/[^a-zA-Z0-9-_]/g, '-')
        .slice(0, 40)
      const fileName = `${Date.now()}-${baseName}.${ext}`

      // Upload to private bucket
      const { error: uploadError } = await supabase.storage
        .from(BUCKET)
        .upload(fileName, file, { cacheControl: '3600', upsert: false })

      if (uploadError) throw uploadError

      // Save metadata
      const { error: dbError } = await supabase.from('admin_files').insert({
        name: uploadName.trim() || file.name.replace(/\.[^.]+$/, ''),
        description: uploadDescription.trim() || null,
        file_path: fileName,
        file_type: uploadType,
        size_bytes: file.size,
      })

      if (dbError) throw dbError

      setSuccess(true)
      resetForm()
      setTimeout(() => {
        setSuccess(false)
        window.location.reload()
      }, 1200)
    } catch (err) {
      console.error('Upload error:', err)
      setError(err.message || 'Upload failed.')
    } finally {
      setUploading(false)
      e.target.value = ''
    }
  }

  const handleDownload = async (file) => {
    setDownloading(file.id)
    setError('')
    try {
      // Generate a signed URL valid for 60 seconds
      const { data, error } = await supabase.storage
        .from(BUCKET)
        .createSignedUrl(file.file_path, 60)

      if (error) throw error

      // Trigger browser download
      const link = document.createElement('a')
      link.href = data.signedUrl
      link.download = file.name
      link.target = '_blank'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (err) {
      setError(err.message || 'Download failed.')
    } finally {
      setDownloading(null)
    }
  }

  const confirmDelete = async () => {
    if (!deleteTarget) return
    const file = deleteTarget.file

    try {
      // Delete from storage
      const { error: storageError } = await supabase.storage
        .from(BUCKET)
        .remove([file.file_path])
      if (storageError) throw storageError

      // Delete from DB
      const { error: dbError } = await supabase
        .from('admin_files')
        .delete()
        .eq('id', file.id)
      if (dbError) throw dbError

      setDeleteTarget(null)
      window.location.reload()
    } catch (err) {
      setError(err.message)
      setDeleteTarget(null)
    }
  }

  const formatSize = (bytes) => {
    if (!bytes) return ''
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`
    return `${(bytes / 1024 / 1024).toFixed(1)} MB`
  }

  const formatDate = (dateStr) => {
    if (!dateStr) return ''
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  }

  const getFileTypeLabel = (type) => {
    switch (type) {
      case 'cv':
        return 'CV'
      case 'resume':
        return 'Resume'
      default:
        return 'Document'
    }
  }

  return (
    <>
      <section className="min-h-screen bg-[#f0f0ef] text-[#111] pt-16 pb-24 px-6 lg:px-12">
        <div className="max-w-[1000px] mx-auto">

          {/* Header */}
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
              <FolderOpen className="w-3 h-3" />
              Back to Dashboard
            </Link>

            <div className="flex items-center gap-2 flex-wrap mb-2">
              <div className="p-1 bg-white border border-black/10 rounded">
                <FileArchive
                  className="w-3.5 h-3.5 text-[#06b6d4]"
                  strokeWidth={1.75}
                />
              </div>
              <p className="text-[9px] font-mono uppercase tracking-[0.25em] text-gray-500">
                // Admin · Private Files
              </p>
            </div>

            <h1 className="font-display text-3xl md:text-4xl font-bold tracking-tight leading-tight">
              CV & Documents
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

            <p className="text-sm text-gray-600 leading-relaxed mt-4 font-light max-w-2xl">
              Private documents stored in a secure bucket. Not accessible to
              visitors — only you can download them from here.
            </p>
          </motion.div>

          {/* Success / Error */}
          {success && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 flex items-center gap-2 px-4 py-3 bg-green-50 border border-green-200 rounded-xl text-sm text-green-800"
            >
              <Check className="w-4 h-4" /> File uploaded successfully.
            </motion.div>
          )}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 flex items-center gap-2 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-800"
            >
              <AlertCircle className="w-4 h-4" /> {error}
            </motion.div>
          )}

          {/* Upload Section */}
          <div className="bg-white border border-black/10 rounded-2xl p-6 md:p-8 mb-6">
            <h2 className="font-display text-xl font-bold mb-6">
              Upload New File
            </h2>

            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-[10px] font-mono uppercase tracking-[0.2em] text-gray-600 mb-2">
                  File Name
                </label>
                <input
                  type="text"
                  value={uploadName}
                  onChange={(e) => setUploadName(e.target.value)}
                  placeholder="e.g. Adonay_Mussie_CV_2026"
                  className="w-full px-3.5 py-2.5 bg-white border border-black/10 rounded-lg text-sm text-[#111] focus:outline-none focus:border-[#06b6d4] focus:shadow-[0_0_0_3px_rgba(6,182,212,0.15)] transition-all"
                />
              </div>
              <div>
                <label className="block text-[10px] font-mono uppercase tracking-[0.2em] text-gray-600 mb-2">
                  Type
                </label>
                <select
                  value={uploadType}
                  onChange={(e) => setUploadType(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white border border-black/10 rounded-lg text-sm text-[#111] focus:outline-none focus:border-[#06b6d4] transition-all"
                >
                  <option value="cv">CV</option>
                  <option value="resume">Resume</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-[10px] font-mono uppercase tracking-[0.2em] text-gray-600 mb-2">
                Description (optional)
              </label>
              <input
                type="text"
                value={uploadDescription}
                onChange={(e) => setUploadDescription(e.target.value)}
                placeholder="e.g. Public version without phone number"
                className="w-full px-3.5 py-2.5 bg-white border border-black/10 rounded-lg text-sm text-[#111] focus:outline-none focus:border-[#06b6d4] focus:shadow-[0_0_0_3px_rgba(6,182,212,0.15)] transition-all"
              />
            </div>

            <label
              className={`flex flex-col items-center justify-center gap-2 px-4 py-10 bg-white border-2 border-dashed rounded-xl cursor-pointer transition-all ${
                uploading
                  ? 'border-[#06b6d4] bg-[#06b6d4]/5'
                  : 'border-black/20 hover:border-[#06b6d4] hover:bg-[#06b6d4]/5'
              }`}
            >
              {uploading ? (
                <>
                  <div className="w-6 h-6 rounded-full border-2 border-[#06b6d4] border-t-transparent animate-spin" />
                  <p className="text-[12px] font-mono text-gray-600">
                    Uploading...
                  </p>
                </>
              ) : (
                <>
                  <div className="w-10 h-10 rounded-full bg-[#06b6d4]/10 border border-[#06b6d4]/30 flex items-center justify-center">
                    <Upload className="w-4 h-4 text-[#06b6d4]" />
                  </div>
                  <p className="text-[12px] font-mono text-gray-700 font-medium">
                    Click to select a file
                  </p>
                  <p className="text-[10px] font-mono text-gray-400">
                    PDF, DOCX, DOC · max 20MB
                  </p>
                </>
              )}
              <input
                type="file"
                accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                onChange={handleUpload}
                disabled={uploading}
                className="hidden"
              />
            </label>
          </div>

          {/* Files List */}
          <div className="bg-white border border-black/10 rounded-2xl p-6 md:p-8">
            <h2 className="font-display text-xl font-bold mb-6">
              Your Documents ({files?.length || 0})
            </h2>

            {loading ? (
              <p className="text-sm font-mono text-gray-500">Loading...</p>
            ) : !files || files.length === 0 ? (
              <div className="text-center py-12 border border-dashed border-black/20 rounded-xl">
                <FileText className="w-8 h-8 text-gray-300 mx-auto mb-3" />
                <p className="text-sm font-mono text-gray-500">
                  No documents uploaded yet
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {files.map((file) => (
                  <motion.div
                    key={file.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-4 p-4 border border-black/10 rounded-xl hover:border-black/30 hover:shadow-[0_10px_30px_-15px_rgba(0,0,0,0.2)] transition-all"
                  >
                    <div className="w-11 h-11 rounded-lg bg-[#06b6d4]/10 border border-[#06b6d4]/30 flex items-center justify-center shrink-0">
                      <FileText
                        className="w-5 h-5 text-[#06b6d4]"
                        strokeWidth={1.75}
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-0.5">
                        <p className="font-bold text-[14px] text-[#111] truncate">
                          {file.name}
                        </p>
                        <span className="text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-[#f0f0ef] text-gray-600 shrink-0">
                          {getFileTypeLabel(file.file_type)}
                        </span>
                      </div>
                      {file.description && (
                        <p className="text-[12px] text-gray-600 truncate mb-0.5">
                          {file.description}
                        </p>
                      )}
                      <p className="text-[10px] font-mono text-gray-400">
                        {formatSize(file.size_bytes)} ·{' '}
                        {formatDate(file.uploaded_at)}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => handleDownload(file)}
                        disabled={downloading === file.id}
                        className="inline-flex items-center gap-1.5 px-3 py-2 text-[10px] font-mono uppercase tracking-widest bg-[#111] text-[#f0f0ef] rounded-lg hover:bg-gray-800 transition-all disabled:opacity-60"
                      >
                        <Download className="w-3 h-3" />
                        {downloading === file.id ? 'Preparing...' : 'Download'}
                      </button>
                      <button
                        onClick={() => setDeleteTarget({ file })}
                        className="p-2 border border-red-200 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                        title="Delete file"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <ConfirmModal
        isOpen={!!deleteTarget}
        title="Delete this file?"
        message={`"${deleteTarget?.file?.name || 'This file'}" will be permanently removed from storage.`}
        confirmText="Delete"
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </>
  )
}

export default FilesManager