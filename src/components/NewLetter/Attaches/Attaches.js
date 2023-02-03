import { useTranslation } from "react-i18next";
import { AttachIcon } from "../../Icons";
import { uploadFile } from "../utils";
import styles from "./Attaches.module.css";

export const Attaches = ({ attaches, onChange }) => {
  const { t } = useTranslation();

  const handleUploadFile = (e) => {
    const file = e.target.files?.[0];
    uploadFile(file).then((response) => {
      if (response.url) {
        onChange?.("attaches", [...attaches, response.url]);
      }
    });
  };

  const handleRemove = (file) => {
    onChange?.(
      "attaches",
      attaches.filter((item) => item !== file)
    );
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.addButton}>
        <AttachIcon /> {t("compose.attaches.add")}
        <input
          type="file"
          value=""
          onChange={handleUploadFile}
          accept="image/*"
        />
      </div>

      <div className={styles.files}>
        {attaches.map((file) => (
          <div key={file} className={styles.fileWrapper}>
            <img className={styles.file} src={file} alt="" />
            <button
              type="button"
              className={styles.removeFile}
              onClick={() => handleRemove(file)}
            >
              &times;
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
