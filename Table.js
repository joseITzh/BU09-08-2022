import axios from "axios";
import { useState, useEffect, useContext} from "react";
import { ReadContext } from "../../Contexts/ReadContext";
import { useNavigate, Navigate } from "react-router-dom";
import "../styles/Dashboard.css";
import LegendStatus from "./LegendStatus";
import LegendPriority from "./LegendPriority";
import useFetch from "../../customHooks/useFetch";

function Table() {
  // const [tickets, setTicket] = useState();

  // Destructure the variables we get from the ReadContext.
  const { setId } = useContext(ReadContext);

  const { setProblemTitle } = useContext(ReadContext);

  const { setProblemDescription } = useContext(ReadContext);

  const { setStepsToReproduce } = useContext(ReadContext);

  const { setExpectedBehviour } = useContext(ReadContext);

  const { setResultedBehaviour } = useContext(ReadContext);

  const { setPriority } = useContext(ReadContext);

  const { setCreated_on } = useContext(ReadContext);

  const [editButton, setEditButton] = useState(false);

  const navigate = useNavigate();

  const [msgDeleted, setMsgDeleted] = useState("Ticket successfully deleted");

  const {setData, data, loading, error, refetch} = useFetch("https://62e3b84a3c89b95396cec029.mockapi.io/TicketInfo");

  if (loading) return <h1>Loading....</h1>
  if (error) console.log(error);

  const baseURL = "https://62e3b84a3c89b95396cec029.mockapi.io/TicketInfo";
/** 
  // Get request.
  useEffect(() => {
    // This hook allows you to perform side effects such as fetching data. Runs on every render.
    axios.get(baseURL).then((response) => {
      setTicket(response.data); // Using the .data property, we obtain the response data.
    });
  }, []);

  if (!tickets) return null; */

  const setTpUpdateData = (
    id,
    problemTitle,
    problemDescription,
    stepsToReproduce,
    expectedBehaviour,
    resultedBehaviour,
    priority,
    createdOn
  ) => {
    return (
      setId(id),
      setProblemTitle(problemTitle),
      setProblemDescription(problemDescription),
      setStepsToReproduce(stepsToReproduce),
      setExpectedBehviour(expectedBehaviour),
      setResultedBehaviour(resultedBehaviour),
      setPriority(priority),
      setCreated_on(createdOn)
      //setEditButton(true)
    );
  };

  /**  if (editButton) {
    return <Navigate replace to="/update" />;
  }*/
  
  // Delete request.
  const deleteTicket = (id) => {
    // Set ID to local storage.
    axios 
    .delete(`${baseURL}/${id}`)
      .then((response) => {
        console.log(msgDeleted);
         /** setData( // This is necessary so that the page rerenders.
          data.filter((products) => {
            return data.id !== id;
          }) 
        ); */
        refetch(); // To call the API again and make a refetch/refresh.
      
      })
      .catch(() => {
        // If there is an error, Axios will throw an error and run the .catch() callback function.
        setMsgDeleted("Error");
        console.log(msgDeleted);
      });
  };

  // Line 133: Since we dont know if the data is gonna be null or true, we put a question mark which means that it will only access the information if it is not null. 
  return (
    <div>
      <div className="flex-container">
      <LegendStatus></LegendStatus>
      <LegendPriority></LegendPriority>
      </div>
      <table className="tickets_table">
        <thead>
          <tr>
            <th className="tickets_th">ID</th>
            <th className="tickets_th">TITLE</th>
            <th className="tickets_th">PRIORITY</th>
            <th className="tickets_th">CREATED BY</th>
            <th className="tickets_th">CREATED ON</th>
            <th className="tickets_th">UPDATED ON</th>
            <th className="tickets_th">TIMES REPORTED</th>
            <th className="tickets_th">ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item, key) => (
            <tr key={item.id}>
              <td className="tickets_td"><button className="deleteTicketbutton" onClick={() => { refetch()

                      setTpUpdateData(item.id,
                      item.problemTitle,
                      item.problemDescription,
                      item.stepsToReproduce,
                      item.expectedBehaviour,
                      item.resultedBehaviour,
                      item.priority,
                      item.createdOn
                    )
                    navigate("/view")}
                  }
                >
                  {item.id}
                </button></td>
              <td className="tickets_td">{item.problemTitle}</td>
              <td className="tickets_td">{item.priority}</td>
              <td className="tickets_td">{item.createdBy}</td>
              <td className="tickets_td">{item.createdOn}</td>
              <td className="tickets_td">{item.updatedOn}</td>
              <td className="tickets_td">{item.updatedOn}</td>
              <td className="tickets_td">
                <button className="deleteTicketbutton" onClick={() => { refetch() 
                                                                        deleteTicket(item.id)}}>Delete</button>
                <button className="deleteTicketbutton" onClick={() => { refetch()

                      setTpUpdateData(item.id,
                      item.problemTitle,
                      item.problemDescription,
                      item.stepsToReproduce,
                      item.expectedBehaviour,
                      item.resultedBehaviour,
                      item.priority
                    )
                    navigate("/update")
                    }
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
