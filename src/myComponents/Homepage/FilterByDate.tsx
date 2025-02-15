import { useSearchParams, useNavigate } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const dateFilters = [
  { label: "Date: All", value: "all" },
  { label: "Date: Today", value: "today" },
  { label: "Date: Next Week", value: "nextWeek" },
  { label: "Date: Next Month", value: "nextMonth" },
  { label: "Date: Next 3 Months", value: "nextThreeMonths" },
  { label: "Date: This Year", value: "thisYear" },
  { label: "Date: Next 3 Years", value: "nextThreeYears" },
];

function FilterComponentByDate() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const handleDateFilterChange = (value: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set("date", value);
    } else {
      newParams.delete("date");
    }
    navigate(`?${newParams.toString()}`); // Update URL
  };

  return (
    <div className="flex justify-end mb-4">
      <Select
        onValueChange={handleDateFilterChange}
        defaultValue={searchParams.get("date") || ""}
      >
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Filter by Date" />
        </SelectTrigger>
        <SelectContent>
          {dateFilters.map((filter) => (
            <SelectItem key={filter.value} value={filter.value}>
              {filter.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export default FilterComponentByDate;
