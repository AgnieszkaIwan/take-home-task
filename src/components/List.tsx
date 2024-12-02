import { FC } from "react";
import { useStore } from "../store";
import { ListItem } from "../api/getListData";
import { ToggleButton, DeleteButton } from "./Buttons";
import { ChevronDownIcon, ChevronUpIcon } from "./icons";

type CardProps = {
  id: number;
  title: ListItem["title"];
  description: ListItem["description"];
  canExpand?: boolean;
  canDelete?: boolean;
};

export const Card: FC<CardProps> = ({ id, title, description, canExpand = true, canDelete = true }) => {
  const { expandedCards, toggleCardExpand, deleteCard } = useStore();
  const isExpanded = expandedCards.includes(id);


  return (
    <div className={`card border border-black px-2 py-1.5 ${isExpanded ? "expanded" : ""}`}>
      <div className="flex justify-between mb-0.5">
        <h1 className="font-medium">{title}</h1>
        <div className="flex">
          {canExpand && (
            <ToggleButton
              isToggled={isExpanded}
              onToggle={() => toggleCardExpand(id)}
              iconOn={<ChevronUpIcon />}
              iconOff={<ChevronDownIcon />}
            />
          )}
          {canDelete && <DeleteButton onClick={() => deleteCard(id)} />}
        </div>
      </div>
      {isExpanded && canExpand && <p className="text-sm">{description}</p>}
    </div>
  );
};
