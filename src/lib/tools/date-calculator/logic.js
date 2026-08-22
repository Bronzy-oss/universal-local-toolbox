const MS_PER_DAY = 1000 * 60 * 60 * 24;

export function totalDaysBetween(dateStr1, dateStr2) {
  const d1 = new Date(dateStr1 + "T00:00:00");
  const d2 = new Date(dateStr2 + "T00:00:00");
  return Math.round(Math.abs(d2 - d1) / MS_PER_DAY);
}

// Calendar-accurate years/months/days breakdown (not just total days
// divided evenly — respects actual month lengths). Walks forward one
// year/month at a time rather than subtracting date components
// directly — a subtraction-based approach produces negative days for
// edge cases like Jan 31 -> Mar 1 (Feb is too short to "borrow" a
// full month from), because there's no single unambiguous definition
// of "one month after Jan 31". Walking forward while never
// overshooting the end date sidesteps that ambiguity and always
// returns non-negative components.
export function breakdownBetween(dateStr1, dateStr2) {
  let start = new Date(dateStr1 + "T00:00:00");
  let end = new Date(dateStr2 + "T00:00:00");
  if (start > end) [start, end] = [end, start];

  let years = 0;
  let months = 0;
  let cursor = new Date(start);

  while (true) {
    const next = new Date(cursor);
    next.setFullYear(next.getFullYear() + 1);
    if (next > end) break;
    cursor = next;
    years++;
  }

  while (true) {
    const next = new Date(cursor);
    next.setMonth(next.getMonth() + 1);
    if (next > end) break;
    cursor = next;
    months++;
  }

  const days = Math.round((end - cursor) / MS_PER_DAY);

  return { years, months, days };
}

export function addDays(dateStr, days) {
  const d = new Date(dateStr + "T00:00:00");
  d.setDate(d.getDate() + days);
  return d.toISOString().split("T")[0];
}
