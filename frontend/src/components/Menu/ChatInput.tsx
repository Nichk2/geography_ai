import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Send } from "lucide-react"

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading?: boolean;
  placeholder?: string;
}

const ChatInput = ({ onSendMessage, isLoading = false, placeholder = "What is your message, explorer?" }: ChatInputProps) => {
  const [inputValue, setInputValue] = useState("")
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleSendMessage = () => {
    if (!inputValue.trim() || isLoading) return
    onSendMessage(inputValue.trim())
    setInputValue("")
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }, [inputValue])

  return (
    <div className="relative p-4">
      <div className="flex items-center gap-3 p-4 rounded-2xl border-2 custom-border-primary hover:border-[#ec889c] focus-within:border-[#DC143C] transition-all duration-300">
        <textarea
          ref={textareaRef}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={placeholder}
          className="w-full bg-transparent resize-none border-none outline-none custom-text-primary placeholder-gray-500 text-base leading-6 max-h-32"
          rows={1}
          disabled={isLoading}
        />
        <motion.button
          onClick={handleSendMessage}
          disabled={!inputValue.trim() || isLoading}
          className={`p-2.5 rounded-xl transition-all duration-200 flex-shrink-0 ${
            inputValue.trim() && !isLoading
              ? "custom-accent text-white cursor-pointer hover:shadow-lg"
              : "custom-bg-tertiary custom-text-tertiary custom-hover-bg cursor-not-allowed"
          }`}
          whileTap={inputValue.trim() && !isLoading ? { scale: 0.95 } : {}}
        >
        <Send size={16} />
        </motion.button>
      </div>
      <p className="text-xs custom-text-tertiary mt-2 text-center">
        Planet Atlas can make mistakes. Consider checking important information.
      </p>
    </div>
  )
}

export default ChatInput
