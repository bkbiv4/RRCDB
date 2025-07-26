
// Legend comparison state
import type {Legend} from "../types/legend2.ts";
import {useSelectedComparisonCards, useSelectedPage} from "../hooks/utilityHooks.ts";

export function useComparisons() {
    const [selectedComparisonCards, setSelectedComparisonCards] = useSelectedComparisonCards()
    const [selectedCurrentPage, setSelectedCurrentPage] = useSelectedPage()


    const toggleComparison = (legend: Legend) => {
        setSelectedCurrentPage(0); // Reset page when toggling comparisons
        setSelectedComparisonCards(prev => {
            const exists = prev.find(c => c.name === legend.name);
            return exists
                ? prev.filter(c => c.name !== legend.name)
                : prev.length < 3 ? [...prev, legend] : prev;
        });
    }
    return {
        selectedComparisonCards,
        selectedCurrentPage,
        setSelectedComparisonCards,
        setSelectedCurrentPage,
        toggleComparison
    };
}