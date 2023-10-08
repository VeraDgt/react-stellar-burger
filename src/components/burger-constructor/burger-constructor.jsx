import React, { useCallback, useMemo, useState } from 'react';
import { Button, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import burgerConstructorStyles from './burger-constructor.module.css';
import ConstructorItem from './constructor-item/constructor-item';
import PriceContainer from './price-container/price-container';
import OrderDetails from '../order-details/order-details';
import { countTotalSum } from '../../utils/data';
import Modal from '../modal/modal';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useDrop } from 'react-dnd';
import { DRAG_ITEM } from '../../services/actions/burger-constructor';


const BurgerConstructor = ({dropHandler}) => {
  const { burgersData } = useSelector(store => store.burgerConstructor);
  const [ visibility, setVisibility ] = useState(false);
  const dispatch = useDispatch();

  const dragItem = useCallback((dragIndex, hoverIndex) => {
    dispatch({
      type: DRAG_ITEM,
      dragIndex: dragIndex,
      hoverIndex: hoverIndex
    })
  }, [dispatch])

  const [, dropTarget] = useDrop({
    accept: 'ingredient',
    drop(item) {
      dropHandler(item);
    }
  })

  const totalPrice = useMemo(()=> {
    return countTotalSum(burgersData)
  }, [burgersData])
  

  function openModal() {
    setVisibility(true)
  }

  function closeModal() {
    setVisibility(false)
  }

  const modal = (
    <Modal handleClose={closeModal} hasOverlay={true}>
      <OrderDetails />
    </Modal>
  )
  
  return (
    <section className={burgerConstructorStyles.section} ref={dropTarget}>
      { 
      <>
        { burgersData
        .filter((item) => item.type === 'bun')
        .map((item) => 
          <div className={burgerConstructorStyles.container} key={ item.key }>
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
            burgersData
            .filter((item) => item.type !== 'bun')
            .map((item, index) => {
              for(let i = 0; i < item.qty; i++) {
                return (<ConstructorItem key={item.index} item={item} dragItem={dragItem} index={index} />)
              }
            })
          }
        </ul>
        { burgersData
          .filter((item) => item.type === 'bun')
          .map((item) =>
            <div className={burgerConstructorStyles.container} key={item.key}>
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
        <PriceContainer totalSum={totalPrice} />
        <Button type='primary' htmlType='button' size='large' onClick={openModal} >Оформить заказ</Button>
      </div>
      {visibility && modal}
    </section>
  )
};

export default BurgerConstructor;

BurgerConstructor.propTypes = {
  dropHandler: PropTypes.func.isRequired
}