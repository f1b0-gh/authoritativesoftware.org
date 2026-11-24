// Only explicitly marked fictional dates roll forward. Real publication dates
// and the declaration's integrity record are independent of these examples.
export function refreshExampleDates() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const day = now.getDate();
  // UTC is only for calendar arithmetic: the reference day is the reader's
  // local day, and daylight-saving changes must not shift an example's date.
  const offset = (days: number) => new Date(Date.UTC(year, month, day + days));
  const dates: Record<string, Date> = {
    reference: offset(0),
    issued: offset(-30),
    expired: offset(-1),
    commitment: new Date(Date.UTC(year + 1, 11, 31)),
    delegation: offset(90),
  };
  const format = new Intl.DateTimeFormat('en-GB', {
    day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC',
  });
  for (const element of document.querySelectorAll<HTMLTimeElement>('time[data-example-date]')) {
    const date = dates[element.dataset.exampleDate ?? ''];
    if (!date) continue;
    element.dateTime = date.toISOString().slice(0, 10);
    element.textContent = format.format(date);
  }
}
