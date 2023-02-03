import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDropzone } from "react-dropzone";
import { useNavigate } from "react-router-dom";
import { Head } from "./Head";
import { Attaches } from "./Attaches";
import { Editor } from "./Editor";
import { Footer } from "./Footer";
import styles from "./NewLetter.module.css";
import { uploadFile } from "./utils";
import { addLetter } from "../../api";

export const NewLetter = () => {
  const { t } = useTranslation();

  const [data, setData] = useState({
    to: "",
    subject: "",
    attaches: [],
    content: "",
  });

  const handleChange = (field, value) => {
    setData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const { getRootProps, isDragActive } = useDropzone({
    noClick: true,
    accept: {
      "image/*": [],
    },
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles?.[0];
      uploadFile(file).then((response) => {
        if (response.url) {
          setData((prev) => ({
            ...prev,
            attaches: [...prev.attaches, response.url],
          }));
        }
      });
    },
  });

  const navigate = useNavigate();
  const [isSubmitting, setSubmitting] = useState(false);
  const handleSubmit = async (folder) => {
    if (isSubmitting) return;
    setSubmitting(true);
    await addLetter(data, folder);
    navigate("/" + folder);
  };

  return (
    <div {...getRootProps({ className: styles.wrapper })}>
      <div className={styles.content}>
        <div className={styles.top}>
          {isDragActive && (
            <div className={styles.dropZone}>{t("compose.dropZoneText")}</div>
          )}
          <Head onChange={handleChange} />
          <Attaches attaches={data.attaches} onChange={handleChange} />
        </div>
        <Editor onChange={handleChange} />
        <Footer
          isSubmitting={isSubmitting}
          onSend={() => handleSubmit("sent")}
          onSave={() => handleSubmit("drafts")}
        />
      </div>
    </div>
  );
};
