import detailsStyles from './ingredient-details.module.css';

const IngredientDetails = ({ item }) => {
  return (
    <>
      <img src={item.image_large} alt={item.title} />
      <p className={detailsStyles.name}>{item.name}</p>
      <div className={detailsStyles.container}>
        <p className={detailsStyles.parameter}>Калории,ккал
        <span className={detailsStyles.text}>{item.calories}</span>
        </p>
        <p className={detailsStyles.parameter}>Белки, г
        <span className={detailsStyles.text}>{item.proteins}</span>
        </p>
        <p className={detailsStyles.parameter}>Жиры, г
        <span className={detailsStyles.text}>{item.fat}</span>
        </p>
        <p className={detailsStyles.parameter}>Углеводы, г
        <span className={detailsStyles.text}>{item.carbohydrates}</span>
        </p>
      </div>
    </>
  );
};

export default IngredientDetails;