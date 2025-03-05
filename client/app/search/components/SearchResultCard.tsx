import StarRating from "@/schools/components/StarRating";
import Image from "next/image";
import Link from "next/link";

interface SearchResultCardProps {
  id: string;
  name: string;
  logo?: string | null;
  rating: number;
  description?: string | null;
}

const SearchResultCard = ({
  id,
  name,
  logo,
  rating,
  description,
}: SearchResultCardProps) => {
  return (
    <Link href={`/schools/${id}`} className="block">
      <div className="bg-white rounded-lg p-4 flex items-center gap-4">
        <div className="flex-shrink-0">
          <Image
            src={logo || "/defaultLogo.png"}
            alt={name}
            width={80}
            height={80}
            className="object-cover"
          />
        </div>
        <div className="flex">
          <h3 className="text-lg font-bold text-gray-800">{name}</h3>
          <StarRating rating={rating} size="sm" />
          {description && (
            <p className="text=sm text-gray-500 mt-1 line-clamp-2">
              {description}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
};

export default SearchResultCard;
