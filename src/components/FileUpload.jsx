// src/components/FileUpload.jsx
import { useState } from 'react'
import { Upload, X, Loader2, FileText, ExternalLink } from 'lucide-react'
import { supabase } from '../lib/supabaseClient'

const BUCKET = 'portfolio-images'

/**
 * Reusable file upload (PDFs, docs, etc.) with Supabase Storage.
 */
const FileUpload = ({
  value,
  onChange,
  label = 'File',
  accept = 'application/pdf',
  maxSize = 10,
  hint = 'PDF · max 10MB',
}) => {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')

  const handleUpload = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (file.size > maxSize * 1024 * 1024) {
      setError(`File must be under ${maxSize}MB.`)
      return
    }

    setUploading(true)
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

      onChange(urlData.publicUrl)
    } catch (err) {
      console.error('Upload error:', err)
      setError(err.message || 'Upload failed.')
    } finally {
      setUploading(false)
      e.target.value = ''
    }
  }

  const getFileName = (url) => {
    if (!url) return ''
    try {
      const parts = url.split('/')
      return decodeURIComponent(parts[parts.length - 1]).replace(/^\d+-/, '')
    } catch {
      return 'file'
    }
  }

  return (
    <div>
      <label className="block text-[10px] font-mono uppercase tracking-[0.2em] text-gray-600 mb-2">
        {label}
      </label>

      {value ? (
        <div className="flex items-center gap-3 bg-white border border-black/10 rounded-xl p-3 group">
          <div className="w-10 h-10 rounded-lg bg-[#06b6d4]/10 border border-[#06b6d4]/30 flex items-center justify-center shrink-0">
            <FileText className="w-5 h-5 text-[#06b6d4]" strokeWidth={1.75} />
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-[12px] font-mono text-[#111] truncate">
              {getFileName(value)}
            </p>
            <a
              href={value}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-[10px] font-mono text-[#06b6d4] hover:underline mt-0.5"
            >
              Open file
              <ExternalLink className="w-2.5 h-2.5" />
            </a>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            <label className="px-3 py-1.5 text-[10px] font-mono uppercase tracking-widest border border-black/15 rounded-lg cursor-pointer hover:bg-[#f0f0ef] transition-colors">
              Replace
              <input
                type="file"
                accept={accept}
                onChange={handleUpload}
                className="hidden"
              />
            </label>
            <button
              type="button"
              onClick={() => onChange('')}
              className="p-2 border border-red-200 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
              title="Remove file"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      ) : (
        <label
          className={`flex flex-col items-center justify-center gap-2 px-4 py-8 bg-white border-2 border-dashed rounded-xl cursor-pointer transition-all ${
            uploading
              ? 'border-[#06b6d4] bg-[#06b6d4]/5'
              : 'border-black/20 hover:border-[#06b6d4] hover:bg-[#06b6d4]/5'
          }`}
        >
          {uploading ? (
            <>
              <Loader2 className="w-6 h-6 text-[#06b6d4] animate-spin" />
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
                Click to upload a file
              </p>
              <p className="text-[10px] font-mono text-gray-400">{hint}</p>
            </>
          )}
          <input
            type="file"
            accept={accept}
            onChange={handleUpload}
            disabled={uploading}
            className="hidden"
          />
        </label>
      )}

      {error && (
        <p className="text-[11px] text-red-600 font-mono mt-1">{error}</p>
      )}
    </div>
  )
}

export default FileUpload