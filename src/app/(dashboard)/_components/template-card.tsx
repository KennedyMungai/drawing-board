import { cn } from "@/lib/utils";
import { CrownIcon } from "lucide-react";
import Image from "next/image";

type Props = {
  imageSrc: string;
  title: string;
  onClick: () => void;
  disabled?: boolean;
  description: string;
  width: number;
  height: number;
  isPro: boolean | null;
};

const TemplateCard = ({
  description,
  height,
  imageSrc,
  isPro,
  onClick,
  title,
  width,
  disabled,
}: Props) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "flx group flex-col space-y-2 text-left transition",
        disabled ? "cursor-not-allowed opacity-75" : "cursor-pointer",
      )}
    >
      <div
        className="relative aspect-[3/2] size-full overflow-hidden rounded-xl border"
        style={{ aspectRatio: `${width}/${height}` }}
      >
        <Image
          fill
          src={imageSrc}
          alt={title}
          className="transform object-cover transition group-hover:scale-105"
        />
        {isPro && (
          <div className="absolute right-2 top-2 z-10 flex size-10 items-center justify-center rounded-full bg-black/50">
            <CrownIcon className="text-yellow=500 size-5 fill-yellow-500" />
          </div>
        )}
        <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-black/50 opacity-0 backdrop-blur-sm backdrop-filter transition group-hover:opacity-100">
          <p className="font-medium text-white">Open in editor</p>
        </div>
      </div>
      <div className="space-y-1">
        <p className="text-sm font-medium">{title}</p>
        <p className="text-xs text-muted-foreground opacity-0 transition group-hover:opacity-75">
          {description}
        </p>
      </div>
    </button>
  );
};

export default TemplateCard;
