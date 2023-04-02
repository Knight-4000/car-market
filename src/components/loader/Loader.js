import './loader.scss';
import ReactDOM  from 'react-dom';

const Loader = () => {
  return ReactDOM.createPortal (
    <div className='simple-loader'>
      
    </div>,
    document.getElementById("loader")
  )
}

export default Loader
