import { Button, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import burgerConstructorStyles from './burger-constructor.module.css';
import ConstructorItem from './constructor-item/constructor-item';
import PriceContainer from './price-container/price-container';
import { ingredientsPropType } from '../../utils/prop-types';
import PropTypes from 'prop-types';
import Modal from "../modal/modal";
import orderStyles from '../order-details/order-details.module.css';
import img from '../../images/done.png';


const BurgerConstructor = ({data, openModal, closeModal, visibility}) => {
  const modal = (
    <Modal handleClose={closeModal} hasOverlay={true}>
      <p className={orderStyles.number}>034536</p>
      <p className={orderStyles.text}>идентификатор заказа</p>
      <img src={img} alt='Заказ принят' className={orderStyles.img}/>
      <p className={orderStyles.infoText}>Ваш заказ начали готовить</p>
      <p className={orderStyles.delivery}>Дождитесь готовности на орбитальной станции</p>
    </Modal>
  )
  
  return (
    <section className={burgerConstructorStyles.section}>
      { data.length !== 0 &&
      <>
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
      </>
      }
      <div className={burgerConstructorStyles.price}>
        <PriceContainer total={610} />
        <Button type='primary' htmlType='button' size='large' onClick={openModal}>Оформить заказ</Button>
      </div>
      {visibility && modal}
    </section>
  )
};

BurgerConstructor.propTypes = {
  data: ingredientsPropType.isRequired,
  data: PropTypes.array.isRequired,
  openModal: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  visibility: PropTypes.bool.isRequired
}

export default BurgerConstructor;