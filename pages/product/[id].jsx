import React, { useState } from 'react'
import Image from 'next/image';
import styles from "../../styles/Product.module.css";
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addProduct } from "../../redux/cartSlice";
import {BASE_URL} from '../../utils';

const Product = ({pizza}) => {
  const [size, setSize] = useState(0);
  const [price, setPrice] = useState(pizza.prices[0]);
  const [extras, setExtras] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const changePrice = (number) => {
    setPrice(price + number)
  }
  const handelSize = (sizeIndex) => {
    const difference = pizza.prices[sizeIndex] - pizza.prices[size];
    setSize(sizeIndex);
    changePrice(difference);
  }

  const handleChange = (event, option) => {
    const checked = event.target.checked;
    if(checked){
      changePrice(option.price)
      setExtras((prev) => [...prev, option])
    }else{
      changePrice(-option.price)
      setExtras(extras.filter(extra => extra._id !== option._id))
    }
  }

  const handelClick = () => {
    dispatch(addProduct({...pizza, extras, price, quantity}))
  }
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.imgContainer}>
          <Image src={pizza.img} alt="" layout="fill" />
        </div>
      </div>
      <div className={styles.right}>
        <h1 className={styles.title}>{pizza.title}</h1>
        <span className={styles.price}>${price}</span>
        <p className={styles.desc}>{pizza.desc}</p>
        <h3 className={styles.choose}>choose the size</h3>
        <div className={styles.sizes}>
          <div className={styles.size} onClick={() => handelSize(0)}>
            <Image src="/img/size.png" alt="" layout="fill" />
            <span>Small</span>
          </div>
          <div className={styles.size} onClick={() => handelSize(1)}>
            <Image src="/img/size.png" alt="" layout="fill" />
            <span>Meium</span>
          </div>
          <div className={styles.size} onClick={() => handelSize(2)}>
            <Image src="/img/size.png" alt="" layout="fill" />
            <span>Large</span>
          </div>
        </div>
        <h3 className={styles.choose}>Choose additonal ingridents</h3>
        <div className={styles.ingridents}>
          {pizza.extraOptions.map((option, index) => (
            <div className={styles.option} key={index}   onChange={(e) => handleChange(e, option)}>
              <input type="checkbox" id={option.text} name={option.text} className={styles.checkbox}  />
              <label htmlFor={option.text}>{option.text}</label>
            </div>
          ))}
        </div>
        <div className={styles.add}>
          <input type="number" defaultValue={1} className={styles.quantity} onChange={(e) => setQuantity(e.target.value)}/>
          <button className={styles.button} onClick={handelClick}>Add to Cart</button>
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps = async ({params}) => {
  const response = await axios.get(`${BASE_URL}/api/products/${params.id}`);
  const pizza = response.data
  return{
    props: {
      pizza,
    }
  }
}

export default Product