import { type Theme } from '../theme';
export interface ThemeSelectorProps {
    value: Theme;
    onChange: (theme: Theme) => void;
    options?: Theme[];
}
export declare function ThemeSelector({ value, onChange, options }: ThemeSelectorProps): import("react").JSX.Element;
