import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MinusIcon, PlusIcon } from "lucide-react";
import { ChangeEvent } from "react";

type Props = {
  value: number;
  onChange: (value: number) => void;
};

const FontSizeInput = ({ onChange, value }: Props) => {
  const increment = () => onChange(value + 1);
  const decrement = () => onChange(value - 1);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    onChange(value);
  };

  return (
    <div className="flex items-center">
      <Button
        variant={"outline"}
        size="icon"
        className="rounded-r-none border-r-0 p-2"
        onClick={decrement}
      >
        <MinusIcon className="size-4" />
      </Button>
      <Input
        value={value}
        onChange={handleChange}
        className="h-8 max-w-16 rounded-none text-center focus-visible:ring-0 focus-visible:ring-offset-0"
      />
      <Button
        variant={"outline"}
        size="icon"
        className="rounded-l-none border-l-0 p-2"
        onClick={increment}
      >
        <PlusIcon className="size-4" />
      </Button>
    </div>
  );
};

export default FontSizeInput;
