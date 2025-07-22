import {useState} from "react";
import type {Legend} from "../types/legends.ts";

export function useSearchTerm() {
    return useState('');
}

export function useSelectedRarity() {
    return useState('All');
}

export function useSelectedFaction() {
    return useState('All');
}

export function useSelectedGameMode() {
    return useState('All');
}

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