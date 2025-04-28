export type ActivityType = 'philosophy' | 'debate' | 'model-un';

export interface SimpleLink {
  label: string;
  href: string;
}

export interface SocialLink {
  type: 'facebook' | 'twitter' | 'instagram' | 'linkedin';
  url: string;
}

export interface NavigationLink {
  name: string;
  href: string;
  sublinks?: SimpleLink[];
}
