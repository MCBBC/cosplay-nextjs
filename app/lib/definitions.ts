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
  title: string;
  id: number;
  cover: string | null;
  creation_date?: Date;
  status?: number;
  coser_id?: number | null;
  view_count?: number | null;
  coser?: {
    name?: string;
    avatar?: string | null;
    id?: number;
  } | null;
};

export type Coser = {
  id: number;
  name: string;
  slug?: string;
  description?: string | null;
  post_count?: number;
  avatar?: string | null;
  background_image?: string | null;
};
