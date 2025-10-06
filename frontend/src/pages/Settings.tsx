import { motion } from 'framer-motion'
import { ArrowLeft, Settings as SettingsIcon } from 'lucide-react'
import { Link } from 'react-router-dom'

const Settings = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen custom-bg-primary"
    >
      {/* Header */}
      <div className="flex items-center gap-4 p-6 border-b custom-border-primary">
        <Link 
          to="/" 
          className="p-2 rounded-lg custom-hover-bg transition-colors cursor-pointer"
        >
          <ArrowLeft size={20} className="custom-text-secondary" />
        </Link>
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg custom-bg-tertiary">
            <SettingsIcon size={20} className="custom-text-primary" />
          </div>
          <h1 className="text-2xl font-semibold custom-text-primary">Settings</h1>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 max-w-4xl mx-auto">
        <div className="space-y-8">
          {/* General Settings */}
          <section>
            <h2 className="text-lg font-semibold custom-text-primary mb-4">General</h2>
            <div className="custom-bg-secondary rounded-lg p-6 custom-shadow">
              <p className="custom-text-secondary">
                General settings will be available here. You can configure your preferences, 
                language, and other basic options.
              </p>
            </div>
          </section>

          {/* Appearance Settings */}
          <section>
            <h2 className="text-lg font-semibold custom-text-primary mb-4">Appearance</h2>
            <div className="custom-bg-secondary rounded-lg p-6 custom-shadow">
              <p className="custom-text-secondary">
                Customize the appearance of your application. Theme settings, colors, 
                and display preferences will be available here.
              </p>
            </div>
          </section>

          {/* Privacy Settings */}
          <section>
            <h2 className="text-lg font-semibold custom-text-primary mb-4">Privacy & Security</h2>
            <div className="custom-bg-secondary rounded-lg p-6 custom-shadow">
              <p className="custom-text-secondary">
                Manage your privacy settings, data preferences, and security options.
              </p>
            </div>
          </section>

          {/* Advanced Settings */}
          <section>
            <h2 className="text-lg font-semibold custom-text-primary mb-4">Advanced</h2>
            <div className="custom-bg-secondary rounded-lg p-6 custom-shadow">
              <p className="custom-text-secondary">
                Advanced configuration options for power users and developers.
              </p>
            </div>
          </section>
        </div>
      </div>
    </motion.div>
  )
}

export default Settings
