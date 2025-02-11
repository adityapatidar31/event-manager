export function formatDateTime(dateString: Date, timeString: string) {
  const date = new Date(dateString);
  const [hours, minutes] = timeString.split(":").map(Number);

  // Set hours and minutes from the provided time
  date.setHours(hours, minutes, 0, 0);

  // Get timezone offset in minutes and convert to hours and minutes
  const tzOffsetMinutes = date.getTimezoneOffset();
  const tzOffsetHours = Math.abs(Math.floor(tzOffsetMinutes / 60));
  const tzOffsetMins = Math.abs(tzOffsetMinutes % 60);
  const tzSign = tzOffsetMinutes > 0 ? "-" : "+";

  // Format timezone offset as "+HH:MM" or "-HH:MM"
  const tzOffsetFormatted = `${tzSign}${String(tzOffsetHours).padStart(
    2,
    "0"
  )}:${String(tzOffsetMins).padStart(2, "0")}`;

  // Convert to ISO string and replace 'Z' with the formatted timezone offset
  return date.toISOString().replace("Z", tzOffsetFormatted);
}
