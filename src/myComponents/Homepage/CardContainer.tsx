import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { joinEvent, leaveEvent } from "@/store/eventSlice";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import axios from "axios";
import { BASE_URL, cookieSender } from "@/services/backend";
import LoadingCardContainer from "./LoadingCardContainer";
import { Button } from "@/components/ui/button";
import { socket } from "@/services/socket";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

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
  const joinedEvent = useSelector((state: RootState) => state.event); // Get joined event
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [attendeeCounts, setAttendeeCounts] = useState<{
    [key: string]: number;
  }>({});
  const [showDialog, setShowDialog] = useState(false);
  const [pendingEvent, setPendingEvent] = useState<Event | null>(null);

  useEffect(() => {
    async function getAllEvents() {
      setIsLoading(true);
      try {
        const res = await axios.get(`${BASE_URL}api/v1/events`, cookieSender);
        setEvents(res.data?.data);
      } catch {
        console.log("Error fetching events");
      } finally {
        setIsLoading(false);
      }
    }

    getAllEvents();
  }, []);

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
    if (joinedEvent._id && joinedEvent._id !== event._id) {
      // If already in an event, show dialog
      setPendingEvent(event);
      setShowDialog(true);
      return;
    }

    // If not in any event, join directly
    socket.emit("joinEvent", event._id);
    dispatch(joinEvent(event));
  };

  // Handle leaving and joining a new event
  const confirmLeaveAndJoin = () => {
    if (joinedEvent._id) {
      socket.emit("leaveEvent", joinedEvent._id);
      dispatch(leaveEvent());
    }

    if (pendingEvent) {
      socket.emit("joinEvent", pendingEvent._id);
      dispatch(joinEvent(pendingEvent));
      setPendingEvent(null);
    }

    setShowDialog(false);
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
              src={event.image}
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
                  onClick={() => {
                    socket.emit("leaveEvent", joinedEvent._id);
                    dispatch(leaveEvent());
                  }}
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

      {/* Alert Dialog for Switching Events */}
      <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Leave Current Event?</AlertDialogTitle>
            <AlertDialogDescription>
              You have already joined "<strong>{joinedEvent.name}</strong>". Do
              you want to leave it and join "
              <strong>{pendingEvent?.name}</strong>" instead?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setShowDialog(false)}>
              OK
            </AlertDialogCancel>
            <AlertDialogAction onClick={confirmLeaveAndJoin}>
              Leave Last & Join
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default CardContainer;
