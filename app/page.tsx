'use client';

import { useState } from 'react';
import Image from 'next/image';

// Mock data
const mockTickets = [
  { id: 'TKT-2847', customer: 'IMG Academy', product: 'Edge Air v3', status: 'ai-drafted', priority: 'vip', subject: 'Battery calibration issue during tournament', time: '2h ago' },
  { id: 'TKT-2846', customer: 'Crystal Palace FC', product: 'Edge Air v3', status: 'pending', priority: 'vip', subject: 'Live data sync delay', time: '3h ago' },
  { id: 'TKT-2845', customer: 'Allen High School', product: 'Edge Air v2', status: 'ai-drafted', priority: 'normal', subject: 'App not showing historical data', time: '4h ago' },
  { id: 'TKT-2844', customer: 'Boston Bolts', product: 'IMU System', status: 'resolved', priority: 'normal', subject: 'Indoor tracking setup help', time: '5h ago' },
  { id: 'TKT-2843', customer: 'Villanova', product: 'Edge Air v3', status: 'ai-drafted', priority: 'normal', subject: 'Export data to CSV format', time: '6h ago' },
];

const mockMetrics = {
  ticketsToday: 23,
  aiResolved: 18,
  avgResponseTime: '4m',
  satisfaction: 98,
  vipTickets: 3,
  overnightDrafts: 7,
};

const productVersions = [
  { name: 'Edge Air v3', tickets: 45, health: 'good' },
  { name: 'Edge Air v2', tickets: 28, health: 'good' },
  { name: 'Edge Air v1', tickets: 12, health: 'warning' },
  { name: 'IMU System', tickets: 8, health: 'good' },
  { name: 'Smart Ball', tickets: 3, health: 'good' },
];

export default function Dashboard() {
  const [selectedTicket, setSelectedTicket] = useState(mockTickets[0]);
  const [chatMessage, setChatMessage] = useState('');

  return (
    <div className="min-h-screen gradient-dark">
      {/* Header */}
      <header className="border-b border-white/10 px-6 py-4">
        <div className="max-w-[1800px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-[#0066FF] flex items-center justify-center font-bold text-xl">
              PD
            </div>
            <div>
              <h1 className="text-xl font-bold">PlayerData</h1>
              <p className="text-sm text-gray-400">Support Intelligence Hub</p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/20 text-green-400">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
              <span className="text-sm font-medium">AI Agent Active</span>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-400">Powered by</p>
              <p className="text-sm font-semibold text-[#00D4FF]">HummingAgent</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-[1800px] mx-auto p-6">
        {/* Metrics Row */}
        <div className="grid grid-cols-6 gap-4 mb-6">
          <MetricCard label="Tickets Today" value={mockMetrics.ticketsToday.toString()} icon="📥" />
          <MetricCard label="AI Resolved" value={mockMetrics.aiResolved.toString()} icon="🤖" accent />
          <MetricCard label="Avg Response" value={mockMetrics.avgResponseTime} icon="⚡" />
          <MetricCard label="Satisfaction" value={`${mockMetrics.satisfaction}%`} icon="⭐" />
          <MetricCard label="VIP Active" value={mockMetrics.vipTickets.toString()} icon="👑" warning />
          <MetricCard label="Overnight Drafts" value={mockMetrics.overnightDrafts.toString()} icon="🌙" accent />
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-12 gap-6">
          {/* Left Column - Ticket Queue */}
          <div className="col-span-4 gradient-card rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Ticket Queue</h2>
              <div className="flex gap-2">
                <button className="px-3 py-1 text-xs rounded-full bg-[#0066FF]/20 text-[#0066FF]">All</button>
                <button className="px-3 py-1 text-xs rounded-full bg-white/5 text-gray-400 hover:bg-white/10">VIP</button>
                <button className="px-3 py-1 text-xs rounded-full bg-white/5 text-gray-400 hover:bg-white/10">AI Ready</button>
              </div>
            </div>
            <div className="space-y-3">
              {mockTickets.map((ticket) => (
                <div
                  key={ticket.id}
                  onClick={() => setSelectedTicket(ticket)}
                  className={`p-4 rounded-xl cursor-pointer transition-all ${
                    selectedTicket.id === ticket.id
                      ? 'bg-[#0066FF]/20 border border-[#0066FF]/50'
                      : 'bg-white/5 hover:bg-white/10 border border-transparent'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-gray-400">{ticket.id}</span>
                      {ticket.priority === 'vip' && (
                        <span className="px-2 py-0.5 text-xs rounded-full bg-amber-500/20 text-amber-400">VIP</span>
                      )}
                      {ticket.status === 'ai-drafted' && (
                        <span className="px-2 py-0.5 text-xs rounded-full bg-[#00D4FF]/20 text-[#00D4FF]">AI Draft Ready</span>
                      )}
                    </div>
                    <span className="text-xs text-gray-500">{ticket.time}</span>
                  </div>
                  <p className="font-medium text-sm mb-1">{ticket.subject}</p>
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <span>{ticket.customer}</span>
                    <span>•</span>
                    <span>{ticket.product}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Center Column - AI Response */}
          <div className="col-span-5 gradient-card rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-semibold">AI Response Draft</h2>
                <p className="text-sm text-gray-400">{selectedTicket.id} • {selectedTicket.customer}</p>
              </div>
              <div className="flex gap-2">
                <button className="px-4 py-2 text-sm rounded-lg bg-white/10 hover:bg-white/20">
                  Regenerate
                </button>
                <button className="px-4 py-2 text-sm rounded-lg bg-[#0066FF] hover:bg-[#0055DD]">
                  Send Response
                </button>
              </div>
            </div>

            {/* Product Info Banner */}
            <div className="mb-4 p-3 rounded-lg bg-white/5 border border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#0066FF]/20 flex items-center justify-center">
                  📡
                </div>
                <div>
                  <p className="text-sm font-medium">Detected Product: {selectedTicket.product}</p>
                  <p className="text-xs text-gray-400">Firmware: v3.2.1 • Last Sync: 2 days ago • Battery: 78%</p>
                </div>
              </div>
            </div>

            {/* AI Draft */}
            <div className="bg-white/5 rounded-xl p-4 mb-4">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-6 h-6 rounded-full bg-[#00D4FF]/20 flex items-center justify-center text-xs">🤖</span>
                <span className="text-sm font-medium text-[#00D4FF]">AI Generated Response</span>
              </div>
              <div className="text-sm text-gray-300 space-y-3">
                <p>Hi Team,</p>
                <p>Thank you for reaching out about the battery calibration issue you experienced during the tournament.</p>
                <p>Based on your Edge Air v3 devices (firmware v3.2.1), this appears to be related to the extended tracking mode being enabled. Here are the recommended steps:</p>
                <ol className="list-decimal ml-4 space-y-1">
                  <li>Open the PlayerData app and navigate to Settings → Device Management</li>
                  <li>Select each affected unit and tap "Recalibrate Battery"</li>
                  <li>Ensure units are charged to 100% before the next session</li>
                  <li>If the issue persists, enable "Tournament Mode" which optimizes battery usage</li>
                </ol>
                <p>I have also flagged this for our engineering team as we are seeing a pattern with v3.2.1 firmware. A patch will be included in the next update.</p>
                <p>Let me know if you need any additional assistance!</p>
              </div>
            </div>

            {/* Knowledge Sources */}
            <div className="border-t border-white/10 pt-4">
              <p className="text-xs text-gray-400 mb-2">Sources Used</p>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 text-xs rounded bg-white/5">📄 Edge Air v3 Manual</span>
                <span className="px-2 py-1 text-xs rounded bg-white/5">💬 Similar Ticket #2801</span>
                <span className="px-2 py-1 text-xs rounded bg-white/5">📋 Battery Calibration SOP</span>
                <span className="px-2 py-1 text-xs rounded bg-white/5">🐛 Known Issue KB-445</span>
              </div>
            </div>
          </div>

          {/* Right Column - Product Agents & Chat */}
          <div className="col-span-3 space-y-6">
            {/* Product Agents */}
            <div className="gradient-card rounded-2xl p-5">
              <h2 className="text-lg font-semibold mb-4">Product Agents</h2>
              <div className="space-y-3">
                {productVersions.map((product) => (
                  <div key={product.name} className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${product.health === 'good' ? 'bg-green-400' : 'bg-amber-400'}`}></div>
                      <span className="text-sm font-medium">{product.name}</span>
                    </div>
                    <span className="text-xs text-gray-400">{product.tickets} tickets</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Internal Chat */}
            <div className="gradient-card rounded-2xl p-5 flex-1">
              <h2 className="text-lg font-semibold mb-4">Ask Knowledge Base</h2>
              <div className="bg-white/5 rounded-xl p-4 mb-4 h-40 overflow-y-auto">
                <div className="space-y-3 text-sm">
                  <div className="flex gap-2">
                    <span className="text-gray-400">You:</span>
                    <span>What&apos;s the battery life for Edge Air v3?</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-[#00D4FF]">AI:</span>
                    <span className="text-gray-300">Edge Air v3 has 8+ hours battery life in standard mode, 5 hours in extended tracking mode with GPS + LPS enabled.</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  placeholder="Ask about any product..."
                  className="flex-1 px-4 py-2 rounded-lg bg-white/10 border border-white/10 text-sm focus:outline-none focus:border-[#0066FF]"
                />
                <button className="px-4 py-2 rounded-lg bg-[#0066FF] hover:bg-[#0055DD]">
                  Ask
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Stats */}
        <div className="mt-6 grid grid-cols-4 gap-4">
          <div className="gradient-card rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-400">HubSpot</span>
              <span className="w-2 h-2 rounded-full bg-green-400"></span>
            </div>
            <p className="text-2xl font-bold">Connected</p>
            <p className="text-xs text-gray-500">Last sync: 2 min ago</p>
          </div>
          <div className="gradient-card rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-400">Notion</span>
              <span className="w-2 h-2 rounded-full bg-green-400"></span>
            </div>
            <p className="text-2xl font-bold">847 docs</p>
            <p className="text-xs text-gray-500">Indexed & searchable</p>
          </div>
          <div className="gradient-card rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-400">Gong</span>
              <span className="w-2 h-2 rounded-full bg-green-400"></span>
            </div>
            <p className="text-2xl font-bold">156 calls</p>
            <p className="text-xs text-gray-500">Transcripts analyzed</p>
          </div>
          <div className="gradient-card rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-400">Slack</span>
              <span className="w-2 h-2 rounded-full bg-green-400"></span>
            </div>
            <p className="text-2xl font-bold">12 channels</p>
            <p className="text-xs text-gray-500">Monitoring active</p>
          </div>
        </div>
      </main>
    </div>
  );
}

function MetricCard({ label, value, icon, accent, warning }: { label: string; value: string; icon: string; accent?: boolean; warning?: boolean }) {
  return (
    <div className={`gradient-card rounded-xl p-4 ${accent ? 'glow-blue' : ''}`}>
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xl">{icon}</span>
        <span className="text-xs text-gray-400">{label}</span>
      </div>
      <p className={`text-2xl font-bold ${accent ? 'text-[#00D4FF]' : warning ? 'text-amber-400' : ''}`}>{value}</p>
    </div>
  );
}
