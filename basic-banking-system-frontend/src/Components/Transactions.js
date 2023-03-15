import "./Transactions.css";
import Header from "./Header";
import { useEffect, useState } from "react";
import axios from "axios";

const Transactions = () => {
  const [data, setData] = useState();

  //Fetches all the transactions
  const fetchData = async () => {
    try {
      const fetched = await axios.get(
        "https://banking-backend-nl9x.onrender.com/transactions"
      );
      setData(fetched.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="transactions">
      <Header />
      <div className="transactions-container">
        <table>
          <thead>
            <tr>
              <th>Sl.No.</th>
              <th>From</th>
              <th>To</th>
              <th>Amount</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{index}</td>
                    <td>{item.from}</td>
                    <td>{item.to}</td>
                    <td>{item.amount}</td>
                    <td>{item.date}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        {!data && <h5>Please wait !! takes upto 1 minute</h5>}
      </div>
    </div>
  );
};

export default Transactions;
