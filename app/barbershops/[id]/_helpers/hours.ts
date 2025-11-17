import { setHours, setMinutes, format, addMinutes, isAfter } from "date-fns";

export function generateDayTimeList(date: Date): string[] {
  const startTime = setMinutes(setHours(date, 9), 0); // 09:00
  const endTime = setMinutes(setHours(date, 21), 0); // 21:00
  const interval = 45; // 45 minutos
  const timeList: string[] = [];
  const now = new Date();

  let currentTime = startTime;

  while (currentTime <= endTime) {
    const isToday = date.toDateString() === now.toDateString();
    
    if (!isToday || isAfter(currentTime, now)) {
      timeList.push(format(currentTime, "HH:mm"));
    }
    
    currentTime = addMinutes(currentTime, interval);
  }

  return timeList;
}