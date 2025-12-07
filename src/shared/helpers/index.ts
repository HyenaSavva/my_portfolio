type FormatDateRangeType = [from: string, to: string];

export const formatDateRange = (
  from: string | null,
  to: string | null
): FormatDateRangeType => {
  const formatDate = (dateString: string | null): string => {
    if (!dateString) return "Present";

    const date = new Date(dateString);

    if (isNaN(date.getTime())) return "Present";

    const monthNames = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();

    return `${month} ${year}`;
  };

  const formattedFrom = formatDate(from);
  const formattedTo = formatDate(to);

  return [formattedFrom, formattedTo];
};
