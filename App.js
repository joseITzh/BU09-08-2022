import { useState } from "react";

// Components.
import CreateForm from "./components/createTicketForm/CreateForm";
import Table from "./components/dashboard/Table";
import UpdateForm from "./components/updateTicketForm/UpdateForm";
import ViewForm from "./components/viewTicketForm/ViewForm";

// Routes.
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// React Context. We will pass a value(object) that will contain all the states that we want to share.
import { ReadContext } from "./Contexts/ReadContext"; // Use as a wrapper between the components.


function App() {
  const [id, setId] = useState("null");
  const [problemTitle, setProblemTitle] = useState("");
  const [problemDescription, setProblemDescription] = useState("");
  const [stepsToReproduce, setStepsToReproduce] = useState("");
  const [expectedBehaviour, setExpectedBehviour] = useState("");
  const [resultedBehaviour, setResultedBehaviour] = useState("");
  const [uploadedFile, setUploadedFile] = useState("");
  const [priority, setPriority] = useState("");
  const [createdOn, setCreated_on] = useState("");

  return (
    <ReadContext.Provider value={{ id, setId, problemTitle, setProblemTitle, problemDescription, setProblemDescription,
      stepsToReproduce, setStepsToReproduce, expectedBehaviour, setExpectedBehviour, resultedBehaviour, setResultedBehaviour,
      uploadedFile, setUploadedFile, priority, setPriority, createdOn, setCreated_on}}>
      <Router>
        <Routes>
            <Route exact path="/" element={<Table />} />
            <Route exact path="/update" element={<UpdateForm />} />
            <Route exact path="/create" element={<CreateForm />} />
            <Route exact path="/view" element={<ViewForm />} />
        </Routes>
      </Router>
    </ReadContext.Provider>
  );
}

export default App;