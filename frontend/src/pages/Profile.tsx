import { motion } from 'framer-motion'
import { ArrowLeft, User, Mail, Calendar, MapPin, Edit3 } from 'lucide-react'
import { Link } from 'react-router-dom'

const Profile = () => {
  // Mock user data - replace with real data from your state management
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    joinDate: "January 2024",
    location: "San Francisco, CA",
    bio: "Geography enthusiast and AI chat user. Love exploring new places and learning about different cultures.",
    avatar: null // You can add avatar functionality later
  }

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
            <User size={20} className="custom-text-primary" />
          </div>
          <h1 className="text-2xl font-semibold custom-text-primary">Profile</h1>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 max-w-4xl mx-auto">
        {/* Profile Header */}
        <div className="custom-bg-secondary rounded-lg p-6 custom-shadow mb-6">
          <div className="flex items-start gap-6">
            {/* Avatar */}
            <div className="w-24 h-24 rounded-full custom-bg-tertiary flex items-center justify-center flex-shrink-0">
              <User size={32} className="custom-text-secondary" />
            </div>
            
            {/* User Info */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-2xl font-semibold custom-text-primary">{user.name}</h2>
                <button className="p-1 rounded-lg custom-hover-bg transition-colors cursor-pointer">
                  <Edit3 size={16} className="custom-text-secondary" />
                </button>
              </div>
              <p className="custom-text-secondary mb-4">{user.bio}</p>
              
              {/* User Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Mail size={16} className="custom-text-secondary" />
                  <span className="text-sm custom-text-secondary">{user.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={16} className="custom-text-secondary" />
                  <span className="text-sm custom-text-secondary">Joined {user.joinDate}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="custom-text-secondary" />
                  <span className="text-sm custom-text-secondary">{user.location}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Sections */}
        <div className="space-y-6">
          {/* Account Information */}
          <section>
            <h3 className="text-lg font-semibold custom-text-primary mb-4">Account Information</h3>
            <div className="custom-bg-secondary rounded-lg p-6 custom-shadow">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium custom-text-secondary mb-2">
                    Display Name
                  </label>
                  <input
                    type="text"
                    value={user.name}
                    className="w-full px-3 py-2 custom-bg-tertiary custom-text-primary border custom-border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium custom-text-secondary mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={user.email}
                    className="w-full px-3 py-2 custom-bg-tertiary custom-text-primary border custom-border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    readOnly
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Activity Summary */}
          <section>
            <h3 className="text-lg font-semibold custom-text-primary mb-4">Activity Summary</h3>
            <div className="custom-bg-secondary rounded-lg p-6 custom-shadow">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold custom-text-primary">12</div>
                  <div className="text-sm custom-text-secondary">Total Chats</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold custom-text-primary">156</div>
                  <div className="text-sm custom-text-secondary">Messages Sent</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold custom-text-primary">8</div>
                  <div className="text-sm custom-text-secondary">Countries Discussed</div>
                </div>
              </div>
            </div>
          </section>

          {/* Preferences */}
          <section>
            <h3 className="text-lg font-semibold custom-text-primary mb-4">Preferences</h3>
            <div className="custom-bg-secondary rounded-lg p-6 custom-shadow">
              <p className="custom-text-secondary">
                User preferences and customization options will be available here. 
                You can manage your chat preferences, notification settings, and more.
              </p>
            </div>
          </section>
        </div>
      </div>
    </motion.div>
  )
}

export default Profile
