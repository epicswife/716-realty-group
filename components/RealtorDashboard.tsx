import React from 'react';
import { AgentConfig } from '../types';
import { AgentInterface } from './AgentInterface';
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  PhoneMissed, 
  DollarSign, 
  TrendingUp, 
  Bell,
  RefreshCw,
  CheckCircle2,
  Search,
  ChevronRight,
  MoreHorizontal
} from 'lucide-react';

interface RealtorDashboardProps {
  agentConfig: AgentConfig;
}

export const RealtorDashboard: React.FC<RealtorDashboardProps> = ({ agentConfig }) => {
  // Mock live data
  const missedCalls = 14; // Today
  const recoveredValue = 245000; // Month to date volume

  return (
    <div className="min-h-screen bg-slate-50 font-sans flex text-slate-600">
      {/* Modern Sidebar */}
      <aside className="w-72 bg-slate-900 text-white hidden lg:flex flex-col fixed h-full z-20 shadow-2xl">
        <div className="p-8">
            <div className="flex items-center gap-3">
              <div className="bg-buffalo-blue text-white w-8 h-8 flex items-center justify-center rounded-lg font-serif font-bold text-sm shadow-lg">716</div>
              <span className="font-bold text-lg tracking-tight">AgentPortal</span>
            </div>
        </div>
        
        <div className="px-4 mb-6">
            <p className="px-4 text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Main Menu</p>
            <nav className="space-y-1">
            <a href="#" className="flex items-center gap-3 px-4 py-3 bg-buffalo-blue text-white rounded-xl font-medium shadow-lg shadow-buffalo-blue/20 transition-all">
                <LayoutDashboard className="w-5 h-5" /> Dashboard
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-white/5 rounded-xl font-medium transition">
                <Users className="w-5 h-5" /> Leads CRM
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-white/5 rounded-xl font-medium transition">
                <FileText className="w-5 h-5" /> Transactions
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-white/5 rounded-xl font-medium transition">
                <PhoneMissed className="w-5 h-5" /> Communications
            </a>
            </nav>
        </div>

        <div className="px-4 mb-6">
            <p className="px-4 text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Intelligence</p>
            <nav className="space-y-1">
            <a href="#" className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-white/5 rounded-xl font-medium transition">
                <TrendingUp className="w-5 h-5" /> ROI Analytics
            </a>
             <a href="#" className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-white/5 rounded-xl font-medium transition">
                <RefreshCw className="w-5 h-5" /> Auto-Revival
            </a>
            </nav>
        </div>

        <div className="mt-auto p-6 border-t border-white/5 bg-slate-900">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-full bg-gradient-to-br from-real-gold to-yellow-600 flex items-center justify-center font-bold text-white shadow-lg">
                JD
             </div>
             <div className="text-sm">
                <div className="font-bold text-white">John Doe</div>
                <div className="text-slate-400 text-xs">Top Producer</div>
             </div>
             <button className="ml-auto text-slate-400 hover:text-white">
                <MoreHorizontal className="w-5 h-5" />
             </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 lg:ml-72 p-8 lg:p-12 overflow-y-auto">
        <header className="flex justify-between items-center mb-10">
           <div>
             <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Command Center</h1>
             <p className="text-slate-500 mt-1">Good morning, John. You have 3 urgent compliance tasks.</p>
           </div>
           <div className="flex items-center gap-6">
              <div className="relative hidden md:block">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <input type="text" placeholder="Search leads, properties..." className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-buffalo-blue/20 w-64" />
              </div>
              <button className="p-3 relative bg-white rounded-full shadow-sm text-slate-400 hover:text-buffalo-blue transition border border-slate-100">
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
              </button>
           </div>
        </header>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">
           <div className="bg-white p-6 rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.04)] border border-slate-100 flex flex-col justify-between hover:-translate-y-1 transition duration-300">
              <div className="flex justify-between items-start mb-4">
                 <div className="p-3 bg-red-50 text-red-500 rounded-xl">
                    <PhoneMissed className="w-6 h-6" />
                 </div>
                 <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">+12% vs last week</span>
              </div>
              <div>
                <div className="text-4xl font-bold text-slate-900 mb-1">{missedCalls}</div>
                <div className="text-sm font-medium text-slate-500">Missed Calls Captured</div>
              </div>
           </div>

           <div className="bg-white p-6 rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.04)] border border-slate-100 flex flex-col justify-between hover:-translate-y-1 transition duration-300">
              <div className="flex justify-between items-start mb-4">
                 <div className="p-3 bg-amber-50 text-amber-500 rounded-xl">
                    <RefreshCw className="w-6 h-6" />
                 </div>
                 <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">Active Now</span>
              </div>
              <div>
                <div className="text-4xl font-bold text-slate-900 mb-1">8</div>
                <div className="text-sm font-medium text-slate-500">Dead Leads Reactivated</div>
              </div>
           </div>

           <div className="bg-gradient-to-br from-buffalo-blue to-buffalo-dark p-6 rounded-2xl shadow-lg shadow-blue-900/20 text-white flex flex-col justify-between hover:-translate-y-1 transition duration-300 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full -mr-10 -mt-10"></div>
              <div className="flex justify-between items-start mb-4 relative z-10">
                 <div className="p-3 bg-white/10 text-white rounded-xl backdrop-blur-sm">
                    <DollarSign className="w-6 h-6" />
                 </div>
              </div>
              <div className="relative z-10">
                <div className="text-4xl font-bold text-white mb-1">${recoveredValue.toLocaleString()}</div>
                <div className="text-sm font-medium text-blue-100">Pipeline Value Saved (MTD)</div>
              </div>
           </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 h-full">
            {/* Left Column: Activity & Tasks */}
            <div className="lg:col-span-8 space-y-8">
               
               {/* Lead Reactivation Log */}
               <div className="bg-white rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.04)] border border-slate-100 overflow-hidden">
                  <div className="p-6 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
                     <h3 className="font-bold text-slate-900 text-lg">Live Automation Feed</h3>
                     <button className="text-xs font-bold text-buffalo-blue bg-blue-50 px-3 py-1 rounded-lg hover:bg-blue-100 transition">View Full Log</button>
                  </div>
                  <div className="divide-y divide-slate-50">
                     {[
                        { name: "Michael Scott", action: "Viewing Scheduled", time: "10 min ago", status: "HOT", detail: "248 Lincoln Pkwy", avatar: "M", color: "bg-purple-100 text-purple-600" },
                        { name: "Pam Beesly", action: "Lead Reactivated", time: "45 min ago", status: "WARM", detail: "Responded to 'Still looking?' campaign", avatar: "P", color: "bg-amber-100 text-amber-600" },
                        { name: "Jim Halpert", action: "Missed Call Captured", time: "2 hrs ago", status: "NEW", detail: "SMS Sequence #1 Sent", avatar: "J", color: "bg-blue-100 text-blue-600" },
                        { name: "Dwight Schrute", action: "Seller Valuation", time: "3 hrs ago", status: "HOT", detail: "Schrute Farms Analysis", avatar: "D", color: "bg-red-100 text-red-600" },
                     ].map((lead, i) => (
                        <div key={i} className="p-5 flex items-center justify-between hover:bg-slate-50 transition group cursor-pointer">
                           <div className="flex items-center gap-4">
                              <div className={`w-12 h-12 rounded-xl ${lead.color} flex items-center justify-center font-bold text-lg shadow-sm`}>
                                 {lead.avatar}
                              </div>
                              <div>
                                 <div className="font-bold text-slate-900 text-base group-hover:text-buffalo-blue transition">{lead.name}</div>
                                 <div className="text-sm text-slate-500">{lead.action} • {lead.detail}</div>
                              </div>
                           </div>
                           <div className="text-right flex flex-col items-end">
                              <span className={`inline-block px-2.5 py-1 text-[10px] font-bold rounded-full tracking-wider mb-1 ${
                                 lead.status === 'HOT' ? 'bg-red-50 text-red-600 border border-red-100' :
                                 lead.status === 'WARM' ? 'bg-amber-50 text-amber-600 border border-amber-100' :
                                 'bg-blue-50 text-blue-600 border border-blue-100'
                              }`}>
                                 {lead.status}
                              </span>
                              <div className="text-xs text-slate-400">{lead.time}</div>
                           </div>
                        </div>
                     ))}
                  </div>
                  <div className="p-4 bg-slate-50 text-center">
                     <button className="text-sm font-medium text-slate-500 hover:text-slate-800 flex items-center justify-center gap-1 w-full">
                        Show more activity <ChevronRight className="w-4 h-4" />
                     </button>
                  </div>
               </div>

               {/* Dead Lead Resurrection Tool */}
               <div className="bg-slate-900 rounded-2xl p-8 text-white relative overflow-hidden shadow-2xl">
                  <div className="relative z-10 flex justify-between items-center">
                     <div className="max-w-lg">
                        <div className="inline-block px-3 py-1 bg-white/10 rounded-full text-xs font-bold text-real-gold mb-4 border border-white/10">BETA FEATURE</div>
                        <h3 className="text-2xl font-bold mb-3">Database Reactivation</h3>
                        <p className="text-slate-400 mb-8 leading-relaxed">
                           Our AI has identified <span className="text-white font-bold">1,240 stalled leads</span> from 2023-2024. 
                           Deploy the "Spring Market" SMS campaign to re-engage them automatically.
                        </p>
                        <div className="flex items-center gap-4">
                            <button className="bg-real-gold text-slate-900 px-8 py-3.5 rounded-xl font-bold hover:bg-yellow-500 transition shadow-lg shadow-yellow-900/20">
                                Launch Campaign
                            </button>
                            <span className="text-sm text-slate-500">Avg. Response Rate: 18%</span>
                        </div>
                     </div>
                  </div>
                  {/* Background Pattern */}
                  <div className="absolute right-0 bottom-0 opacity-5 transform translate-x-1/4 translate-y-1/4">
                     <RefreshCw className="w-96 h-96" />
                  </div>
               </div>

            </div>

            {/* Right Column: AI Support */}
            <div className="lg:col-span-4">
                <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-1 sticky top-8">
                    <div className="bg-gradient-to-b from-white to-slate-50 rounded-xl p-6">
                        <div className="mb-8 text-center">
                             <div className="w-12 h-12 bg-red-100 text-red-500 rounded-2xl flex items-center justify-center mx-auto mb-3">
                                <FileText className="w-6 h-6" />
                             </div>
                            <h3 className="font-bold text-slate-900 text-lg">Compliance Officer</h3>
                            <p className="text-xs text-slate-500 uppercase tracking-wider font-medium">Powered by Alex AI</p>
                        </div>
                        
                        <AgentInterface config={agentConfig} />
                        
                        <div className="mt-8 pt-8 border-t border-slate-200 space-y-3">
                            <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Quick Tasks</h4>
                            {[
                                "Send Lead Paint Disclosure",
                                "Verify Proof of Funds",
                                "Generate Offer Addendum"
                            ].map((task, i) => (
                                <button key={i} className="w-full text-left p-3.5 rounded-xl bg-white border border-slate-100 hover:border-buffalo-blue hover:shadow-md transition flex items-center justify-between group">
                                    <span className="text-sm font-medium text-slate-700 group-hover:text-buffalo-blue">{task}</span>
                                    <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-buffalo-blue" />
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </main>
    </div>
  );
};