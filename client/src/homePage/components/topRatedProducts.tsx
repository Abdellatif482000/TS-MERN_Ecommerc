import { useState, useEffect, useRef } from "react";
import productStyle from "../../cssModules/sectioStyle.module.css";
import homeStyle from "../../cssModules/homePage.module.css";

export function TopRatedProducts(props) {
  const [transition, setTransition] = useState(0);
  const [nextBtn, setNextBtn] = useState("block");
  const [prevBtn, setPrevBtn] = useState("none");

  const handleSliderBtns = (direction) => {
    if (direction === "next") {
      if (transition >= -100) {
        setNextBtn((n) => (n = "none"));
        setPrevBtn((n) => (n = "block"));
      }
      setTransition((n) => n - 100);
    } else if (direction === "prev") {
      if (transition <= 0) {
        setNextBtn((n) => (n = "block"));
        setPrevBtn((n) => (n = "none"));
      }
      setTransition((n) => n + 100);
    }
  };

  const products = props.prods.sort((a, b) => a.rating - b.rating).reverse();

  const topItems = products.slice(0, 10);

  // console.log(topItems);
  // console.log(document.qurySelector("#preview").childNodes);
  return (
    <>
      <div className={`${homeStyle.sectionHead}`}>
        <h1>Top Rated</h1>
        <button className={productStyle.seeMore}>
          <h3>
            See More <i className="fa-solid fa-arrow-right"></i>
          </h3>
        </button>
      </div>
      <div
        className={homeStyle.sectionContent}
        style={{
          transform: `translateX(${transition}%)`,
        }}
      >
        {topItems.map((p, idx) => (
          <div key={idx} className={productStyle.productPreview}>
            <img src={p.thumbnail} className={productStyle.productImg} />
            <p className={productStyle.productName}>{p.title}</p>
            <div className={productStyle.productPrice}>EGP {p.price}</div>
            <div className={productStyle.rateStars}>{p.rating} / 5</div>
            <div className={productStyle.productDiscount}>
              {p.discountPercentage}% off
            </div>
            <button className={productStyle.cartBtn}>
              <i className="fa-solid fa-cart-shopping"></i>
            </button>
            <button className={productStyle.favBtn}>
              <i className="fa-solid fa-heart"></i>
            </button>
          </div>
        ))}
      </div>

      <button
        className={`${productStyle.prevBtn}`}
        onClick={() => handleSliderBtns("prev")}
        style={{ display: prevBtn }}
      >
        <i className="fa-solid fa-arrow-left"></i>
      </button>
      <button
        className={`${productStyle.nextBtn}`}
        onClick={() => handleSliderBtns("next")}
        style={{ display: nextBtn }}
      >
        <i className="fa-solid fa-arrow-right"></i>
      </button>
    </>
  );
}
