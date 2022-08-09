import { useState } from "react";
import { Navigate } from "react-router-dom";

// To deal with HTTP requests.
import axios from "axios";

// CSS.
import "../styles/Form.css";

// For Form validation.
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ticketSchema } from "../../Validations/FormValidation";

// For created_on date.
import { dt } from "../date/Date";

import "../styles/Form.css";

function CreateForm() {
  const baseURL = "https://62e3b84a3c89b95396cec029.mockapi.io/TicketInfo";

  const [msgAdded, setMsgAdded] = useState("Ticket successfully added");
  const [createButton, setCreateButton] = useState(false);

  const [problemType, setProblemType] = useState("");
  const [problemTitle, setProblemTitle] = useState("");
  const [problemDescription, setProblemDescription] = useState("");
  const [stepsToReproduce, setStepsToReproduce] = useState("");
  const [expectedBehaviour, setExpectedBehviour] = useState("");
  const [resultedBehaviour, setResultedBehaviour] = useState("");
  const [uploadedFile, setUploadedFile] = useState("");
  const [priority, setPriority] = useState("");

  // Get the following things from the useForm() hook.
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(ticketSchema),
  });

  // Post request.
  const addTicket = () => {
    axios
      .post(baseURL, {
        // The POST request takes two arguments, the url and the data we need to post.
        problemType: problemType,
        problemTitle: problemTitle,
        problemDescription: problemDescription,
        stepsToReproduce: stepsToReproduce,
        expectedBehaviour: expectedBehaviour,
        resultedBehaviour: resultedBehaviour,
        uploadedFile: uploadedFile,
        priority: priority,
        createdOn: dt,
      })
      // At final we chain it with then() method and catch() method.
      .then((response) => {
        // The then method is invoked when a post request is succesful.
        setCreateButton(true);
        console.log(msgAdded);
        console.log(response.data);
      })
      .catch(() => {
        // The catch method is invoked when a post request is failed and an error has ocured.
        setMsgAdded("Error");
        console.log(msgAdded);
      });
  };

  // Redirects to page "read".
  if (createButton) {
    return <Navigate replace to="/" />;
  }

  return (
    <div>
      <div className="container">
        <form className="form" onSubmit={handleSubmit(addTicket)}>
          <h1>Create Ticket</h1>
          <div className="form_divs">
            <select
              value={problemType}
              name="problem-types"
              onChange={(event) => setProblemType(event.target.value)}
              required
            >
              <option value="">Problem Type:</option>
              <option value="Login Error">Login error</option>
              <option value="Tag Error">Tag error</option>
              <option value="Click Error">Can't click on option</option>
              <option value="Other">Other</option>
            </select>
            <input type="text" className="input_date" value={dt} readOnly={true} />
          </div>
          <div className="form_divs">
            <input
              className="input_title"
              {...register("problemTitle")}
              value={problemTitle}
              type="text"
              placeholder="Problem title:"
              onChange={(event) => setProblemTitle(event.target.value)}
              required
            ></input>
            <p>
              {errors.problemTitle && "Title must be at least 6 words long."}
            </p>
          </div>
          <div className="form_divs">
            <textarea
              {...register("problemDescription")}
              placeholder="Problem description:"
              value={problemDescription}
              maxLength="400"
              onChange={(event) => setProblemDescription(event.target.value)}
              required
            ></textarea>
            <p>
              {errors.problemDescription &&
                "Description must be at least 6 words long."}
            </p>
          </div>
          <div className="form_divs">
            <textarea
              {...register("stepsToReproduce")}
              placeholder="Steps to reproduce:"
              type="text"
              value={stepsToReproduce}
              onChange={(event) => setStepsToReproduce(event.target.value)}
              required
            ></textarea>
            <p>
              {errors.stepsToReproduce &&
                "Steps to reproduce must be at least 10 words long."}
            </p>
          </div>
          <div className="form_divs">
            <textarea
              {...register("expectedBehaviour")}
              placeholder="Expected behaviour:"
              value={expectedBehaviour}
              onChange={(event) => setExpectedBehviour(event.target.value)}
              required
            ></textarea>
            <p>
              {errors.expectedBehaviour &&
                "Expected behaviour must be at least 10 words long."}
            </p>
          </div>
          <div className="form_divs">
            <textarea
              {...register("resultedBehaviour")}
              placeholder="Resulted behaviour:"
              value={resultedBehaviour}
              onChange={(event) => setResultedBehaviour(event.target.value)}
              required
            ></textarea>
            <p>
              {errors.resultedBehaviour &&
                "Resulted behaviour must be at least 10 words long."}
            </p>
          </div>
          <div className="form_divs">
            <input
              type="file"
              value={uploadedFile}
              onChange={(event) => setUploadedFile(event.target.value)}
              multiple
            ></input>
          </div>
          <div className="form_divs">
            <select
              name="problem-types"
              value={priority}
              onChange={(event) => setPriority(event.target.value)}
              required
            >
              <option value="">Ticket priority </option>
              <option value="URGENT">URGENT</option>
              <option value="MEDIUM">MEDIUM</option>
              <option value="LOW">LOW</option>
            </select>
            <input className="addTicketbutton" type="submit"></input>
          </div>
        </form>
      </div>
    </div>
  );
}
export default CreateForm;
