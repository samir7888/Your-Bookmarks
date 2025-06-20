export type LinkType = {
  id: string;
  title: string;
  url: string;
  notes: string | null;
  category: {
    id: string;
    name: string;
  };
};