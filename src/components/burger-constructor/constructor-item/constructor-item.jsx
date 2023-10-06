import React from 'react';
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import constructorItemStyles from './constructor-item.module.css';
import { ingredientPropType } from '../../../utils/prop-types';
import { useDispatch } from 'react-redux';
import { DECREASE_QTY } from '../../../services/actions/burger-ingredients';
import { useDrag, useDrop } from 'react-dnd';
import { useRef } from 'react';
import PropTypes from 'prop-types';
import { DELETE_ITEM } from '../../../services/actions/burger-constructor';

const ConstructorItem = ({item, index, dragItem}) => {
  const id = item._id;
  const ref = useRef(null);
  const dispatch = useDispatch();

  const [, drag] = useDrag({
    type: 'constructorItem',
    item: () => {
      return { id, index };
    },
  })

  const [{ handlerId }, drop] = useDrop({
    accept: 'constructorItem',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      }
    },
    hover(el, monitor) {
      if (!ref.current) {
        return
      }

      const dragIndex = el.index;
      const hoverIndex = index;

      if(dragIndex === hoverIndex) {
        return
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }

      dragItem(dragIndex, hoverIndex);
      el.index = hoverIndex;
    },
  })

  drag(drop(ref));

  const handleClose = () => {
    dispatch({ type: DELETE_ITEM, payload: item });
    dispatch({ type: DECREASE_QTY, payload: item });
  }
  return (
    <li className={constructorItemStyles.item}>
      <DragIcon type="primary" />
      <ConstructorElement
        isLocked={false}
        text={item.name}
        price={item.price}
        thumbnail={item.image}
        handleClose={handleClose}
      />
    </li>
  );
};

ConstructorItem.propTypes = {
  item: ingredientPropType.isRequired,
  index: PropTypes.number.isRequired,
  dragItem: PropTypes.func.isRequired,
}

export default ConstructorItem;

