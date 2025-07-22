import type {Legend} from "../types/legends.ts";
import {useSelectedDeckLegends} from "../hooks/utilityHooks.ts";


export function useDeckLegendToggler() {
    const [selectedDeckLegends, setSelectedDeckLegends] = useSelectedDeckLegends();

    const toggleDeckLegend = (legend: Legend) => {
        setSelectedDeckLegends(prev => {
            const exists = prev.find(c => c.name === legend.name);
            return exists
                ? prev.filter(c => c.name !== legend.name)
                : prev.length < 5 ? [...prev, legend] : prev;
        });
    };

    return { selectedDeckLegends, toggleDeckLegend };
}