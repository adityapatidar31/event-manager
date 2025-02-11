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

const myEvents = [
  {
    _id: "67abc7da47e65f8c72964088",
    name: "Pizza",
    description: "11111111111111",
    category: "Sports",
    capacity: 50,
    duration: 60,
    date: "2025-02-19T20:32:00.000Z",
    location: "123456",
    attendees: [],
    createdBy: "67abb52da21f6a314c85e1bf",
    createdAt: "2025-02-11T21:57:46.548Z",
    __v: 0,
  },
  {
    _id: "67ab31f891158b016f14b0fc",
    name: "Startup Pitch Fest",
    description:
      "Showcase your startup ideas in front of top investors and mentors.",
    category: "Tech",
    capacity: 250,
    duration: 150,
    date: "2025-02-16T12:00:00.000Z",
    location: "New York, NY",
    image: "https://res.cloudinary.com/sample/image/upload/startup_pitch.jpg",
    attendees: [],
    createdBy: "65b9c1f4a7c8f2e5b0d11111",
    createdAt: "2025-02-11T12:00:00.000Z",
  },
  {
    _id: "67ab31f891158b016f14b0fb",
    name: "Marathon 2025",
    description: "Join the annual city marathon and challenge your limits.",
    category: "Sports",
    capacity: 500,
    duration: 300,
    date: "2025-02-15T12:00:00.000Z",
    location: "Chicago, IL",
    image: "https://res.cloudinary.com/sample/image/upload/marathon_event.jpg",
    attendees: [],
    createdBy: "65b9c1f4a7c8f2e5b0d54321",
    createdAt: "2025-02-11T12:00:00.000Z",
  },
  {
    _id: "67ab31f891158b016f14b0fa",
    name: "AI & Machine Learning Bootcamp",
    description:
      "An intensive workshop on AI and ML for beginners and professionals.",
    category: "Education",
    capacity: 100,
    duration: 240,
    date: "2025-02-14T12:00:00.000Z",
    location: "Boston, MA",
    image: "https://res.cloudinary.com/sample/image/upload/ai_ml_bootcamp.jpg",
    attendees: [],
    createdBy: "65b9c1f4a7c8f2e5b0d98765",
    createdAt: "2025-02-11T12:00:00.000Z",
  },
  {
    _id: "67ab31f891158b016f14b0f9",
    name: "Jazz Night Live",
    description: "Enjoy a mesmerizing evening with live jazz performances.",
    category: "Music",
    capacity: 150,
    duration: 180,
    date: "2025-02-13T12:00:00.000Z",
    location: "New Orleans, LA",
    image: "https://res.cloudinary.com/sample/image/upload/jazz_night.jpg",
    attendees: [],
    createdBy: "65b9c1f4a7c8f2e5b0d67890",
    createdAt: "2025-02-11T12:00:00.000Z",
  },
  {
    _id: "67ab31f891158b016f14b0f8",
    name: "Tech Innovators Meetup",
    description: "A networking event for tech enthusiasts and entrepreneurs.",
    category: "Tech",
    capacity: 200,
    duration: 120,
    date: "2025-02-12T12:00:00.000Z",
    location: "San Francisco, CA",
    image: "https://res.cloudinary.com/sample/image/upload/tech_event.jpg",
    attendees: [],
    createdBy: "65b9c1f4a7c8f2e5b0d12345",
    createdAt: "2025-02-11T12:00:00.000Z",
  },
  {
    _id: "67aae9aebc904d31d9012ed1",
    name: "Event1",
    description: "Maje karege",
    category: "Tech",
    date: "2025-02-12T10:00:00.000Z",
    location: "Indore GeetaBhavan",
    attendees: ["67aae8fceab363e5b194d880"],
    createdBy: "67aae8fceab363e5b194d880",
    createdAt: "2025-02-11T06:09:50.752Z",
    __v: 0,
  },
  {
    _id: "67aae9b4bc904d31d9012ed4",
    name: "Event",
    description: "Maje karege",
    category: "Tech",
    date: "2025-02-12T10:00:00.000Z",
    location: "Indore GeetaBhavan",
    attendees: [],
    createdBy: "67aae8fceab363e5b194d880",
    createdAt: "2025-02-11T06:09:56.052Z",
    __v: 0,
  },
  {
    _id: "67abc0ddc94f9e3a19ecf5a4",
    name: "Event re",
    description: "Maje karege",
    category: "Tech",
    capacity: 3,
    duration: 3,
    date: "2025-02-12T10:00:00.000Z",
    location: "Indore GeetaBhavan",
    attendees: [],
    createdBy: "67aae8fceab363e5b194d880",
    createdAt: "2025-02-11T21:27:57.597Z",
    __v: 0,
  },
  {
    _id: "67abc70090244de171780e02",
    name: "Event ree",
    description: "Maje karege",
    category: "Tech",
    capacity: 3,
    duration: 3,
    date: "2025-02-12T10:00:00.000Z",
    location: "Indore GeetaBhavan",
    attendees: [],
    createdBy: "67aaf5b36ec0eb420ac9291e",
    createdAt: "2025-02-11T21:54:08.839Z",
    __v: 0,
  },
];

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
  };

  const handleOpenUpdateModal = (event: Event) => {
    setSelectedEvent(event);
    setIsUpdateModalOpen(true);
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">My Events</h2>

      {loading ? (
        <p>Loading events...</p>
      ) : events.length === 0 ? (
        <p className="text-gray-500">You haven't created any events yet.</p>
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
            <AlertDialogCancel onClick={() => setDeleteEventId(null)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteEvent}
              className="bg-red-500 hover:bg-red-600"
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
