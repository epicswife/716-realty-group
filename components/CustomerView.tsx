import React from 'react';
import { AgentConfig } from '../types';
import { AgentInterface } from './AgentInterface';
import { Search, MapPin, Bed, Bath, Home, ArrowRight, Menu, Heart, Share2 } from 'lucide-react';

interface CustomerViewProps {
  agentConfig: AgentConfig;
}

export const CustomerView: React.FC<CustomerViewProps> = ({ agentConfig }) => {
  return (
    <div className="min-h-screen bg-gray-50 font-sans selection:bg-buffalo-blue selection:text-white">
      {/* Transparent Luxury Nav */}
      <nav className="fixed w-full z-50 transition-all duration-300 bg-white/90 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between h-24 items-center">
            <div className="flex items-center gap-3 cursor-pointer">
              <div className="bg-buffalo-blue text-white w-10 h-10 flex items-center justify-center rounded-lg font-serif font-bold text-xl shadow-lg">716</div>
              <div className="flex flex-col">
                <span className="font-serif text-xl font-bold text-real-slate tracking-tight leading-none">716 REALTY</span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-medium">Group</span>
              </div>
            </div>
            
            <div className="hidden md:flex items-center space-x-10 text-sm font-bold tracking-wide text-gray-600">
              <a href="#" className="hover:text-buffalo-blue transition">BUY</a>
              <a href="#" className="hover:text-buffalo-blue transition">SELL</a>
              <a href="#" className="hover:text-buffalo-blue transition">COMMUNITIES</a>
              <a href="#" className="hover:text-buffalo-blue transition">AGENTS</a>
            </div>

            <div className="flex items-center gap-4">
                <button className="hidden md:block bg-real-slate text-white px-6 py-3 rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-slate-800 transition shadow-md">
                List With Us
                </button>
                <button className="md:hidden p-2 text-gray-600">
                    <Menu className="w-6 h-6" />
                </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section - Immersive */}
      <div className="relative h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
            <img 
                src="https://images.unsplash.com/photo-1600596542815-e32cb118d8d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
                className="w-full h-full object-cover transform scale-105 animate-pulse-slow" // Subtle movement
                alt="Luxury Home"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-slate-900/40 via-slate-900/20 to-slate-900/60"></div>
        </div>
        
        <div className="relative z-20 text-center px-4 max-w-5xl mx-auto mt-16">
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 drop-shadow-lg leading-tight">
            Discover Buffalo’s <br/>
            <span className="italic font-light text-real-gold-light">Finest Properties</span>
          </h1>
          <p className="text-xl text-white/90 mb-10 font-light tracking-wide max-w-2xl mx-auto drop-shadow-md">
            Experience a smarter way to buy and sell. From the Elmwood Village to Amherst, find your perfect match with our AI concierge.
          </p>
          
          {/* Modern Search Bar */}
          <div className="bg-white/95 backdrop-blur-md p-2 rounded-2xl shadow-2xl flex flex-col md:flex-row gap-2 max-w-3xl mx-auto border border-white/50">
            <div className="flex-grow relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-buffalo-blue transition-colors" />
              <input 
                type="text" 
                placeholder="Search by address, neighborhood, or ZIP..." 
                className="w-full pl-12 pr-4 h-14 bg-transparent rounded-xl focus:outline-none text-gray-800 placeholder-gray-400 font-medium"
              />
            </div>
            <button className="h-14 px-10 bg-buffalo-blue text-white rounded-xl font-bold text-sm uppercase tracking-wider hover:bg-blue-900 transition shadow-lg flex items-center justify-center gap-2">
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid lg:grid-cols-12 gap-12">
          
          {/* Listings Feed (Left) */}
          <div className="lg:col-span-8 space-y-12">
            <div className="flex justify-between items-end border-b border-gray-100 pb-4">
              <h2 className="text-3xl font-serif font-bold text-real-slate">Exclusive Listings</h2>
              <a href="#" className="text-buffalo-blue font-bold text-sm uppercase tracking-wider flex items-center gap-1 hover:underline">
                View All Properties <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {/* Listing Card 1 */}
            <div className="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="relative h-80 overflow-hidden">
                 <img src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" alt="Home" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                 <div className="absolute top-4 left-4 bg-buffalo-blue text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full shadow-lg">
                    Just Listed
                 </div>
                 <div className="absolute top-4 right-4 flex gap-2">
                    <button className="p-2 bg-white/90 rounded-full hover:bg-white hover:text-red-500 transition shadow-lg text-gray-400">
                        <Heart className="w-5 h-5" />
                    </button>
                    <button className="p-2 bg-white/90 rounded-full hover:bg-white hover:text-buffalo-blue transition shadow-lg text-gray-400">
                        <Share2 className="w-5 h-5" />
                    </button>
                 </div>
                 <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent h-24"></div>
                 <div className="absolute bottom-6 left-6 text-white">
                    <div className="text-2xl font-bold font-serif">$525,000</div>
                 </div>
              </div>
              
              <div className="p-8">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-1 group-hover:text-buffalo-blue transition">248 Lincoln Parkway</h3>
                    <p className="text-gray-500 flex items-center gap-1.5 font-medium">
                      <MapPin className="w-4 h-4 text-buffalo-red" /> Elmwood Village, Buffalo NY
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-8 py-6 border-t border-b border-gray-50 mb-6">
                  <div className="flex flex-col items-center">
                    <Bed className="w-6 h-6 text-gray-400 mb-1" />
                    <span className="font-bold text-gray-800">4</span>
                    <span className="text-xs text-gray-400 uppercase">Beds</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <Bath className="w-6 h-6 text-gray-400 mb-1" />
                    <span className="font-bold text-gray-800">2.5</span>
                    <span className="text-xs text-gray-400 uppercase">Baths</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <Home className="w-6 h-6 text-gray-400 mb-1" />
                    <span className="font-bold text-gray-800">2,400</span>
                    <span className="text-xs text-gray-400 uppercase">Sq Ft</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <button className="py-3 rounded-xl border border-gray-200 font-bold text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition">
                    View Details
                  </button>
                  <button className="py-3 rounded-xl bg-real-slate text-white font-bold shadow-lg hover:bg-slate-800 transition">
                    Request Tour
                  </button>
                </div>
              </div>
            </div>

            {/* Listing Card 2 */}
            <div className="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="relative h-80 overflow-hidden">
                 <img src="https://images.unsplash.com/photo-1605276374104-514eb247130f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" alt="Home" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                 <div className="absolute top-4 left-4 bg-green-500 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full shadow-lg">
                    Open House Sun 1-3
                 </div>
                 <div className="absolute top-4 right-4 flex gap-2">
                    <button className="p-2 bg-white/90 rounded-full hover:bg-white hover:text-red-500 transition shadow-lg text-gray-400">
                        <Heart className="w-5 h-5" />
                    </button>
                 </div>
                 <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent h-24"></div>
                 <div className="absolute bottom-6 left-6 text-white">
                    <div className="text-2xl font-bold font-serif">$315,000</div>
                 </div>
              </div>
              
              <div className="p-8">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-1 group-hover:text-buffalo-blue transition">82 Starin Avenue</h3>
                    <p className="text-gray-500 flex items-center gap-1.5 font-medium">
                      <MapPin className="w-4 h-4 text-buffalo-red" /> North Buffalo, Buffalo NY
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-8 py-6 border-t border-b border-gray-50 mb-6">
                  <div className="flex flex-col items-center">
                    <Bed className="w-6 h-6 text-gray-400 mb-1" />
                    <span className="font-bold text-gray-800">3</span>
                    <span className="text-xs text-gray-400 uppercase">Beds</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <Bath className="w-6 h-6 text-gray-400 mb-1" />
                    <span className="font-bold text-gray-800">1.5</span>
                    <span className="text-xs text-gray-400 uppercase">Baths</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <Home className="w-6 h-6 text-gray-400 mb-1" />
                    <span className="font-bold text-gray-800">1,800</span>
                    <span className="text-xs text-gray-400 uppercase">Sq Ft</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <button className="py-3 rounded-xl border border-gray-200 font-bold text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition">
                    View Details
                  </button>
                  <button className="py-3 rounded-xl bg-real-slate text-white font-bold shadow-lg hover:bg-slate-800 transition">
                    Request Tour
                  </button>
                </div>
              </div>
            </div>

          </div>

          {/* AI Sidebar (Right) */}
          <div className="lg:col-span-4">
             <div className="sticky top-32">
                {/* Promo Card */}
                <div className="bg-buffalo-blue rounded-2xl p-8 text-white text-center mb-8 relative overflow-hidden shadow-xl">
                    <div className="absolute top-0 right-0 -mr-10 -mt-10 w-40 h-40 bg-white opacity-10 rounded-full"></div>
                    <h3 className="text-2xl font-serif font-bold mb-2 relative z-10">Selling Your Home?</h3>
                    <p className="text-blue-100 mb-6 relative z-10">Get a guaranteed cash offer within 24 hours. Ask Sarah for details.</p>
                    <button className="w-full py-3 bg-white text-buffalo-blue font-bold rounded-xl hover:bg-blue-50 transition shadow-md relative z-10">
                        Get Free Valuation
                    </button>
                </div>

                <div className="bg-white rounded-3xl p-1 shadow-xl border border-gray-100">
                    <div className="bg-white rounded-2xl p-6">
                        <h3 className="text-xl font-serif font-bold text-gray-900 mb-1">
                            Concierge Service
                        </h3>
                        <p className="text-gray-500 text-sm mb-6">
                           Instant scheduling and inquiries.
                        </p>
                        
                        <AgentInterface config={agentConfig} />
                    </div>
                </div>
             </div>
          </div>
        </div>
      </div>
      
      <footer className="bg-real-slate text-white py-16">
          <div className="max-w-7xl mx-auto px-6 text-center opacity-60 text-sm">
              <p>© 2025 716 Realty Group. All rights reserved.</p>
          </div>
      </footer>
    </div>
  );
};