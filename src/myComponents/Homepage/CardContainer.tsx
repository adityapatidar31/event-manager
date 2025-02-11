import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import axios from "axios";
import { BASE_URL, cookieSender } from "@/services/backend";
import LoadingCardContainer from "./LoadingCardContainer";
import { Button } from "@/components/ui/button";
import { socket } from "@/services/socket";

interface Event {
  _id: string;
  name: string;
  description: string;
  category: string;
  capacity: number;
  duration: number;
  date: string;
  location: string;
  image: string;
  createdBy: string;
  createdAt: string;
}

function CardContainer() {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [attendeeCounts, setAttendeeCounts] = useState<{
    [key: string]: number;
  }>({});

  useEffect(() => {
    async function getAllEvents() {
      setIsLoading(true);
      try {
        const res = await axios.get(`${BASE_URL}api/v1/events`, cookieSender);
        setEvents(res.data?.data);
      } catch {
        console.log("There is an error fetching events");
      } finally {
        setIsLoading(false);
      }
    }

    getAllEvents();
  }, []);

  useEffect(() => {
    socket.connect();

    // Listen for real-time attendee updates
    socket.on("attendeeUpdate", ({ eventId, count }) => {
      setAttendeeCounts((prevCounts) => ({
        ...prevCounts,
        [eventId]: count,
      }));
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  // Handle joining an event
  const handleJoinEvent = (eventId: string) => {
    socket.emit("joinEvent", eventId);
  };

  if (isLoading) {
    return <LoadingCardContainer />;
  }

  if (!events.length) {
    return <p className="text-center text-gray-500">No events available.</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <Card
            key={event._id}
            className="rounded-xl shadow-lg hover:shadow-xl transition"
          >
            <img
              // src={event.image}
              src="https://images.unsplash.com/photo-1739036462754-6e86520998a2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0fHx8ZW58MHx8fHx8"
              alt={event.name}
              className="w-full sm:h-50 h-45 object-cover rounded-t-xl"
            />
            <CardHeader>
              <CardTitle className="text-lg font-semibold mb-2">
                {event.name}
              </CardTitle>
              <Badge variant="secondary" className="p-2">
                {event.category}
              </Badge>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 line-clamp-2">
                {event.description}
              </p>
              <p className="text-sm mt-2">
                <strong>Location:</strong> {event.location}
              </p>
              <p className="text-sm">
                <strong>Capacity:</strong> {event.capacity}
              </p>
              <p className="text-sm">
                <strong>Duration:</strong> {event.duration} mins
              </p>
              <p className="text-sm">
                <strong>Date:</strong> {format(new Date(event.date), "PPP p")}
              </p>
              <p className="text-sm">
                <strong>Attendees: </strong>
                {attendeeCounts[event._id] || 0}
              </p>
              <Button
                className="mt-4 w-full"
                onClick={() => handleJoinEvent(event._id)}
              >
                Join
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default CardContainer;
