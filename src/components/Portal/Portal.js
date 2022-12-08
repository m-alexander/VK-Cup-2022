import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export const Portal = ({ children }) => {
  const [container] = useState(() => document.createElement("div"));

  useEffect(() => {
    document.body.appendChild(container);
    return () => {
      document.body.removeChild(container);
    };
    // eslint-disable-next-line
  }, []);

  return createPortal(children, container);
};
