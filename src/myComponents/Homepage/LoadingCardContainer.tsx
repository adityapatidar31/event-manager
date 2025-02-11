import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const EventCardSkeleton = () => {
  return (
    <Card className="rounded-xl shadow-lg">
      <Skeleton className="w-full sm:h-50 h-45 rounded-t-xl" />
      <CardHeader>
        <CardTitle className="text-lg font-semibold mb-2">
          <Skeleton className="h-6 w-3/4" />
        </CardTitle>
        <Skeleton className="h-5 w-20" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-2/3 mb-2" />
        <Skeleton className="h-4 w-1/2 mb-2" />
        <Skeleton className="h-4 w-3/4 mb-2" />
        <Skeleton className="h-4 w-1/3" />
      </CardContent>
    </Card>
  );
};

const LoadingCardContainer = () => {
  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <EventCardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
};

export default LoadingCardContainer;
