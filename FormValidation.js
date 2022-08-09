import * as yup from "yup";

// Define Yup schema.
export const ticketSchema = yup.object().shape({
  // Define object that will represent our form.
  // Inside we put the type definition of our property.
  problemTitle: yup.string().min(6),
  problemDescription: yup.string().min(10),
  stepsToReproduce: yup.string().min(10),
  expectedBehaviour: yup.string().min(10),
  resultedBehaviour: yup.string().min(10),
});
