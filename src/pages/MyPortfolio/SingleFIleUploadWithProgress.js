import React, { useEffect, useState } from "react";
import LinearProgressWithLabel from "../../components/ProgressWithLabel/ProgressWithLabel";
import FileHeader from "./FileHeader";

const SingleFIleUploadWithProgress = ({
  file,
  rejectedFile,
  onDelete,
  onFileUpload,
  slider,
}) => {
  const [progress, setProgress] = useState(0);
  const [url, setUrl] = useState("");

  // const { token } = useSelector((state) => state.user);

  useEffect(() => {
    async function upload() {
      const url = await uploadFile(file, setProgress);
      setUrl(url);
      onFileUpload(url, file);
    }

    upload();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <FileHeader
        file={file}
        onDelete={onDelete}
        progress={progress}
        url={url}
        slider={slider}
      />
      {progress < 100 && <LinearProgressWithLabel value={progress} />}
      {/* <hr /> */}
    </div>
  );
};

export default SingleFIleUploadWithProgress;

function uploadFile(file, onProgress) {
  const url = "https://api-dev.solruf.com/api/upload";
  // const key = 'docs_upload_example_us_preset';

  return new Promise((res, rej) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", url);
    const token = localStorage.getItem("token");
    xhr.setRequestHeader("authorization", `Bearer ${token}`);
    xhr.onload = function () {
      const response = JSON.parse(xhr.responseText);
      console.log(response);
      res(response.file_url);
    };

    xhr.onerror = (e) => rej(e);

    xhr.upload.onprogress = function (e) {
      if (e.lengthComputable) {
        const percentage = Math.floor((e.loaded / e.total) * 100);
        onProgress(percentage);
      }
    };

    const formData = new FormData();
    formData.append("file", file);
    // formData.append('upload_preset', key);

    xhr.send(formData);
  });
}
