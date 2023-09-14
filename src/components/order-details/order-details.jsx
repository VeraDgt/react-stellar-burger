import Modal from "../modal/modal";
import orderStyles from './order-details.module.css';
import img from '../../images/done.png';
import PropTypes from 'prop-types';
import { ingredientsPropType } from "../../utils/prop-types";

const OrderDetails = ({data, handleClose}) => {
  return (
    <Modal handleClose={handleClose} hasOverlay={true}>
      <p className={orderStyles.number}>034536</p>
      <p className={orderStyles.text}>идентификатор заказа</p>
      <img src={img} alt='Заказ принят' className={orderStyles.img}/>
      <p className={orderStyles.infoText}>Ваш заказ начали готовить</p>
      <p className={orderStyles.delivery}>Дождитесь готовности на орбитальной станции</p>
    </Modal>
  )
}

OrderDetails.propTypes = {
  data: ingredientsPropType,
  data: PropTypes.array,
  handleClose: PropTypes.func.isRequired
}

export default OrderDetails;