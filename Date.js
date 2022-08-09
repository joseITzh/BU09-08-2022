const dateObject = new Date(); // Date object.
export const dt =
  dateObject.getDate() +
  "/" +
  (dateObject.getMonth() + 1) +
  "/" +
  dateObject.getFullYear();
