'use client';

import { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { 
  Search, 
  Filter, 
  Bot, 
  CheckCircle2, 
  AlertCircle, 
  Clock,
  ChevronRight,
  Send,
  RefreshCw,
  Star
} from 'lucide-react';

const tickets = [
  { id: 'TKT-2847', customer: 'IMG Academy', email: 'support@imgacademy.com', product: 'Edge Air v3', status: 'ai-draft', priority: 'vip', subject: 'Battery calibration issue during tournament weekend', time: '2 hours ago', assignee: 'AI Agent' },
  { id: 'TKT-2846', customer: 'Crystal Palace FC', email: 'tech@cpfc.co.uk', product: 'Edge Air v3', status: 'pending', priority: 'vip', subject: 'Live data sync delay during match', time: '3 hours ago', assignee: 'Unassigned' },
  { id: 'TKT-2845', customer: 'Allen High School', email: 'coach@alleneagles.com', product: 'Edge Air v2', status: 'ai-draft', priority: 'normal', subject: 'App not showing historical data from last season', time: '4 hours ago', assignee: 'AI Agent' },
  { id: 'TKT-2844', customer: 'Boston Bolts', email: 'admin@bostonbolts.com', product: 'IMU System', status: 'resolved', priority: 'normal', subject: 'Indoor tracking setup assistance needed', time: '5 hours ago', assignee: 'Luke W.' },
  { id: 'TKT-2843', customer: 'Villanova University', email: 'athletics@villanova.edu', product: 'Edge Air v3', status: 'ai-draft', priority: 'normal', subject: 'Export data to CSV format for analysis', time: '6 hours ago', assignee: 'AI Agent' },
  { id: 'TKT-2842', customer: 'LA Galaxy Academy', email: 'youth@lagalaxy.com', product: 'Edge Air v3', status: 'in-progress', priority: 'high', subject: 'Firmware update failing on multiple units', time: '7 hours ago', assignee: 'Roy T.' },
  { id: 'TKT-2841', customer: 'Manchester City WFC', email: 'perf@mancity.com', product: 'Edge Air v3', status: 'resolved', priority: 'vip', subject: 'Integration with existing performance system', time: '8 hours ago', assignee: 'AI Agent' },
];

const draftResponse = `Hi Team,

Thank you for reaching out about the battery calibration issue you experienced during the tournament weekend.

Based on your Edge Air v3 devices (firmware v3.2.1), this appears to be related to the extended tracking mode being enabled during high-intensity sessions. Here are the recommended steps:

1. Open the PlayerData app and navigate to Settings → Device Management
2. Select each affected unit and tap "Recalibrate Battery"
3. Ensure units are charged to 100% before the next session
4. Enable "Tournament Mode" which optimizes battery usage for multi-day events

I've also flagged this for our engineering team as we're seeing a pattern with v3.2.1 firmware. A patch will be included in the next update (ETA: end of week).

Please let me know if you need any additional assistance!

Best regards,
PlayerData Support`;

export default function TicketsPage() {
  const [selectedTicket, setSelectedTicket] = useState(tickets[0]);
  const [filter, setFilter] = useState('all');

  const filteredTickets = tickets.filter(t => {
    if (filter === 'all') return true;
    if (filter === 'ai-draft') return t.status === 'ai-draft';
    if (filter === 'vip') return t.priority === 'vip';
    if (filter === 'pending') return t.status === 'pending' || t.status === 'in-progress';
    return true;
  });

  return (
    <DashboardLayout>
      <div className="h-[calc(100vh-4rem)] lg:h-screen flex flex-col lg:flex-row">
        {/* Ticket List */}
        <div className="w-full lg:w-96 border-b lg:border-b-0 lg:border-r border-white/10 flex flex-col">
          {/* Search & Filter */}
          <div className="p-4 border-b border-white/10 space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text"
                placeholder="Search tickets..."
                className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm focus:outline-none focus:border-[#0066FF]"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-1">
              {['all', 'ai-draft', 'vip', 'pending'].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-3 py-1.5 text-xs rounded-full whitespace-nowrap transition-colors ${
                    filter === f 
                      ? 'bg-[#0066FF] text-white' 
                      : 'bg-white/5 text-gray-400 hover:bg-white/10'
                  }`}
                >
                  {f === 'all' ? 'All' : f === 'ai-draft' ? 'AI Ready' : f === 'vip' ? 'VIP' : 'Pending'}
                </button>
              ))}
            </div>
          </div>

          {/* Ticket List */}
          <div className="flex-1 overflow-y-auto">
            {filteredTickets.map((ticket) => (
              <div
                key={ticket.id}
                onClick={() => setSelectedTicket(ticket)}
                className={`p-4 border-b border-white/5 cursor-pointer transition-colors ${
                  selectedTicket.id === ticket.id ? 'bg-[#0066FF]/10' : 'hover:bg-white/5'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <StatusBadge status={ticket.status} />
                    {ticket.priority === 'vip' && (
                      <span className="px-1.5 py-0.5 text-xs rounded bg-amber-500/20 text-amber-400">VIP</span>
                    )}
                  </div>
                  <span className="text-xs text-gray-500">{ticket.time}</span>
                </div>
                <p className="font-medium text-sm mb-1 line-clamp-1">{ticket.subject}</p>
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <span>{ticket.customer}</span>
                  <span>•</span>
                  <span>{ticket.product}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Ticket Detail */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="p-4 lg:p-6 border-b border-white/10">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-lg font-semibold">{selectedTicket.subject}</h2>
                </div>
                <div className="flex flex-wrap items-center gap-3 text-sm text-gray-400">
                  <span className="font-mono">{selectedTicket.id}</span>
                  <span>•</span>
                  <span>{selectedTicket.customer}</span>
                  <span>•</span>
                  <span>{selectedTicket.email}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <StatusBadge status={selectedTicket.status} large />
                {selectedTicket.priority === 'vip' && (
                  <span className="px-2 py-1 text-xs rounded-full bg-amber-500/20 text-amber-400 flex items-center gap-1">
                    <Star size={12} /> VIP
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4 lg:p-6 space-y-4">
            {/* Product Info */}
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#0066FF]/20 flex items-center justify-center text-2xl">
                  📡
                </div>
                <div>
                  <p className="font-medium">{selectedTicket.product}</p>
                  <p className="text-sm text-gray-400">Firmware: v3.2.1 • Last Sync: 2 days ago • 5 units</p>
                </div>
              </div>
            </div>

            {/* AI Draft */}
            {selectedTicket.status === 'ai-draft' && (
              <div className="rounded-xl bg-gradient-to-r from-[#0066FF]/10 to-[#00D4FF]/10 border border-[#0066FF]/30 p-4 lg:p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Bot className="text-[#00D4FF]" size={20} />
                  <span className="font-medium text-[#00D4FF]">AI Generated Draft</span>
                  <span className="ml-auto text-xs text-gray-400">98% confidence</span>
                </div>
                <div className="bg-black/20 rounded-lg p-4 text-sm text-gray-300 whitespace-pre-wrap font-mono">
                  {draftResponse}
                </div>
                <div className="flex flex-col lg:flex-row gap-3 mt-4">
                  <button className="flex-1 px-4 py-2.5 bg-[#0066FF] rounded-lg text-sm font-medium hover:bg-[#0055DD] transition-colors flex items-center justify-center gap-2">
                    <Send size={16} />
                    Send Response
                  </button>
                  <button className="px-4 py-2.5 bg-white/10 rounded-lg text-sm font-medium hover:bg-white/20 transition-colors flex items-center justify-center gap-2">
                    <RefreshCw size={16} />
                    Regenerate
                  </button>
                </div>
                
                {/* Sources */}
                <div className="mt-4 pt-4 border-t border-white/10">
                  <p className="text-xs text-gray-400 mb-2">Knowledge Sources Used</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 text-xs rounded bg-white/5">📄 Edge Air v3 Manual</span>
                    <span className="px-2 py-1 text-xs rounded bg-white/5">💬 Similar: TKT-2801</span>
                    <span className="px-2 py-1 text-xs rounded bg-white/5">📋 Battery SOP</span>
                    <span className="px-2 py-1 text-xs rounded bg-white/5">🐛 KB-445</span>
                  </div>
                </div>
              </div>
            )}

            {/* Customer Message */}
            <div className="p-4 rounded-xl bg-white/5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center text-sm font-medium text-purple-400">
                  IA
                </div>
                <div>
                  <p className="text-sm font-medium">{selectedTicket.customer}</p>
                  <p className="text-xs text-gray-400">{selectedTicket.time}</p>
                </div>
              </div>
              <p className="text-sm text-gray-300">
                We experienced battery issues with several of our Edge Air units during our tournament this weekend. 
                Units were showing low battery after only 3 hours of use when they should last 8+. 
                This caused disruptions during critical matches. Please advise on how to resolve this issue 
                before our next event.
              </p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function StatusBadge({ status, large }: { status: string; large?: boolean }) {
  const config = {
    'ai-draft': { icon: Bot, label: 'AI Draft', class: 'bg-[#00D4FF]/20 text-[#00D4FF]' },
    'pending': { icon: Clock, label: 'Pending', class: 'bg-amber-500/20 text-amber-400' },
    'in-progress': { icon: AlertCircle, label: 'In Progress', class: 'bg-blue-500/20 text-blue-400' },
    'resolved': { icon: CheckCircle2, label: 'Resolved', class: 'bg-green-500/20 text-green-400' },
  }[status] || { icon: Clock, label: status, class: 'bg-gray-500/20 text-gray-400' };

  const Icon = config.icon;

  return (
    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs ${config.class} ${large ? 'text-sm px-3 py-1.5' : ''}`}>
      <Icon size={large ? 14 : 12} />
      {config.label}
    </span>
  );
}
