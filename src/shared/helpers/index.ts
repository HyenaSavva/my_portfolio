type FormatDateRangeType = [from: string, to: string];

export const formatDateRange = (
  from: string | null,
  to: string | null
): FormatDateRangeType => {
  const formatDate = (dateString: string | null): string => {
    if (!dateString) return "Present";

    const date = new Date(dateString);

    if (isNaN(date.getTime())) return "Present";

    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${month}/${year}`;
  };

  const formattedFrom = formatDate(from);
  const formattedTo = formatDate(to);

  return [formattedFrom, formattedTo];
};
