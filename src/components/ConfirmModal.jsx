// src/components/ConfirmModal.jsx
import { motion, AnimatePresence } from 'framer-motion'
import { AlertTriangle, Trash2 } from 'lucide-react'

/**
 * Modern confirmation modal.
 *
 * Usage:
 *   <ConfirmModal
 *     isOpen={!!deleteTarget}
 *     title="Delete project?"
 *     message={`"${deleteTarget?.title}" will be permanently removed.`}
 *     onConfirm={handleDelete}
 *     onCancel={() => setDeleteTarget(null)}
 *   />
 */
const ConfirmModal = ({
  isOpen,
  title = 'Are you sure?',
  message = 'This action cannot be undone.',
  confirmText = 'Delete',
  cancelText = 'Cancel',
  onConfirm,
  onCancel,
  danger = true,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={onCancel}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md bg-[#f0f0ef] border border-black/10 rounded-2xl shadow-[0_30px_80px_-20px_rgba(0,0,0,0.5)] overflow-hidden"
          >
            {/* Top accent bar */}
            <div
              className="h-[3px] w-full"
              style={{
                background: danger
                  ? 'linear-gradient(90deg, #ef4444, #dc2626, #ef4444)'
                  : 'linear-gradient(90deg, #06b6d4, #a855f7, #06b6d4)',
                boxShadow: danger
                  ? '0 0 20px rgba(239,68,68,0.6)'
                  : '0 0 20px rgba(6,182,212,0.6)',
              }}
            />

            <div className="p-6 md:p-7">
              {/* Icon + Title */}
              <div className="flex items-start gap-4 mb-4">
                <div
                  className={`shrink-0 w-11 h-11 rounded-xl flex items-center justify-center ${
                    danger
                      ? 'bg-red-50 border border-red-200'
                      : 'bg-[#06b6d4]/10 border border-[#06b6d4]/30'
                  }`}
                >
                  {danger ? (
                    <Trash2 className="w-5 h-5 text-red-600" strokeWidth={1.75} />
                  ) : (
                    <AlertTriangle
                      className="w-5 h-5 text-[#06b6d4]"
                      strokeWidth={1.75}
                    />
                  )}
                </div>

                <div className="flex-1 min-w-0 pt-0.5">
                  <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-gray-500 mb-1">
                    {danger ? '// Destructive Action' : '// Confirmation'}
                  </p>
                  <h3 className="font-display text-xl font-bold text-[#111] leading-tight">
                    {title}
                  </h3>
                </div>
              </div>

              {/* Message */}
              <p className="text-[14px] text-gray-600 leading-relaxed mb-6 pl-[60px] font-light">
                {message}
              </p>

              {/* Actions */}
              <div className="flex gap-2 justify-end">
                <button
                  type="button"
                  onClick={onCancel}
                  className="px-5 py-2.5 text-[11px] font-mono uppercase tracking-widest text-[#111] border border-black/15 rounded-xl hover:bg-white hover:border-black/30 transition-all"
                >
                  {cancelText}
                </button>

                <button
                  type="button"
                  onClick={onConfirm}
                  className="group relative px-5 py-2.5 text-[11px] font-mono uppercase tracking-widest text-white rounded-xl transition-all duration-300 hover:-translate-y-0.5 overflow-hidden"
                  style={{
                    background: danger
                      ? 'linear-gradient(180deg, #ef4444 0%, #dc2626 100%)'
                      : 'linear-gradient(180deg, #1a1a1a 0%, #0a0a0a 100%)',
                    boxShadow: danger
                      ? 'inset 0 1px 0 rgba(255,255,255,0.2), 0 1px 2px rgba(0,0,0,0.2)'
                      : 'inset 0 1px 0 rgba(255,255,255,0.1), 0 1px 2px rgba(0,0,0,0.4)',
                  }}
                >
                  {danger && (
                    <span
                      className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                      style={{
                        boxShadow:
                          '0 15px 40px -10px rgba(239,68,68,0.6), 0 0 0 1px rgba(239,68,68,0.4)',
                      }}
                    />
                  )}
                  <span className="relative z-10">{confirmText}</span>
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default ConfirmModal