import React from 'react';

const Context = React.createContext(null);
const ItemsContext = React.createContext([]);
const TotalSumContext = React.createContext(null);
const CurrentItemContext = React.createContext(null);

export { Context, ItemsContext, TotalSumContext, CurrentItemContext };
