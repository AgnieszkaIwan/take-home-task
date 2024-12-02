import { create } from "zustand";
import { persist } from "zustand/middleware";

type State = {
  expandedCards: number[];
  deletedCards: number[];
};

type Actions = {
  toggleCardExpand: (id: number) => void;
  deleteCard: (id: number) => void;
  resetState: () => void;
};

export const useStore = create(
  persist<State & Actions>(
    (set) => ({
      expandedCards: [],
      deletedCards: [],
      toggleCardExpand: (id: number) =>
        set((state) => {
          const updatedCards = state.expandedCards.includes(id)
            ? state.expandedCards.filter((cardId) => cardId !== id)
            : [...state.expandedCards, id];
          return { expandedCards: updatedCards };
        }),
      deleteCard: (id: number) =>
        set((state) => ({
          deletedCards: [...state.deletedCards, id],
        })),
      resetState: () =>
        set(() => ({
          expandedCards: [],
          deletedCards: [],
        })),
    }),
    {
      name: "card-store",
      onRehydrateStorage: () => (state) => {
        if (state) {
          // Jeśli jest stan w localStorage, wyczyść go
          state.resetState();
        }
      },
    }
  )
);
