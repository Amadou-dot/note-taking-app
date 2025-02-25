export type Note = {
  id: number;
  title: string;
  tags: string[];
  created_at: Date;
  last_updated: Date;
  body: string;
  isArchived?: boolean;
};
