import './loader.scss';
import ReactDOM  from 'react-dom';

const Loader = () => {
  return ReactDOM.createPortal (
    <div className='wrapper'>
      <div className='simple-loader'>
      </div>
    </div>,
    document.getElementById("loader")
  )
}

export default Loader
