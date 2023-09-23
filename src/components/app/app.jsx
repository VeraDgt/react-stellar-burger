import { useState, useEffect, useReducer } from 'react';
import styles from "./app.module.css";
import getIngredients from "../../utils/api";
import AppHeader from "../app-header/app-header.jsx";
import Main from "../main/main.jsx";
import { Context, ItemsContext } from '../../services/context';


function App() {
  const [state, setState ] = useState({
    data: [],
    order: null
  });

  const [ chosenItems, setChosenItems ] = useState([]);

  useEffect(() => { getIngredients().then(setState, state) }, [])

  return (
    <div className={styles.app}>
      <AppHeader />
      <Context.Provider value={{ state, setState }}>
        <ItemsContext.Provider value={{ chosenItems, setChosenItems }}>
        <Main />
        </ItemsContext.Provider>
      </Context.Provider>
    </div>
  );
}


export default App;
