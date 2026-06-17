export interface Project {
    id: number;
    slug: string;
    number: string;
    title: string;
    subtitle: string;
    category: string;
    year: string;
    role: string;
    description: string;
    longDescription: string;
    coverImage: string;
    heroImage: string;
    gallery: string[];
    tags: string[];
}
export interface MouseEnterHandler{
    play: () => void;
    reverse:()=> void;
}
export interface CarousalCardProps{
  project:Project
  onHoverStart:()=>void
  onHoverEnd:()=>void
}
export interface TweenRefHandler {
  pause: () => void;
  play: () => void;
  kill:()=> void
}