import { useEffect, useState } from 'react';
import './App.css';
import Cards from './component/Cards.jsx';
import axios from "axios";

function App() {
  const [companies, setCompanies] = useState([]);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");

  //use effects
  useEffect(() => {
    const getUsers = async () => {
      const { data } = await axios.get("http://localhost:8000/api/tasks");
      setCompanies(data.tasks);
    };

    getUsers();
  }, [companies]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const status = false;
    await axios.post("http://localhost:8000/api/tasks", { name, location});
    // Refresh the tasks after submission
    const { data } = await axios.get("http://localhost:8000/api/tasks");
    setCompanies(data.tasks);
    // Clear the input fields

    setName("");
    setLocation("");
  };

  //colours for the cards
  const backgroundColors = ['#FDF3B4', '#D1EAED', '#FFDADB', '#FFD4AA', '#EBEBEB'];

  return (
    <div className="App">
      <div className='Taskform'>
        <h2>Add Company</h2>
        <form onSubmit={handleSubmit}>
          <label for="fname">Name</label><br />
          <input type="text" id="title" className="TitleInput" value={name} onChange={(e) => setName(e.target.value)} /><br />
          <label for="fname">Location</label><br />
          <textarea type="text" id="description" className="DescriptionInput" value={location} onChange={(e) => setLocation(e.target.value)} /><br />
          <input type="submit" className='Submit'/>
        </form>
      </div>
      <div className='CardsBlock'>
        {companies.map((companay, index) => (
          <Cards
            key={index}
            id={companay._id}
            title={companay.name}
            description={companay.location}
            backgroundColor={backgroundColors[index % 4]}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
