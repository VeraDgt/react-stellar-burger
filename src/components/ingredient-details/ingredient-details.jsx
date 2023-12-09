import React, { useEffect, useState } from 'react';
import detailsStyles from './ingredient-details.module.css';
import { useParams, useLocation } from "react-router-dom";
import { getIngredients } from '../../utils/api';

const IngredientDetails = () => {

  const location = useLocation();
  const background = location.state?.background;
  const { id } = useParams();

  const [ currItem, setCurrItem ] = useState({
    image_large: '',
    calories: '',
    proteins: '',
    fat: '',
    carbohydrates: ''
});

useEffect(() => {
  getIngredients().then((res) => {
    const item = res.data.find(item => item._id === id);
    setCurrItem(item);
  })
}, [id]);

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