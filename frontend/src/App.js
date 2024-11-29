import "./App.css";
import MainRouter from "./components/main/MainRouter";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ToastContainer />
        <MainRouter />
      </BrowserRouter>
    </div>
  );
}

export default App;
