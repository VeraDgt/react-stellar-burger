import { useContext, useEffect, useState } from 'react';
import { Button, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import burgerConstructorStyles from './burger-constructor.module.css';
import ConstructorItem from './constructor-item/constructor-item';
import PriceContainer from './price-container/price-container';
import OrderDetails from '../order-details/order-details';
import { ItemsContext, TotalSumContext } from '../../services/context';
import { countTotalSum } from '../../utils/data';
import Modal from '../modal/modal';


const BurgerConstructor = () => {
  const { items } = useContext(ItemsContext);
  const { totalSum, setTotalSum } = useContext(TotalSumContext);
  const [ visibility, setVisibility ] = useState(false);

  function openModal() {
    setVisibility(true)
  }

  function closeModal() {
    setVisibility(false)
  }

  useEffect(() => {
    setTotalSum(countTotalSum(items))
  }, [items])

  const modal = (
    <Modal handleClose={closeModal} hasOverlay={true}>
      <OrderDetails />
    </Modal>
  )
  
  return (
    <section className={burgerConstructorStyles.section}>
      { 
      <>
        { items
        .filter((item) => item.type === 'bun')
        .map((item, index) => 
          <div className={burgerConstructorStyles.container} key={ index }>
            <ConstructorElement 
              type='top'
              isLocked={true}
              text={`${item.name} (верх)`}
              price={item.price}
              thumbnail={item.image}
              className={burgerConstructorStyles.item}
            />
          </div>
          )
        }
        
        <ul className={`${burgerConstructorStyles.list} custom-scroll`}>
          {
            items
            .filter((item) => item.type !== 'bun')
            .map((item, index) => {
              for(let i = 0; i < item.qty; i++) {
                return (<ConstructorItem key={index} item={item} />)
              }
            })
          }
        </ul>
        { items
          .filter((item) => item.type === 'bun')
          .map((item, index) =>
            <div className={burgerConstructorStyles.container} key={index}>
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={`${item.name} (низ)`}
              price={item.price}
              thumbnail={item.image}
              className={burgerConstructorStyles.item}
              />
            </div>
          )
        }  
      </>
      }
      <div className={burgerConstructorStyles.price}>
        <PriceContainer totalSum={totalSum} />
        <Button type='primary' htmlType='button' size='large' onClick={openModal}>Оформить заказ</Button>
      </div>
      {visibility && modal}
    </section>
  )
};

export default BurgerConstructor;