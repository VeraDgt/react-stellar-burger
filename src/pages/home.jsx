import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getItems } from "../services/actions/burger-ingredients";
import Main from "../components/main/main";

function HomePage() {
  const dispatch = useDispatch();

  useEffect(() => { dispatch(getItems()) }, [dispatch]);

  return (
    <Main />
  )
}

export default HomePage;