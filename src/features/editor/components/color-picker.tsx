import { ChromePicker, CirclePicker } from "react-color";
import { colors } from "@/features/editor/types";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

const ColorPicker = ({ onChange, value }: Props) => {
  return (
    <div className="w-full space-y-4">
      <ChromePicker
        color={value}
        onChange={() => {}}
        className="rounded-lg border"
      />
      <CirclePicker color={value} colors={colors} onChangeComplete={() => {}} />
    </div>
  );
};

export default ColorPicker;
