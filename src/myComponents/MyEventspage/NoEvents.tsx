import { CalendarOff } from "lucide-react";

function NoEvents() {
  return (
    <div className="flex flex-col items-center justify-center p-6 text-center text-gray-500">
      <CalendarOff className="w-16 h-16 text-primary" />
      <p className="mt-4 text-lg font-semibold">No Events yet</p>
      <p className="text-sm text-gray-400">
        You have not submitted any Events yet.
      </p>
    </div>
  );
}

export default NoEvents;
