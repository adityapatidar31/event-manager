import { useState } from "react";
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
import { formatDateTime } from "@/services/utils";
import { toast } from "react-toastify";
import { createEvent } from "@/services/backend";
import { SyncLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";

export default function EventForm() {
  const [date, setDate] = useState<Date | undefined>();
  const [time, setTime] = useState("");
  const [capacity, setCapacity] = useState(50);
  const [duration, setDuration] = useState(60);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState("");
  const [isPending, setIsPending] = useState(false);
  const navigate = useNavigate();
  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    console.log({
      name,
      description,
      category,
      capacity,
      duration,
      date,
      time,
      location,
      image,
    });
    if (!date) {
      toast.error("Date is required");
      return;
    }
    const modifiedDate = formatDateTime(date, time);
    const body = {
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
      await createEvent(body);
      toast.success("Event Created successfully!");
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error("There is an error in creating Event");
    } finally {
      setIsPending(false);
    }
    setTime("");
    setCapacity(50);
    setDuration(60);
    setName("");
    setDescription("");
    setCategory("");
    setLocation("");
    setImage("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-4 w-full max-w-2xl mx-auto bg-card shadow-md rounded-lg md:p-6"
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
      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? <SyncLoader color="#fff" /> : "Create Event"}
      </Button>
    </form>
  );
}
