import { useState, useEffect, useRef } from "react";

import BBADSStyles from "../../cssModules/sectioStyle.module.css";

interface Item {
  thumbnail: number;
}

export function BilboardADS() {
  const products: unknown[] = [];
  // props.ads
  //   .sort((a: number, b: number) => a.rating - b.rating)
  //   .reverse();

  const topItems = products.slice(0, 5);

  const [transition, setTransition] = useState<number>(0);
  const lastItm: number = topItems.length - 1;

  const handleCahngeAD = (direction: string) => {
    if (direction === "next") {
      if (transition === lastItm * -100) {
        setTransition(0);
      } else {
        setTransition(transition - 100);
      }
    }
    if (direction === "prev") {
      if (transition === 0) {
        setTransition(lastItm * -100);
      } else {
        setTransition(transition + 100);
      }
    }

    console.log(lastItm * -100);
  };
  // const handleAutoChangeAD = () => {
  useEffect(() => {
    setTimeout(() => {
      if (transition || transition !== lastItm * -100) {
        setTransition(transition - 100);
      } else if (transition === lastItm * -100) {
        setTransition(0);
      }
    });
  }, []);
  // };

  return (
    <>
      <div
        className={`flex flex-row border-2 border-red-200`}
        // onLoad={handleAutoChangeAD}
      >
        {topItems.map((p: any, idx: number) => (
          <div
            key={idx}
            className={`
                      text-white 
                      w-full 
                      h-[400px] 
                      z-3 
                      flex flex-row flex-grow-0 flex-shrink-0
                      transition-all duration-1000 ease-in-out 
                      `}
            style={{ transform: `translateX(${transition}%)` }}
          >
            <div className={BBADSStyles.ADImgs} id={"imgContainer"}>
              <img
                // key={ADItems[AD].id}
                className={BBADSStyles.img}
                src={p.thumbnail}
                // style={transition}
              />
              <p className={`${BBADSStyles.ADPara}`}>{p.description}</p>
              <button className={`${BBADSStyles.seeMoreBtn}`}>
                See More <i className="fa-solid fa-arrow-right"></i>
              </button>
            </div>
          </div>
        ))}
      </div>
      <button
        className={`${BBADSStyles.BBprevBtn}`}
        onClick={() => handleCahngeAD("prev")}
      >
        <i className="fa-solid fa-arrow-left"></i>
      </button>
      <button
        className={`${BBADSStyles.BBnextBtn}`}
        onClick={() => handleCahngeAD("next")}
      >
        <i className="fa-solid fa-arrow-right"></i>
      </button>
    </>
  );
}
