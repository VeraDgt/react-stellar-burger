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
  key?: number
}

export type TOrder = {
  createdAt: string, 
  ingredients: ReadonlyArray<string>,
  name: string,
  number: number,
  status: string,
  updatedAt: string,
  _id: string
}

export type TUser = {
  name: string,
  email: string,
  password: string
}

export type TRes = {
  success: boolean,
}

export type TForm = {
  password: string,
  token: string,
  }
