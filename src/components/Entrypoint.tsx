import { useEffect, useState } from "react";
import { useStore } from "../store";
import { ListItem, useGetListData } from "../api/getListData";
import { Card } from "./List";
import { Spinner } from "./Spinner";

export const Entrypoint = () => {
  const [visibleCards, setVisibleCards] = useState<ListItem[]>([]);
  const [revealDeleted, setRevealDeleted] = useState(false);

  const listQuery = useGetListData();
  const { deletedCards } = useStore();

  // TOOD
  // const deletedCards: DeletedListItem[] = [];
  useEffect(() => {
    if (listQuery.isLoading) {
      return;
    }
    const { deletedCards } = useStore.getState();
    setVisibleCards(
      listQuery.data?.filter((item) => item.isVisible && !deletedCards.includes(item.id)) ?? []
    );
  }, [listQuery.data, listQuery.isLoading, deletedCards]);

  const deletedCardItems = deletedCards
    .map((id) => listQuery.data?.find((item) => item.id === id))
    .filter((card): card is ListItem => !!card);
  if (listQuery.isLoading) {
    return <Spinner />;
  }

  return (
    <div className="flex gap-x-16">
      <div className="w-full max-w-xl">
        <div className="flex items-center justify-between">
          <h1 className="mb-1 font-medium text-lg">My Awesome List ({visibleCards.length})</h1>
          <button
            onClick={() => listQuery.refetch()}
            className="text-white text-sm transition-colors hover:bg-gray-800 bg-black rounded px-3 py-1"
          >
            Refresh
          </button>
        </div>
        <div className="flex flex-col gap-y-3">
          {visibleCards.map((card, index) => (
            <Card
              key={`${card.id}-${index}`}
              id={card.id}
              title={card.title}
              description={card.description}
            />
          ))}
        </div>
      </div>
      <div className="w-full max-w-xl">
        <div className="flex items-center justify-between">
          <h1 className="mb-1 font-medium text-lg">Deleted Cards ({deletedCards.length})</h1>
          <button
            onClick={() => setRevealDeleted((prev) => !prev)}
            className="text-white text-sm transition-colors hover:bg-gray-800 bg-black rounded px-3 py-1"
          >
            {revealDeleted ? "Hide" : "Reveal"}
          </button>
        </div>
        {revealDeleted && (
          <div className="flex flex-col gap-y-3">
            {deletedCardItems.map((card, index) => (
              card && (
                <Card
                  key={`deleted-${card.id}-${index}`}
                  id={card.id}
                  title={card.title}
                  description={""}
                  canExpand={false}
                  canDelete={false}
                />
              )
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
