import Auto from '../../components/auto/Auto';
import './home.scss';
const Home = () => {
    return (
      <>
      <div className='opening'>
        <div className='outer'>
          <div className='inner'>
            <h1 className='text-center opening-header'>Put yourself in the driver's seat</h1>
          </div>
        </div>
      </div> 
      <Auto />
    </>
  );
};

export default Home
