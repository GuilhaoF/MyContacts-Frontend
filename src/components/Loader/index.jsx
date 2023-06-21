import PropTypes from 'prop-types';
import { Overlay } from './styles';
import Spinner from '../Spinner';
import ReactPortal from '../ReactPortal';

export default function Loader({ isloading }) {
  if (!isloading) {
    return null;
  }

  return (
    <ReactPortal containerId="loader-root">
      <Overlay>
        <Spinner size={90} />
      </Overlay>
    </ReactPortal>

  );
}
Loader.propTypes = {
  isloading: PropTypes.bool.isRequired,
};
