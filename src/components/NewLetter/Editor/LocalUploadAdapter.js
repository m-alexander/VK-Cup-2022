import { uploadFile } from "../utils";

class LocalUploadAdapter {
  constructor(loader) {
    // CKEditor 5's FileLoader instance.
    this.loader = loader;
  }

  // Starts the upload process.
  upload() {
    return this.loader.file.then((file) =>
      uploadFile(file).then((response) => {
        this.loader.uploaded = true;
        return { default: response.url };
      })
    );
  }
}

function LocalUploadAdapterPlugin(editor) {
  editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
    return new LocalUploadAdapter(loader);
  };
}

export default LocalUploadAdapterPlugin;
