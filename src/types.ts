export type TIngredient = {
  _id: string,
  name: string,
  type: string,
  proteins: number,
  fat: number,
  carbohydrates: number,
  calories: number,
  price: number,
  image: string,
  image_mobile: string,
  image_large: string,
  __v: number,
  qty: number,
  key?: number | string | undefined,
}

export type TOrder = {
  createdAt: string | number | Date, 
  ingredients: Array<string>,
  name: string,
  number: number | string,
  status: string,
  updatedAt: string,
  _id: string
} 

export type TUser = {
  name?: string,
  email: string,
  password: string
}

export type TRes = {
  success: boolean,
  data: TIngredient[],
  message?: string,
  order: TOrder,
  user?: TUser,
  orders?: any | TOrdersArr,
  status: boolean,
  accessToken?: string,
  refreshToken?: string,
}

export type TForm = {
  password: string,
  token: string,
  }

  export type TOrdersArr = {
    [index: string]:any,
    orders?: Array<TOrder>,
    ordersQty: string,
    ordersTodayQty: string
  }

  export type TCookieProps = {[props: string]: string | boolean | number | Date | null}