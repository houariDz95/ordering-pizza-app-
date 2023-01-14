import {useState} from 'react'
import Image from 'next/image'
import styles from "../styles/Featured.module.css";
import {MdKeyboardArrowLeft, MdKeyboardArrowRight} from 'react-icons/md'
const Featured = () => {
  const [ index, setIndex] = useState(0);
  const images = [
    "/img/featured.png",
    "/img/featured2.png",
    "/img/featured3.png",
  ];
  const handelArrow = (direction) => {
    if(direction === "l"){
      setIndex(index!== 0 ? index - 1 :  2)
    }else if(direction === "r"){
      setIndex(index!== 2 ? index + 1 :  0)
    }
  } 
  return (
    <div className={styles.container}>
      <div className={styles.arrowContainer} style={{ left: 0}} onClick={() => handelArrow('l')}>
        <MdKeyboardArrowLeft color="white" style={{width: '100%', height: '100%' }} />
      </div>
      <div className={styles.wrapper} style={{transform:`translateX(${-100*index}vw)`}} >
        {images.map((img, i) => (
          <div className={styles.imgContainer} key={i}>
            <Image src={img} alt="" layout="fill" objectFit="contain" />
          </div>
        ))}
      </div>
      <div className={styles.arrowContainer} style={{ right: 0}} onClick={() => handelArrow('r')}>
        <MdKeyboardArrowRight color="white" style={{width: '100%', height: '100%'}} />
      </div>
    </div>
  )
}

export default Featured