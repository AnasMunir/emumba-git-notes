export function getFormattedDate(dateString: string, style: "full" | "long" | "medium" | "short"): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-GB", {
    dateStyle: style,
  }).format(date.toString() === "Invalid Date" ? undefined : date);
}

export function getFormattedTime(dateString: string, style: "full" | "long" | "medium" | "short"): string {
  const date = new Date(dateString);
  const hours = date.getHours() >= 12 ? "PM" : "AM";
  return (
    new Intl.DateTimeFormat("en-GB", {
      timeStyle: style,
    }).format(date.toString() === "Invalid Date" ? undefined : date) +
    " " +
    hours
  );
}
