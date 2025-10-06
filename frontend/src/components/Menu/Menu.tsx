import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import {
  Plus,
  Settings,
  User,
  PanelRightOpen,
  PanelLeftOpen,
  Sun,
  Moon,
  Menu as MenuIcon,
  X,
} from "lucide-react";
import logoAnimation from "../../assets/Logo_animation.json";
import logoMenuAnimation from "../../assets/Logo_menu.json";
import { useTheme } from "../../contexts/ThemeContext";
import ChatHistory from "./ChatHistory";
import ChatWindow from "./ChatWindow";
import Modal from "./Modal";

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

interface Chat {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
}

interface MenuProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  currentChatId: string | null;
  onSelectChat: (chatId: string) => void;
  onNewChat: () => void;
}

/* ======================
   Simplified Welcome
   ====================== */
const AnimatedWelcome = () => {
  return (
    <div className="text-center mt-20">
      <motion.div
        className="flex justify-center mb-8"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <Lottie 
          animationData={logoAnimation} 
          loop={true}
          autoplay={true}
          style={{ width: 120, height: 120 }}
        />
      </motion.div>
      
      <motion.h1
        className="text-2xl md:text-3xl font-bold custom-text-primary"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        Welcome to Planet Atlas
      </motion.h1>

      <motion.p
        className="mt-4 text-base custom-text-secondary max-w-md mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.6 }}
      >
        Your AI-powered assistant ready to help you explore, learn, and create. Start a new conversation to begin your journey.
      </motion.p>
    </div>
  );
};

/* ======================
   Storage helpers
   ====================== */
const STORAGE_KEY = "planet-atlas-chats";

const loadChatsFromStorage = (): Chat[] => {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];

    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      console.warn("planet-atlas-chats is not an array, ignoring.");
      return [];
    }

    // normalize/validate parsed structure and convert timestamps to Dates
    const normalized: Chat[] = parsed.map((chat: any) => {
      const messages: Message[] = Array.isArray(chat.messages)
        ? chat.messages.map((m: any) => ({
            id: String(m.id ?? Date.now()),
            content: String(m.content ?? ""),
            isUser: !!m.isUser,
            timestamp: m.timestamp ? new Date(m.timestamp) : new Date(),
          }))
        : [];

      return {
        id: String(chat.id ?? Date.now()),
        title: String(chat.title ?? "New conversation"),
        messages,
        createdAt: chat.createdAt ? new Date(chat.createdAt) : new Date(),
        updatedAt: chat.updatedAt ? new Date(chat.updatedAt) : new Date(),
      };
    });

    return normalized;
  } catch (err) {
    console.error("Failed to load chats from localStorage:", err);
    return [];
  }
};

const saveChatsToStorage = (chats: Chat[]) => {
  if (typeof window === "undefined") return;
  try {
    if (!Array.isArray(chats)) {
      console.warn("Attempted to save non-array to storage:", chats);
      return;
    }
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(chats));
  } catch (err) {
    console.error("Failed to save chats to localStorage:", err);
  }
};

/* ======================
   Menu Component
   ====================== */
const Menu = ({
  isOpen,
  setIsOpen,
  currentChatId,
  onSelectChat,
  onNewChat,
}: MenuProps) => {
  const { theme, toggleTheme } = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [localChats, setLocalChats] = useState<Chat[]>([]);
  const [currentId, setCurrentId] = useState<string | null>(currentChatId);
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    chatId: string | null;
    chatTitle: string;
  }>({
    isOpen: false,
    chatId: null,
    chatTitle: "",
  });
  const [isMobile, setIsMobile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Responsive breakpoint detection
  useEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.innerWidth < 1024; // lg breakpoint (1024px)
      setIsMobile(mobile);

      // Auto-close sidebar on mobile by default
      if (mobile) {
        setIsOpen(false);
      }
    };

    // Initial check
    checkScreenSize();

    // Add event listener
    window.addEventListener("resize", checkScreenSize);

    // Cleanup
    return () => window.removeEventListener("resize", checkScreenSize);
  }, [setIsOpen]);

  // Close mobile menu when switching to desktop
  useEffect(() => {
    if (!isMobile) {
      setMobileMenuOpen(false);
    }
  }, [isMobile]);

  // Sync prop -> local state (if parent changes currentChatId)
  useEffect(() => {
    setCurrentId(currentChatId);
  }, [currentChatId]);

  // Load from localStorage (run once on client)
  useEffect(() => {
    const saved = loadChatsFromStorage();
    if (saved.length > 0) {
      setLocalChats(saved);
    }
  }, []);

  // Save to localStorage whenever chats change
  useEffect(() => {
    saveChatsToStorage(localChats);
  }, [localChats]);

  const handleOpenDeleteModal = (chatId: string, chatTitle: string) => {
    setDeleteModal({
      isOpen: true,
      chatId,
      chatTitle,
    });
  };

  const handleCloseModal = () => {
    setDeleteModal({
      isOpen: false,
      chatId: null,
      chatTitle: "",
    });
  };

  const handleConfirmDelete = () => {
    if (deleteModal.chatId) {
      setLocalChats((prev) => prev.filter((c) => c.id !== deleteModal.chatId));

      if (currentId === deleteModal.chatId) {
        setCurrentId(null);
        try {
          onSelectChat("");
        } catch (e) {
          console.warn("onSelectChat threw while clearing selection:", e);
        }
      }

      handleCloseModal();
    }
  };

  const getCurrentChat = () =>
    localChats.find((c) => c.id === currentId) || null;

  const createNewChat = () => {
    const newChat: Chat = {
      id: Date.now().toString(),
      title: "New conversation",
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setLocalChats((prev) => [newChat, ...prev]);
    setCurrentId(newChat.id);
    try {
      onSelectChat(newChat.id);
      onNewChat();
    } catch (e) {
      console.error("Error calling onSelectChat/onNewChat:", e);
    }

    // Close mobile menu after creating new chat
    if (isMobile) {
      setMobileMenuOpen(false);
      setIsOpen(false);
    }
  };

  const handleSelectChat = (chatId: string) => {
    setCurrentId(chatId);
    try {
      onSelectChat(chatId);
    } catch (e) {
      console.error("onSelectChat error:", e);
    }

    // Close mobile menu after selecting chat
    if (isMobile) {
      setMobileMenuOpen(false);
      setIsOpen(false);
    }
  };

  const toggleSidebar = () => {
    if (isMobile) {
      setMobileMenuOpen(!mobileMenuOpen);
      setIsOpen(!mobileMenuOpen);
    } else {
      setIsOpen(!isOpen);
    }
  };

  const sendMessage = async (msg: string) => {
    let chatId = currentId;

    if (!chatId) {
      const newChat: Chat = {
        id: Date.now().toString(),
        title: msg.slice(0, 50) + (msg.length > 50 ? "..." : ""),
        messages: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      setLocalChats((prev) => [newChat, ...prev]);
      setCurrentId(newChat.id);
      try {
        onSelectChat(newChat.id);
      } catch (e) {
        console.error("onSelectChat error while creating chat:", e);
      }
      chatId = newChat.id;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      content: msg,
      isUser: true,
      timestamp: new Date(),
    };

    setLocalChats((prev) =>
      prev.map((c) =>
        c.id === chatId
          ? {
              ...c,
              messages: [...c.messages, userMessage],
              updatedAt: new Date(),
              title:
                c.title === "New conversation"
                  ? msg.slice(0, 50) + (msg.length > 50 ? "..." : "")
                  : c.title,
            }
          : c
      )
    );

    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: msg }),
      });
      const data = await response.json();

      if (data.error) throw new Error(data.error);

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.response,
        isUser: false,
        timestamp: new Date(),
      };

      setLocalChats((prev) =>
        prev.map((c) =>
          c.id === chatId
            ? {
                ...c,
                messages: [...c.messages, aiMessage],
                updatedAt: new Date(),
              }
            : c
        )
      );
    } catch (err) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: `Error: ${
          err instanceof Error ? err.message : "Something went wrong"
        }`,
        isUser: false,
        timestamp: new Date(),
      };
      setLocalChats((prev) =>
        prev.map((c) =>
          c.id === chatId
            ? {
                ...c,
                messages: [...c.messages, errorMessage],
                updatedAt: new Date(),
              }
            : c
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  const currentChat = getCurrentChat();

  return (
    <div className="flex min-h-screen relative">
      <Modal
        isOpen={deleteModal.isOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
        title="Delete chat?"
        description={`Are you sure you want to delete "${deleteModal.chatTitle}"? This action cannot be undone.`}
        confirmText="Delete chat"
        cancelText="Cancel"
        variant="danger"
      />

      {/* Mobile Menu Overlay */}
      {isMobile && mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => {
            setMobileMenuOpen(false);
            setIsOpen(false);
          }}
        />
      )}

      {/* Sidebar */}
      <motion.div
        className={`fixed left-0 top-0 h-full custom-bg-secondary custom-border-primary border-r z-50 transition-all duration-300 ease-out ${
          isMobile
            ? mobileMenuOpen
              ? "w-80 translate-x-0"
              : "-translate-x-full"
            : isOpen
            ? "w-80"
            : "w-20"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header - Fixed layout for both states */}
          <div className="p-4 border-b custom-border-primary flex items-center justify-between min-h-[64px]">
            {/* Left side - Logo and text */}
            <div className="flex items-center gap-3">
              {/* Show logo only when open */}
              {((!isMobile && isOpen) || (isMobile && mobileMenuOpen)) && (
                <>
                  <div className="w-8 h-8 flex items-center justify-center flex-shrink-0">
                    <Lottie 
                      animationData={logoMenuAnimation} 
                      loop={true}
                      autoplay={true}
                      style={{ width: 32, height: 32 }}
                    />
                  </div>
                  <span className="font-semibold custom-text-primary whitespace-nowrap">
                    Planet Atlas
                  </span>
                </>
              )}
            </div>

            {/* Toggle button - centered when closed, normal position when open */}
            <button
              onClick={toggleSidebar}
              className={`rounded-md custom-hover-bg p-1 transition cursor-pointer flex-shrink-0 ${
                (!isMobile && !isOpen) || (isMobile && !mobileMenuOpen)
                  ? "absolute left-1/2 transform -translate-x-1/2"
                  : ""
              }`}
            >
              {isMobile ? (
                <X size={18} />
              ) : isOpen ? (
                <PanelRightOpen size={18} />
              ) : (
                <PanelLeftOpen size={18} />
              )}
            </button>
          </div>

          {/* New Chat Button */}
          <div className="p-4">
            <button
              onClick={createNewChat}
              className={`w-full custom-bg-tertiary custom-text-primary rounded-lg font-medium transition-all duration-200 cursor-pointer custom-hover-bg-secondary ${
                (!isMobile && isOpen) || (isMobile && mobileMenuOpen)
                  ? "px-4 py-3 text-sm"
                  : "p-3"
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <Plus size={16} />
                {((!isMobile && isOpen) || (isMobile && mobileMenuOpen)) && (
                  <span className="whitespace-nowrap">New chat</span>
                )}
              </div>
            </button>
          </div>

          {/* Chat List - Only show when open */}
          <div className="flex-1 p-4 overflow-y-auto">
            {((!isMobile && isOpen) || (isMobile && mobileMenuOpen)) && (
              <ChatHistory
                chats={localChats}
                currentChatId={currentId}
                onSelectChat={handleSelectChat}
                onDeleteChat={handleOpenDeleteModal}
                isSidebarOpen={
                  (!isMobile && isOpen) || (isMobile && mobileMenuOpen)
                }
              />
            )}
          </div>

          {/* Bottom actions */}
          <div className="p-4 border-t custom-border-primary flex flex-col gap-2">
            <button
              onClick={() => toggleTheme()}
              className={`flex items-center gap-3 custom-text-secondary custom-hover-bg cursor-pointer rounded-lg p-2 transition-colors ${
                (!isMobile && isOpen) || (isMobile && mobileMenuOpen)
                  ? "justify-start"
                  : "justify-center"
              }`}
            >
              {theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
              {((!isMobile && isOpen) || (isMobile && mobileMenuOpen)) && (
                <span className="text-sm whitespace-nowrap">
                  {theme === "light" ? "Dark mode" : "Light mode"}
                </span>
              )}
            </button>
            <Link
              to="/settings"
              className={`flex items-center gap-3 custom-text-secondary cursor-pointer custom-hover-bg rounded-lg p-2 transition-colors ${
                (!isMobile && isOpen) || (isMobile && mobileMenuOpen)
                  ? "justify-start"
                  : "justify-center"
              }`}
            >
              <Settings size={16} />
              {((!isMobile && isOpen) || (isMobile && mobileMenuOpen)) && (
                <span className="text-sm whitespace-nowrap">Settings</span>
              )}
            </Link>
            <Link
              to="/profile"
              className={`flex items-center gap-3 custom-text-secondary cursor-pointer custom-hover-bg rounded-lg p-2 transition-colors ${
                (!isMobile && isOpen) || (isMobile && mobileMenuOpen)
                  ? "justify-start"
                  : "justify-center"
              }`}
            >
              <User size={16} />
              {((!isMobile && isOpen) || (isMobile && mobileMenuOpen)) && (
                <span className="text-sm whitespace-nowrap">Account</span>
              )}
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Mobile Header */}
      {isMobile && (
        <div className="fixed top-0 left-0 right-0 custom-bg-secondary border-b custom-border-primary p-2 z-30 lg:hidden">
          <div className="flex items-center justify-between">
            <button
              onClick={toggleSidebar}
              className="rounded-md custom-hover-bg p-2 transition cursor-pointer"
            >
              <MenuIcon size={20} />
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 flex items-center justify-center">
                <Lottie 
                  animationData={logoMenuAnimation} 
                  loop={true}
                  autoplay={true}
                  style={{ width: 32, height: 32 }}
                />
              </div>
              <span className="font-semibold custom-text-primary text-sm">
                Planet Atlas
              </span>
            </div>
            <div className="w-10"></div> {/* Spacer for balance */}
          </div>
        </div>
      )}

      {/* Chat window */}
      <div
        className={`flex-1 transition-all duration-300 ${
          isMobile
            ? "pt-16" // Account for mobile header
            : isOpen
            ? "ml-80"
            : "ml-20" // Match the reduced sidebar width
        } p-4 lg:p-6`}
      >
        {currentChat ? (
          <ChatWindow
            messages={currentChat.messages}
            isLoading={isLoading}
            onSendMessage={sendMessage}
          />
        ) : (
          <AnimatedWelcome />
        )}
      </div>
    </div>
  );
};

export default Menu;
