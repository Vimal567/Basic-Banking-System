import { useEffect, useState } from "react";
import "./Customers.css";
import Header from "./Header";
import axios from "axios";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useNavigate } from "react-router-dom";

//Custom modal css
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "none",
  boxShadow: 24,
  p: 4,
};

const Customers = () => {
  const navigate = useNavigate();
  const [data, setData] = useState();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState({
    fromValue: " ",
    fromName: " ",
    toValue: " ",
    amount: 0,
  });

  //Fetch all user data
  const fetchData = async () => {
    try {
      const fetched = await axios.get(
        "https://banking-backend-nl9x.onrender.com"
      );
      setData(fetched.data);
    } catch (error) {
      console.log(error);
    }
  };

  //Handle function to open the modal
  const handleOpen = (index) => {
    const id = data[index].id;
    const name = data[index].name;
    setValue({ ...value, fromValue: id, fromName: name });
    setOpen(true);
  };

  //Handle function to close the modal
  const handleClose = () => {
    setOpen(false);
    setValue({
      fromValue: " ",
      fromName: " ",
      toValue: " ",
      amount: 0,
    });
  };

  const handleOnChange = (event) => {
    const id = data[event.target.value].id;
    setValue({ ...value, toValue: id });
  };

  const handleValueChange = (event) => {
    const amount = event.target.value;
    setValue({ ...value, amount: amount });
  };

  //Handle function on transferring the amount
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (value.toValue.length === 0) return; //If fields are empty then return
    const payload = {
      fromId: Number(value.fromValue),
      toId: Number(value.toValue),
      amount: Number(value.amount),
    };
    const user = data.filter((item) => item.id === payload.fromId);
    const userBalance = user[0].balance - payload.amount;
    if (userBalance < 0) {
      alert("No enough balance left"); //If amount greater than the balance alert the user
      return;
    }
    try {
      await axios.patch(
        "https://banking-backend-nl9x.onrender.com/transfer",
        payload
      );
      alert(`Transaction Successful!!
              Remaing balance is Rs. ${userBalance}`);
    } catch (error) {
      console.log(error);
    }
    navigate("/transactions");
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="customers">
      <Header />
      <div className="customers-container">
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Balance</th>
              <th>Operation</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.balance}</td>
                    <td>
                      <button onClick={() => handleOpen(index)}>
                        Transfer
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        {!data && <h5>Please wait !! takes upto 1 minute</h5>}
      </div>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <form>
              <label>From :</label>
              <input
                type="text"
                value={value.fromName}
                disabled
                style={{ backgroundColor: "rgb(211, 210, 210)" }}
              />
              <br />
              <label>To :</label>
              <select onChange={handleOnChange}>
                <option value="">Choose..</option>
                {data &&
                  data.map((item, index) => {
                    return (
                      <option key={index} value={index}>
                        {item.name}
                      </option>
                    );
                  })}
              </select>
              <br />
              <label>Amount :</label>
              <input type="number" onChange={handleValueChange} />
              <br />
              <button className="btn btn-primary" onClick={handleSubmit}>
                DONE
              </button>
            </form>
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default Customers;
