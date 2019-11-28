/**
 *
 * @param {string || number} date
 * @returns {string}
 */

export function formatDate(dateString) {
  const date = new Date(Number(dateString) * 1000);
  // const timeOptions = { timeStyle: 'short' };
  const dateOptions = {
    dateStyle: 'full',
    timeStyle: 'short',
    hourCycle: 'h24',
  };

  return date.toLocaleString('en-US', dateOptions);
}

console.log(formatDate(1574877600));
