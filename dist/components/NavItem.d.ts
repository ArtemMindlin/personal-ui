import type React from 'react';
export interface NavItemProps {
    label: React.ReactNode;
    icon?: React.ReactNode;
    badge?: React.ReactNode;
    active?: boolean;
    onClick?: (e: React.MouseEvent) => void;
    href?: string;
    to?: string;
    as?: React.ElementType;
    className?: string;
    title?: string;
    children?: React.ReactNode;
}
export declare function NavItem({ label, icon, badge, active, onClick, href, to, as: Component, className, title, children, ...rest }: NavItemProps): React.JSX.Element;
