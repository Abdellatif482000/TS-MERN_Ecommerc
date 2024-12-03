import categoriesStyles from "../../cssModules/sectioStyle.module.css";
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

export function Categories(props) {
  const categories = Array.from(props.catSet);

  const handleSupMenu = (e) => {
    const dropdown = e.target.parentNode.childNodes[1];
    console.log(dropdown.style.display);
    if (dropdown.style.display === "none" || !dropdown.style.display) {
      dropdown.style.display = "block";
      setTimeout(() => {
        dropdown.style.transform = "translateY(0)";
        dropdown.style.height = "70%";
        e.target.style.height = "30%";
      }, 100);
    } else if (dropdown.style.display === "block") {
      dropdown.style.transform = "translateY(-100%)";
      dropdown.style.height = "0";
      e.target.style.height = "100%";
      setTimeout(() => {
        dropdown.style.display = "none";
      }, 100);
    }
  };

  const list = categories.map((p, idx) => (
    <div className={categoriesStyles.catDropdown} key={idx}>
      <button className={categoriesStyles.catBtn} onClick={handleSupMenu}>
        <div className={categoriesStyles.BTNContent}>{p}</div>
      </button>
      <div className={categoriesStyles.SupMenuWrapper}>
        <div id="myDropdown" className={categoriesStyles.catSupMenu}>
          <Link>Cat 1</Link>
          <Link>Cat 2</Link>
          <Link>Cat 3</Link>
          <Link>
            See More <i className="fa-solid fa-arrow-right"></i>
          </Link>
        </div>
      </div>
    </div>
  ));
  return (
    <>
      <div id="wrap" className={categoriesStyles.catMenu}>
        {list}
      </div>
    </>
  );
}
