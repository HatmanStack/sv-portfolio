export interface ImageGridItem {
  id: string;
  src: string;
  alt: string;
  animationRange?: string;
  special?: boolean;
  content?: string;
}

export interface ProjectCard {
  id: string;
  title: string;
  description: string;
  category: string;
  images: {
    profession: string;
    profile: string;
  };
  link: string;
  buttonText: string;
}

export interface NavigationItem {
  id: string;
  name: string;
  href: string;
  icon: string;
}

export interface SoundOptions {
  volume?: number;
  loop?: boolean;
  preload?: boolean;
}