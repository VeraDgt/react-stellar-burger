import React from 'react';
import styles from "./app.module.css";
import getIngredients from "../../utils/api";
import AppHeader from "../app-header/app-header.jsx";
import Main from "../main/main.jsx";


function App() {
  const [data, setData] = React.useState([]);
  React.useEffect(() => { getIngredients(setData) }, [])

  return (
    <div className={styles.app}>
      <AppHeader />
      <Main data={data}/>
    </div>
  );
}

export default App;
