import { Link } from "react-router-dom";
import XIcon from "../assets/icons/XIcon.svg";
import facebookIcon from "../assets/icons/facebookIcon.svg";
import InstaIcon from "../assets/icons/instagramIcon.svg";

export default function Footer() {
  return (
    <footer
      className={`absolute 
                  -bottom-[20%] 
                  left-[0%] 
                  w-full 
                  bg-white 
                  p-5 
                  text-black
                  flex flex-row justify-between
        `}
    >
      <p>Copyright © 2024 ABC Inc</p>

      <div className={`flex flex-row`}>
        <Link to="https://www.facebook.com/" target="_blank">
          <img src={XIcon} width="20" height="29" className="ml-4 size-4 " />
        </Link>

        <Link to="https://www.facebook.com/" target="_blank">
          <img
            src={facebookIcon}
            width="20"
            height="29"
            className="ml-4 size-4 "
          />
        </Link>

        <Link to="https://www.facebook.com/" target="_blank">
          <img
            src={InstaIcon}
            width="20"
            height="29"
            className="ml-4 size-4 "
          />
        </Link>
      </div>
    </footer>
  );
}
