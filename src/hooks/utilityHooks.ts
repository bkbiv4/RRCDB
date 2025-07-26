import {useState} from "react";
import type {Legend} from "../types/legend2.ts";

// import { useLegendFilters } from "../hooks/LegendFiltersContext";

export function useSelectedLegend() {
    return useState<Legend | null>(null);
}

export function useSelectedDeckLegends() {
    return useState<Legend[]>([]);
}

export function useSelectedComparisonCards() {
    return useState<Legend[]>([]);
}

export function useSelectedPage() {
    return useState(0);
}