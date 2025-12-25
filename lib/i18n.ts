import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { resumeDataEn, resumeDataVi, blogPostsEn, blogPostsVi } from '../data';

// Translations
const resources = {
  en: {
    translation: {
      nav: {
        home: "Home",
        resume: "Resume",
        blog: "Blog",
        contact: "Contact",
        hireMe: "Hire Me"
      },
      hero: {
        greeting: "Hello, I'm",
        role: "FLUTTER DEVELOPER INTERN",
        downloadCV: "View Resume",
        contactMe: "Contact Me",
        description: "Final-year IT student specializing in <1>Flutter</1> and <3>Cross-platform Development</3>. Passionate about building intuitive mobile applications and creating seamless user experiences. Always eager to learn modern technologies and contribute to innovative projects."
      },
      headers: {
        featuredProjects: "Featured Projects",
        viewAllProjects: "View all projects",
        technicalSkills: "Technical Arsenal",
        professionalProjects: "Professional Projects",
        education: "Education",
        getInTouch: "Get in Touch",
        sendMessage: "Send a Message",
        phone: "Phone",
        email: "Email",
        address: "Address",
        sourceCode: "Source Code"
      },
      resume: resumeDataEn,
      blog: blogPostsEn
    }
  },
  vi: {
    translation: {
      nav: {
        home: "Trang chủ",
        resume: "Hồ sơ",
        blog: "Bài viết",
        contact: "Liên hệ",
        hireMe: "Thuê tôi"
      },
      hero: {
        greeting: "Xin chào, tôi là",
        role: "THỰC TẬP SINH LẬP TRÌNH FLUTTER",
        downloadCV: "Xem Hồ Sơ",
        contactMe: "Liên hệ",
        description: "Sinh viên năm cuối CNTT chuyên về <1>Flutter</1> và <3>Phát triển Đa nền tảng</3>. Đam mê xây dựng các ứng dụng di động trực quan và tạo ra trải nghiệm người dùng mượt mà. Luôn sẵn sàng học hỏi công nghệ mới và đóng góp vào các dự cá sáng tạo."
      },
      headers: {
        featuredProjects: "Dự án Nổi bật",
        viewAllProjects: "Xem tất cả dự án",
        technicalSkills: "Kỹ năng Kỹ thuật",
        professionalProjects: "Dự án Chuyên môn",
        education: "Học vấn",
        getInTouch: "Liên hệ",
        sendMessage: "Gửi tin nhắn",
        phone: "Điện thoại",
        email: "Email",
        address: "Địa chỉ",
        sourceCode: "Mã nguồn"
      },
      resume: resumeDataVi,
      blog: blogPostsVi
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en", // default language
    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    }
  });

export { i18n };
export default i18n;
