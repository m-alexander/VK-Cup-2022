import { useTranslation } from "react-i18next";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import "@ckeditor/ckeditor5-build-classic/build/translations/ru";
import LocalUploadAdapter from "./LocalUploadAdapter";
import styles from "./Editor.module.css";

export const Editor = ({ onChange }) => {
  const { i18n } = useTranslation();

  const handleChange = (event, editor) => {
    const data = editor.getData();
    onChange?.("content", data);
  };

  const config = {
    language: i18n.language,
    extraPlugins: [LocalUploadAdapter],
  };

  return (
    <div className={styles.wrapper}>
      <CKEditor
        data=""
        onChange={handleChange}
        config={config}
        editor={ClassicEditor}
      />
    </div>
  );
};
