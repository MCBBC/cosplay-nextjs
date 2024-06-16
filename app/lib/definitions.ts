export type User = {
  id: number;
  name: string;
  email: string;
  password: string;
  created_at: string | Date;
  updated_at: string | Date;
  user_role: number;
};

export type Cosplay = {
  id: number;
  title: string;
  coser?: { id: number; name: string } | null;
  cover?: string | undefined | null;
  content?: string;
  onload?: boolean;
  creation_date?: string | Date;
  view_count?: number;
  status?: number;
};

export type Coser = {
  id: number;
  name: string;
  slug?: string;
  description?: string | null;
  post_count?: number;
  cover_image?: string | null;
  background_image?: string | null;
};
