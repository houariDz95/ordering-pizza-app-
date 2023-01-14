import {useState} from 'react'
import styles from '../../styles/Admine.module.css';
import Image from 'next/image';
import axios from 'axios'
import {BASE_URL} from '../../utils';

const Index = ({orders, products}) => {
  const [pizzaList, setPizzaList] = useState(products);
  const [orderList, setOrderList] = useState(orders);
  const status = ["preparing", "on the way", "deliverd"];

  const handelDelete = async (id) => {
    try{
      await axios.delete(`${BASE_URL}/api/products/${id}`)
      setPizzaList(pizzaList.filter(pizza => pizza._id !== id));
    }catch(err){
      console.log(err);
    }
  }


  const handelStatus = async (id) => {
    const item = orderList.filter(order => order._id === id)[0];
    const currentStatus = item.status;
    try{
     const res =  await axios.put(`${BASE_URL}/api/order/${id}`, {status: currentStatus !== 2 ? currentStatus + 1 : 0}); 
      setOrderList([
        res.data,
        ...orderList.filter(order => order._id !== id),
      ])
    }catch(err){
      console.log(err)
    }
  }
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <h1 className={styles.title}>Products</h1>
        <table className={styles.table}>
          <tbody>
            <tr className={styles.trTitle}>
              <th>Image</th>
              <th>Id</th>
              <th>Title</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </tbody>
          <tbody>
            {pizzaList.map(product => (
            <tr className={styles.trTitle} key={product._id}>
              <td><Image src={product.img} width="50" height="50" objectFit="cover" alt="" /> </td>
              <td>{product._id.slice(0, 5)}...</td>
              <td>{product.title}</td>
              <td>${product.prices[0]}</td>
              <td style={{ display: "flex"}}>
                <button className={styles.button}>Edit</button>
                <button className={styles.button} onClick={() => handelDelete(product._id)}>Delete</button>
              </td>
            </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={styles.item}>
        <h1 className={styles.title}>Orders</h1>
        <table className={styles.table}>
          <tbody>
            <tr className={styles.trTitle}>
              <th>Id</th>
              <th>Customer</th>
              <th>Total</th>
              <th>Payment</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </tbody>
          <tbody>
            {orderList.map(order => (
              <tr className={styles.tTitle} key={order._id}>
              <td>{order._id.slice(0, 5)}...</td>
              <td>{order.customer}</td>
              <td>${order.total}</td>
              <td>{order.method === 0 ? (<span>Cash</span>) : (<span>paid</span>)}</td>
              <td>{status[order.status]}</td>
              <td>
                <button style={{ width: "70px", fontSize: "12px"}} className={styles.button} onClick={() => handelStatus(order._id)}>Next stage</button>
              </td>
            </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export const getServerSideProps = async (context) => {
  const myCookie = context.req?.cookies || "";

  if(myCookie.token !== process.env.TOKEN){
    return {
      redirect: {
        destination: "/login",
        permanent: false
      }
    }
  }
  const productRres = await axios.get(`${BASE_URL}/api/products`);
  const orderRes = await axios.get(`${BASE_URL}/api/order`);

  return{
    props: {
      orders: orderRes.data,
      products: productRres.data
    }
  }
}
export default Index