import {Users} from "lucide-react";
import {rushRoyaleLegends} from "../../utils/utils.ts";
import {useLegendInventory} from "../Inventory.tsx";


export const InventoryTab = () => {
    const {
        trackedLegends,
        updateTrackedLegend,
        addTrackedLegend
    } = useLegendInventory();

    return (
        <div className="space-y-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <h2 className="text-xl font-bold mb-4 text-white flex items-center">
                    <Users className="mr-2" size={20}/>
                    📦 Legend Inventory Tracker
                </h2>
                <p className="text-gray-300 text-sm mb-4">
                    Track your legend levels and progress toward maxing out each unit.
                </p>

                <div className="mb-4">
                    <h3 className="text-lg font-semibold mb-2 text-white">Add Legend to Track</h3>
                    <div className="flex flex-wrap gap-2">
                        {rushRoyaleLegends.slice(0, 10).map(legend => (
                            <button
                                key={legend.id}
                                onClick={() => addTrackedLegend(legend.name)}
                                className="px-3 py-1 rounded text-sm bg-white/20 text-white hover:bg-white/30"
                                disabled={!!trackedLegends.find(c => c.name === legend.name)}
                            >
                                + {legend.name}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm bg-white/20 rounded-lg">
                        <thead>
                        <tr className="bg-white/30">
                            <th className="p-3 text-left text-white">Legend</th>
                            <th className="p-3 text-center text-white">Level</th>
                            <th className="p-3 text-center text-white">Copies Owned</th>
                            <th className="p-3 text-center text-white">Copies to Max</th>
                            <th className="p-3 text-center text-white">Progress</th>
                        </tr>
                        </thead>
                        <tbody>
                        {trackedLegends.map((legend, i) => {
                            const percent = Math.min(100, Math.round((legend.copies / legend.copiesToMax) * 100));
                            return (
                                <tr key={legend.name} className="border-t border-white/20">
                                    <td className="p-3 font-medium text-white">{legend.name}</td>
                                    <td className="p-3 text-center">
                                        <input
                                            type="number"
                                            min={1}
                                            max={15}
                                            value={legend.level}
                                            onChange={e => updateTrackedLegend(i, 'level', parseInt(e.target.value))}
                                            className="w-16 px-2 py-1 rounded bg-white/20 text-white text-center"
                                        />
                                    </td>
                                    <td className="p-3 text-center">
                                        <input
                                            type="number"
                                            min={0}
                                            value={legend.copies}
                                            onChange={e => updateTrackedLegend(i, 'copies', parseInt(e.target.value))}
                                            className="w-20 px-2 py-1 rounded bg-white/20 text-white text-center"
                                        />
                                    </td>
                                    <td className="p-3 text-center text-white">{legend.copiesToMax}</td>
                                    <td className="p-3 text-center">
                                        <div className="w-full bg-gray-700 rounded h-3 mb-1">
                                            <div
                                                className="h-3 bg-blue-500 rounded"
                                                style={{width: `${percent}%`}}
                                            />
                                        </div>
                                        <span className="text-xs text-white">{percent}%</span>
                                    </td>
                                </tr>
                            );
                        })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}