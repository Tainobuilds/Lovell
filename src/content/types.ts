/** Service categories (OOH, Concerts, …). Content lives in content/services/*.yaml. */
export type ServiceSlug = string;

export type Service = {
  slug: ServiceSlug;
  /** "01"–"05" */
  index: string;
  name: string;
  short: string;
  statement: string;
  description: string;
  capabilities: string[];
  media?: { image?: string; video?: string; alt?: string };
};

/** Portfolio entry. Content lives in content/projects/*.yaml. */
export type Project = {
  slug: string;
  title: string;
  category: ServiceSlug;
  categoryName: string;
  client: string;
  year: string;
  summary: string;
  scope: string[];
  credits: { role: string; name: string }[];
  cover?: string;
  video?: string;
  embed?: string;
  gallery: string[];
  featured: boolean;
  sample: boolean;
};
