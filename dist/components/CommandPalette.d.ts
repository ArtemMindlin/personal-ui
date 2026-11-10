export interface CommandPaletteItem {
    id: string;
    label: string;
    description?: string;
    keywords?: string;
    icon?: React.ReactNode;
    onSelect: () => void;
}
export interface CommandPaletteProps {
    open: boolean;
    onClose: () => void;
    items: CommandPaletteItem[];
    placeholder?: string;
    label?: string;
    emptyMessage?: string;
    onQueryChange?: (query: string) => void;
    filterItems?: boolean;
}
export declare function CommandPalette({ open, onClose, items, placeholder, label, emptyMessage, onQueryChange, filterItems }: CommandPaletteProps): import("react").JSX.Element;
