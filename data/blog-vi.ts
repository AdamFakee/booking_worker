import { resumeDataVi } from './resume-vi';

export const blogPostsVi = resumeDataVi.projects.map((project, index) => ({
    id: (index + 1).toString(),
    title: `Xây dựng ${project.name}: Hành trình với ${project.tech.split(',')[0]}`,
    summary: project.description,
    content: `
# ${project.name}

${project.description}

## Tổng quan
Dự án này là một phần quan trọng trong hành trình phát triển kỹ năng **${project.tech.split(',')[0]}** của tôi. Trong quá trình xây dựng **${project.name}**, tôi đã tập trung vào việc tạo ra một kiến trúc sạch, dễ bảo trì và tối ưu hiệu suất.

## Kỹ thuật đã áp dụng
- **Công nghệ chính:** ${project.tech}
- **Thử thách:** Quản lý state phức tạp và đảm bảo hiệu năng mượt mà trên các thiết bị cũ.
- **Giải pháp:** Sử dụng các best practice mới nhất của cộng đồng và tối ưu hóa render.

## Kết quả đạt được
Ứng dụng đã hoàn thành với đầy đủ các tính năng cốt lõi và nhận được phản hồi tích cực từ cộng đồng/giảng viên.

Dự án này đã giúp tôi cải thiện đáng kể kỹ năng phát triển ứng dụng di động và khả năng giải quyết vấn đề. Xem mã nguồn dự án tại [GitHub](${project.repo}).
    `,
    tags: project.tech.split(',').map(t => t.trim()),
    repo: project.repo,
    date: project.period.split('–')[0].trim() || "2024"
}));
