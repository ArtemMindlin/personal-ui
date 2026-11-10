import React from 'react';
export interface SidebarBrand {
    logo?: React.ReactNode;
    title: React.ReactNode;
    href?: string;
    to?: string;
    onClick?: (e?: React.MouseEvent) => void;
    as?: React.ElementType;
}
export interface SidebarSearch {
    placeholder?: string;
    shortcut?: string;
    value?: string;
    onChange?: (value: string) => void;
    onClick?: () => void;
    action?: React.ReactNode;
    title?: string;
}
export interface SidebarFooter {
    to?: string;
    href?: string;
    label?: React.ReactNode;
    icon?: React.ReactNode;
    as?: React.ElementType;
    onClick?: (e?: React.MouseEvent) => void;
    active?: boolean;
    themeToggle?: boolean | React.ReactNode;
    themeStorageKey?: string;
    extra?: React.ReactNode;
}
export interface SidebarProps {
    brand?: SidebarBrand;
    search?: SidebarSearch;
    headerActions?: React.ReactNode;
    children: React.ReactNode;
    footer?: SidebarFooter | boolean;
    bottom?: React.ReactNode;
    bottomClassName?: string;
    onClose?: () => void;
    collapsed?: boolean;
    defaultCollapsed?: boolean;
    onToggleCollapse?: () => void;
    enableShortcut?: boolean;
    storageKey?: string;
    className?: string;
    'aria-label'?: string;
}
export declare function Sidebar({ brand, search, headerActions, children, footer, bottom, bottomClassName, onClose, collapsed: controlledCollapsed, defaultCollapsed, onToggleCollapse, enableShortcut, storageKey, className, 'aria-label': ariaLabel, }: SidebarProps): React.JSX.Element;
export interface SidebarBottomProps {
    className?: string;
    children: React.ReactNode;
}
export declare function SidebarBottom({ className, children }: SidebarBottomProps): React.JSX.Element;
export interface SidebarSectionProps {
    title?: React.ReactNode;
    action?: React.ReactNode;
    children: React.ReactNode;
    className?: string;
}
export declare function SidebarSection({ title, action, children, className }: SidebarSectionProps): React.JSX.Element;
