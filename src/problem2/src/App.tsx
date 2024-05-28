import {useMount} from 'react-use';
import './App.css';
import {FormSwap} from './ui/FormSwap';
import {Loader} from './ui/Loader';
import {useState} from 'react';

function App() {
  const [loaded, setLoaded] = useState<boolean>(false);
  useMount(() => {
    setLoaded(true);
  });
  return (
    <>
      <FormSwap />
      {!loaded && <Loader />}
      <h4 className="text-center">Design by Ho Duc Viet</h4>
    </>
  );
}

export default App;
