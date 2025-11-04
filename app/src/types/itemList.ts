export interface ItemList {
  id: string;
  name: string;
  avatar: string;
}

export interface ListState {
  data: ItemList[];
  loading: boolean;
  error: string | null;
}