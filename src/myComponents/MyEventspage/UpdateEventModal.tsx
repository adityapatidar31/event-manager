import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { formatDateTime } from "@/services/utils";
import { toast } from "react-toastify";
import axios from "axios";
import { BASE_URL, cookieSender } from "@/services/backend";
import { SyncLoader } from "react-spinners";

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

interface UpdateEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  eventData: Event;
  onUpdateSuccess: () => void;
}

export default function UpdateEventModal({
  isOpen,
  onClose,
  eventData,
  onUpdateSuccess,
}: UpdateEventModalProps) {
  const [date, setDate] = useState<Date | undefined>();
  const [time, setTime] = useState("");
  const [capacity, setCapacity] = useState(50);
  const [duration, setDuration] = useState(60);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState("");
  const [isPending, setIsPending] = useState<boolean>(false);

  useEffect(() => {
    if (eventData) {
      setName(eventData.name);
      setDescription(eventData.description);
      setCategory(eventData.category);
      setCapacity(eventData.capacity);
      setDuration(eventData.duration);
      setLocation(eventData.location);
      setImage(eventData.image);
      setDate(new Date(eventData.date));
      setTime(new Date(eventData.date).toISOString().slice(11, 16)); // Extract time from date
    }
  }, [eventData]);

  async function handleUpdate(event: React.FormEvent) {
    event.preventDefault();
    if (!date) {
      toast.error("Date is required");
      return;
    }

    const modifiedDate = formatDateTime(date, time);
    const updatedEvent = {
      name,
      description,
      capacity,
      category,
      duration,
      date: modifiedDate,
      location,
      image,
    };

    try {
      setIsPending(true);
      await axios.patch(
        `${BASE_URL}api/v1/events/${eventData._id}`,
        updatedEvent,
        cookieSender
      );
      toast.success("Event updated successfully!");
      onUpdateSuccess();
      onClose();
    } catch (error) {
      console.error("Error updating event:", error);
      toast.error("Failed to update event.");
    } finally {
      setIsPending(false);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>Update Event</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={handleUpdate}
          className="space-y-4 max-h-96 overflow-y-auto"
        >
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full"
            />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full"
            />
          </div>
          <div>
            <Label htmlFor="category">Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger id="category">Select category</SelectTrigger>
              <SelectContent>
                <SelectItem value="Tech">Tech</SelectItem>
                <SelectItem value="Music">Music</SelectItem>
                <SelectItem value="Sports">Sports</SelectItem>
                <SelectItem value="Education">Education</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Capacity: {capacity}</Label>
            <Slider
              min={1}
              max={500}
              value={[capacity]}
              onValueChange={(val) => setCapacity(val[0])}
              className="w-full"
            />
          </div>
          <div>
            <Label>Duration (minutes): {duration}</Label>
            <Slider
              min={1}
              max={300}
              value={[duration]}
              onValueChange={(val) => setDuration(val[0])}
              className="w-full"
            />
          </div>
          <div>
            <Label>Date</Label>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="w-full"
            />
          </div>
          <div>
            <Label htmlFor="time">Time</Label>
            <Input
              type="time"
              id="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full"
            />
          </div>
          <div>
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              required
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full"
            />
          </div>
          <div>
            <Label htmlFor="image">Image URL</Label>
            <Input
              id="image"
              type="url"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="w-full"
            />
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={onClose} disabled={isPending}>
              Cancel
            </Button>
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? <SyncLoader color="#fff" /> : "Update Event"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
