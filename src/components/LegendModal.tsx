import type { Legend } from "../types/legend2.ts";
import {X} from "lucide-react";

import { classIcons } from "../constants/icons.ts"
import {factionColors, rarityColors} from "../constants/colors.ts";


export const LegendModal = ({ legend, onClose }: { legend: Legend | null; onClose: () => void }) => {
    if (!legend) return null;
    const ClassIcon = classIcons[legend.unitType];
    const levels = Object.entries(legend.card_levels).map(([levelStr, lvlData]) => ({
        level: Number(levelStr),
        mana_levels: lvlData.mana_levels
    })).sort((a,b) => a.level - b.level)

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                        <h2 className="text-2xl font-bold text-gray-900">{legend.name}</h2>
                        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                            <X size={24} />
                        </button>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div className="flex items-center space-x-2">
                                <span className={`px-3 py-1 rounded-full text-white text-sm font-semibold ${rarityColors[legend.rarity]}`}>
                                    {legend.rarity}
                                </span>
                                <div className="flex items-center space-x-1">
                                    {ClassIcon && <ClassIcon size={16}/>}
                                    <span className="text-sm font-medium text-gray-900">{legend.unitType}</span>
                                </div>
                                <span className="text-sm bg-gray-200 px-2 py-1 rounded">
                                        {/*{legend.manaCost} mana*/}
                                </span>
                            </div>

                            <div className={`p-3 rounded-lg border-2 ${factionColors[legend.faction]}`}>
                                <p className="font-semibold text-gray-900">{legend.faction}</p>
                            </div>

                            <div className="bg-gray-50 p-4 rounded-lg">
                                <h3 className="font-semibold mb-2 text-gray-900">Base Stats</h3>
                                <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
                                    <div>Damage:
                                        {/*<span className="font-semibold">{legend.base_stats.damage}</span>*/}
                                    </div>
                                    <div>Speed:
                                        {/*<span className="font-semibold">{legend.base_stats.attack_speed}</span>*/}
                                    </div>
                                    <div>Range: <span className="font-semibold">{legend.base_stats.range}</span>
                                    </div>
                                    <div>Target: <span className="font-semibold">{legend.base_stats.target}</span>
                                    </div>
                                    {legend.base_stats.morale && (
                                        <div>Morale: <span className="font-semibold">{legend.base_stats.morale}</span></div>
                                    )}
                                </div>
                            </div>

                            <div className="bg-blue-50 p-4 rounded-lg">
                                <h3 className="font-semibold mb-2 text-gray-900">Strategy Info</h3>
                                <div className="space-y-2 text-sm">
                                    <div><span className="font-medium text-gray-900">Archetype:</span> {legend.archetype}</div>
                                    <div><span className="font-medium text-green-600">Pros:</span> {legend.pros}</div>
                                    <div><span className="font-medium text-red-600">Cons:</span> {legend.cons}</div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {legend.talents && legend.talents.length > 0 && (
                                <div className="bg-blue-50 p-4 rounded-lg">
                                    <h3 className="font-semibold mb-2 text-gray-900">Talents</h3>
                                    {legend.talents.map((talent, idx) => (
                                        <div key={idx} className="mb-2">
                                            <p className="font-medium text-sm text-gray-900">{talent.name}</p>
                                            <p className="text-xs text-gray-600">{talent.description}</p>
                                        </div>
                                    ))}
                                </div>
                            )}

                            <div className="bg-green-50 p-4 rounded-lg">
                                <h3 className="font-semibold mb-2 text-gray-900">Description</h3>
                                <p className="text-sm text-gray-700">{legend.description}</p>
                            </div>

                            {levels.length > 0 && (
                                <div className="bg-yellow-50 p-4 rounded-lg">
                                    <h3 className="font-semibold mb-2 text-red-500">Level Progression</h3>
                                    <div className="max-h-40 overflow-y-auto">
                                        <div className="grid grid-cols-1 gap-1 text-xs">
                                            {levels.slice(0, 9).map((level, idx) => (
                                                <div key={idx} className="flex justify-between bg-white p-2 rounded">
                                                    <span className="font-medium text-red-500">Lv {level.level}:</span>
                                                    <span className="text-gray-600">
                                                        DMG: {level.mana_levels["1"].total_damage}
                                                        {/*{level.mana_efficiency && ` | Eff: ${level.mana_efficiency}`}*/}
                                                        {/*{level.morale && ` | Morale: ${level.morale}`}*/}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="bg-indigo-50 p-4 rounded-lg">
                                <h3 className="font-semibold mb-2 text-gray-900">Synergy Tags</h3>
                                <div className="flex flex-wrap gap-1">
                                    {legend.synergyTags?.map((tag, idx) => (
                                        <span key={idx} className="bg-indigo-200 text-indigo-800 px-2 py-1 rounded text-xs">
                                                {tag}
                                            </span>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-gray-50 p-4 rounded-lg">
                                <h3 className="font-semibold mb-2 text-gray-900">Game Modes</h3>
                                <div className="flex flex-wrap gap-1">
                                    {legend.gameModes?.map((mode, idx) => (
                                        <span key={idx} className="bg-gray-200 text-gray-800 px-2 py-1 rounded text-xs">
                                                {mode}
                                            </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};