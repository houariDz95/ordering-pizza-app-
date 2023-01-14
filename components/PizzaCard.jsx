import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/PizzaCard.module.css';

const PizzaCard = ({img, prices, title, desc, _id}) => {
  return (
    <div className={styles.container} >
      <Link href={`/product/${_id}`}>
        <Image src={img}  alt="pizza" width="200" height="200"  />
      </Link>
      <h1 className={styles.title}>{title}</h1>
      <span className={styles.price}>${prices[0]}</span>
      <p className={styles.desc}>{desc}</p>
    </div>
  )
}

export default PizzaCard