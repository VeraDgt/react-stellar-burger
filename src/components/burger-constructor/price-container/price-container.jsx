import priceStyles from './price-container.module.css';
import PropTypes from 'prop-types';

const PriceContainer = ({total}) => {
  return (
    <span className={priceStyles.price}>
      {total}
      <svg width="34" height="32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.927 1.156c.196-.467-.346-.897-.755-.6L.912 10.2a1 1 0 0 0-.412.81v7.39a.5.5 0 0 0 .33.47l4.851 1.76a1 1 0 0 0 1.263-.552l7.983-18.922ZM1.18 21.764a.5.5 0 0 0-.68.466v.37a.5.5 0 0 0 .232.422l14.04 8.935c.102.065.21-.073.123-.156l-8.129-7.788a.998.998 0 0 0-.33-.21l-5.255-2.039ZM19.105 31.8c-.087.084.02.222.123.157l14.04-8.935a.5.5 0 0 0 .232-.421v-.37a.5.5 0 0 0-.68-.467l-5.256 2.039a1 1 0 0 0-.33.21l-8.13 7.788ZM33.17 18.87a.5.5 0 0 0 .33-.47v-7.39a1 1 0 0 0-.412-.81L19.828.557c-.41-.298-.951.132-.755.599l7.983 18.922a1 1 0 0 0 1.263.552l4.851-1.76ZM17.714 29.807a1 1 0 0 1-1.428 0l-6.853-6.993a1 1 0 0 1-.217-1.065L16.07 4.268c.332-.847 1.53-.847 1.862 0l6.853 17.481a1 1 0 0 1-.217 1.065l-6.853 6.993Z" fill="#F2F2F3"/></svg>
    </span>
  );
};

PriceContainer.propTypes = {
  total: PropTypes.number.isRequired
}

export default PriceContainer;