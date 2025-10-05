import { motion, AnimatePresence } from 'framer-motion'
import { AlertTriangle, X } from 'lucide-react'
import { createPortal } from 'react-dom'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title?: string
  description?: string
  confirmText?: string
  cancelText?: string
  variant?: 'danger' | 'warning' | 'info'
}

const Modal = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Hold on, buddy!",
  description = "Are you sure you want to delete this chat?",
  confirmText = "Delete",
  cancelText = "Cancel",
  variant = "danger"
}: ModalProps) => {
  const variantStyles = {
    danger: {
      iconBg: "bg-red-100",
      iconColor: "text-red-600",
      buttonBg: "bg-red-400 hover:bg-red-500 cursor-pointer focus:ring-red-500",
      borderColor: "border-red-200"
    },
    warning: {
      iconBg: "bg-yellow-100",
      iconColor: "text-yellow-600",
      buttonBg: "bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500",
      borderColor: "border-yellow-200"
    },
    info: {
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      buttonBg: "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500",
      borderColor: "border-blue-200"
    }
  }

  const styles = variantStyles[variant]

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed top-0 left-0 right-0 bottom-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4 sm:p-6"
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              width: '100vw',
              height: '100vh'
            }}
            onClick={onClose}
          >
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="custom-bg-secondary rounded-2xl custom-shadow w-full max-w-sm sm:max-w-md overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className={`p-6`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-full ${styles.iconBg}`}>
                      <AlertTriangle size={20} className={styles.iconColor} />
                    </div>
                    <h3 className="text-lg font-semibold custom-text-primary">
                      {title}
                    </h3>
                  </div>
                  <button
                    onClick={onClose}
                    className="p-1 rounded-lg custom-hover-bg transition-colors"
                  >
                    <X size={18} className="custom-text-secondary cursor-pointer" />
                  </button>
                </div>
              </div>

              {/* Body */}
              <div className="p-6">
                <p className="custom-text-secondary -mt-6 leading-relaxed">
                  {description}
                </p>
              </div>

              {/* Footer */}
              <div className="flex gap-3 p-6">
                <button
                  onClick={onClose}
                  className="flex-1 px-4 py-2.5 text-sm font-medium custom-text-secondary custom-bg-secondary custom-border-primary border rounded-lg custom-hover-bg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200 cursor-pointer"
                >
                  {cancelText}
                </button>
                <button
                  onClick={onConfirm}
                  className={`flex-1 px-4 py-2.5 text-sm font-medium text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200 ${styles.buttonBg} cursor-pointer`}
                >
                  {confirmText}
                </button>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  )
}

export default Modal