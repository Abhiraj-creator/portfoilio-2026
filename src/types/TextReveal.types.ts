interface TriggerOptions{
    "mount": string,
    "scroll": string,
    "manual": string
}
export interface SplitByOptions {
    lines: string; 
    words: string;
    chars: string;
}
export interface TextRevealProps {
    children: React.ReactNode;
    trigger?: keyof TriggerOptions;
    className?: string,
    SCrollStart?: string,
    duration?: string,
    stagger?:string|number
    splitBy?: keyof SplitByOptions,
    delay?: string,
    ease?: string,
}
export interface TextRevealHandler{
    play: () => void;
    reverse: () => void;
}