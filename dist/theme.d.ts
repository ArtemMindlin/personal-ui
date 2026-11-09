export type Theme = 'system' | 'light' | 'dark';
export declare const themeLabels: Record<Theme, string>;
export declare function getTheme(key?: string): Theme;
export declare function applyTheme(t: Theme, key?: string): void;
export declare function isDarkActive(t: Theme): boolean;
export declare function useTheme(storageKey?: string): {
    theme: Theme;
    isDark: boolean;
    setTheme: (t: Theme) => void;
    cycleTheme: () => void;
};
