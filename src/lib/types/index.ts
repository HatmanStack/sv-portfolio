/**
 * Type Definitions
 *
 * Centralized type system for the portfolio application.
 * All shared types should be defined here and imported as:
 *
 * import type { TypeName } from '$lib/types';
 */

/* ============================================
 * Domain Types
 * ============================================ */

/**
 * Represents a portfolio project (main projects on home page).
 *
 * Used to display project cards on the home page featuring
 * major projects like Float, Nova Canvas, and Savor Swipe.
 */
export interface Project {
  /** Unique identifier for the project */
  id: string;

  /** Project title/name */
  title: string;

  /** Detailed description of the project */
  description: string;

  /** Project category (e.g., "Cross-Platform", "Web") */
  category: string;

  /** Project images for different states */
  images: {
    /** Professional/active state image */
    profession: string;
    /** Profile/default state image */
    profile: string;
  };

  /** URL to the live project or demo */
  link: string;

  /** Text for the call-to-action button */
  buttonText: string;
}

/**
 * Represents an Android application in the portfolio.
 *
 * Used to display Android apps in the /android showcase page.
 */
export interface AndroidApp {
  /** Unique identifier for the Android app */
  id: string;

  /** App title/name */
  title: string;

  /** Link to Google Play Store or demo (optional) */
  link?: string;

  /** Detailed description of the app (optional) */
  description?: string;

  /** Initial/default state image */
  initialImg: string;

  /** Active/hover state image */
  activeImg: string;
}

/**
 * Represents a web project in the portfolio.
 *
 * Used to display web projects in the /web showcase page.
 */
export interface WebProject {
  /** Unique identifier for the web project */
  id: string;

  /** Project title/name */
  title: string;

  /** Link to live project or demo (optional) */
  link?: string;

  /** Detailed description of the project (optional) */
  description?: string;

  /** Initial/default state image */
  initialImg: string;

  /** Active/hover state image */
  activeImg: string;
}

/**
 * Represents a blog post.
 *
 * Blog posts are written in Markdown with frontmatter
 * and loaded via MDSvex.
 */
export interface BlogPost {
  /** URL-friendly slug (used in route /read/post/[slug]) */
  slug: string;

  /** Post title */
  title: string;

  /** Publication date (human-readable format) */
  date: string;

  /** Short description/excerpt for listing pages */
  description: string;

  /** Estimated reading time */
  time: string;

  /** Optional link to external article (e.g., Medium) */
  link?: string;
}

/**
 * Blog post metadata (frontmatter from Markdown files).
 *
 * This is the structure of metadata parsed from the frontmatter
 * of .md files in /routes/read/post/
 */
export interface BlogPostMetadata {
  /** Post title */
  title: string;

  /** Publication date */
  date: string;

  /** Short description */
  description: string;

  /** Reading time estimate */
  time: string;

  /** Optional external link */
  link?: string;
}

/**
 * Represents an image item for the ImageGrid component.
 *
 * Used to display animated image grids with scroll-based animations.
 */
export interface ImageGridItem {
  /** Unique identifier for the image */
  id: string;

  /** Image source path or URL */
  src: string;

  /** Alt text for accessibility */
  alt: string;

  /** Optional animation range for scroll animations (e.g., "10% 20%") */
  animationRange?: string;

  /** Whether this is a special item (text instead of image) */
  special?: boolean;

  /** Content for special items */
  content?: string;
}

/**
 * Represents a navigation menu item.
 *
 * Used for the main navigation menu in the Header component.
 */
export interface NavigationItem {
  /** Unique identifier for the nav item */
  id: string;

  /** Display name for the nav item */
  name: string;

  /** Route path */
  href: string;

  /** SVG icon markup */
  icon: string;
}

/* ============================================
 * Component Prop Types
 * ============================================ */

/**
 * Props for ProjectCard component.
 *
 * Displays a single project as an expandable card with image,
 * title, description, and call-to-action button.
 */
export interface ProjectCardProps {
  /** The project to display */
  project: Project;
}

/**
 * Props for ImageGrid component.
 *
 * Displays a responsive grid of images with scroll-based
 * animations and optional special content items.
 */
export interface ImageGridProps {
  /** Array of images to display */
  images: ImageGridItem[];

  /** Additional CSS classes */
  className?: string;
}

/**
 * Props for GooeyButton component.
 *
 * Interactive button with gooey animation effect.
 */
export interface GooeyButtonProps {
  /** Button content (children) */
  children?: any;

  /** Click handler */
  onclick?: () => void;
}

/* ============================================
 * Store Types
 * ============================================ */

/**
 * Navigation state.
 *
 * Tracks current route and menu state for the application.
 */
export interface NavigationState {
  /** Current section/route identifier */
  currentSection: string;

  /** Whether mobile menu is open */
  isMenuOpen: boolean;
}

/**
 * User preferences state.
 *
 * Stored in localStorage and applied app-wide.
 */
export interface UserPreferences {
  /** Whether sound effects are enabled */
  soundEnabled: boolean;

  /** Whether to respect prefers-reduced-motion */
  reducedMotion: boolean;

  /** Theme preference: light, dark, or auto (system) */
  theme: Theme;
}

/**
 * App-wide state.
 *
 * Global application state managed by app store.
 */
export interface AppState {
  /** Navigation state */
  navigation: NavigationState;

  /** User preferences */
  preferences: UserPreferences;

  /** Global loading state */
  isLoading: boolean;
}

/* ============================================
 * Utility Types
 * ============================================ */

/**
 * Theme options.
 *
 * - `light`: Light mode with light background
 * - `dark`: Dark mode with dark background
 * - `auto`: Follow system preference (prefers-color-scheme)
 */
export type Theme = 'light' | 'dark' | 'auto';

/**
 * Applied theme (after resolving 'auto').
 *
 * This is the actual theme applied to the document,
 * with 'auto' resolved to either 'light' or 'dark'.
 */
export type AppliedTheme = 'light' | 'dark';

/**
 * Sound configuration options.
 *
 * Used to configure audio playback in the sound hook.
 */
export interface SoundOptions {
  /** Volume level (0-1) */
  volume?: number;

  /** Whether to loop the sound */
  loop?: boolean;

  /** Whether to preload the audio */
  preload?: boolean;
}
