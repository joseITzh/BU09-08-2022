import { useState, useEffect, useContext } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { ReadContext } from "../../Contexts/ReadContext";

// To deal with HTTP requests.
import axios from "axios";

// CSS.
import "../styles/Form.css";

// For Form validation.
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ticketSchema } from "../../validations/FormValidation";

// For updated_on date.
import { dt } from "../date/Date";

const UpdateForm = () => {
  const baseURL = "https://62e3b84a3c89b95396cec029.mockapi.io/TicketInfo";

  // Destructure the variables we get from the ReadContext.
  const { id } = useContext(ReadContext);
  const { problemTitle } = useContext(ReadContext);
  const { setProblemTitle } = useContext(ReadContext);
  const { problemDescription } = useContext(ReadContext);
  const { setProblemDescription } = useContext(ReadContext);
  const { stepsToReproduce } = useContext(ReadContext);
  const { setStepsToReproduce } = useContext(ReadContext);
  const { expectedBehaviour } = useContext(ReadContext);
  const { setExpectedBehviour } = useContext(ReadContext);
  const { resultedBehaviour } = useContext(ReadContext);
  const { setResultedBehaviour } = useContext(ReadContext);
  const { uploadedFile } = useContext(ReadContext);
  const { setUploadedFile } = useContext(ReadContext);
  const { priority } = useContext(ReadContext);
  const { setPriority } = useContext(ReadContext);

  const [updateButton, setUpdateButton] = useState(false);
  const [msgUpdated, setMsgUpdated] = useState("Ticket successfully updated");

  const navigate = useNavigate();

  // Get the following things from the useForm() hook.
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(ticketSchema),
  });

  // Update request.
  const updateTicket = () => {
    axios
      .put(`${baseURL}/${id}`, {
        // The POST request takes two arguments, the url and the data we need to post.
        problemTitle: problemTitle,
        problemDescription: problemDescription,
        stepsToReproduce: stepsToReproduce,
        expectedBehaviour: expectedBehaviour,
        resultedBehaviour: resultedBehaviour,
        uploadedFile: uploadedFile,
        priority: priority,
        updatedOn: dt,
      })
      // At final we chain it with then() method and catch() method.
      .then((response) => {
        // The then method is invoked when a post request is succesful.
        console.log(msgUpdated);

        setUpdateButton(true);
      })
      .catch(() => {
        // The catch method is invoked when a post request is failed and error has ocured.
        setMsgUpdated("Error");
        console.log(msgUpdated);
      });
  };

  // Redirects to page "read".
  if (updateButton) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <div className="container">
        <form className="form" onSubmit={handleSubmit(updateTicket)}>
          <h1>Edit Ticket</h1>
          <div className="form_divs">
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
              onChange={(event) => setProblemDescription(event.target.value)}
              maxLength="400"
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
              maxLength="400"
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
              maxLength="400"
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
              maxLength="400"
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
            >
              <option value="">Ticket priority </option>
              <option value="URGENT">URGENT</option>
              <option value="MEDIUM">MEDIUM</option>
              <option value="LOW">LOW</option>
            </select>
            <button className="goBackbutton" onClick={() => navigate("/")}>Go Back</button>
            <input className="updateTicketbutton" type="submit"></input>
          </div>
        </form>
      </div>
    </div>
  );
};
export default UpdateForm;
