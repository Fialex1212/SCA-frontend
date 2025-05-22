export interface Cat {
  id: string;
  name: string;
  breed: string;
  salary: number;
}

export interface CatStore {
  cats: Cat[];
  loading: boolean;
  error: string | null;
  fetchCats: () => Promise<void>;
}

export interface Target {
  id: string;
  mission_id: string;
  name: string;
  country: string;
  notes: string;
  is_complete: boolean;
}

export interface Mission {
  id: string;
  cat_id: string | null;
  is_complete: boolean;
  targets: Target[];
}

export interface MissionStore {
  missions: Mission[];
  loading: boolean;
  error: string | null;
  fetchMissions: () => Promise<void>;
}

export interface Breed {
  id: string;
  name: string;
};

export interface CatCreateData {
  name: string;
  breed: string;
  salary: number;
};