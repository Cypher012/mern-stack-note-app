const dateTimeOptions: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "short",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  hour12: true, // Use 12-hour format
};

export const formattedDate = (created: string, updated: string): string => {
  try {
    const date = updated > created ? new Date(updated) : new Date(created);
    const formattedDate = date.toLocaleString(undefined, dateTimeOptions);
    const [datePart, timePart] = formattedDate.split(",");

    const formattedTime = timePart.trim().toLocaleUpperCase();
    const action = updated > created ? "Updated" : "Created";
    return `${action} at ${datePart},${formattedTime}`;
  } catch (error) {
    console.error("Error formatting date:", error);
    return "Date formatting error";
  }
};
