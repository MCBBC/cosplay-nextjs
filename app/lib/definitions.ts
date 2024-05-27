export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  created_at: string;
  updated_at: string;
  user_role: string;
};

export type Cosplay = {
  id: number;
  title: string;
  cos_name: string;
  cos_id: number;
  cover?: string;
  content?: string;
  tag_id?: number;
  onload?: boolean;
  creation_date?: string;
  view_count?: number;
};
