import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInMonths,
  differenceInYears,
} from "date-fns";

export function timeDiff(createdAt) {
  const today = new Date(); // تاریخ امروز

  //   // اختلاف زمان به میلی‌ثانیه
  const timeDifference = today - createdAt;

  let timeString = "Seconds ago";

  //تبدیل به دقیقه
  const mins = differenceInMinutes(new Date(), createdAt);
  // تبدیل به ساعت
  const hours = differenceInHours(new Date(), createdAt);
  // تبدیل به روز
  const days = differenceInDays(new Date(), createdAt);
  // تبدیل به ماه
  const months = differenceInMonths(new Date(), createdAt);
  //   تبدیل به سال
  const years = differenceInYears(new Date(), createdAt);

  if (mins < 1) {
    timeString = "Seconds ago";
  } else if (mins > 1 && hours < 1) {
    timeString = `${mins} Minutes ago`;
  } else if (hours > 1 && days < 1) {
    timeString = `${hours} Hours ago`;
  } else if (days > 1 && months < 1) {
    timeString = `${days} Days ago`;
  } else if (months > 1 && years < 1) {
    timeString = `${months} Months ago`;
  } else if (years > 1) {
    timeString = `${years} Years ago`;
  }

  return timeString;
}
