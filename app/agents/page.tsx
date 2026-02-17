'use client';

import DashboardLayout from '../components/DashboardLayout';
import { Bot, Activity, Zap, CheckCircle2, Settings, Play, Pause } from 'lucide-react';

const agents = [
  { 
    name: 'Edge Air v3 Specialist', 
    status: 'active', 
    queries: 1234, 
    accuracy: 98, 
    avgResponse: '1.2s',
    description: 'Handles all Edge Air v3 related queries including firmware, battery, and sync issues.',
    lastActive: '2 min ago',
    model: 'GPT-4 Turbo'
  },
  { 
    name: 'Edge Air v2 Specialist', 
    status: 'active', 
    queries: 856, 
    accuracy: 96, 
    avgResponse: '1.4s',
    description: 'Legacy support for Edge Air v2 devices and compatibility questions.',
    lastActive: '5 min ago',
    model: 'GPT-4 Turbo'
  },
  { 
    name: 'General Support Agent', 
    status: 'active', 
    queries: 2341, 
    accuracy: 94, 
    avgResponse: '1.8s',
    description: 'First-line support handling general inquiries, routing, and triage.',
    lastActive: '1 min ago',
    model: 'GPT-4 Turbo'
  },
  { 
    name: 'IMU System Specialist', 
    status: 'active', 
    queries: 423, 
    accuracy: 99, 
    avgResponse: '1.1s',
    description: 'Indoor tracking specialist for IMU and LPS setup and troubleshooting.',
    lastActive: '8 min ago',
    model: 'GPT-4 Turbo'
  },
  { 
    name: 'Smart Ball Agent', 
    status: 'training', 
    queries: 89, 
    accuracy: 91, 
    avgResponse: '2.1s',
    description: 'New agent for Smart Ball product line (currently in training).',
    lastActive: '1 hour ago',
    model: 'GPT-4 Turbo'
  },
  { 
    name: 'Billing & Account Agent', 
    status: 'paused', 
    queries: 567, 
    accuracy: 97, 
    avgResponse: '1.5s',
    description: 'Handles subscription, billing, and account management queries.',
    lastActive: '3 hours ago',
    model: 'GPT-4'
  },
];

export default function AgentsPage() {
  return (
    <DashboardLayout>
      <div className="p-4 lg:p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">AI Agents</h1>
            <p className="text-gray-400 text-sm">Manage your product-specific AI specialists</p>
          </div>
          <button className="px-4 py-2 bg-[#0066FF] rounded-lg text-sm font-medium hover:bg-[#0055DD] transition-colors flex items-center gap-2">
            <Bot size={18} />
            Create Agent
          </button>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-[#1E293B]/50 rounded-xl p-4 border border-white/5">
            <div className="flex items-center gap-2 text-green-400 mb-2">
              <Activity size={18} />
              <span className="text-sm">Active Agents</span>
            </div>
            <p className="text-2xl font-bold">4</p>
          </div>
          <div className="bg-[#1E293B]/50 rounded-xl p-4 border border-white/5">
            <div className="flex items-center gap-2 text-[#00D4FF] mb-2">
              <Zap size={18} />
              <span className="text-sm">Total Queries</span>
            </div>
            <p className="text-2xl font-bold">5,510</p>
          </div>
          <div className="bg-[#1E293B]/50 rounded-xl p-4 border border-white/5">
            <div className="flex items-center gap-2 text-purple-400 mb-2">
              <CheckCircle2 size={18} />
              <span className="text-sm">Avg Accuracy</span>
            </div>
            <p className="text-2xl font-bold">96.2%</p>
          </div>
          <div className="bg-[#1E293B]/50 rounded-xl p-4 border border-white/5">
            <div className="flex items-center gap-2 text-amber-400 mb-2">
              <Activity size={18} />
              <span className="text-sm">Avg Response</span>
            </div>
            <p className="text-2xl font-bold">1.5s</p>
          </div>
        </div>

        {/* Agents Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {agents.map((agent) => (
            <div key={agent.name} className="bg-[#1E293B]/50 rounded-2xl p-5 border border-white/5 hover:border-white/10 transition-colors">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    agent.status === 'active' ? 'bg-[#0066FF]/20' : 
                    agent.status === 'training' ? 'bg-amber-500/20' : 'bg-gray-500/20'
                  }`}>
                    <Bot size={24} className={
                      agent.status === 'active' ? 'text-[#0066FF]' : 
                      agent.status === 'training' ? 'text-amber-400' : 'text-gray-400'
                    } />
                  </div>
                  <div>
                    <h3 className="font-semibold">{agent.name}</h3>
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${
                        agent.status === 'active' ? 'bg-green-400' : 
                        agent.status === 'training' ? 'bg-amber-400 animate-pulse' : 'bg-gray-400'
                      }`}></span>
                      <span className="text-xs text-gray-400 capitalize">{agent.status}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {agent.status === 'active' ? (
                    <button className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors">
                      <Pause size={18} />
                    </button>
                  ) : agent.status === 'paused' ? (
                    <button className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors">
                      <Play size={18} />
                    </button>
                  ) : null}
                  <button className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors">
                    <Settings size={18} />
                  </button>
                </div>
              </div>

              <p className="text-sm text-gray-400 mb-4">{agent.description}</p>

              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10">
                <div>
                  <p className="text-lg font-semibold">{agent.queries.toLocaleString()}</p>
                  <p className="text-xs text-gray-400">Queries</p>
                </div>
                <div>
                  <p className="text-lg font-semibold text-[#00D4FF]">{agent.accuracy}%</p>
                  <p className="text-xs text-gray-400">Accuracy</p>
                </div>
                <div>
                  <p className="text-lg font-semibold">{agent.avgResponse}</p>
                  <p className="text-xs text-gray-400">Avg Time</p>
                </div>
              </div>

              <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/10 text-xs text-gray-500">
                <span>Model: {agent.model}</span>
                <span>Last active: {agent.lastActive}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
