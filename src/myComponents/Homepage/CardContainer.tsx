import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { joinEvent, leaveEvent } from "@/store/eventSlice";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import axios from "axios";
import { BASE_URL, cookieSender } from "@/services/backend";
import LoadingCardContainer from "./LoadingCardContainer";
import { Button } from "@/components/ui/button";
import { socket } from "@/services/socket";
import { useSearchParams } from "react-router-dom";

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
  const dispatch = useDispatch();
  const joinedEvent = useSelector((state: RootState) => state.event);
  const [searchParams] = useSearchParams();
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [attendeeCounts, setAttendeeCounts] = useState<{
    [key: string]: number;
  }>({});

  useEffect(() => {
    async function getAllEvents() {
      const search = searchParams.get("search");
      setIsLoading(true);
      try {
        if (search) {
          const res = await axios.get(
            `${BASE_URL}api/v1/events?search=${search}`,
            cookieSender
          );
          setEvents(res.data?.data);
        } else {
          const res = await axios.get(`${BASE_URL}api/v1/events`, cookieSender);
          setEvents(res.data?.data);
        }
      } catch {
        console.log("There is an error fetching events");
      } finally {
        setIsLoading(false);
      }
    }

    getAllEvents();
  }, [searchParams]);

  useEffect(() => {
    socket.connect();

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
  const handleJoinEvent = (event: Event) => {
    if (joinedEvent._id) {
      alert(
        `You have already joined "${joinedEvent.name}". Please leave it first.`
      );
      return;
    }

    // Join the event
    socket.emit("joinEvent", event._id);
    dispatch(joinEvent(event)); // Update Redux store
  };

  // Handle leaving an event
  const handleLeaveEvent = () => {
    if (!joinedEvent._id) return;

    socket.emit("leaveEvent", joinedEvent._id);
    dispatch(leaveEvent()); // Remove from Redux store
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
              src="https://images.unsplash.com/photo-1739036462754-6e86520998a2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0fHx8ZW58MHx8fHx8"
              // src={event.image}
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
              {joinedEvent._id === event._id ? (
                <Button
                  className="mt-4 w-full bg-red-500 hover:bg-red-600"
                  onClick={handleLeaveEvent}
                >
                  Leave Event
                </Button>
              ) : (
                <Button
                  className="mt-4 w-full"
                  onClick={() => handleJoinEvent(event)}
                >
                  Join
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default CardContainer;
