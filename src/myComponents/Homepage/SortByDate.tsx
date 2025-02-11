import { useSearchParams } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const sortOptions = [
  { label: "Sort: Newest First", value: "-date" },
  { label: "Sort: Oldest First", value: "+date" },
];

function SortByDateComponent() {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSortChange = (value: string) => {
    searchParams.set("sort", value);
    setSearchParams(searchParams); // Update URL
  };

  return (
    <div className="flex justify-end mb-4">
      <Select
        onValueChange={handleSortChange}
        defaultValue={searchParams.get("sort") || "-date"}
      >
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Sort by Date" />
        </SelectTrigger>
        <SelectContent>
          {sortOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export default SortByDateComponent;
