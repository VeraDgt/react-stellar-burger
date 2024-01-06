import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const FeedItem = () => {
  const { items } = useSelector(store => store.burgerIngredients);

  
  return (
    <li>
      
    </li>
  )
};

export default FeedItem;
