// import { useState, useEffect, useRef } from "react";
import { BilboardADS } from "./components/billboardADS";
import { Categories } from "./components/categories";
import { TopRatedProducts } from "./components/topRatedProducts";
import { DiscountedProducts } from "./components/discountedProduct";
import { BrandSection } from "./components/brands";

import homeStyles from "../cssModules/homePage.module.css";

export default function Home() {
  return (
    <div className={`${homeStyles.homeContainer}`}>
      <BilboardADS />
      {/* <div className={homeStyles.firstWrapper}>
        <section id={"billboardADS"} className={`${homeStyles.bbADS} ads`}>
        </section>
        <aside className={homeStyles.categories}>
          <Categories />
        </aside>
      </div>

      <section id={"discountedProducts"} className={homeStyles.section}>
        <TopRatedProducts />
      </section>
      <section id={"popularProducts"} className={homeStyles.section}>
        <DiscountedProducts />
      </section>
      <section id={"brands"} className={homeStyles.section}>
        <BrandSection />
      </section> */}
    </div>
  );
}
