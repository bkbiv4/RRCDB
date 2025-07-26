import {BarChart3, ChevronLeft, ChevronRight} from "lucide-react";
import {useComparisons} from "../Comparison.tsx";
import {useFilteredCards} from "../../utils/utils.ts";

export const ComparisonTab = () => {
    const {
        selectedComparisonCards,
        selectedCurrentPage,
        toggleComparison,
        setSelectedCurrentPage
    } = useComparisons();

    const filteredCards = useFilteredCards();
    const pageSize = 4;


    const pagedCards = filteredCards.slice(selectedCurrentPage * pageSize, (selectedCurrentPage + 1) * pageSize);
    const totalPages = Math.ceil(filteredCards.length / pageSize);

    return (
        <div className="space-y-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <h2 className="text-xl font-bold mb-4 text-white flex items-center">
                    <BarChart3 className="mr-2" size={20} />
                    📊 Compare Legends
                </h2>

                <div className="flex items-center justify-between mb-4">
                    <button
                        onClick={() => setSelectedCurrentPage(p => Math.max(p - 1, 0))}
                        disabled={selectedCurrentPage === 0}
                        className="flex items-center text-white disabled:opacity-30 hover:text-yellow-400"
                    >
                        <ChevronLeft size={16} /> Prev
                    </button>
                    <span className="text-white text-sm">Page {selectedCurrentPage + 1} of {totalPages}</span>
                    <button
                        onClick={() => setSelectedCurrentPage(p => Math.min(p + 1, totalPages - 1))}
                        disabled={selectedCurrentPage === totalPages - 1}
                        className="flex items-center text-white disabled:opacity-30 hover:text-yellow-400"
                    >
                        Next <ChevronRight size={16} />
                    </button>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                    {pagedCards.map(legend => (
                        <button
                            key={legend.id}
                            className={`px-3 py-1 rounded text-sm ${
                                selectedComparisonCards.find(c => c.name === legend.name)
                                    ? 'bg-green-600 text-white'
                                    : 'bg-white/20 text-white hover:bg-white/30'
                            }`}
                            onClick={() => toggleComparison(legend)}
                        >
                            {legend.name}
                        </button>
                    ))}
                </div>

                {selectedComparisonCards.length > 0 && (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm border-collapse bg-white/20 rounded-lg">
                            <thead>
                            <tr className="bg-white/30">
                                <th className="p-3 text-left text-white">Legend</th>
                                <th className="p-3 text-center text-white">Damage</th>
                                <th className="p-3 text-center text-white">Speed</th>
                                <th className="p-3 text-center text-white">Mana</th>
                                <th className="p-3 text-center text-white">Efficiency</th>
                                <th className="p-3 text-center text-white">Archetype</th>
                                <th className="p-3 text-left text-white">Pros</th>
                                <th className="p-3 text-left text-white">Cons</th>
                            </tr>
                            </thead>
                            <tbody>
                            {selectedComparisonCards.map(legend => (
                                <tr key={legend.name} className="border-t border-white/20">
                                    <td className="p-3 font-medium text-white">{legend.name}</td>
                                    {/*<td className="p-3 text-center text-white">{legend.base_stats.damage}</td>*/}
                                    {/*<td className="p-3 text-center text-white">{legend.base_stats.attack_speed}</td>*/}
                                    <td className="p-3 text-center text-white">
                                        {/*{legend.card_levels?.[0]?.mana_efficiency?.toFixed(1) || 'N/A'}*/}
                                    </td>
                                    <td className="p-3 text-center text-white">{legend.archetype}</td>
                                    <td className="p-3 text-white text-xs">{legend.pros}</td>
                                    <td className="p-3 text-white text-xs">{legend.cons}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};