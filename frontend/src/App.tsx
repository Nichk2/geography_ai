import { useState } from "react"
import DemoMenu from "./components/Menu/DemoMenu"
import { ThemeProvider } from "./contexts/ThemeContext"

function App() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <ThemeProvider>
      <div className="min-h-screen custom-bg-primary transition-colors duration-300">
        <DemoMenu 
          isOpen={isOpen} 
          setIsOpen={setIsOpen}
          currentChatId={null}
          onSelectChat={() => {}} 
          onNewChat={() => {}}    
        />
      </div>
    </ThemeProvider>
  )
}

export default App
