import type React from 'react';
export interface SidebarProps {
    brand?: {
        logo?: React.ReactNode;
        title: React.ReactNode;
        href?: string;
        onClick?: () => void;
    };
    headerActions?: React.ReactNode;
    children: React.ReactNode;
    bottom?: React.ReactNode;
    onClose?: () => void;
    className?: string;
}
export declare function Sidebar({ brand, headerActions, children, bottom, onClose, className, }: SidebarProps): React.JSX.Element;
