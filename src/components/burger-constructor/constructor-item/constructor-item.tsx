import React, { FunctionComponent } from 'react';
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import constructorItemStyles from './constructor-item.module.css';
import { useDispatch } from 'react-redux';
import { DECREASE_QTY } from '../../../services/burger-ingredients/burger-ingredients-action';
import { useDrag, useDrop, DropTargetMonitor } from 'react-dnd';
import { useRef } from 'react';
import { DELETE_ITEM } from '../../../services/actions/burger-constructor';
import { TIngredient } from '../../../types';

interface IConstructorItem {
  item: TIngredient,
  index: number,
  dragItem: (dragIndex: number, hoverIndex: number) => void
}

const ConstructorItem: FunctionComponent<IConstructorItem> = ({item, index, dragItem}) => {
  const id = item._id;
  const ref = useRef<HTMLLIElement>(null);
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
    hover(el: IConstructorItem, monitor: DropTargetMonitor) {
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
      const hoverClientY = clientOffset && clientOffset.y - hoverBoundingRect.top;

      if (hoverClientY && dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }
      if (hoverClientY && dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
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
    <li className={constructorItemStyles.item} data-handler-id={handlerId} ref={ref} >
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

export default ConstructorItem;
