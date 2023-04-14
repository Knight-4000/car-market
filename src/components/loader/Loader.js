import './loader.scss';
import ReactDOM  from 'react-dom';

const Loader = () => {
  return ReactDOM.createPortal (
      <span class="loader"></span>,
    document.getElementById("loader")
  )
}

export default Loader
