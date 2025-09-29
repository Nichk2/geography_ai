import { motion } from "framer-motion"
import ChatInput from "./ChatInput"

interface Message {
  id: string
  content: string
  isUser: boolean
  timestamp: Date
}

interface ChatWindowProps {
  messages: Message[];
  isLoading: boolean;
  onSendMessage: (msg: string) => void;
}

const ChatWindow = ({ messages, isLoading, onSendMessage }: ChatWindowProps) => {
  return (
    <div className=" custom-bg-secondary rounded-2xl border custom-border-primary overflow-hidden flex flex-col h-[100%]">
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.length === 0 ? (
          <p className="text-center text-gray-500 mt-12">Start your conversation…</p>
        ) : (
          messages.map((msg) => (
            <motion.div
              key={msg.id}
              className={`flex ${msg.isUser ? "justify-end" : "justify-start"}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div
                className={`max-w-xs px-4 py-3 rounded-2xl custom-border-primary ${
                  msg.isUser
                    ? "custom-accent custom-text-primary text-white"
                    : "custom-bg-tertiary custom-border-primary custom-text-primary"
                }`}
              >
                {msg.content}
              </div>
            </motion.div>
          ))
        )}
        {isLoading && (
          <p className="text-sm text-gray-500">AI is thinking...</p>
        )}
      </div>

      <ChatInput onSendMessage={onSendMessage} isLoading={isLoading} />
    </div>
  )
}

export default ChatWindow
