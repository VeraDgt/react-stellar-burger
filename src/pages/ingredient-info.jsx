import React from "react";
import IngredientDetails from "../components/ingredient-details/ingredient-details";
import styles from "./ingredient-info.module.css";

const IngredientInfoPage = () => {
  
  return (
    <div className={styles.page}>
      <IngredientDetails />
    </div>
  )
}

export default IngredientInfoPage;
