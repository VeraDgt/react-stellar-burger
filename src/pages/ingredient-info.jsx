import IngredientDetails from "../components/ingredient-details/ingredient-details";
import styles from './ingredient-info.module.css';

const IngredientInfoPage = () => {
  return (
    <div className={styles.page}>
      <h1 className="text text_type_main-large">Детали ингредиента</h1>
      <IngredientDetails />
    </div>
  )
}

export default IngredientInfoPage;
