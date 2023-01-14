import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { createPopper } from "@popperjs/core";
import { Icon } from "./FiltersIcon";
import { FilterItem } from "./FiltersItem";
import { Portal } from "../../../Portal";
import { ChevronDownIcon } from "../../../Icons";
import { useFilters } from "../../../../store";
import styles from "./Filters.module.css";

const popperOptions = {
  placement: "bottom-end",
  modifiers: [
    {
      name: "offset",
      options: {
        offset: [8, 8],
      },
    },
  ],
};

const getCaption = (selected) => {
  if (selected.length === 0) return "filters.filter";
  if (selected.length > 1) return "filters.filters";
  if (selected.includes("unread")) return "filters.unread";
  if (selected.includes("bookmark")) return "filters.bookmark";
  if (selected.includes("attaches")) return "filters.attaches";
  return "filters.filter";
};

export const Filters = () => {
  const { t } = useTranslation();
  const [selected, toggle, reset] = useFilters();

  const [opened, setOpened] = useState(false);

  const handleClick = () => setOpened((prev) => !prev);

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

  const toggleFilter = (value) => () => {
    toggle(value);
    setOpened(false);
  };

  const resetFilter = () => {
    reset();
    setOpened(false);
  };

  useEffect(() => {
    const handler = (event) => {
      if (tooltip.current && button.current) {
        if (
          tooltip.current.contains(event.target) ||
          button.current.contains(event.target)
        )
          return;
        setOpened(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  return (
    <>
      <button
        className={styles.filterButton}
        type="button"
        onClick={handleClick}
        ref={button}
      >
        {selected.includes("unread") && <Icon name="unread" />}
        {selected.includes("bookmark") && <Icon name="bookmark" />}
        {selected.includes("attaches") && <Icon name="attaches" />}
        {t(getCaption(selected))} <ChevronDownIcon />
      </button>

      {opened && (
        <Portal>
          <div className={styles.filterItems} ref={tooltip}>
            <FilterItem
              checked={selected.length === 0}
              onClick={resetFilter}
              title={t("filters.allLetters")}
            />

            <FilterItem
              checked={selected.includes("unread")}
              onClick={toggleFilter("unread")}
              icon="unread"
              title={t("filters.unread")}
            />

            <FilterItem
              checked={selected.includes("bookmark")}
              onClick={toggleFilter("bookmark")}
              icon="bookmark"
              title={t("filters.bookmark")}
            />

            <FilterItem
              checked={selected.includes("attaches")}
              onClick={toggleFilter("attaches")}
              icon="attaches"
              title={t("filters.attaches")}
            />

            {selected.length > 0 && (
              <>
                <div className={styles.filterDivider}></div>
                <FilterItem onClick={resetFilter} title={t("filters.reset")} />
              </>
            )}
          </div>
        </Portal>
      )}
    </>
  );
};
