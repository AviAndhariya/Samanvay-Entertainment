import React, { useEffect, useState } from "react";
import axios from "axios";

export const Home = () => {
  const [data, setData] = useState([]);

  const getData = () => {
    axios
      .get(`http://localhost:8080/project`)
      .then((response) => {
        // Handle the response data
        setData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        // Handle any errors that occur during the request
        console.error(error);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="App">
      <div className="frame">
        {data.map((e,i) => {
          return (
          <div className="box" key={i}>
              <p>{e.name}</p>
              <p>{e.category}</p>
              <p>{e.date}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
