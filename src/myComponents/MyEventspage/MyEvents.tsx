import { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { RootState } from "@/store/store";
import axios from "axios";
import { BASE_URL, cookieSender } from "@/services/backend";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Pencil, Trash2 } from "lucide-react";
import UpdateEventModal from "./UpdateEventModal";
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
import LoadingCardContainer from "../Homepage/LoadingCardContainer";
import NoEvents from "./NoEvents";

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
  attendees: string[];
  createdBy: string;
  createdAt: string;
}

const MyEventComponent = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [deleteEventId, setDeleteEventId] = useState<string | null>(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  useEffect(() => {
    async function fetchMyEvents() {
      setLoading(true);
      try {
        const res = await axios.get(
          `${BASE_URL}api/v1/events/myEvents`,
          cookieSender
        );
        const myEvents = res.data.data;
        setEvents(myEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchMyEvents();
  }, []);

  const handleDeleteEvent = async () => {
    if (!deleteEventId) return;

    setLoading(true);
    try {
      await axios.delete(
        `${BASE_URL}api/v1/events/${deleteEventId}`,
        cookieSender
      );
      setEvents(events.filter((event) => event._id !== deleteEventId));
      setDeleteEventId(null);
    } catch (error) {
      console.error("Error deleting event:", error);
    }
    setLoading(false);
  };

  const handleOpenUpdateModal = (event: Event) => {
    setSelectedEvent(event);
    setIsUpdateModalOpen(true);
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">My Events</h2>

      {loading ? (
        <LoadingCardContainer />
      ) : events.length === 0 ? (
        <NoEvents />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {events.map((event) => (
            <Card key={event._id} className="rounded-xl shadow-lg">
              <img
                src={event.image}
                alt={event.name}
                className="w-full h-40 object-cover rounded-t-xl"
              />
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg font-semibold">
                    {event.name}
                  </CardTitle>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleOpenUpdateModal(event)}
                    >
                      <Pencil className="h-5 w-5 text-blue-500" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setDeleteEventId(event._id)}
                    >
                      <Trash2 className="h-5 w-5 text-red-500" />
                    </Button>
                  </div>
                </div>
                <Badge variant="secondary" className="p-2">
                  {event.category}
                </Badge>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">{event.description}</p>
                <p className="text-sm">
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
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <AlertDialog
        open={!!deleteEventId}
        onOpenChange={() => setDeleteEventId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              Do you really want to delete this event? This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => setDeleteEventId(null)}
              disabled={loading}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteEvent}
              className="bg-red-500 hover:bg-red-600"
              disabled={loading}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {selectedEvent && (
        <UpdateEventModal
          isOpen={isUpdateModalOpen}
          onClose={() => setIsUpdateModalOpen(false)}
          eventData={selectedEvent}
          onUpdateSuccess={() => window.location.reload()}
        />
      )}
    </div>
  );
};

export default MyEventComponent;
