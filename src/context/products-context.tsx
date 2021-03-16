/* eslint-disable prettier/prettier */
/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable prettier/prettier */
import React, { createContext, useState } from 'react';

interface IProduct {
  products: {
    id: string;
    title: string;
    description: string;
    isFavorite: boolean;
  }[];
  toggleProductFavorite: (id: string) => void;
}

export const ProductContext = createContext<IProduct>({
  products: [],
  toggleProductFavorite: () => {},
});

export default props => {
  const [productsList, setProductsList] = useState([
    {
      id: 'p-1',
      title: 'Iphone 12',
      description: 'Apple',
      isFavorite: false,
    },
    {
      id: 'p-2',
      title: 'P30',
      description: 'Huawei',
      isFavorite: false,
    },
    {
      id: 'p-3',
      title: 'Redmi note 10',
      description: 'Xiaomi',
      isFavorite: false,
    },
  ]);
  const toggleProductFavorite = (id: string) => {
    console.log('Dispatch using context API');
    let findProduct = productsList.find(p => p.id === id);
    if (findProduct) {
      console.log(findProduct);
      findProduct.isFavorite = !findProduct.isFavorite;
      setProductsList([...productsList]);
    }
  };
  return (
    <ProductContext.Provider
      value={{
        products: productsList,
        toggleProductFavorite: toggleProductFavorite,
      }}
    >
      {props.children}
    </ProductContext.Provider>
  );
};
