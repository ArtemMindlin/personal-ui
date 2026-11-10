import type React from 'react';
export interface NavItemProps {
    label: React.ReactNode;
    icon?: React.ReactNode;
    twisty?: React.ReactNode;
    badge?: React.ReactNode;
    active?: boolean;
    onClick?: (e: React.MouseEvent) => void;
    href?: string;
    to?: string;
    as?: React.ElementType;
    className?: string;
    title?: string;
    style?: React.CSSProperties;
    children?: React.ReactNode;
    [key: string]: unknown;
}
export declare function NavItem({ label, icon, twisty, badge, active, onClick, href, to, as: Component, className, title, style, children, ...rest }: NavItemProps): React.JSX.Element;
