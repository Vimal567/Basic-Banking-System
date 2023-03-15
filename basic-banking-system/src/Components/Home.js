import Header from "./Header";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

const Home = () => {
  const navigate = useNavigate(); //Navigation for routing

  const fetchData = async () => {
    try {
      await axios.get("https://banking-backend-nl9x.onrender.com");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="home">
      <Header />
      <div className="home-container">
        <h1>WELCOME TO BANKING</h1>
        <button className="enter" onClick={() => navigate("/customers")}>
          Enter
        </button>
      </div>
    </div>
  );
};

export default Home;
