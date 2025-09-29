interface MenuItem {
    id: number
    title: string
    conversations: number
  }


  interface Chat {
    id: string
    title: string
    timestamp: Date
    messageCount: number
  }
  
  interface MenuProps {
    isOpen: boolean
    setIsOpen: (isOpen: boolean) => void
    onNewChat: () => void
    onSelectChat: (chatId: string) => void
    currentChatId?: string
  }

  interface Message {
    id: string
    content: string
    role: string
    timestamp: Date
  }

  
          
export type { MenuItem, Chat, MenuProps, Message }