import {BookOpen, Star, TrendingUp} from "lucide-react";
import {rushRoyaleLegends} from "../../utils/utils.ts";
import {useSynergyTips} from "../../constants/synergy.ts";
import {popularDecks} from "../../constants/popularDecks.ts";
import {archetypes} from "../../constants/archetypes.ts";
import {useDeckLegendToggler} from "../DeckBuilder.tsx";


export const DeckBuilderTab = () => {
    const { selectedDeckLegends, toggleDeckLegend } = useDeckLegendToggler();
    const tips = useSynergyTips();

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Deck Builder */}
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                    <h2 className="text-xl font-bold mb-4 text-white flex items-center">
                        <TrendingUp className="mr-2" size={20}/>
                        Build Your Deck
                    </h2>
                    <p className="text-gray-300 text-sm mb-4">
                        Select up to 5 legends to create a deck. Synergy suggestions will appear.
                    </p>

                    <div className="mb-4">
                        <h3 className="text-lg font-semibold mb-2 text-white">Available Legends</h3>
                        <div className="max-h-60 overflow-y-auto">
                            <div className="grid grid-cols-3 gap-2">
                                {rushRoyaleLegends.slice(0, 20).map(legend => (
                                    <button
                                        key={legend.id}
                                        onClick={() => toggleDeckLegend(legend)}
                                        className={`p-2 rounded text-xs ${
                                            selectedDeckLegends.find(c => c.name === legend.name)
                                                ? 'bg-blue-600 text-white'
                                                : 'bg-white/20 text-white hover:bg-white/30'
                                        }`}
                                    >
                                        {legend.name}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {selectedDeckLegends.length > 0 && (
                        <div className="mb-4">
                            <h3 className="text-sm font-semibold mb-2 text-white">Your Deck:</h3>
                            <div className="space-y-1">
                                {selectedDeckLegends.map(legend => (
                                    <div key={legend.name}
                                         className="flex justify-between items-center bg-white/20 p-2 rounded">
                                        <span className="text-white text-sm">{legend.name}</span>
                                        <span className="text-xs text-gray-300">({legend.archetype})</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {selectedDeckLegends.length > 1 && (
                        <div className="bg-blue-900/50 p-3 rounded-lg">
                            <h4 className="text-sm font-semibold mb-1 text-white">🔍 Synergy Suggestions:</h4>
                            <div className="text-xs text-blue-200">
                                {tips.length > 0 ? (
                                    <div className="space-y-1">
                                        {tips.slice(0, 3).map(suggestion => (
                                            <div key={suggestion}>+ Consider adding: {suggestion}</div>
                                        ))}
                                    </div>
                                ) : (
                                    <div>Try different combinations for synergies!</div>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {/* Popular Decks */}
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                    <h2 className="text-xl font-bold mb-4 text-white flex items-center">
                        <Star className="mr-2" size={20}/>
                        🔥 Hot Decks
                    </h2>
                    <div className="space-y-4">
                        {popularDecks.map((deck, i) => (
                            <div key={i} className="bg-white/20 p-4 rounded-lg">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-md font-bold text-white">{deck.name}</h3>
                                    <span className="text-xs bg-purple-600 text-white px-2 py-1 rounded">
                                        {deck.archetype}
                                    </span>
                                </div>
                                <p className="text-sm text-gray-300 mb-2">{deck.description}</p>
                                <div className="text-xs text-gray-400 mb-2">
                                    Legends: {deck.legends.join(', ')}
                                </div>
                                <a
                                    href={deck.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-400 hover:text-blue-300 text-sm flex items-center"
                                >
                                    ▶️ View Guide
                                </a>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Archetype Guide */}
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                    <h2 className="text-xl font-bold mb-4 text-white flex items-center">
                        <BookOpen className="mr-2" size={20}/>
                        📚 Deck Archetype Guide
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {archetypes.map(archetype => (
                            <div key={archetype.name} className="bg-white/20 p-4 rounded-lg">
                                <h3 className="text-md font-bold mb-2 text-white">{archetype.name}</h3>
                                <p className="text-sm text-gray-300 mb-2">{archetype.description}</p>
                                <div className="space-y-1 text-xs">
                                    <div>
                                        <span className="text-green-400 font-medium">Pros:</span>
                                        <ul className="text-gray-300 ml-2">
                                            {archetype.pros.map((pro, idx) => (
                                                <li key={idx}>• {pro}</li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div>
                                        <span className="text-red-400 font-medium">Cons:</span>
                                        <ul className="text-gray-300 ml-2">
                                            {archetype.cons.map((con, idx) => (
                                                <li key={idx}>• {con}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

