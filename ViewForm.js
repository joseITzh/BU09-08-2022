import { useContext } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { ReadContext } from "../../Contexts/ReadContext";

// CSS.
import "../styles/Form.css";

const ViewForm = () => {

  // Destructure the variables we get from the ReadContext.
  const { id } = useContext(ReadContext);
  const { problemTitle } = useContext(ReadContext);
  const { problemDescription } = useContext(ReadContext);
  const { stepsToReproduce } = useContext(ReadContext);
  const { expectedBehaviour } = useContext(ReadContext);
  const { resultedBehaviour } = useContext(ReadContext);
  const { uploadedFile } = useContext(ReadContext);
  const { priority } = useContext(ReadContext);
  const { createdOn } = useContext(ReadContext);


  const navigate = useNavigate();

  return (
    <div>
      <div className="container">
        <form className="form">
          <h1>Ticket #{id}</h1>
          <div className="form_divs">
            <input type="text" className="input_date" value={createdOn} readOnly={true} />
          </div>
          <div className="form_divs">
            <input
              className="input_title"
              value={problemTitle}
              type="text"
              placeholder="Problem title:"
              readOnly={true}
            ></input>
          </div>
          <div className="form_divs">
            <textarea
              placeholder="Problem description:"
              value={problemDescription}
              maxLength="400"
              readOnly={true}
            ></textarea>
          </div>
          <div className="form_divs">
            <textarea
              placeholder="Steps to reproduce:"
              type="text"
              value={stepsToReproduce}
              maxLength="400"
              readOnly={true}
            ></textarea>
          </div>
          <div className="form_divs">
            <textarea
              placeholder="Expected behaviour:"
              value={expectedBehaviour}
              maxLength="400"
              readOnly={true}
            ></textarea>
          </div>
          <div className="form_divs">
            <textarea
              placeholder="Resulted behaviour:"
              value={resultedBehaviour}
              maxLength="400"
              readOnly={true}
            ></textarea>
          </div>
          <div className="form_divs">
            <input
              type="file"
              value={uploadedFile}
              multiple
              readOnly={true}
            ></input>
          </div>
          <div className="form_divs">
            <select
              name="problem-types"
              value={priority}
              readOnly={true}
            >
              <option value="">Ticket priority </option>
              <option value="URGENT">URGENT</option>
              <option value="MEDIUM">MEDIUM</option>
              <option value="LOW">LOW</option>
            </select>
            <button className="goBackbuttonViewForm" onClick={() => navigate("/")}>Go Back</button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default ViewForm;
