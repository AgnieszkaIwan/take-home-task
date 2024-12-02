import { FC } from "react";
import { XMarkIcon } from "./icons";

type ButtonProps = React.ComponentProps<"button">;

type ToggleButtonProps = {
  isToggled: boolean;
  onToggle: () => void;
  labelOn?: string;
  labelOff?: string;
  iconOn?: React.ReactNode;
  iconOff?: React.ReactNode;
};

export const ToggleButton: FC<ToggleButtonProps> = ({
  isToggled,
  onToggle,
  labelOn = "On",
  labelOff = "Off",
  iconOn,
  iconOff,
}) => {
  return (
    <button onClick={onToggle} className="hover:text-gray-700 transition-colors flex items-center justify-center">
      {isToggled ? (iconOn ? iconOn : labelOn) : (iconOff ? iconOff : labelOff)}
    </button>
  );
};

export const DeleteButton: FC<Omit<ButtonProps, "children">> = (props) => {
  return (
    <button className="hover:text-gray-700 transition-colors flex items-center justify-center" {...props}>
      <XMarkIcon />
    </button>
  );
};

