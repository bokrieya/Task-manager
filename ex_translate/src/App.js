
import img1 from './assets/img1.png';
import img2 from './assets/img2.png';
import img3 from './assets/img3.png';
import './App.css';
import { useEffect, useRef, useState } from 'react';

const first ={
  position:{
    x:"-100%",
    y:"-50%",
  },
  zIndex: 0,
  scale: 1,
};
const second ={
  position:{
    x:"-50%",
    y:"-50%",
  },
  zIndex: 2,
  scale: 1.4,
};
const third ={
  position:{
    x:"0%",
    y:"-50%",
  },
  zIndex: 1,
  scale: 0.9,
};
const positions =[first, second, third];
const Images =[
  {
  src: img1,
  alt: "cas 1",
  style: positions[0],
},
{
  src: img2,
  alt: "cas 2",
  style: positions[1],
},
{
  src: img3,
  alt: "cas 3",
  style: positions[2],
},
];

function App() {
  const [imagePositions, setImagesPositions]= useState(positions);
  const [images, setImages]= useState(Images);
  const [imageIndex, setImageIndex] = useState(2);
  const timeoutRef = useRef(null);
  //next image
  const nextImage =() => {
    const newPositions =[...imagePositions];
    const newImages =[...images];
    newPositions.push(newPositions.shift()); //123 ;231; 312
    newImages.forEach((image,index) => {
      image.style = newPositions[index];
    });
    setImagesPositions(newPositions);
    setImages(newImages);
    setImageIndex((index)=> index===2 ? 0 :index+1);
  };
  //previous image
  const preImage =() => {
    const newPositions =[...imagePositions];
    const newImages =[...images];
    newPositions.unshift(newPositions.pop()); 
    newImages.forEach((image,index) => {
      image.style = newPositions[index];
    });
    setImagesPositions(newPositions);
    setImages(newImages);
    setImageIndex((index)=>index===0 ? 2 : index-1);
  };

  
    const restTimeout =() => {
      if(timeoutRef.current) clearInterval(timeoutRef.current);
    };
  //bech tetharak wahadha
    useEffect(() => {
      restTimeout();
      timeoutRef.current = setInterval(() =>
      {nextImage();}, 3000);
      return() => {
        restTimeout ();
      };

    }, [imagePositions, images]);

  return (
    <div className="App">
      <div className="Container">
        <div className='images'>
        {Images.map(image => {
        const translate= `translate(${image.style.position.x},${image.style.position.y})scale(${image.style.scale})`;
        return(
          <img
          key={image.src}
          className='image'
          src={image.src}
          alt={image.alt}
          onClick ={nextImage}
          style={{
            transform: translate ,
            zIndex: image.style.zIndex,
          }}
          />

        )
        })
      }
        </div>
        <div className='controls'>

        <div >
                  <button className='next' onClick={nextImage} >Next Episode</button>
            </div>
            <div className='circles'>
              {Array.from({length:3}).map((item,index) => {
                return <div className={imageIndex===index ?'circle2':'circle1'}/>
              })
              }
            </div>
            <div >
                  <button className='pre' onClick={preImage} >Previous Episode</button>
            </div>
        </div>
       </div>
    </div>
  );
}

export default App;
