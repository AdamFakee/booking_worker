import { create } from 'zustand';

export interface Worker {
  id: string;
  name: string;
  service: string;
  distance?: number;
  rating: number;
  reviews: number;
  verified: boolean;
  avatar: string;
  // Add other fields as necessary from your mock data
}

interface SelectionState {
  selectedWorkers: Worker[];
  toggleWorker: (worker: Worker) => void;
  removeWorker: (id: string) => void;
  clearSelection: () => void;
  isSelected: (id: string) => boolean;
}

export const useSelectionStore = create<SelectionState>((set, get) => ({
  selectedWorkers: [],
  
  toggleWorker: (worker) => {
    const { selectedWorkers } = get();
    const exists = selectedWorkers.find(w => w.id === worker.id);
    
    if (exists) {
      set({ selectedWorkers: selectedWorkers.filter(w => w.id !== worker.id) });
    } else {
      set({ selectedWorkers: [...selectedWorkers, worker] });
    }
  },

  removeWorker: (id) => {
    set((state) => ({
      selectedWorkers: state.selectedWorkers.filter((w) => w.id !== id),
    }));
  },

  clearSelection: () => {
    set({ selectedWorkers: [] });
  },

  isSelected: (id) => {
    return !!get().selectedWorkers.find((w) => w.id === id);
  },
}));
