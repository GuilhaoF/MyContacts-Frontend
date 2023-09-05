import PropTypes from 'prop-types';
import { memo, useEffect } from 'react';
import { Container } from './styles';

import xCircleIcon from '../../../assets/images/x-circle.svg';
import checkCircleIcon from '../../../assets/images/check-circle.svg';

function ToastMessage({
  message, onRemoveMessage, isLeaving, animatedRef,
}) {
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onRemoveMessage(message.id);
    }, message.duration || 7000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [message, onRemoveMessage]);

  function handleRemoveToast() {
    onRemoveMessage(message.id);
  }

  return (
    <Container
      role="button"
      tabIndex={0}
      type={message.type}
      isLeaving={isLeaving}
      ref={animatedRef}
      onClick={handleRemoveToast}
    >
      {message.type === 'success' && <img src={checkCircleIcon} alt="Check" />}
      {message.type === 'danger' && <img src={xCircleIcon} alt="Error" />}
      <strong>{message.text}</strong>
    </Container>
  );
}
ToastMessage.propTypes = {
  message: PropTypes.shape({
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['default', 'success', 'danger']),
    duration: PropTypes.number,
  }).isRequired,
  isLeaving: PropTypes.bool.isRequired,
  animatedRef: PropTypes.shape().isRequired,
  onRemoveMessage: PropTypes.func.isRequired,
};

export default memo(ToastMessage);
