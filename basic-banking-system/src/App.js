import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Components/Home";
import Customers from "./Components/Customers";
import Transactions from "./Components/Transactions";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/customers",
    element: <Customers />,
  },
  {
    path: "/transactions",
    element: <Transactions />,
  }
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;