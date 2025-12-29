export function formatPrettyDate(dateString) {
  const date = new Date(dateString);
  
  const day = date.getDate();
  const year = date.getFullYear();

  // month names
  const month = date.toLocaleString('en-US', { month: 'long' });

  // suffix for the day
  const getOrdinalSuffix = (n) => {
    if (n > 3 && n < 21) return "th"; // 11th, 12th, 13th
    switch (n % 10) {
      case 1: return "st";
      case 2: return "nd";
      case 3: return "rd";
      default: return "th";
    }
  };

  return `${day}${getOrdinalSuffix(day)} ${month} ${year}`;
}
