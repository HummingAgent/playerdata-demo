'use client';

import DashboardLayout from '../components/DashboardLayout';
import { Bell, Lock, Palette, Globe, Database, Key, Save } from 'lucide-react';

export default function SettingsPage() {
  return (
    <DashboardLayout>
      <div className="p-4 lg:p-6 space-y-6 max-w-4xl">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold">Settings</h1>
          <p className="text-gray-400 text-sm">Manage your support hub configuration</p>
        </div>

        {/* Sections */}
        <div className="space-y-6">
          {/* Notifications */}
          <div className="bg-[#1E293B]/50 rounded-2xl p-5 border border-white/5">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-[#0066FF]/20">
                <Bell size={20} className="text-[#0066FF]" />
              </div>
              <div>
                <h3 className="font-semibold">Notifications</h3>
                <p className="text-sm text-gray-400">Configure alert preferences</p>
              </div>
            </div>
            <div className="space-y-4">
              <ToggleSetting label="Email notifications for VIP tickets" defaultChecked />
              <ToggleSetting label="Slack alerts for high priority" defaultChecked />
              <ToggleSetting label="Daily digest summary" />
              <ToggleSetting label="AI confidence alerts (below 80%)" defaultChecked />
            </div>
          </div>

          {/* AI Configuration */}
          <div className="bg-[#1E293B]/50 rounded-2xl p-5 border border-white/5">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-purple-500/20">
                <Database size={20} className="text-purple-400" />
              </div>
              <div>
                <h3 className="font-semibold">AI Configuration</h3>
                <p className="text-sm text-gray-400">Customize AI behavior</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Auto-send threshold</label>
                <select className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm focus:outline-none focus:border-[#0066FF]">
                  <option>Never auto-send (always review)</option>
                  <option>95%+ confidence</option>
                  <option>90%+ confidence</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Response tone</label>
                <select className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm focus:outline-none focus:border-[#0066FF]">
                  <option>Professional</option>
                  <option>Friendly</option>
                  <option>Technical</option>
                </select>
              </div>
              <ToggleSetting label="Include knowledge sources in drafts" defaultChecked />
              <ToggleSetting label="Auto-detect product version from context" defaultChecked />
            </div>
          </div>

          {/* Integrations */}
          <div className="bg-[#1E293B]/50 rounded-2xl p-5 border border-white/5">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-green-500/20">
                <Globe size={20} className="text-green-400" />
              </div>
              <div>
                <h3 className="font-semibold">Integrations</h3>
                <p className="text-sm text-gray-400">Connected services</p>
              </div>
            </div>
            <div className="space-y-3">
              {[
                { name: 'HubSpot', status: 'Connected', lastSync: '2 min ago' },
                { name: 'Notion', status: 'Connected', lastSync: '5 min ago' },
                { name: 'Gong', status: 'Connected', lastSync: '15 min ago' },
                { name: 'Slack', status: 'Connected', lastSync: '1 min ago' },
              ].map((integration) => (
                <div key={integration.name} className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-green-400"></span>
                    <span className="font-medium text-sm">{integration.name}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-xs text-gray-400">Last sync: {integration.lastSync}</span>
                    <button className="text-sm text-[#0066FF] hover:underline">Configure</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Security */}
          <div className="bg-[#1E293B]/50 rounded-2xl p-5 border border-white/5">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-amber-500/20">
                <Lock size={20} className="text-amber-400" />
              </div>
              <div>
                <h3 className="font-semibold">Security</h3>
                <p className="text-sm text-gray-400">Access and authentication</p>
              </div>
            </div>
            <div className="space-y-4">
              <ToggleSetting label="Two-factor authentication" defaultChecked />
              <ToggleSetting label="Session timeout (30 min)" defaultChecked />
              <div>
                <label className="block text-sm text-gray-400 mb-2">API Keys</label>
                <div className="flex gap-2">
                  <input 
                    type="password" 
                    value="sk-pd-xxxxxxxxxxxxxxxxxxxx"
                    readOnly
                    className="flex-1 px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm font-mono"
                  />
                  <button className="px-4 py-2.5 bg-white/10 rounded-lg text-sm hover:bg-white/20 transition-colors">
                    Regenerate
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <button className="px-6 py-2.5 bg-[#0066FF] rounded-lg text-sm font-medium hover:bg-[#0055DD] transition-colors flex items-center gap-2">
              <Save size={18} />
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function ToggleSetting({ label, defaultChecked }: { label: string; defaultChecked?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm">{label}</span>
      <label className="relative inline-flex items-center cursor-pointer">
        <input type="checkbox" className="sr-only peer" defaultChecked={defaultChecked} />
        <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0066FF]"></div>
      </label>
    </div>
  );
}
