import React from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../utils/routes";
import styles from "../../styles/Product.module.css";

const Product = () => {

  return (
    <section className={styles.product}>
      <div className={styles.images}>
        <div
          className={styles.current}
        />
        <div className={styles["images-list"]}>
          <div
            className={styles.image}
            onClick={() => {}}
          />
        </div>
      </div>
      <div className={styles.info}>
        <h1 className={styles.title}>Lorem</h1>
        <div className={styles.price}>ipsum dolor</div>
        <div className={styles.color}>
          <span>Color:</span> Green
        </div>
        <div className={styles.sizes}>
          <span>Sizes:</span>

          <div className={styles.list}>
            <div onClick={() => {}} className={styles.size}>
              4, 5, 6
            </div>
          </div>
        </div>

        <p className={styles.description}>Super boochii</p>

        <div className={styles.actions}>
          <button className={styles.add}>Add to cart</button>
          <button className={styles.favorite}>Add to favorites</button>
        </div>

        <div className={styles.bottom}>
          <div className={styles.purchase}>19 people purchased</div>
          <Link to={ROUTES.HOME}>Return to store</Link>
        </div>
      </div>
    </section>
  );
};

export default Product;
