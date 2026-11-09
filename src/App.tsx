import "./App.css";
import Board from "./components/Board";
import AddApplicationForm from "./components/AddApplicationForm";

const App = () => {
  return (
    <div>
      <AddApplicationForm />
      <Board />
    </div>
  );
};

export default App;
