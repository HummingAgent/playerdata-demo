'use client';

import DashboardLayout from '../components/DashboardLayout';
import { TrendingUp, TrendingDown, Users, Clock, Zap, Target } from 'lucide-react';
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
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar
} from 'recharts';

const monthlyData = [
  { month: 'Aug', tickets: 245, resolved: 230, aiResolved: 180 },
  { month: 'Sep', tickets: 312, resolved: 298, aiResolved: 245 },
  { month: 'Oct', tickets: 287, resolved: 275, aiResolved: 225 },
  { month: 'Nov', tickets: 356, resolved: 340, aiResolved: 290 },
  { month: 'Dec', tickets: 298, resolved: 285, aiResolved: 248 },
  { month: 'Jan', tickets: 423, resolved: 410, aiResolved: 358 },
  { month: 'Feb', tickets: 289, resolved: 276, aiResolved: 234 },
];

const hourlyDistribution = [
  { hour: '00', tickets: 5 }, { hour: '02', tickets: 3 }, { hour: '04', tickets: 2 },
  { hour: '06', tickets: 8 }, { hour: '08', tickets: 25 }, { hour: '10', tickets: 45 },
  { hour: '12', tickets: 38 }, { hour: '14', tickets: 52 }, { hour: '16', tickets: 48 },
  { hour: '18', tickets: 32 }, { hour: '20', tickets: 18 }, { hour: '22', tickets: 12 },
];

const categoryBreakdown = [
  { name: 'Technical', value: 45, color: '#0066FF' },
  { name: 'Billing', value: 15, color: '#00D4FF' },
  { name: 'Onboarding', value: 20, color: '#6366F1' },
  { name: 'Feature Request', value: 12, color: '#8B5CF6' },
  { name: 'Other', value: 8, color: '#A855F7' },
];

const satisfactionTrend = [
  { week: 'W1', score: 94 }, { week: 'W2', score: 96 }, { week: 'W3', score: 95 },
  { week: 'W4', score: 98 }, { week: 'W5', score: 97 }, { week: 'W6', score: 98 },
];

const agentPerformance = [
  { subject: 'Response Time', A: 95, fullMark: 100 },
  { subject: 'Resolution Rate', A: 92, fullMark: 100 },
  { subject: 'Accuracy', A: 98, fullMark: 100 },
  { subject: 'Coverage', A: 85, fullMark: 100 },
  { subject: 'Satisfaction', A: 96, fullMark: 100 },
];

const responseTimeData = [
  { day: 'Mon', human: 12, ai: 2 },
  { day: 'Tue', human: 15, ai: 1.8 },
  { day: 'Wed', human: 11, ai: 2.1 },
  { day: 'Thu', human: 18, ai: 1.9 },
  { day: 'Fri', human: 14, ai: 2.0 },
  { day: 'Sat', human: 8, ai: 1.5 },
  { day: 'Sun', human: 6, ai: 1.4 },
];

export default function AnalyticsPage() {
  return (
    <DashboardLayout>
      <div className="p-4 lg:p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Analytics</h1>
            <p className="text-gray-400 text-sm">Performance insights and trends</p>
          </div>
          <select className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm">
            <option>Last 30 days</option>
            <option>Last 90 days</option>
            <option>This year</option>
          </select>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Total Tickets" value="2,210" change="+18%" trend="up" icon={<Target size={20} />} />
          <StatCard label="Avg Response" value="2.4m" change="-45%" trend="down" icon={<Clock size={20} />} />
          <StatCard label="AI Resolution" value="82%" change="+12%" trend="up" icon={<Zap size={20} />} />
          <StatCard label="Active Users" value="1,847" change="+8%" trend="up" icon={<Users size={20} />} />
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Ticket Trend */}
          <div className="bg-[#1E293B]/50 rounded-2xl p-4 lg:p-6 border border-white/5">
            <h3 className="font-semibold mb-4">Ticket Volume Trend</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyData}>
                  <defs>
                    <linearGradient id="colorTickets" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0066FF" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#0066FF" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorAI" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00D4FF" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#00D4FF" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="month" stroke="#9CA3AF" fontSize={12} />
                  <YAxis stroke="#9CA3AF" fontSize={12} />
                  <Tooltip contentStyle={{ backgroundColor: '#1E293B', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }} />
                  <Area type="monotone" dataKey="tickets" stroke="#0066FF" fill="url(#colorTickets)" strokeWidth={2} />
                  <Area type="monotone" dataKey="aiResolved" stroke="#00D4FF" fill="url(#colorAI)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="flex gap-6 mt-4">
              <div className="flex items-center gap-2 text-sm">
                <span className="w-3 h-3 rounded-full bg-[#0066FF]"></span>
                <span className="text-gray-400">Total</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="w-3 h-3 rounded-full bg-[#00D4FF]"></span>
                <span className="text-gray-400">AI Resolved</span>
              </div>
            </div>
          </div>

          {/* Hourly Distribution */}
          <div className="bg-[#1E293B]/50 rounded-2xl p-4 lg:p-6 border border-white/5">
            <h3 className="font-semibold mb-4">Hourly Distribution</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={hourlyDistribution}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="hour" stroke="#9CA3AF" fontSize={12} />
                  <YAxis stroke="#9CA3AF" fontSize={12} />
                  <Tooltip contentStyle={{ backgroundColor: '#1E293B', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }} />
                  <Bar dataKey="tickets" fill="#0066FF" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-sm text-gray-400 mt-4">Peak hours: 2PM - 4PM (UTC)</p>
          </div>
        </div>

        {/* Charts Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Category Breakdown */}
          <div className="bg-[#1E293B]/50 rounded-2xl p-4 lg:p-6 border border-white/5">
            <h3 className="font-semibold mb-4">By Category</h3>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={categoryBreakdown} cx="50%" cy="50%" innerRadius={45} outerRadius={70} paddingAngle={3} dataKey="value">
                    {categoryBreakdown.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: '#1E293B', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2 mt-4">
              {categoryBreakdown.map((item) => (
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

          {/* CSAT Trend */}
          <div className="bg-[#1E293B]/50 rounded-2xl p-4 lg:p-6 border border-white/5">
            <h3 className="font-semibold mb-4">Customer Satisfaction</h3>
            <div className="text-center mb-4">
              <p className="text-4xl font-bold text-[#00D4FF]">98%</p>
              <p className="text-sm text-gray-400">Current CSAT</p>
            </div>
            <div className="h-32">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={satisfactionTrend}>
                  <Line type="monotone" dataKey="score" stroke="#00D4FF" strokeWidth={2} dot={{ fill: '#00D4FF' }} />
                  <Tooltip contentStyle={{ backgroundColor: '#1E293B', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <p className="text-sm text-green-400 text-center mt-2">↑ 4% from last month</p>
          </div>

          {/* AI Performance Radar */}
          <div className="bg-[#1E293B]/50 rounded-2xl p-4 lg:p-6 border border-white/5">
            <h3 className="font-semibold mb-4">AI Agent Performance</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={agentPerformance}>
                  <PolarGrid stroke="#374151" />
                  <PolarAngleAxis dataKey="subject" stroke="#9CA3AF" fontSize={11} />
                  <Radar name="Performance" dataKey="A" stroke="#0066FF" fill="#0066FF" fillOpacity={0.3} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Response Time Comparison */}
        <div className="bg-[#1E293B]/50 rounded-2xl p-4 lg:p-6 border border-white/5">
          <h3 className="font-semibold mb-4">Response Time: Human vs AI (minutes)</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={responseTimeData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis type="number" stroke="#9CA3AF" fontSize={12} />
                <YAxis dataKey="day" type="category" stroke="#9CA3AF" fontSize={12} />
                <Tooltip contentStyle={{ backgroundColor: '#1E293B', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }} />
                <Bar dataKey="human" fill="#6366F1" radius={[0, 4, 4, 0]} name="Human" />
                <Bar dataKey="ai" fill="#00D4FF" radius={[0, 4, 4, 0]} name="AI" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex gap-6 mt-4">
            <div className="flex items-center gap-2 text-sm">
              <span className="w-3 h-3 rounded-full bg-[#6366F1]"></span>
              <span className="text-gray-400">Human Agents</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="w-3 h-3 rounded-full bg-[#00D4FF]"></span>
              <span className="text-gray-400">AI Agent</span>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function StatCard({ label, value, change, trend, icon }: { label: string; value: string; change: string; trend: 'up' | 'down'; icon: React.ReactNode }) {
  return (
    <div className="bg-[#1E293B]/50 rounded-2xl p-4 lg:p-5 border border-white/5">
      <div className="flex items-center justify-between mb-3">
        <div className="p-2 rounded-lg bg-white/5 text-[#0066FF]">{icon}</div>
        <div className={`flex items-center gap-1 text-xs ${trend === 'up' ? 'text-green-400' : 'text-green-400'}`}>
          {trend === 'up' ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
          {change}
        </div>
      </div>
      <p className="text-2xl lg:text-3xl font-bold">{value}</p>
      <p className="text-sm text-gray-400 mt-1">{label}</p>
    </div>
  );
}
