import { useState } from "react";

// Components.
import CreateForm from "./components/createTicketForm/CreateForm";
import Table from "./components/dashboard/Table";
import UpdateForm from "./components/updateTicketForm/UpdateForm";

// Routes.
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// React Context. We will pass a value(object) that will contain all the states that we want to share.
import { ReadContext } from "./Contexts/ReadContext"; // Use as a wrapper between the components.


function App() {
  const [id, setId] = useState("null");
  const [problemType, setProblemType] = useState("");
  const [problemTitle, setProblemTitle] = useState("");
  const [problemDescription, setProblemDescription] = useState("");
  const [stepsToReproduce, setStepsToReproduce] = useState("");
  const [expectedBehaviour, setExpectedBehviour] = useState("");
  const [resultedBehaviour, setResultedBehaviour] = useState("");
  const [uploadedFile, setUploadedFile] = useState("");
  const [priority, setPriority] = useState("");

  return (
    <ReadContext.Provider value={{ id, setId, problemType, setProblemType, problemTitle, setProblemTitle, problemDescription, setProblemDescription,
      stepsToReproduce, setStepsToReproduce, expectedBehaviour, setExpectedBehviour, resultedBehaviour, setResultedBehaviour,
      uploadedFile, setUploadedFile, priority, setPriority, }}>
      <Router>
        <Routes>
            <Route exact path="/" element={<Table />} />
            <Route exact path="/update" element={<UpdateForm />} />
            <Route exact path="/create" element={<CreateForm />} />
        </Routes>
      </Router>
    </ReadContext.Provider>
  );
}

export default App;