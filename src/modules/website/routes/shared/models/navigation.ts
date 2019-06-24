export interface Navigation {
    link: string;
    label: string;
    className?: string;
    active: boolean;
    subitems?: Navigation[];
}