import styles from '../styles/OrderDetaild.module.css';
import {useState} from 'react';
const OrderDetaild = ({ total, createOrder }) => {
  const [ customer, setCustomer] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone ] = useState("");

  const handelClick = async () => {
    createOrder({ customer, address, total, method: 0})
  }
  return(
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1>You Will Pay $12 after delivery</h1>
        <div className={styles.item}>
          <label className={styles.label}>Name Surname</label>
          <input placeholder="Johne Doe" type="text" className={styles.input} onChange={(e) => setCustomer(e.target.value)}/>
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Phone Number</label>
          <input placeholder="+1 234 567 89" type="text" className={styles.input} onChange={(e) => setPhone(e.target.value)}/>
        </div>
        <div className={styles.item}>
          <label className={styles.label}>address</label>
          <textarea placeholder="Elton St. 505 NY" rows={5} type="text" className={styles.input} onChange={(e) => setAddress(e.target.value)}></textarea>
        </div>
        <button className={styles.button} onClick={handelClick}>Order</button>
      </div>
    </div>
  )
}

export default OrderDetaild