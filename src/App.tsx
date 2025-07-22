import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
// import './App.css';
import {LegendsTab} from "./components/Tabs/LegendsTab.tsx";
import {DeckBuilderTab} from "./components/Tabs/DeckBuilderTab.tsx";
import {ComparisonTab} from "./components/Tabs/ComparisonTab.tsx";
import {InventoryTab} from "./components/Tabs/InventoryTab.tsx";
import {LegendModal} from "./components/LegendModal.tsx";

import {useFilteredCards} from "./utils/utils.ts";
import {useSelectedLegend} from "./hooks/utilityHooks.ts";


const App = () => {
    const [activeTab, setActiveTab] = useState('legends');
    const [selectedLegend, setSelectedLegend] = useSelectedLegend();
    const filteredCards = useFilteredCards();

    return (
        <div className = "min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 text-white">
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                        Rush Royale Companion
                    </h1>
                    <p className="text-gray-300">Complete legend database, deck builder, and strategy tools</p>
                    <p className="text-sm text-gray-400 mt-2">
                        All 72 legends with comprehensive stats and synergy analysis
                    </p>
                </div>

                {/* Navigation Tabs */}
                <div className="flex flex-wrap justify-center mb-8 bg-white/10 backdrop-blur-sm rounded-lg p-2">
                    <button
                        onClick={() => setActiveTab('legends')}
                        className={`px-4 py-2 rounded-lg mx-1 mb-1 ${
                            activeTab === 'legends'
                                ? 'bg-yellow-400 text-black font-semibold'
                                : 'text-white hover:bg-white/20'
                        }`}
                    >
                        📚 Legends
                    </button>
                    <button
                        onClick={() => setActiveTab('deckbuilder')}
                        className={`px-4 py-2 rounded-lg mx-1 mb-1 ${
                            activeTab === 'deckbuilder'
                                ? 'bg-yellow-400 text-black font-semibold'
                                : 'text-white hover:bg-white/20'
                        }`}
                    >
                        🛠️ Deck Builder
                    </button>
                    <button
                        onClick={() => setActiveTab('comparison')}
                        className={`px-4 py-2 rounded-lg mx-1 mb-1 ${
                            activeTab === 'comparison'
                                ? 'bg-yellow-400 text-black font-semibold'
                                : 'text-white hover:bg-white/20'
                        }`}
                    >
                        📊 Compare
                    </button>
                    <button
                        onClick={() => setActiveTab('inventory')}
                        className={`px-4 py-2 rounded-lg mx-1 mb-1 ${
                            activeTab === 'inventory'
                                ? 'bg-yellow-400 text-black font-semibold'
                                : 'text-white hover:bg-white/20'
                        }`}
                    >
                        📦 Inventory
                    </button>
                </div>

                {/* Tab Content */}
                {activeTab === 'legends' && <LegendsTab setSelectedLegend={setSelectedLegend} />}
                {activeTab === 'deckbuilder' && <DeckBuilderTab />}
                {activeTab === 'comparison' && <ComparisonTab />}
                {activeTab === 'inventory' && <InventoryTab />}

                {filteredCards.length === 0 && activeTab === 'legends' && (
                    <div className="text-center py-12">
                        <p className="text-gray-400 text-lg">No legends found matching your criteria.</p>
                    </div>
                )}

                {/* Legend Modal */}
                <LegendModal legend={selectedLegend} onClose={() => setSelectedLegend(null)}/>
            </div>
        </div>
    );
};

export default App;