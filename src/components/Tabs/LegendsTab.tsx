import {Search} from "lucide-react";
import {factions, gameModes, useGroupedLegends, rarityOrder} from "../Legends";
import {rarityColors} from "../../constants/colors.ts";
import {classIcons} from "../../constants/icons.ts";
import {useSearchTerm, useSelectedFaction, useSelectedGameMode, useSelectedRarity} from "../../hooks/utilityHooks.ts";
import type {Legend} from "../../types/legends.ts";



export const LegendsTab = ({setSelectedLegend,}: { setSelectedLegend: (legend: Legend) => void; }) => {


    const groupedLegends = useGroupedLegends();
    const [searchTerm, setSearchTerm] = useSearchTerm();
    const [selectedRarity, setSelectedRarity] = useSelectedRarity();
    const [selectedFaction, setSelectedFaction] = useSelectedFaction();
    const [selectedGameMode, setSelectedGameMode] = useSelectedGameMode();


    return (
        <div className="space-y-8">
            {/* Search and Filters */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400"/>
                        <input
                            type="text"
                            placeholder="Search cards..."
                            className="w-full pl-10 pr-4 py-2 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <select
                        className="px-4 py-2 bg-white/20 border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        value={selectedRarity}
                        onChange={(e) => setSelectedRarity(e.target.value)}
                    >
                        <option value="All">All Rarities</option>
                        {rarityOrder.map(rarity => (
                            <option key={rarity} value={rarity}>{rarity}</option>
                        ))}
                    </select>

                    <select
                        className="px-4 py-2 bg-white/20 border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        value={selectedFaction}
                        onChange={(e) => setSelectedFaction(e.target.value)}
                    >
                        <option value="All">All Factions</option>
                        {factions.map(faction => (
                            <option key={faction} value={faction}>{faction}</option>
                        ))}
                    </select>

                    <select
                        className="px-4 py-2 bg-white/20 border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        value={selectedGameMode}
                        onChange={(e) => setSelectedGameMode(e.target.value)}
                    >
                        {gameModes.map(mode => (
                            <option key={mode} value={mode}>{mode}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Legends Display */}
            <div className="space-y-8">
                {rarityOrder.map(rarity => {
                    type Rarity = 'Common' | 'Rare' | 'Epic' | 'Legendary';
                    if (!groupedLegends[rarity as Rarity]) return null;

                    const totalLegendsInRarity = Object.values(groupedLegends[rarity as Rarity] || {}).flat().length;

                    return (
                        <div key={rarity} className="bg-white/5 backdrop-blur-sm rounded-lg p-6">
                            <div className="flex items-center mb-4">
                                <span
                                    className={`px-4 py-2 rounded-full text-white font-bold ${rarityColors[rarity as Rarity]} mr-3`}>
                                    {rarity} ({totalLegendsInRarity})
                                </span>
                                <div className="flex-1 h-px bg-gradient-to-r from-white/30 to-transparent"></div>
                            </div>

                            {Object.entries(groupedLegends[rarity as Rarity] || {}).map(([faction, legends]) => (
                                <div key={faction} className="mb-6 last:mb-0">
                                    <h3 className="text-lg font-semibold mb-3 text-gray-200">
                                        {faction} ({legends.length} legends)
                                    </h3>
                                    <div
                                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                                        {legends.map(legend => {
                                            const ClassIcon = classIcons[legend.class];
                                            return (
                                                <div key={legend.id}
                                                     className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20 hover:border-yellow-400/50 transition-all duration-300 cursor-pointer hover:shadow-lg hover:shadow-yellow-400/20 transform hover:scale-105"
                                                     onClick={() => setSelectedLegend(legend)}
                                                >
                                                    <div className="flex items-start justify-between mb-3">
                                                        <h4 className="font-semibold text-white truncate">{legend.name}</h4>
                                                        <div className="flex items-center space-x-1">
                                                            {ClassIcon &&
                                                                <ClassIcon size={16} className="text-gray-300"/>}
                                                        </div>
                                                    </div>

                                                    <div className="space-y-2 text-sm text-gray-300">
                                                        <div className="flex justify-between">
                                                            <span>Damage:</span>
                                                            <span
                                                                className="text-white font-semibold">{legend.base_stats.damage}</span>
                                                        </div>
                                                        <div className="flex justify-between">
                                                            <span>Class:</span>
                                                            <span className="text-white">{legend.class}</span>
                                                        </div>
                                                        <div className="flex justify-between">
                                                            <span>Levels:</span>
                                                            <span
                                                                className="text-yellow-300 font-semibold">{legend.levels.length}</span>
                                                        </div>
                                                    </div>

                                                    {legend.talents && legend.talents.length > 0 && (
                                                        <div className="mt-3 pt-3 border-t border-white/20">
                                                            <div
                                                                className="text-xs text-yellow-300 font-medium truncate">
                                                                {legend.talents[0].name}
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            ))}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}