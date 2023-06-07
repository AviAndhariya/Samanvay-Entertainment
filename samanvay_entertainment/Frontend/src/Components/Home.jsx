import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "../Styles/Home.module.css";

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
      <div className={styles["grid-container"]}>
        {data.map((e, i) => {
          return (
            <div className="frame" key={i}>
              <img src={e.img} alt="photo" />
              <p className={styles["grid-item"]}>{e.name}</p>
              <p className={styles["grid-item"]}>{e.category}</p>
              <p className={styles["grid-item"]}>{e.date}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
