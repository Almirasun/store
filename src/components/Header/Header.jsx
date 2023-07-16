import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineSearch } from "react-icons/ai";
import { AiOutlineHeart } from "react-icons/ai";
import { FiShoppingCart } from "react-icons/fi";

import { ROUTES } from "../../utils/routes";
import { toggleForm } from "../../features/user/userSlice";
import { useGetProductsQuery } from "../../features/api/apiSlice";

import styles from "../../styles/Header.module.css";
import LOGO from "../../images/logo.svg";
import AVATAR from "../../images/avatar.jpg";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchValue, setSearchValue] = useState("");
  const { currentUser, cart } = useSelector(({ user }) => user);

  const [values, setValues] = useState({ name: "Guest", avatar: AVATAR });

  const { data, isLoading } = useGetProductsQuery({ title: searchValue });

  useEffect(() => {
    if (!currentUser) return;

    setValues(currentUser);
  }, [currentUser]);

  const handleClick = () => {
    if (!currentUser) dispatch(toggleForm(true));
    else navigate(ROUTES.PROFILE);
  };

  const handleSearch = ({ target: { value } }) => {
    setSearchValue(value);
  };

  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        <Link to={ROUTES.HOME}>
          <img src={LOGO} alt="stuff" />
        </Link>
      </div>
      <div className={styles.info}>
        <div className={styles.user} onClick={handleClick}>
          <div
            className={styles.avatar}
            style={{ backgroundImage: `url(${values.avatar})` }}
          />
          <div className={styles.username}>{values.name}</div>
        </div>
        <form className={styles.form}>
          <div className={styles.icon}>
            <svg className="icon">
              <AiOutlineSearch />
            </svg>
          </div>
          <div className={styles.input}>
            <input
              type="search"
              name="search"
              placeholder="Search for anything..."
              autoComplete="off"
              onChange={handleSearch}
              value={searchValue}
            />
          </div>

          {searchValue && (
            <div className={styles.box}>
              {isLoading
                ? "Loading"
                : !data.length
                ? "No results"
                : data.map(({ title, images, id }) => {
                    return (
                      <Link
                        key={id}
                        onClick={() => setSearchValue("")}
                        className={styles.item}
                        to={`/products/${id}`}
                      >
                        <div
                          className={styles.image}
                          style={{ backgroundImage: `url(${images[0]})` }}
                        />
                        <div className={styles.title}>{title}</div>
                      </Link>
                    );
                  })}
            </div>
          )}
        </form>

        <div className={styles.account}>
          <Link to={ROUTES.HOME} className={styles.favorites}>
            <AiOutlineHeart />
          </Link>

          <Link to={ROUTES.CART} className={styles.cart}>
            <FiShoppingCart />
            {!!cart.length && (
              <span className={styles.count}>{cart.length}</span>
            )}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
