import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import constructorItemStyles from './constructor-item.module.css';

const ConstructorItem = ({item}) => {
  return (
    <li className={constructorItemStyles.item}>
      <DragIcon type="primary" />
      <ConstructorElement
        isLocked={false}
        text={item.name}
        price={item.price}
        thumbnail={item.image}
      />
    </li>
  );
};

export default ConstructorItem;

