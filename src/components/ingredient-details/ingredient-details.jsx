import React from 'react';
import detailsStyles from './ingredient-details.module.css';
import { useParams, useLocation } from "react-router-dom";
import { useSelector } from 'react-redux';

const IngredientDetails = () => {

  const location = useLocation();
  const background = location.state?.background;
  const { id } = useParams();
  const { items } = useSelector((store) => store.burgerIngredients);
  const currItem = items.find((item) => item._id === id);

  if (!currItem) return null;

  return (
    <>
      { background && <h1 className="text text_type_main-large mt-30">Детали ингредиента</h1> }
      <img src={currItem.image_large} alt={currItem.title} />
      <p className={detailsStyles.name}>{currItem.name}</p>
      <div className={detailsStyles.container}>
        <p className={detailsStyles.parameter}>Калории,ккал
        <span className={detailsStyles.text}>{currItem.calories}</span>
        </p>
        <p className={detailsStyles.parameter}>Белки, г
        <span className={detailsStyles.text}>{currItem.proteins}</span>
        </p>
        <p className={detailsStyles.parameter}>Жиры, г
        <span className={detailsStyles.text}>{currItem.fat}</span>
        </p>
        <p className={detailsStyles.parameter}>Углеводы, г
        <span className={detailsStyles.text}>{currItem.carbohydrates}</span>
        </p>
      </div>
    </>
  );
};

export default IngredientDetails;