import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Post {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  content: string;
}

interface PostsState {
  posts: Post[];
  addPost: (post: Omit<Post, 'id' | 'date' | 'readTime'>) => void;
  deletePost: (id: string) => void;
}

const initialPosts: Post[] = [
  {
    id: '1',
    title: '关于生活的思考与记录',
    excerpt: '生活中的每一个瞬间都值得被记录。今天我想分享一些最近的想法和感悟，希望能给你带来一点启发。',
    date: '2024年1月15日',
    readTime: '5 分钟',
    category: '生活随笔',
    content: '生活中的每一个瞬间都值得被记录。今天我想分享一些最近的想法和感悟，希望能给你带来一点启发。\n\n生活中有很多美好的瞬间，我们要学会去发现和珍惜...',
  },
  {
    id: '2',
    title: '探索编程的艺术',
    excerpt: '编程不仅仅是写代码，更是一种创造性的表达。让我们一起探索其中的奥秘，发现技术之美。',
    date: '2024年1月10日',
    readTime: '8 分钟',
    category: '技术分享',
    content: '编程不仅仅是写代码，更是一种创造性的表达。让我们一起探索其中的奥秘，发现技术之美。\n\n编程是一门艺术...',
  },
  {
    id: '3',
    title: '阅读带来的改变',
    excerpt: '最近读完了几本书，每一本都给我带来了不同的启发。想和大家分享一下阅读的快乐。',
    date: '2024年1月5日',
    readTime: '6 分钟',
    category: '读书笔记',
    content: '最近读完了几本书，每一本都给我带来了不同的启发。想和大家分享一下阅读的快乐。\n\n阅读可以改变我们的生活...',
  },
  {
    id: '4',
    title: '旅行的意义',
    excerpt: '去年去了几个地方，看到了不一样的风景，也遇到了有趣的人。记录下这些美好的回忆。',
    date: '2023年12月28日',
    readTime: '7 分钟',
    category: '旅行日记',
    content: '去年去了几个地方，看到了不一样的风景，也遇到了有趣的人。记录下这些美好的回忆。\n\n旅行让我们的生活更加丰富多彩...',
  },
];

export const usePosts = create<PostsState>()(
  persist(
    (set, get) => ({
      posts: initialPosts,

      addPost: (post) => {
        const newPost: Post = {
          ...post,
          id: Date.now().toString(),
          date: new Date().toLocaleDateString('zh-CN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          }),
          readTime: `${Math.ceil(post.content.length / 100)} 分钟`,
        };

        set((state) => ({
          posts: [newPost, ...state.posts],
        }));
      },

      deletePost: (id) => {
        set((state) => ({
          posts: state.posts.filter((p) => p.id !== id),
        }));
      },
    }),
    {
      name: 'posts-storage',
    }
  )
);
