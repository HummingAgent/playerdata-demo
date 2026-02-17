'use client';

import { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { 
  Search, 
  FileText, 
  Book, 
  MessageSquare, 
  Video,
  FolderOpen,
  ChevronRight,
  Send,
  Bot,
  Clock,
  ExternalLink
} from 'lucide-react';

const categories = [
  { name: 'Product Manuals', count: 24, icon: Book },
  { name: 'Troubleshooting', count: 156, icon: FileText },
  { name: 'API Documentation', count: 32, icon: FileText },
  { name: 'Training Videos', count: 18, icon: Video },
  { name: 'Release Notes', count: 45, icon: FileText },
  { name: 'FAQs', count: 89, icon: MessageSquare },
];

const recentDocs = [
  { title: 'Edge Air v3 User Manual', category: 'Product Manuals', updated: '2 days ago', views: 234 },
  { title: 'Battery Calibration Guide', category: 'Troubleshooting', updated: '5 days ago', views: 189 },
  { title: 'Firmware Update Process', category: 'Troubleshooting', updated: '1 week ago', views: 156 },
  { title: 'API Integration Guide', category: 'API Documentation', updated: '3 days ago', views: 98 },
  { title: 'Indoor Tracking Setup', category: 'Troubleshooting', updated: '4 days ago', views: 145 },
];

const chatHistory = [
  { role: 'user', message: 'What is the battery life of Edge Air v3?' },
  { role: 'ai', message: 'The Edge Air v3 has a battery life of 8+ hours in standard tracking mode. In extended mode with GPS + LPS enabled, it lasts approximately 5 hours. For tournament settings, we recommend enabling Tournament Mode which optimizes battery usage for multi-day events.' },
  { role: 'user', message: 'How do I update the firmware?' },
  { role: 'ai', message: 'To update firmware on Edge Air devices:\n\n1. Open PlayerData app\n2. Go to Settings → Device Management\n3. Select the device(s) to update\n4. Tap "Check for Updates"\n5. Follow the on-screen prompts\n\nNote: Ensure devices are charged above 50% before updating.' },
];

export default function KnowledgePage() {
  const [query, setQuery] = useState('');
  const [chatMessage, setChatMessage] = useState('');

  return (
    <DashboardLayout>
      <div className="p-4 lg:p-6 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold">Knowledge Base</h1>
          <p className="text-gray-400 text-sm">847 documents indexed • Last sync: 5 minutes ago</p>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input 
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search documentation, guides, and more..."
            className="w-full pl-12 pr-4 py-4 bg-[#1E293B]/50 border border-white/10 rounded-xl text-sm focus:outline-none focus:border-[#0066FF]"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Categories & Docs */}
          <div className="lg:col-span-2 space-y-6">
            {/* Categories */}
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
              {categories.map((cat) => {
                const Icon = cat.icon;
                return (
                  <div 
                    key={cat.name}
                    className="p-4 bg-[#1E293B]/50 rounded-xl border border-white/5 hover:border-[#0066FF]/50 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 rounded-lg bg-[#0066FF]/20">
                        <Icon size={18} className="text-[#0066FF]" />
                      </div>
                    </div>
                    <p className="font-medium text-sm">{cat.name}</p>
                    <p className="text-xs text-gray-400">{cat.count} docs</p>
                  </div>
                );
              })}
            </div>

            {/* Recent Documents */}
            <div className="bg-[#1E293B]/50 rounded-xl border border-white/5 overflow-hidden">
              <div className="p-4 border-b border-white/10">
                <h3 className="font-semibold">Recently Updated</h3>
              </div>
              <div className="divide-y divide-white/5">
                {recentDocs.map((doc, i) => (
                  <div key={i} className="p-4 hover:bg-white/5 cursor-pointer transition-colors flex items-center gap-4">
                    <div className="p-2 rounded-lg bg-white/5">
                      <FileText size={20} className="text-gray-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{doc.title}</p>
                      <p className="text-xs text-gray-400">{doc.category}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-400">{doc.updated}</p>
                      <p className="text-xs text-gray-500">{doc.views} views</p>
                    </div>
                    <ChevronRight size={18} className="text-gray-400" />
                  </div>
                ))}
              </div>
            </div>

            {/* Data Sources */}
            <div className="bg-[#1E293B]/50 rounded-xl border border-white/5 p-4">
              <h3 className="font-semibold mb-4">Connected Sources</h3>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                {[
                  { name: 'Notion', docs: 423, status: 'synced' },
                  { name: 'HubSpot KB', docs: 156, status: 'synced' },
                  { name: 'Gong Calls', docs: 189, status: 'synced' },
                  { name: 'Slack', docs: 79, status: 'synced' },
                ].map((source) => (
                  <div key={source.name} className="p-3 rounded-lg bg-white/5">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="w-2 h-2 rounded-full bg-green-400"></span>
                      <span className="text-sm font-medium">{source.name}</span>
                    </div>
                    <p className="text-xs text-gray-400">{source.docs} documents</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* AI Chat */}
          <div className="bg-[#1E293B]/50 rounded-xl border border-white/5 flex flex-col h-[600px]">
            <div className="p-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Bot className="text-[#00D4FF]" size={20} />
                <h3 className="font-semibold">Ask Knowledge Base</h3>
              </div>
              <p className="text-xs text-gray-400 mt-1">AI-powered search across all docs</p>
            </div>
            
            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {chatHistory.map((msg, i) => (
                <div key={i} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}>
                  {msg.role === 'ai' && (
                    <div className="w-8 h-8 rounded-full bg-[#00D4FF]/20 flex items-center justify-center flex-shrink-0">
                      <Bot size={16} className="text-[#00D4FF]" />
                    </div>
                  )}
                  <div className={`max-w-[85%] p-3 rounded-xl text-sm ${
                    msg.role === 'user' 
                      ? 'bg-[#0066FF] text-white' 
                      : 'bg-white/5 text-gray-300'
                  }`}>
                    <p className="whitespace-pre-wrap">{msg.message}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-white/10">
              <div className="flex gap-2">
                <input 
                  type="text"
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  placeholder="Ask anything..."
                  className="flex-1 px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm focus:outline-none focus:border-[#0066FF]"
                />
                <button className="px-4 py-2.5 bg-[#0066FF] rounded-lg hover:bg-[#0055DD] transition-colors">
                  <Send size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
