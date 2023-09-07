import styles from "./app.module.css";
import { data } from "../../utils/data";
import AppHeader from "../app-header/app-header.jsx";
import Main from "../main/main.jsx";


function App() {
  return (
    <div className={styles.app}>
      <AppHeader />
      {/* <Main /> */}
    </div>
  );
}

export default App;
