export type Category = {
  id: number;
  name: string;
  slug: string;
  parent: number | null;
  parent_name?: string | null;
  genre?: number;
  children?: Category[];
};