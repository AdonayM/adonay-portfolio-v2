// src/components/ImageUpload.jsx
import { useState } from 'react'
import { Upload, X, Loader2 } from 'lucide-react'
import { supabase } from '../lib/supabaseClient'

const BUCKET = 'portfolio-images'

/**
 * Reusable image upload component with Supabase Storage.
 * Shows a dropzone, uploads to the bucket, returns the public URL.
 */
const ImageUpload = ({ value, onChange, label = 'Image' }) => {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')

  const handleUpload = async (e) => {
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

  return (
    <div>
      <label className="block text-[10px] font-mono uppercase tracking-[0.2em] text-gray-600 mb-2">
        {label}
      </label>

      {value ? (
        <div className="relative bg-white border border-black/10 rounded-xl p-2 group">
          <img
            src={value}
            alt="Preview"
            className="w-full h-40 object-cover rounded-lg"
            onError={(e) => {
              e.target.style.display = 'none'
            }}
          />
          <button
            type="button"
            onClick={() => onChange('')}
            className="absolute top-3 right-3 p-1.5 bg-red-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
            title="Remove image"
          >
            <X className="w-3.5 h-3.5" />
          </button>
          <label className="absolute bottom-3 right-3 px-3 py-1.5 bg-[#111] text-white text-[10px] font-mono uppercase tracking-widest rounded-lg cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity">
            Replace
            <input
              type="file"
              accept="image/*"
              onChange={handleUpload}
              className="hidden"
            />
          </label>
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
                Click to upload an image
              </p>
              <p className="text-[10px] font-mono text-gray-400">
                PNG, JPG, or WebP · max 5MB
              </p>
            </>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleUpload}
            disabled={uploading}
            className="hidden"
          />
        </label>
      )}

      {/* Manual URL entry */}
      <div className="mt-2 flex items-center gap-2">
        <span className="text-[10px] font-mono uppercase tracking-widest text-gray-400 shrink-0">
          or URL
        </span>
        <input
          type="text"
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://..."
          className="w-full px-3 py-2 bg-white border border-black/10 rounded-lg text-[11px] font-mono text-[#111] placeholder-gray-400 focus:outline-none focus:border-[#06b6d4]"
        />
      </div>

      {error && (
        <p className="text-[11px] text-red-600 font-mono mt-1">{error}</p>
      )}
    </div>
  )
}

export default ImageUpload