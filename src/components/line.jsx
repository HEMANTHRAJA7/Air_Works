import React from "react";
import Logo from "../assets/logo_only.png";


const Line = () => {
  const textItems = [
    "lorem ipsum",
    "lorem ipsum",
    "lorem ipsum",
    "lorem ipsum",
    "lorem ipsum",
    "lorem ipsum",
    "lorem ipsum",
  ];

  return (
    <div className="container mt-0 lg:mt-4 overflow-hidden">
      <div className="border rounded-lg p-4">
        <div className="line4 flex gap-8 p-6">
          {[...textItems, ...textItems].map((text, index) => (
            <React.Fragment key={index}>
              <h3 className="my-0 mx-2 whitespace-nowrap font-display text-2xl font-semibold leading-7">
                {text}
              </h3>
              {index !== textItems.length * 2 - 1 && (
                <img className="h-[30px] w-[50px]" src={Logo} alt="Logo" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Line;
