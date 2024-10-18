import { useEffect, useState } from "react";

export default function SideDropDownCart({ ShowCart }) {
  const [translateX, setTranslateX] = useState("-100%");

  useEffect(() => {
    if (ShowCart) {
      setTranslateX("0");
    } else {
      setTranslateX("-100%");
    }
  }, [ShowCart]);

  return (
    <div
      className={`h-screen md:w-1/3 w-1/2 bg-white fixed top-0 left-0 z-[100] transition-transform duration-300`}
      style={{ transform: `translateX(${translateX})` }}
    >
      hello
    </div>
  );
}
