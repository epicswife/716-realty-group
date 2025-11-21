import React, { useState } from 'react';
import { AgentType, AgentConfig } from './types';
import { CustomerView } from './components/CustomerView';
import { RealtorDashboard } from './components/RealtorDashboard';
import { Users, Key, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

// Configuration for the two agents
const AGENTS: Record<AgentType, AgentConfig> = {
  [AgentType.FRONT_DESK]: {
    id: AgentType.FRONT_DESK,
    name: "Sarah",
    role: "Concierge",
    description: "I can schedule your private viewing, provide neighborhood insights, or help valuate your current home instantly.",
    avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", 
    voiceName: "Kore",
    systemInstruction: `You are Sarah, the elite Front Desk Concierge for 716 Realty Group in Buffalo, NY.
    Your demeanor is professional, warm, and highly competent.
    
    GOALS:
    1. **Secure Appointments:** If a user shows interest in a property, immediately guide them to book a viewing. "I can arrange a private tour for you. What day works best?"
    2. **Seller Qualification:** If they mention selling, ask: "I can prepare a market analysis. What is the property address?"
    3. **Reactivation:** If the user seems hesitant, say: "The market in Buffalo is moving fast. Are you still looking to move in the next 3-6 months?"

    LOCAL EXPERTISE:
    - **Elmwood Village:** "Historic charm, very walkable, vibrant local boutiques."
    - **North Buffalo:** "Family-centric, Hertel Avenue dining, incredible community feel."
    - **Amherst:** "Top-tier schools, spacious lots, excellent suburban convenience."

    CONFIRMATION PROTOCOL:
    Before ending any scheduling task, you MUST summarize:
    "Just to confirm, I have [Name] down for a viewing on [Date/Time] at [Location]. Is that correct?"
    Do not finalize until they say yes.`
  },
  [AgentType.DOCS_SPECIALIST]: {
    id: AgentType.DOCS_SPECIALIST,
    name: "Alex",
    role: "Compliance Officer",
    description: "Available 24/7 for urgent addendum retrieval, transaction coordination, and proof-of-funds verification.",
    avatarUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    voiceName: "Fenrir",
    systemInstruction: `You are Alex, the dedicated Transaction & Compliance AI for 716 Realty Group.
    You exist to save agents time and ensure legal safety.

    CORE FUNCTIONS:
    1. **Document Retrieval:** "I can pull that Lead Paint Disclosure immediately. What is the property address?"
    2. **Compliance Check:** Warn agents about missing signatures or expired dates.
    3. **Crisis Management:** If an agent is stressed about a closing, be calm, precise, and solution-oriented.

    TONE:
    Concise, authoritative, rapid-response. No small talk. Focus on the file.`
  }
};

enum ViewState {
  SELECT_ROLE = 'SELECT_ROLE',
  CUSTOMER = 'CUSTOMER',
  REALTOR = 'REALTOR'
}

const App: React.FC = () => {
  const [viewState, setViewState] = useState<ViewState>(ViewState.SELECT_ROLE);

  if (viewState === ViewState.CUSTOMER) {
    return <CustomerView agentConfig={AGENTS[AgentType.FRONT_DESK]} />;
  }

  if (viewState === ViewState.REALTOR) {
    return <RealtorDashboard agentConfig={AGENTS[AgentType.DOCS_SPECIALIST]} />;
  }

  // Premium Landing Page
  return (
    <div className="min-h-screen relative bg-real-slate font-sans overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" 
          alt="Buffalo Skyline" 
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-real-slate/90 via-real-slate/80 to-buffalo-blue/90"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 h-screen flex flex-col items-center justify-center">
        
        <div className="mb-12 text-center animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md mb-6">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
            <span className="text-white/80 text-xs font-bold tracking-widest uppercase">System Operational</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-4 tracking-tight">
            716 <span className="text-real-gold">Realty Group</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto font-light">
            Experience the future of real estate. Seamless automation for clients, powerful intelligence for agents.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl w-full animate-slide-up">
          
          {/* Client Card */}
          <button 
            onClick={() => setViewState(ViewState.CUSTOMER)}
            className="group relative overflow-hidden rounded-2xl bg-white p-8 text-left transition-all duration-300 hover:shadow-[0_0_40px_rgba(255,255,255,0.1)] border border-white/10 hover:border-white/30"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-100 opacity-100 group-hover:opacity-95 transition-opacity"></div>
            <div className="relative z-10 flex flex-col h-full justify-between">
              <div>
                <div className="w-14 h-14 bg-buffalo-blue text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Users className="w-7 h-7" />
                </div>
                <h2 className="text-2xl font-bold text-real-slate mb-2 group-hover:text-buffalo-blue transition-colors">Client Experience</h2>
                <p className="text-gray-600 leading-relaxed">
                  Explore listings and interact with Sarah, our AI concierge who handles scheduling and inquiries instantly.
                </p>
              </div>
              <div className="mt-8 flex items-center text-buffalo-blue font-bold text-sm uppercase tracking-wider group-hover:translate-x-2 transition-transform">
                Launch Portal <ArrowRight className="w-4 h-4 ml-2" />
              </div>
            </div>
          </button>

          {/* Agent Card */}
          <button 
            onClick={() => setViewState(ViewState.REALTOR)}
            className="group relative overflow-hidden rounded-2xl bg-slate-900 p-8 text-left transition-all duration-300 hover:shadow-[0_0_40px_rgba(0,53,148,0.3)] border border-white/5 hover:border-buffalo-blue/50"
          >
             <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900 opacity-100"></div>
             {/* Decorative tech lines */}
             <div className="absolute top-0 right-0 w-32 h-32 bg-buffalo-blue/20 rounded-full blur-3xl -mr-10 -mt-10 group-hover:bg-buffalo-blue/30 transition-all"></div>

             <div className="relative z-10 flex flex-col h-full justify-between">
              <div>
                <div className="w-14 h-14 bg-gradient-to-br from-real-gold to-yellow-600 text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Key className="w-7 h-7" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">Agent Workspace</h2>
                <p className="text-slate-400 leading-relaxed">
                  Access the command center. View recovered revenue, manage dead leads, and get compliance support from Alex.
                </p>
              </div>
              <div className="mt-8 flex items-center text-real-gold font-bold text-sm uppercase tracking-wider group-hover:translate-x-2 transition-transform">
                Access Dashboard <ArrowRight className="w-4 h-4 ml-2" />
              </div>
            </div>
          </button>

        </div>

        <div className="mt-16 grid grid-cols-3 gap-8 text-center text-white/40 max-w-2xl animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <div className="flex flex-col items-center gap-2">
            <Zap className="w-5 h-5" />
            <span className="text-xs font-medium tracking-widest uppercase">Instant Capture</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <ShieldCheck className="w-5 h-5" />
            <span className="text-xs font-medium tracking-widest uppercase">Secure & Compliant</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Users className="w-5 h-5" />
            <span className="text-xs font-medium tracking-widest uppercase">Human-Like Voice</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;