import React from "react";
import { NavigationsDots, SocialMedia } from "../components";

const AppWrap = (Component: React.FC, idName: string, className: string = "") =>
  function HOC() {
    return (
      <div id={idName} className={` app__container ${className} `}>
        <SocialMedia />

        <div className="app__wrapper app__flex">
          <Component />

          <div className="copyright">
            <p className="p-text">@2022 MICAEL</p>
            <p className="p-text">All rights reseved</p>
          </div>
        </div>
        <NavigationsDots active={idName} />
      </div>
    );
  };

export default AppWrap;
