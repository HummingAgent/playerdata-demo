'use client';

import DashboardLayout from '../components/DashboardLayout';
import { Mail, Phone, MoreVertical, Shield, User, UserCog } from 'lucide-react';

const teamMembers = [
  { name: 'Luke Wiseman', email: 'luke@playerdata.com', role: 'Admin', department: 'Product', status: 'online', avatar: 'LW', tickets: 45, resolved: 42 },
  { name: 'Roy Thompson', email: 'roy@playerdata.com', role: 'Admin', department: 'Leadership', status: 'online', avatar: 'RT', tickets: 12, resolved: 12 },
  { name: 'Sarah Chen', email: 'sarah@playerdata.com', role: 'Support Lead', department: 'Support', status: 'online', avatar: 'SC', tickets: 156, resolved: 148 },
  { name: 'James Miller', email: 'james@playerdata.com', role: 'Support Agent', department: 'Support', status: 'away', avatar: 'JM', tickets: 89, resolved: 82 },
  { name: 'Emma Wilson', email: 'emma@playerdata.com', role: 'Support Agent', department: 'Support', status: 'online', avatar: 'EW', tickets: 112, resolved: 105 },
  { name: 'Michael Brown', email: 'michael@playerdata.com', role: 'Technical Support', department: 'Engineering', status: 'offline', avatar: 'MB', tickets: 67, resolved: 65 },
];

export default function TeamPage() {
  return (
    <DashboardLayout>
      <div className="p-4 lg:p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Team</h1>
            <p className="text-gray-400 text-sm">Manage team members and permissions</p>
          </div>
          <button className="px-4 py-2 bg-[#0066FF] rounded-lg text-sm font-medium hover:bg-[#0055DD] transition-colors">
            Invite Member
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-[#1E293B]/50 rounded-xl p-4 border border-white/5">
            <p className="text-sm text-gray-400 mb-1">Total Members</p>
            <p className="text-2xl font-bold">6</p>
          </div>
          <div className="bg-[#1E293B]/50 rounded-xl p-4 border border-white/5">
            <p className="text-sm text-gray-400 mb-1">Online Now</p>
            <p className="text-2xl font-bold text-green-400">4</p>
          </div>
          <div className="bg-[#1E293B]/50 rounded-xl p-4 border border-white/5">
            <p className="text-sm text-gray-400 mb-1">Tickets This Week</p>
            <p className="text-2xl font-bold">481</p>
          </div>
          <div className="bg-[#1E293B]/50 rounded-xl p-4 border border-white/5">
            <p className="text-sm text-gray-400 mb-1">Resolution Rate</p>
            <p className="text-2xl font-bold text-[#00D4FF]">94%</p>
          </div>
        </div>

        {/* Team List */}
        <div className="bg-[#1E293B]/50 rounded-2xl border border-white/5 overflow-hidden">
          <div className="p-4 border-b border-white/10">
            <h3 className="font-semibold">Team Members</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left p-4 text-sm font-medium text-gray-400">Member</th>
                  <th className="text-left p-4 text-sm font-medium text-gray-400 hidden lg:table-cell">Role</th>
                  <th className="text-left p-4 text-sm font-medium text-gray-400 hidden lg:table-cell">Department</th>
                  <th className="text-left p-4 text-sm font-medium text-gray-400 hidden md:table-cell">Tickets</th>
                  <th className="text-left p-4 text-sm font-medium text-gray-400">Status</th>
                  <th className="text-right p-4 text-sm font-medium text-gray-400"></th>
                </tr>
              </thead>
              <tbody>
                {teamMembers.map((member) => (
                  <tr key={member.email} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#0066FF]/20 flex items-center justify-center text-sm font-medium text-[#0066FF]">
                          {member.avatar}
                        </div>
                        <div>
                          <p className="font-medium text-sm">{member.name}</p>
                          <p className="text-xs text-gray-400">{member.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 hidden lg:table-cell">
                      <div className="flex items-center gap-2">
                        {member.role === 'Admin' ? (
                          <Shield size={14} className="text-amber-400" />
                        ) : member.role === 'Support Lead' ? (
                          <UserCog size={14} className="text-purple-400" />
                        ) : (
                          <User size={14} className="text-gray-400" />
                        )}
                        <span className="text-sm">{member.role}</span>
                      </div>
                    </td>
                    <td className="p-4 text-sm text-gray-400 hidden lg:table-cell">{member.department}</td>
                    <td className="p-4 hidden md:table-cell">
                      <div className="text-sm">
                        <span className="font-medium">{member.resolved}</span>
                        <span className="text-gray-400">/{member.tickets}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${
                          member.status === 'online' ? 'bg-green-400' :
                          member.status === 'away' ? 'bg-amber-400' : 'bg-gray-400'
                        }`}></span>
                        <span className="text-sm capitalize text-gray-400">{member.status}</span>
                      </div>
                    </td>
                    <td className="p-4 text-right">
                      <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                        <MoreVertical size={18} className="text-gray-400" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
