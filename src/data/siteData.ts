export interface SiteData {
  name: string;
  title: string;
  tagline: string;
  bio: string;
  skills: string[];
  projects: Project[];
  posts: Post[];
  social: SocialLink[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  link?: string;
  image?: string;
}

export interface Post {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

export const siteData: SiteData = {
  name: 'Mr.L',
  title: '全栈开发者 & 设计师',
  tagline: '用代码创造美好，用设计点亮生活',
  bio: `我是一名热爱技术的全栈开发者，专注于构建现代化的 Web 应用程序。从前端的用户界面设计到后端的系统架构，我热衷于将复杂的想法转化为简洁优雅的解决方案。

在过去的几年里，我参与了多个大型项目的开发，积累了丰富的经验。我相信好的产品源于对细节的极致追求，无论是代码质量还是用户体验，我都力求做到最好。

当我不在写代码的时候，你可能会发现我在探索新的技术栈、阅读技术博客，或者在咖啡馆里思考下一个创新项目。`,
  skills: [
    'React', 'TypeScript', 'Node.js', 'Python',
    'Tailwind CSS', 'PostgreSQL', 'MongoDB', 'Docker',
    'AWS', 'GraphQL', 'Next.js', 'Vue.js'
  ],
  projects: [
    {
      id: '1',
      title: '智能电商平台',
      description: '基于微服务架构的现代化电商解决方案，支持高并发处理、智能推荐系统和实时数据分析。日处理订单超过10万单，用户满意度达到98%。',
      tags: ['React', 'Node.js', 'PostgreSQL', 'Redis', 'Docker'],
      link: 'https://github.com',
    },
    {
      id: '2',
      title: 'AI 内容生成器',
      description: '利用 GPT 技术实现的智能内容创作工具，可以自动生成文章、社交媒体内容和营销文案。支持多语言和多种内容风格定制。',
      tags: ['Next.js', 'Python', 'OpenAI API', 'Tailwind CSS'],
      link: 'https://github.com',
    },
    {
      id: '3',
      title: '协作式白板应用',
      description: '实时协作的白板工具，支持多人同时编辑、无限画布和丰富的绘图工具。集成了音视频通话功能，适合远程团队协作。',
      tags: ['Vue.js', 'Socket.io', 'Canvas API', 'WebRTC'],
      link: 'https://github.com',
    },
    {
      id: '4',
      title: '个人财务管理 App',
      description: '简洁直观的财务管理应用，支持多账户管理、自动预算规划和投资组合追踪。注重数据安全和隐私保护。',
      tags: ['React Native', 'TypeScript', 'Firebase', 'Charts'],
      link: 'https://github.com',
    },
  ],
  posts: [
    {
      id: '1',
      title: '关于生活的思考与记录',
      excerpt: '生活中的每一个瞬间都值得被记录。今天我想分享一些最近的想法和感悟，希望能给你带来一点启发。',
      date: '2024年1月15日',
      readTime: '5 分钟',
      category: '生活随笔'
    },
    {
      id: '2',
      title: '探索编程的艺术',
      excerpt: '编程不仅仅是写代码，更是一种创造性的表达。让我们一起探索其中的奥秘，发现技术之美。',
      date: '2024年1月10日',
      readTime: '8 分钟',
      category: '技术分享'
    },
    {
      id: '3',
      title: '阅读带来的改变',
      excerpt: '最近读完了几本书，每一本都给我带来了不同的启发。想和大家分享一下阅读的快乐。',
      date: '2024年1月5日',
      readTime: '6 分钟',
      category: '读书笔记'
    },
    {
      id: '4',
      title: '旅行的意义',
      excerpt: '去年去了几个地方，看到了不一样的风景，也遇到了有趣的人。记录下这些美好的回忆。',
      date: '2023年12月28日',
      readTime: '7 分钟',
      category: '旅行日记'
    },
  ],
  social: [
    {
      name: 'GitHub',
      url: 'https://github.com',
      icon: 'github',
    },
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com',
      icon: 'linkedin',
    },
    {
      name: 'Twitter',
      url: 'https://twitter.com',
      icon: 'twitter',
    },
    {
      name: 'Email',
      url: 'mailto:hello@example.com',
      icon: 'mail',
    },
  ],
};
