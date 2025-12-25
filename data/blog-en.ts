import { resumeDataEn } from './resume-en';

export const blogPostsEn = resumeDataEn.projects.map((project, index) => ({
    id: (index + 1).toString(),
    title: `Building ${project.name}: A Journey with ${project.tech.split(',')[0]}`,
    summary: project.description,
    date: project.period.split('–')[0].trim(), // Approximate date
    content: `
# Building ${project.name}

${project.description}

## Technical Challenges

In developing **${project.name}**, one of the main challenges was implementing efficient state management using **${project.tech}**. I had to ensure that data persistence was handled correctly, especially for the local features.

## Key Features

- **Robust Architecture**: Built with scalability in mind.
- **User-Centric Design**: Focused on intuitive UI/UX.
- **Performance**: Optimized for smooth 60fps animations.

## Conclusion

This project significantly improved my skills in mobile development and problem-solving. Check out the source code on [GitHub](${project.repo}).
    `,
    tags: project.tech.split(',').map(t => t.trim()),
    repo: project.repo // Add this line to explicitly pass the repo URL
}));
