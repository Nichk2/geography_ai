import { motion } from "framer-motion"
import { MessageSquare, Trash2 } from "lucide-react"

interface Message {
  id: string
  content: string
  isUser: boolean
  timestamp: Date
}

interface Chat {
  id: string
  title: string
  messages: Message[]
  createdAt: Date
  updatedAt: Date
}

interface ChatHistoryProps {
  chats: Chat[]
  currentChatId: string | null
  onSelectChat: (chatId: string) => void
  onDeleteChat: (chatId: string, chatTitle: string) => void 
  isSidebarOpen: boolean
}

const ChatHistory = ({ chats, currentChatId, onSelectChat, onDeleteChat, isSidebarOpen }: ChatHistoryProps) => {
  // Function to generate title from first message
  const getChatTitle = (chat: Chat) => {
    if (chat.title && chat.title !== 'New conversation') {
      return chat.title
    }
    
    const firstUserMessage = chat.messages.find(msg => msg.isUser)
    if (firstUserMessage) {
      const content = firstUserMessage.content.trim()
      if (content.length <= 30) {
        return content
      }
      return content.substring(0, 30) + '...'
    }
    
    return 'New conversation'
  }

  return (
    <div className="px-4 space-y-1">
      {chats.map((chat) => (
        <motion.div
          key={chat.id}
          className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors ${
            currentChatId === chat.id
              ? "custom-bg-tertiary custom-border-primary"
              : "custom-hover-bg"
          }`}
          whileHover={{ scale: 1.01 }}
        >
          {/* Chat click area */}
          <div
            className="flex items-center gap-3 flex-1 min-w-0"
            onClick={() => onSelectChat(chat.id)}
          >
            <MessageSquare size={16} className="text-gray-400 flex-shrink-0" />
            {isSidebarOpen && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{getChatTitle(chat)}</p>
                <p className="text-xs text-gray-500">{chat.messages.length} messages</p>
              </div>
            )}
          </div>

          {/* Delete button (only visible when sidebar is open) */}
          {isSidebarOpen && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                onDeleteChat(chat.id, getChatTitle(chat)) // Pass both ID and title
              }}
              className="p-1 rounded-md text-gray-400 hover:text-red-600 hover:bg-red-50 transition cursor-pointer"
            >
              <Trash2 size={14} />
            </button>
          )}
        </motion.div>
      ))}
    </div>
  )
}

export default ChatHistory