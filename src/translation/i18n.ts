import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpBackend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(HttpBackend) // Tải tệp dịch từ server hoặc cục bộ
  .use(LanguageDetector) // Tự động phát hiện ngôn ngữ
  .use(initReactI18next) // Tích hợp với React
  .init({
    fallbackLng: "en", // Ngôn ngữ mặc định nếu không tìm thấy
    debug: true, // Hiện log debug (bỏ khi triển khai thực tế)
    interpolation: {
      escapeValue: false, // React đã bảo vệ XSS nên không cần escape
    },
    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.json", // Đường dẫn tới file JSON dịch
    },
  });

export default i18n;
