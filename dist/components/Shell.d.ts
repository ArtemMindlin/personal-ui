import React from 'react';
import { type MobileBarProps } from './MobileBar';
export interface ShellProps {
    sidebar: React.ReactNode | ((props: {
        onClose: () => void;
    }) => React.ReactNode);
    mobileBar?: Partial<MobileBarProps> | React.ReactNode;
    children: React.ReactNode;
    className?: string;
    defaultNavOpen?: boolean;
}
export declare function Shell({ sidebar, mobileBar, children, className, defaultNavOpen, }: ShellProps): React.JSX.Element;
