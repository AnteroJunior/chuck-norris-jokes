import { useEffect, useState } from 'react';
import './App.css';

const url = 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Forig00.deviantart.net%2F7a56%2Ff%2F2011%2F249%2F8%2Fd%2Fchuck_norris_by_normantweeter-d493apq.png&f=1&nofb=1';

function App() {

  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState('');
  const [joke, setJoke] = useState('');

  const getCategories = async () => {
    const resp = await fetch('https://api.chucknorris.io/jokes/categories');
    const newResp = await resp.json();
    setCategories(newResp);
  }

  const getJoke = async () => {
    const resp = await fetch('https://api.chucknorris.io/jokes/random?category=' + category);
    const newResp = await resp.json();
    setJoke(newResp.value);
  }

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <main className="App">
      <header className='py-5'>
        <h1>Chuck Norris Jokes</h1>
      </header>
      <section>
        <div className='joke'>
          {joke ? <h4 className='text-joke px-3 text-center text-white'>{joke}</h4> : <img className='chuck' src={url} alt='Chuck Norris' />}
        </div>
        <div className='options pt-3 d-flex justify-content-between'>
          <select className='form-select form-select-md w-75' onChange={(e) => setCategory(e.target.value)}>
            <option defaultValue>Select a category</option>
            {categories.map((item, index) => {
              return <option value={item} key={index}>{item}</option>
            })}
          </select>
          <button className='btn btn-primary' onClick={getJoke}>Get joke</button>
        </div>
      </section>
      <p className='text-secondary pt-5'>Developed by Antero Júnior</p>
    </main>
  );
}

export default App;
