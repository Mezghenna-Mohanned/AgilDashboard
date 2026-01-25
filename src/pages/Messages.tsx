import { useState, useRef, useEffect } from 'react'
import { Search, Send, Smile, Paperclip, Phone, Video } from 'lucide-react'
import Header from '../components/Header'

type Message = {
  id: string
  text: string
  sender: 'user' | 'contact'
  timestamp: Date
  image?: string
}

type Contact = {
  id: string
  name: string
  username: string
  avatar: string
  lastMessage: string
  timestamp: string
  unread?: number
  online: boolean
}

type ConversationHistory = {
  [contactId: string]: Message[]
}

const contacts: Contact[] = [
  { id: '1', name: 'Patrick Meyer', username: '@patrickmeyer', avatar: 'PM', lastMessage: 'Lorem ipsum dolor sit amet consectetur adipisicing non sed non molestie quis vitae lectus commodo.', timestamp: '5 min ago', online: true },
  { id: '2', name: 'Sophie Moore', username: '@sophiemoore', avatar: 'SM', lastMessage: 'Lorem ipsum dolor sit amet consectetur adipisicing non sed non molestie quis vitae lectus commodo.', timestamp: '15 min ago', online: true },
]

function generateMeow(): string {
  const meowCount = Math.floor(Math.random() * 5) + 1 // 1 to 5 meows
  return Array(meowCount).fill('meow').join(' ')
}

// Initial conversations for each contact
const initialConversations: ConversationHistory = {
  '1': [
    { id: '1', text: 'Hello! Hope you\'re doing well.', sender: 'contact', timestamp: new Date(Date.now() - 600000) },
    { id: '2', text: 'I need your help with some reports, are you available for a call later today?', sender: 'contact', timestamp: new Date(Date.now() - 540000) },
  ],
  '2': [
    { id: '1', text: 'Hey there! How are you?', sender: 'contact', timestamp: new Date(Date.now() - 420000) },
    { id: '2', text: 'What about 2:00 PM? Works for you?', sender: 'contact', timestamp: new Date(Date.now() - 300000) },
    { id: '3', image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400', text: '', sender: 'contact', timestamp: new Date(Date.now() - 240000) },
  ],
}

export default function Messages() {
  const [selectedContact, setSelectedContact] = useState<Contact>(contacts[0])
  const [conversations, setConversations] = useState<ConversationHistory>(initialConversations)
  const [inputMessage, setInputMessage] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const currentMessages = conversations[selectedContact.id] || []

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [currentMessages, selectedContact.id])

  const handleSend = (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault()
    }
    
    if (!inputMessage.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    }

    // Add user message to current conversation
    setConversations(prev => ({
      ...prev,
      [selectedContact.id]: [...(prev[selectedContact.id] || []), userMessage]
    }))
    
    setInputMessage('')

    // Auto-reply with meow after a short delay
    setTimeout(() => {
      const meowReply: Message = {
        id: (Date.now() + 1).toString(),
        text: generateMeow(),
        sender: 'contact',
        timestamp: new Date()
      }
      setConversations(prev => ({
        ...prev,
        [selectedContact.id]: [...(prev[selectedContact.id] || []), meowReply]
      }))
    }, 1000 + Math.random() * 1000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
  }

  return (
    <div className="bg-slate-900">
      <div className="p-6 border-b border-slate-800/50">
        <Header title="Messages" showSearch={true} />
      </div>

      <div className="flex" style={{ height: 'calc(100vh - 180px)' }}>
        {/* Contacts Sidebar */}
        <div className="w-80 border-r border-slate-800/50 flex flex-col bg-slate-900/50">
          {/* Active Contacts */}
          <div className="p-4 border-b border-slate-800/50">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-white font-semibold text-sm">Active</h3>
            </div>
            <div className="flex gap-3 overflow-x-auto pb-2">
              {contacts.filter(c => c.online).map(contact => (
                <div 
                  key={contact.id} 
                  className="flex flex-col items-center gap-1.5 flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity"
                  onClick={() => setSelectedContact(contact)}
                >
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-sm font-bold shadow-lg">
                      {contact.avatar}
                    </div>
                    <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-slate-900"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Messages List */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-3">
              <div className="flex items-center justify-between mb-3 px-1">
                <h3 className="text-white font-semibold text-sm">Messages</h3>
                <span className="bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded-full text-xs font-bold border border-blue-500/30">
                  {contacts.length}
                </span>
              </div>

              <div className="space-y-1">
                {contacts.map(contact => (
                  <div
                    key={contact.id}
                    onClick={() => setSelectedContact(contact)}
                    className={`p-3 rounded-xl cursor-pointer transition-all ${
                      selectedContact.id === contact.id
                        ? 'bg-slate-800 border border-slate-700'
                        : 'hover:bg-slate-800/50 border border-transparent'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="relative flex-shrink-0">
                        <div className="w-11 h-11 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white text-sm font-bold shadow-lg">
                          {contact.avatar}
                        </div>
                        {contact.online && (
                          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-slate-900"></div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-0.5">
                          <h4 className="text-white font-semibold text-sm truncate">{contact.name}</h4>
                          <span className="text-slate-500 text-xs flex-shrink-0">{contact.timestamp}</span>
                        </div>
                        <p className="text-slate-400 text-xs truncate">{contact.username}</p>
                        <p className="text-slate-500 text-xs truncate mt-1">{contact.lastMessage}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="px-6 py-4 border-b border-slate-800/50 bg-slate-900/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-sm font-bold shadow-lg">
                    {selectedContact.avatar}
                  </div>
                  {selectedContact.online && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-slate-900"></div>
                  )}
                </div>
                <div>
                  <h3 className="text-white font-semibold flex items-center gap-2">
                    {selectedContact.name}
                  </h3>
                  <p className="text-slate-400 text-xs">{selectedContact.username}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button className="p-2.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-all">
                  <Video className="w-5 h-5" />
                </button>
                <button className="btn-primary flex items-center gap-2 shadow-lg shadow-blue-500/30">
                  <Phone className="w-4 h-4" />
                  Call {selectedContact.name.split(' ')[0]}
                </button>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-900/30">
            {currentMessages.map((message, index) => {
              const showTimestamp = index === 0 || 
                currentMessages[index - 1].sender !== message.sender ||
                message.timestamp.getTime() - currentMessages[index - 1].timestamp.getTime() > 300000

              return (
                <div key={message.id}>
                  {showTimestamp && (
                    <div className="text-center text-slate-500 text-xs mb-4">
                      {formatTime(message.timestamp)}
                    </div>
                  )}
                  <div className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    {message.sender === 'contact' && (
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-xs font-bold shadow-lg mr-2 flex-shrink-0">
                        {selectedContact.avatar}
                      </div>
                    )}
                    <div className={message.sender === 'user' ? 'chat-bubble-sent' : 'chat-bubble-received'}>
                      {message.image ? (
                        <img src={message.image} alt="Shared" className="rounded-lg max-w-xs" />
                      ) : (
                        <p className="text-sm leading-relaxed">{message.text}</p>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-slate-800/50 bg-slate-900/50">
            <form onSubmit={handleSend} className="flex items-end gap-3">
              <div className="flex-1 bg-slate-800/50 border border-slate-700/50 rounded-2xl p-3 focus-within:border-blue-500/50 transition-all">
                <textarea
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type a message"
                  rows={1}
                  className="w-full bg-transparent text-slate-200 placeholder:text-slate-500 resize-none focus:outline-none text-sm"
                />
                <div className="flex items-center gap-2 mt-2">
                  <button type="button" className="text-slate-400 hover:text-slate-300 transition-colors">
                    <Smile className="w-5 h-5" />
                  </button>
                  <button type="button" className="text-slate-400 hover:text-slate-300 transition-colors">
                    <Paperclip className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <button
                type="submit"
                disabled={!inputMessage.trim()}
                className="p-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl hover:from-blue-700 hover:to-cyan-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-500/30"
              >
                <Send className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}