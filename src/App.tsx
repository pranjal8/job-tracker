import "./App.css";
import Board from "./components/Board";
import AddApplicationForm from "./components/AddApplicationForm";

const App = () => {
  console.log("5 App");
  return (
    <div>
      <AddApplicationForm />
      <Board />
    </div>
  );
};

export default App;
