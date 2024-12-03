import React, { useState } from "react";
import { useLanguage } from '../context/LanguageContext';

function PhotoUploader() {
  const { language } = useLanguage();
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const translations = {
    en: {
      uploadScreenshot: "Upload Screenshot",
      chooseFile: "Choose file",
      uploading: "Sharing warm words...",
      upload: "Upload",
      pleaseSelectFile: "Please select a file.",
      thankYou: "Thank you for sharing warmth",
      error: "Error:",
      uploadFailed: "Upload failed:"
    },
    ko: {
      uploadScreenshot: "스샷 업로드",
      chooseFile: "파일 선택",
      uploading: "따뜻함 전달 중...",
      upload: "업로드",
      pleaseSelectFile: "파일을 선택해주세요.",
      thankYou: "따뜻함이 전달 되었어요",
      error: "오류:",
      uploadFailed: "업로드 실패:"
    }
  };

  const t = translations[language];

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setMessage(t.pleaseSelectFile);
      return;
    }

    setLoading(true);
    const reader = new FileReader();
    reader.onloadend = async () => {
      try {
        const base64File = reader.result.split(",")[1];
        const response = await fetch("https://script.google.com/macros/s/AKfycbyNX1Hsc8etQZKp6tT1nPVQD0d6WDwP9fuZrm7C0AUw2KF7dnaRINbbZV-cIQFK9dZ7KQ/exec", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            file: base64File,
            filename: file.name,
            mimeType: file.type,
          }),
        });

        const result = await response.json();
        if (result.success) {
          setMessage(t.thankYou);
        } else {
          setMessage(`${t.error} ${result.message}`);
        }
      } catch (error) {
        setMessage(`${t.uploadFailed} ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-base mb-4">{t.uploadScreenshot}</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {!loading ? (
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleFileChange} 
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        ) : (
          <p className="text-center text-gray-500">{t.uploading}</p>
        )}
        <button 
          type="submit" 
          className="w-full py-2 px-4 bg-[#4f9065] text-white rounded-lg hover:bg-[#395e45] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          {t.upload}
        </button>
      </form>
      {message && <p className="mt-4 text-center text-red-500">{message}</p>}
    </div>
  );
}

export default PhotoUploader;