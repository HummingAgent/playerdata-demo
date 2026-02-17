'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import DashboardLayout from './components/DashboardLayout';
import { 
  TrendingUp, 
  TrendingDown, 
  Ticket, 
  Clock, 
  Star, 
  Bot,
  ArrowUpRight,
  MoreVertical,
  CheckCircle2,
  AlertCircle,
  MessageSquare
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from 'recharts';

// Mock data
const ticketTrend = [
  { name: 'Mon', tickets: 45, resolved: 42 },
  { name: 'Tue', tickets: 52, resolved: 48 },
  { name: 'Wed', tickets: 38, resolved: 36 },
  { name: 'Thu', tickets: 65, resolved: 58 },
  { name: 'Fri', tickets: 48, resolved: 45 },
  { name: 'Sat', tickets: 23, resolved: 22 },
  { name: 'Sun', tickets: 18, resolved: 17 },
];

const responseTime = [
  { time: '00:00', value: 4.2 },
  { time: '04:00', value: 3.8 },
  { time: '08:00', value: 5.1 },
  { time: '12:00', value: 4.5 },
  { time: '16:00', value: 3.9 },
  { time: '20:00', value: 4.0 },
];

const productBreakdown = [
  { name: 'Edge Air v3', value: 45, color: '#0066FF' },
  { name: 'Edge Air v2', value: 28, color: '#00D4FF' },
  { name: 'Edge Air v1', value: 15, color: '#6366F1' },
  { name: 'IMU System', value: 8, color: '#8B5CF6' },
  { name: 'Smart Ball', value: 4, color: '#A855F7' },
];

const recentTickets = [
  { id: 'TKT-2847', customer: 'IMG Academy', subject: 'Battery calibration issue', status: 'ai-draft', priority: 'vip', time: '2h' },
  { id: 'TKT-2846', customer: 'Crystal Palace FC', subject: 'Live data sync delay', status: 'pending', priority: 'vip', time: '3h' },
  { id: 'TKT-2845', customer: 'Allen High School', subject: 'App historical data', status: 'ai-draft', priority: 'normal', time: '4h' },
  { id: 'TKT-2844', customer: 'Boston Bolts', subject: 'Indoor tracking setup', status: 'resolved', priority: 'normal', time: '5h' },
];

const agentActivity = [
  { agent: 'Edge Air v3 Agent', queries: 156, accuracy: 98 },
  { agent: 'Edge Air v2 Agent', queries: 89, accuracy: 96 },
  { agent: 'General Support', queries: 234, accuracy: 94 },
  { agent: 'IMU Specialist', queries: 45, accuracy: 99 },
];

export default function Dashboard() {
  const { data: session } = useSession();

  return (
    <DashboardLayout>
      <div className="p-4 lg:p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p className="text-gray-400 text-sm">Welcome back, {session?.user?.name?.split(' ')[0]}</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/20 text-green-400">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
              <span className="text-sm font-medium">AI Active</span>
            </div>
            <button className="px-4 py-2 bg-[#0066FF] rounded-lg text-sm font-medium hover:bg-[#0055DD] transition-colors">
              New Ticket
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            label="Total Tickets"
            value="289"
            change="+12%"
            trend="up"
            icon={<Ticket className="text-[#0066FF]" size={20} />}
          />
          <StatCard
            label="AI Resolved"
            value="78%"
            change="+5%"
            trend="up"
            icon={<Bot className="text-[#00D4FF]" size={20} />}
          />
          <StatCard
            label="Avg Response"
            value="4.2m"
            change="-18%"
            trend="down"
            icon={<Clock className="text-purple-400" size={20} />}
          />
          <StatCard
            label="Satisfaction"
            value="98%"
            change="+2%"
            trend="up"
            icon={<Star className="text-amber-400" size={20} />}
          />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Ticket Trend Chart */}
          <div className="lg:col-span-2 bg-[#1E293B]/50 rounded-2xl p-4 lg:p-6 border border-white/5">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-semibold">Ticket Volume</h3>
                <p className="text-sm text-gray-400">Last 7 days</p>
              </div>
              <select className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-sm">
                <option>This Week</option>
                <option>Last Week</option>
                <option>This Month</option>
              </select>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={ticketTrend}>
                  <defs>
                    <linearGradient id="ticketGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0066FF" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#0066FF" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="resolvedGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00D4FF" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#00D4FF" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="name" stroke="#9CA3AF" fontSize={12} />
                  <YAxis stroke="#9CA3AF" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1E293B', 
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '8px'
                    }}
                  />
                  <Area type="monotone" dataKey="tickets" stroke="#0066FF" fill="url(#ticketGradient)" strokeWidth={2} />
                  <Area type="monotone" dataKey="resolved" stroke="#00D4FF" fill="url(#resolvedGradient)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="flex items-center gap-6 mt-4">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#0066FF]"></span>
                <span className="text-sm text-gray-400">Incoming</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#00D4FF]"></span>
                <span className="text-sm text-gray-400">Resolved</span>
              </div>
            </div>
          </div>

          {/* Product Breakdown */}
          <div className="bg-[#1E293B]/50 rounded-2xl p-4 lg:p-6 border border-white/5">
            <h3 className="font-semibold mb-6">By Product</h3>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={productBreakdown}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={70}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {productBreakdown.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1E293B', 
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '8px'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2 mt-4">
              {productBreakdown.map((item) => (
                <div key={item.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></span>
                    <span className="text-gray-300">{item.name}</span>
                  </div>
                  <span className="text-gray-400">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Recent Tickets */}
          <div className="bg-[#1E293B]/50 rounded-2xl p-4 lg:p-6 border border-white/5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Recent Tickets</h3>
              <button className="text-sm text-[#0066FF] hover:underline">View All</button>
            </div>
            <div className="space-y-3">
              {recentTickets.map((ticket) => (
                <div key={ticket.id} className="flex items-center gap-4 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer">
                  <div className={`
                    w-10 h-10 rounded-full flex items-center justify-center
                    ${ticket.status === 'resolved' ? 'bg-green-500/20 text-green-400' : 
                      ticket.status === 'ai-draft' ? 'bg-[#00D4FF]/20 text-[#00D4FF]' : 
                      'bg-amber-500/20 text-amber-400'}
                  `}>
                    {ticket.status === 'resolved' ? <CheckCircle2 size={20} /> : 
                     ticket.status === 'ai-draft' ? <Bot size={20} /> : 
                     <AlertCircle size={20} />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium truncate">{ticket.subject}</span>
                      {ticket.priority === 'vip' && (
                        <span className="px-1.5 py-0.5 text-xs rounded bg-amber-500/20 text-amber-400">VIP</span>
                      )}
                    </div>
                    <p className="text-xs text-gray-400">{ticket.customer} • {ticket.id}</p>
                  </div>
                  <span className="text-xs text-gray-500">{ticket.time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* AI Agent Activity */}
          <div className="bg-[#1E293B]/50 rounded-2xl p-4 lg:p-6 border border-white/5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">AI Agent Performance</h3>
              <button className="p-1 hover:bg-white/10 rounded">
                <MoreVertical size={18} className="text-gray-400" />
              </button>
            </div>
            <div className="space-y-4">
              {agentActivity.map((agent) => (
                <div key={agent.agent} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-300">{agent.agent}</span>
                    <span className="text-gray-400">{agent.queries} queries</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-[#0066FF] to-[#00D4FF] rounded-full"
                        style={{ width: `${agent.accuracy}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-[#00D4FF]">{agent.accuracy}%</span>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Response Time Mini Chart */}
            <div className="mt-6 pt-4 border-t border-white/10">
              <p className="text-sm text-gray-400 mb-3">Response Time (minutes)</p>
              <div className="h-24">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={responseTime}>
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#00D4FF" 
                      strokeWidth={2}
                      dot={false}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1E293B', 
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '8px'
                      }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function StatCard({ label, value, change, trend, icon }: { 
  label: string; 
  value: string; 
  change: string;
  trend: 'up' | 'down';
  icon: React.ReactNode;
}) {
  return (
    <div className="bg-[#1E293B]/50 rounded-2xl p-4 lg:p-5 border border-white/5">
      <div className="flex items-center justify-between mb-3">
        <div className="p-2 rounded-lg bg-white/5">{icon}</div>
        <div className={`flex items-center gap-1 text-xs ${trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
          {trend === 'up' ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
          {change}
        </div>
      </div>
      <p className="text-2xl lg:text-3xl font-bold">{value}</p>
      <p className="text-sm text-gray-400 mt-1">{label}</p>
    </div>
  );
}
