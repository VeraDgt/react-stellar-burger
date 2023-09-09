import { Button, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import burgerConstructorStyles from './burger-constructor.module.css';
import ConstructorItem from './constructor-item/constructor-item';
import PriceContainer from './price-container/price-container';
import { ingredientsPropType } from '../../utils/prop-types';

const BurgerConstructor = ({data}) => {
  return (
    <section className={burgerConstructorStyles.section}>
      <div className={burgerConstructorStyles.container}>
        <ConstructorElement 
          type='top'
          isLocked={true}
          text={`${data[0].name} (верх)`}
          price={data[0].price}
          thumbnail={data[0].image}
          className={burgerConstructorStyles.item}
          />
        </div>
      <ul className={`${burgerConstructorStyles.list} custom-scroll`}>
        <ConstructorItem item={data[1]} />
        <ConstructorItem item={data[1]} />
        <ConstructorItem item={data[1]} />
        <ConstructorItem item={data[1]} />
        <ConstructorItem item={data[1]} />
        <ConstructorItem item={data[1]} />
        <ConstructorItem item={data[1]} />
        <ConstructorItem item={data[1]} />
      </ul>
      <div className={burgerConstructorStyles.container}>
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text={`${data[0].name} (низ)`}
          price={data[0].price}
          thumbnail={data[0].image}
          className={burgerConstructorStyles.item}
          />
      </div>
      <div className={burgerConstructorStyles.price}>
        <PriceContainer total={610} />
        <Button type='primary' size='large'>Оформить заказ</Button>
      </div>
    </section>
  );
};

BurgerConstructor.propTypes = {
  data: ingredientsPropType.isRequired
}

export default BurgerConstructor;