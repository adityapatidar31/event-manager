import { Button } from "@/components/ui/button";
import { Ban } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function NoEventAvailable() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-6">
      <Ban className="w-16 h-16 text-violet-500 mb-4" />
      <h2 className="text-2xl font-semibold">No Event Found</h2>
      <p className="text-muted-foreground mt-2">
        No Event match your current filters. Try adjusting your search criteria.
      </p>
      <Button className="mt-4" onClick={() => navigate("/")}>
        Reset Filters
      </Button>
    </div>
  );
}
