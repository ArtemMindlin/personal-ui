import type React from 'react';
export interface MobileBarProps {
    title: string;
    logo?: React.ReactNode;
    onToggleNav: () => void;
    actions?: React.ReactNode;
    className?: string;
}
export declare function MobileBar({ title, logo, onToggleNav, actions, className }: MobileBarProps): React.JSX.Element;
