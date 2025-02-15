import { NotebookText } from "lucide-react";
import CardContainer from "./CardContainer";
import { Separator } from "@/components/ui/separator";
import FilterComponentByDate from "./FilterByDate";
import SortByDateComponent from "./SortByDate";

export default function HomePage() {
  return (
    <>
      <div className="flex items-center gap-2 text-2xl font-semibold mt-3 container mx-auto">
        <NotebookText className="w-6 h-6 text-primary" />
        <span>Events</span>
      </div>
      <Separator className="my-3" />

      <div className="flex flex-col sm:flex-row justify-end sm:gap-3 gap-0  mr-4">
        <FilterComponentByDate />
        <SortByDateComponent />
      </div>
      <CardContainer />
    </>
  );
}
