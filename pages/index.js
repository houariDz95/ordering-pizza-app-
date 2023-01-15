import {useState} from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Featured from '../components/Featured';
import PizzaList from '../components/PizzaList';
import AddButton from '../components/AddButton';
import Add from '../components/Add';
import axios from 'axios';
import {BASE_URL} from '../utils';

export default function Home({pizzaList, admin}) {
  const [close, setClose] = useState(true);
  return (
    <div>
      <Head>
        <title>Pizza Restaurant in Oran</title>
        <meta name="description" content="Best pizza shop in town" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Featured />
      {admin && <AddButton setClose={setClose} />}
      <PizzaList pizzaList={pizzaList} />
      {!close && <Add setClose={setClose} />}
    </div>
  )
}

export const getServerSideProps = async (context) =>{
  const myCookie = context.req?.cookies || "";
  let admin = false;
  if(myCookie.token === process.env.TOKEN){
    admin = true
  }
  const response = await axios.get(`${BASE_URL}/api/products`);
  const pizzaList = response.data;
  return {
    props: {
      pizzaList,
      admin,
    }
  }
}