import { useEffect, useRef, useState } from "react";
import { createPopper } from "@popperjs/core";
import { AttachIcon } from "../../../Icons";
import { Portal } from "../../../Portal";
import styles from "./Attaches.module.css";

const popperOptions = {
  placement: "left",
  modifiers: [
    {
      name: "offset",
      options: {
        offset: [0, 4],
      },
    },
  ],
};

export const Attaches = ({ items }) => {
  const [opened, setOpened] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    setOpened((prev) => !prev);
  };

  const handleBlur = () => {
    setOpened(false);
  };

  const button = useRef();
  const tooltip = useRef();
  useEffect(() => {
    if (opened) {
      const popper = createPopper(
        button.current,
        tooltip.current,
        popperOptions
      );
      return () => popper.destroy();
    }
  }, [opened]);

  return (
    <div className={styles.wrapper}>
      <button
        onClick={handleClick}
        type="button"
        className={`${styles.button} ${opened ? styles.opened : ""}`}
        onBlur={handleBlur}
        ref={button}
      >
        <AttachIcon />
      </button>

      {opened && (
        <Portal>
          <div className={styles.dropdown} ref={tooltip}>
            {items.map((item, index) => (
              <div key={index} className={styles.item}>
                <img src={item.img} alt="" className={styles.previewSmall} />
                <span className={styles.name}>image_4.jpg 1.26 MB</span>

                <div className={styles.previewBig}>
                  <img src={item.img} alt="" loading="lazy" />
                </div>
              </div>
            ))}
          </div>
        </Portal>
      )}
    </div>
  );
};
