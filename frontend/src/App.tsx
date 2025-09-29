import { useState } from "react"
import Menu from "./components/Menu/Menu"
import { ThemeProvider } from "./contexts/ThemeContext"

function App() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <ThemeProvider>
      <div className="min-h-screen custom-bg-primary transition-colors duration-300">
        <Menu 
          isOpen={isOpen} 
          setIsOpen={setIsOpen}
          chats={[]}              
          currentChatId={null}    
          onSelectChat={() => {}} 
          onNewChat={() => {}}    
        />
      </div>
    </ThemeProvider>
  )
}

export default App
