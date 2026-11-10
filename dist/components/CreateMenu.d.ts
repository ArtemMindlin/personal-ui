import type { ReactNode } from 'react';
export interface CreateMenuItem {
    id: string;
    label: string;
    icon?: ReactNode;
    onSelect: () => void;
}
export interface CreateMenuProps {
    items: CreateMenuItem[];
    label?: string;
}
export declare function CreateMenu({ items, label }: CreateMenuProps): import("react").JSX.Element;
