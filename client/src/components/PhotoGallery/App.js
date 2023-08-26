import WSPGallery from './WSPGallery';
import './App.css';
import Navbar from 'scenes/navbar';

function App() {

  const galleryImages = [
  {
      img: "./assets/batwing.jpg"
    },
    {
      img: "./assets/superman.jpg"
    },
    {
      img: "./assets/streetfighter.jpg"
    },
    {
      img: "./assets/flash.jpg"
    },
    {
      img: "./assets/stormart.jpg"
    },
    {
      img: "./assets/samwilson.jpg"
    },
    {
      img: "./assets/hogwarts.jpg"
    },
    {
      img: "./assets/starwars.jpg"
    },
    {
      img: "./assets/lukecage.jpg"
    },
    {
      img: "./assets/burescue.jpg"
    },
    {
      img: "./assets/gtasa.jpg"
    },
    {
      img: "./assets/batman.jpg"
    },
    {
      img: "./assets/halo.jpg"
    },
    {
      img: "./assets/bane.jpg"
    },
    {
      img: "./assets/killmonger.jpg"
    },
    {
    img: "./assets/bladeart.jpg"
    },
    {
    img: "./assets/watchdogs.jpg"
    },
    {
    img: "./assets/finalfantasy.jpg"
    },
    {
    img: "./assets/fortnite.jpg"
    },
    {
    img: "./assets/spiderman.jpg"
    },
    {
    img: "./assets/alien.jpg"
    },
    {
    img: "./assets/greenlantern.jpg"
    },
    {
    img: "./assets/bucollage.jpg"
    },
    {
    img: "./assets/blackpanther.jpg"
    },
    {
    img: "./assets/codpic.jpg"
    },
    
  ]

  return (
    <div> <Navbar/> <div className="App">
      
      <div>
        <strong></strong>
      </div>
     

      <WSPGallery
        galleryImages={galleryImages}
      />

      <br /><br />
      <div>- Logged In User's Photo Gallery -</div>
    </div></div>
  );
}

export default App;