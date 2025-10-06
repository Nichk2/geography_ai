import { useState } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Menu from "./components/Menu/Menu"
import { ThemeProvider } from "./contexts/ThemeContext"
import { Settings, Profile } from "./pages"

// Home component that contains the main chat interface
const Home = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="min-h-screen custom-bg-primary transition-colors duration-300">
      <Menu 
        isOpen={isOpen} 
        setIsOpen={setIsOpen}
        currentChatId={null}    
        onSelectChat={() => {}} 
        onNewChat={() => {}}    
      />
    </div>
  )
}

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App
