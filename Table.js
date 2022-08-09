import axios from "axios";
import { useState, useEffect, useContext} from "react";
import { ReadContext } from "../../Contexts/ReadContext";
import { useNavigate, Navigate } from "react-router-dom";
import "../styles/Dashboard.css";
import LegendStatus from "./LegendStatus";
import LegendPriority from "./LegendPriority";

function Table() {
  const [tickets, setTicket] = useState();

  // Destructure the variables we get from the ReadContext.
  const { setId } = useContext(ReadContext);

  const { setProblemType } = useContext(ReadContext);

  const { setProblemDescription } = useContext(ReadContext);

  const { setStepsToReproduce } = useContext(ReadContext);

  const { setExpectedBehviour } = useContext(ReadContext);

  const { setResultedBehaviour } = useContext(ReadContext);

  const { setPriority } = useContext(ReadContext);

  const [editButton, setEditButton] = useState(false);
  const navigate = useNavigate();

  const baseURL = "https://62e3b84a3c89b95396cec029.mockapi.io/TicketInfo";

  const [msgDeleted, setMsgDeleted] = useState("Ticket successfully deleted");

  // Get request.
  useEffect(() => {
    // This hook allows you to perform side effects such as fetching data. Runs on every render.
    axios.get(baseURL).then((response) => {
      setTicket(response.data); // Using the .data property, we obtain the response data.
    });
  }, []);

  if (!tickets) return null;

  const setData = (
    id,
    problemType,
    problemDescription,
    stepsToReproduce,
    expectedBehaviour,
    resultedBehaviour,
    priority
  ) => {
    return (
      setId(id),
      setProblemType(problemType),
      setProblemDescription(problemDescription),
      setStepsToReproduce(stepsToReproduce),
      setExpectedBehviour(expectedBehaviour),
      setResultedBehaviour(resultedBehaviour),
      setPriority(priority),
      setEditButton(true)
    );
  };

  if (editButton) {
    return <Navigate replace to="/update" />;
  }

  // Delete request.
  const deleteTicket = (id) => {
    // Set ID to local storage.
    axios
      .delete(`${baseURL}/${id}`)
      .then((response) => {
        console.log(msgDeleted);
        // This is necessary so that the page rerenders.
        setTicket(
          tickets.filter((products) => {
            return tickets.id !== id;
          })
        );
      })
      .catch(() => {
        // If there is an error, Axios will throw an error and run the .catch() callback function.
        setMsgDeleted("Error");
        console.log(msgDeleted);
      });
  };

  return (
    <div>
      <LegendStatus></LegendStatus>
      <LegendPriority></LegendPriority>
      <table className="tickets_table">
        <thead>
          <tr>
            <th className="tickets_th">
              <button type="button">ID</button>
            </th>
            <th className="tickets_th">
              <button type="button">Type</button>
            </th>
            <th className="tickets_th">
              <button type="button">Title</button>
            </th>
            <th className="tickets_th">
              <button type="button">Priority</button>
            </th>
            <th className="tickets_th">
              <button type="button">Created By</button>
            </th>
            <th className="tickets_th">
              <button type="button">Created On</button>
            </th>
            <th className="tickets_th">
              <button type="button">Updated On</button>
            </th>
            <th className="tickets_th">
              <button type="button">Times Reported</button>
            </th>
            <th className="tickets_th">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((item, key) => (
            <tr key={item.id}>
              <td className="tickets_td">{item.id}</td>
              <td className="tickets_td">{item.problemType}</td>
              <td className="tickets_td">{item.problemTitle}</td>
              <td className="tickets_td">{item.priority}</td>
              <td className="tickets_td">{item.createdBy}</td>
              <td className="tickets_td">{item.createdOn}</td>
              <td className="tickets_td">{item.updatedOn}</td>
              <td className="tickets_td">{item.updatedOn}</td>
              <td className="tickets_td">{item.tm}</td>
              <td className="tickets_td">
                <button className="deleteTicketbutton" onClick={() => deleteTicket(item.id)}>Delete</button>
                <button className="deleteTicketbutton" onClick={() => setData(item.id,
                      item.problemType,
                      item.problemDescription,
                      item.stepsToReproduce,
                      item.expectedBehaviour,
                      item.resultedBehaviour,
                      item.priority
                    )
                  }
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        className="createTicketbutton"
        onClick={() => navigate("/create")}
      >
        Create new ticket
      </button>
    </div>
  );
}
export default Table;
