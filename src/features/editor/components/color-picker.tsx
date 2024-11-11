import { colors } from "@/features/editor/types";
import { rgbaObjectToString } from "@/features/editor/utils";
import { useEffect, useState } from "react";
import { ChromePicker, CirclePicker } from "react-color";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

const ColorPicker = ({ onChange, value }: Props) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (isMounted === false) return null;

  return (
    <div className="w-full space-y-4">
      <ChromePicker
        color={value}
        onChange={(color) => {
          const formattedValue = rgbaObjectToString(color.rgb);
          onChange(formattedValue);
        }}
        className="rounded-lg border"
      />
      <CirclePicker
        color={value}
        colors={colors}
        onChangeComplete={(color) => {
          const formattedValue = rgbaObjectToString(color.rgb);
          onChange(formattedValue);
        }}
      />
    </div>
  );
};

export default ColorPicker;
