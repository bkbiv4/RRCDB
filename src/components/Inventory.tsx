import { useState } from "react";

export type TrackedLegend = {
    name: string;
    level: number;
    copies: number;
    copiesToMax: number;
};

const defaultLegends: TrackedLegend[] = [
    { name: 'Robot', level: 7, copies: 688, copiesToMax: 1500 },
    { name: 'Inquisitor', level: 7, copies: 202, copiesToMax: 1000 },
    { name: 'Stasis', level: 7, copies: 45, copiesToMax: 700 },
    { name: 'Trapper', level: 7, copies: 123, copiesToMax: 800 },
    { name: 'Dryad', level: 7, copies: 28, copiesToMax: 600 }
];

export function useLegendInventory() {
    const [trackedLegends, setTrackedLegends] = useState<TrackedLegend[]>(defaultLegends);

    const updateTrackedLegend = (
        index: number,
        field: keyof TrackedLegend,
        value: number
    ) => {
        const updated = [...trackedLegends];
        updated[index] = {
            ...updated[index],
            [field]: value
        };
        setTrackedLegends(updated);
    };

    const addTrackedLegend = (legendName: string) => {
        if (!trackedLegends.find(c => c.name === legendName)) {
            setTrackedLegends([
                ...trackedLegends,
                {
                    name: legendName,
                    level: 1,
                    copies: 0,
                    copiesToMax: 1000
                }
            ]);
        }
    };

    return {
        trackedLegends,
        setTrackedLegends,
        updateTrackedLegend,
        addTrackedLegend
    };
}
