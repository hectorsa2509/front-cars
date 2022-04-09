import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import ReactModal from 'react-modal';
function App() {
  const [data, setData] = useState([])
  const [available, setAvailable] = useState(false)
  const [open, setOpen] = useState(false)
  const [openGas, setOpenGas] = useState(false)
  const [openCar, setOpenCar] = useState(false)
  const [location, setLocation] = useState("")
  const [newLocation, setNewLocation] = useState("")
  const [gas, setGas] = useState(0)
  const [id, setId] = useState(0)
  const options = [
    {
      label: "",
      value: "",
    },
    {
      label: "Ubicación A",
      value: "A",
    },
    {
      label: "Ubicación B",
      value: "B",
    },
    {
      label: "Ubicación C",
      value: "C",
    },
  ];

  const getData = () => {
    axios.get('https://api-rest-cars.herokuapp.com/api/car').then(resp => {
      console.log(resp.data)
      setData(resp.data)
      setAvailable(!available)
    }).catch(err => console.log(err))
  }

  const updateLocation = () => {
    axios.patch(`https://api-rest-cars.herokuapp.com/api/car/location/${id}`, {
      "location": location
    }).then(resp => {
      console.log(resp.data)
      setData(resp.data)
      setAvailable(!available)
      setOpen(!open)
      window.location.reload(false);

    }).catch(err => {
      window.location.reload(false);
    })
  }


  const newCar = () => {
    axios.post(`https://api-rest-cars.herokuapp.com/api/car`, {
      "location": newLocation,
    }).then(resp => {

      window.location.reload(false);

    }).catch(err => {
      window.location.reload(false);
    })
  }
  const updateCar = () => {
    axios.patch(`https://api-rest-cars.herokuapp.com/api/car/${id}`, {
      "fuel_consumption": parseInt(gas)
    }).then(resp => {
      console.log(resp.data)
      setData(resp.data)
      setAvailable(!available)
      setOpen(!open)

    }).catch(err => {
      window.location.reload(false);
    })
  }

  const handleOnchange = (id) => {
    setOpen(!open)
    setId(id)
  }

  const handleOnchangeGas = (id) => {
    setOpenGas(!open)
    setId(id)
  }


  const handleOnchangeSelected = (e) => {
    console.log("Location Selected!!");
    setLocation(e.target.value);
    setNewLocation(e.target.value);

  }

  const newGas = (e) => {
    console.log("Gas Selected!!");
    setGas(e.target.value);

  }


  const handleCloseModal = (e) => {
    setOpen(!open)
  }

  const handleNewCar = (e) => {
    setOpenCar(!openCar)
  }

  const handleCloseModalGas = (e) => {
    setOpenGas(!openGas)
  }

  useEffect(() => {
    if (!available) getData();

  }, [available, data, open, openGas, id]);
  const modalUpdateLocation = <div>

    <ReactModal isOpen={open} className="modals" >
      <h2 className='center-text' >Actualizar ubicación para el carro {id}</h2>
      <button onClick={handleCloseModal}>Cerrar modal</button>
      <div className="select-container">

        <select onChange={handleOnchangeSelected}>
          {options.map((option) => (
            <option value={option.value}>{option.label}</option>
          ))}
        </select>
      </div>
      <div>Ubicación seleccionada: {location}</div>
      <button onClick={updateLocation}>Actualizar</button>


    </ReactModal>
  </div >


  const modalNewCar = <div>

    <ReactModal isOpen={openCar} className="modals" >
      <h2 className='center-text' >Agregar nuevo carro</h2>
      <button onClick={handleCloseModal}>Cerrar modal</button>
      <div className="select-container">
        <p>Seleccionar ubicación</p>
        <select onChange={handleOnchangeSelected}>
          {options.map((option) => (
            <option value={option.value}>{option.label}</option>
          ))}
        </select>
      </div>
      <div>Ubicación seleccionada: {location}</div>
      <button onClick={newCar}>Agregar</button>


    </ReactModal>
  </div >


  const modalUpdateCar = <div>
    <ReactModal isOpen={openGas} className="modals">
      <h2 className='center-text' >Cargar gasolina para el carro {id}</h2>
      <button onClick={handleCloseModalGas}>Cerrar modal</button>
      <div>
        <input type={"number"} onChange={newGas} />
      </div>

      <button onClick={updateCar}>Actualizar</button>
    </ReactModal>
  </div >
  const nameList = data && data.map((car) => (
    <div key={car.id}>

      <li>Carro con id <b>{car.id}</b></li>
      <li>Ubicación actual <b>{car.current_location} </b></li>
      <li>Distancia recorrida <b>{car.distance} km</b> </li>
      <li>Última ubicación <b>{car.last_location ? car.last_location : "No tiene"}</b></li>
      <li>Gasolina consumida  <b>{car.fuel_consumed} litros</b></li>
      <li>Gasolina total <b>{car.fuel_consumption} litros</b></li>
      <button onClick={() => handleOnchangeGas(car.id)} >Actualizar auto</button>
      <button onClick={() => handleOnchange(car.id)}>Actualizar ubicación</button>

      <br></br>
      <br></br>
      <br></br>
    </div>

  )
  );
  return (
    <div>
      <h1 className='center-text'>Sistema de localización de autos</h1>
      <div className='center-button'>
      <button onClick={handleNewCar} >Agregar auto</button>
      </div>
     
      <img className='photo' src="https://source.unsplash.com/featured/?delivery"></img>
      <ul>{nameList}</ul>
      {modalUpdateLocation}
      {modalUpdateCar}
      {modalNewCar}
    </div>
  );
}




export default App;
