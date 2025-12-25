import { useAuth } from '@/context/AuthContext';
import React, { createContext, ReactNode, useContext, useState } from 'react';

// Define types
export interface Comment {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  content: string;
  timestamp: string;
  replies?: Comment[];
  parentId?: string;
  role: 'customer' | 'worker';
}

export interface Post {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  content: string;
  images?: string[];
  video?: string;
  timestamp: string;
  likes: number;
  isLiked: boolean;
  comments: Comment[];
}

interface PostContextType {
  posts: Post[];
  addPost: (content: string, images?: string[], video?: string) => void;
  addComment: (postId: string, content: string, parentId?: string) => void;
  likePost: (postId: string) => void;
}

const PostContext = createContext<PostContextType | undefined>(undefined);

// Mock initial data
const INITIAL_POSTS: Post[] = [
  {
    id: '1',
    userId: 'user1',
    userName: 'Nguyễn Văn A',
    userAvatar: 'https://i.pravatar.cc/150?u=user1',
    content: 'Giáng sinh vui vẻ nhé cả nhà! 🎄🎅',
    images: ['https://images.unsplash.com/photo-1543589077-47d81606c1bf?q=80&w=3387&auto=format&fit=crop'],
    timestamp: '2 giờ trước',
    likes: 12,
    isLiked: false,
    comments: [
      {
        id: 'c1',
        userId: 'user2',
        userName: 'Trần Thị B',
        userAvatar: 'https://i.pravatar.cc/150?u=user2',
        content: 'Đẹp quá bạn ơi!',
        timestamp: '1 giờ trước',
        replies: [],
        role: 'customer',
      }
    ],
  },
  {
    id: '2',
    userId: 'user3',
    userName: 'Lê Văn C',
    userAvatar: 'https://i.pravatar.cc/150?u=user3',
    content: 'Hôm nay trời đẹp quá, đi cafe thôi nào.',
    timestamp: '5 giờ trước',
    likes: 5,
    isLiked: false,
    comments: [],
  },
  {
    id: '3',
    userId: 'worker1',
    userName: 'Gara Ô tô Tuấn Phát',
    userAvatar: 'https://i.pravatar.cc/150?u=worker1',
    content: 'Chia sẻ kinh nghiệm: Khi xe có tiếng kêu lạ ở gầm, các bác nên kiểm tra ngay hệ thống treo và rô-tuyn nhé. Đừng để lâu hỏng nặng thêm! 🚗🔧',
    images: ['https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?q=80&w=3272&auto=format&fit=crop'],
    timestamp: '1 ngày trước',
    likes: 45,
    isLiked: true,
    comments: [
      {
        id: 'c2',
        userId: 'user4',
        userName: 'Phạm Minh D',
        userAvatar: 'https://i.pravatar.cc/150?u=user4',
        content: 'Cảm ơn bác chia sẻ, xe em cũng đang bị kêu lục cục.',
        timestamp: '20 giờ trước',
        replies: [
          {
            id: 'c3',
            userId: 'worker1',
            userName: 'Gara Ô tô Tuấn Phát',
            userAvatar: 'https://i.pravatar.cc/150?u=worker1',
            content: 'Mang qua bên mình kiểm tra miễn phí cho nhé!',
            timestamp: '19 giờ trước',
            replies: [],
            role: 'worker',
            parentId: 'c2',
          }
        ],
        role: 'customer',
      }
    ],
  },
  {
    id: '4',
    userId: 'user5',
    userName: 'Hoàng Mai E',
    userAvatar: 'https://i.pravatar.cc/150?u=user5',
    content: 'Cần tìm thợ sửa điện nước khu vực Cầu Giấy gấp ạ! Ống nước nhà em bị vỡ. 🆘',
    timestamp: '30 phút trước',
    likes: 2,
    isLiked: false,
    comments: [
      {
        id: 'c4',
        userId: 'worker2',
        userName: 'Điện Nước Nam Việt',
        userAvatar: 'https://i.pravatar.cc/150?u=worker2',
        content: 'Chào bạn, bên mình có thợ gần đó, bạn check inbox nhé.',
        timestamp: '10 phút trước',
        replies: [],
        role: 'worker',
      }
    ],
  },
  {
    id: '5',
    userId: 'worker3',
    userName: 'Spa Xe Hơi Luxury',
    userAvatar: 'https://i.pravatar.cc/150?u=worker3',
    content: 'Hoàn thiện gói phủ Ceramic cho em Mercedes C300. Bóng loáng như gương! ✨✨✨',
    images: ['https://images.unsplash.com/photo-1601362840469-51e4d8d58785?q=80&w=3300&auto=format&fit=crop'],
    timestamp: '3 giờ trước',
    likes: 89,
    isLiked: false,
    comments: [],
  },
  {
    id: '6',
    userId: 'user6',
    userName: 'Nguyễn Thu Hà',
    userAvatar: 'https://i.pravatar.cc/150?u=user6',
    content: 'Mọi người cho mình hỏi khu vực Thanh Xuân có bác nào vệ sinh điều hòa uy tín không ạ? Nhà mình 3 máy lâu chưa vệ sinh.',
    timestamp: '4 giờ trước',
    likes: 8,
    isLiked: false,
    comments: [
      {
        id: 'c5',
        userId: 'worker4',
        userName: 'Điện Lạnh Bách Khoa',
        userAvatar: 'https://i.pravatar.cc/150?u=worker4',
        content: 'Bên mình chuyên vệ sinh bảo dưỡng điều hòa khu vực Thanh Xuân nhé. Giá 150k/máy, bao sạch + nạp gas bổ sung.',
        timestamp: '3 giờ trước',
        replies: [],
        role: 'worker',
      },
      {
        id: 'c6',
        userId: 'user6',
        userName: 'Nguyễn Thu Hà',
        userAvatar: 'https://i.pravatar.cc/150?u=user6',
        content: 'Dạ vâng để em inbox bác ạ.',
        timestamp: '3 giờ trước',
        replies: [],
        role: 'customer',
        parentId: 'c5',
      }
    ],
  },
  {
    id: '7',
    userId: 'worker5',
    userName: 'Dịch Vụ Vệ Sinh 24h',
    userAvatar: 'https://i.pravatar.cc/150?u=worker5',
    content: 'Thành quả sau 4 tiếng dọn dẹp căn hộ 3 phòng ngủ cho khách 🧹✨. Nhà cửa sạch bong kin kít, khách chỉ việc vào ở! Ai cần dọn nhà đón Tết sớm liên hệ em nhé.',
    images: ['https://images.unsplash.com/photo-1581578731117-104f2a41272c?q=80&w=3270&auto=format&fit=crop'],
    timestamp: '6 giờ trước',
    likes: 56,
    isLiked: false,
    comments: [],
  },
  {
    id: '8',
    userId: 'worker6',
    userName: 'Khóa Sài Gòn',
    userAvatar: 'https://i.pravatar.cc/150?u=worker6',
    content: '🚨 Cứu hộ mở khóa 24/7. \nAnh khách đi làm về quên chìa khóa trong nhà, may mà em đến kịp. 15 phút là xong ngay!',
    images: ['https://images.unsplash.com/photo-1622350616198-5c468a4879d7?q=80&w=3401&auto=format&fit=crop'],
    timestamp: '12 giờ trước',
    likes: 23,
    isLiked: true,
    comments: [
      {
        id: 'c7',
        userId: 'user7',
        userName: 'Lê Tuấn',
        userAvatar: 'https://i.pravatar.cc/150?u=user7',
        content: 'Lưu số bác lại phòng khi cần!',
        timestamp: '10 giờ trước',
        replies: [],
        role: 'customer',
      }
    ],
  },
  {
    id: '9',
    userId: 'user8',
    userName: 'Phan Văn Hưng',
    userAvatar: 'https://i.pravatar.cc/150?u=user8',
    content: 'Cảm ơn bác thợ mộc @Mộc Đức đã đóng cho em bộ kệ sách quá ưng ý! Gỗ đẹp, chắc chắn mà giá lại hạt dẻ. 👍👍👍',
    images: ['https://images.unsplash.com/photo-1595428774223-ef52624120d2?q=80&w=3000&auto=format&fit=crop'],
    timestamp: '1 ngày trước',
    likes: 102,
    isLiked: false,
    comments: [
      {
        id: 'c8',
        userId: 'worker7',
        userName: 'Mộc Đức',
        userAvatar: 'https://i.pravatar.cc/150?u=worker7',
        content: 'Cảm ơn bác Hưng đã tin tưởng ủng hộ ạ! Cần gì cứ ới em nhé.',
        timestamp: '23 giờ trước',
        replies: [],
        role: 'worker',
      }
    ],
  },
  {
    id: '10',
    userId: 'worker8',
    userName: 'Sửa Chữa Điện Máy Xanh',
    userAvatar: 'https://i.pravatar.cc/150?u=worker8',
    content: 'Máy giặt rung lắc mạnh, kêu to? Đừng chủ quan, có thể do giảm sóc hoặc trục bị hỏng. \nCase sáng nay: Thay bộ quang treo mới là máy lại êm ru. 🛠️',
    timestamp: '8 giờ trước',
    likes: 34,
    isLiked: false,
    comments: [],
  },
  {
    id: '11',
    userId: 'user9',
    userName: 'Đỗ Thị Minh',
    userAvatar: 'https://i.pravatar.cc/150?u=user9',
    content: 'Mình đang muốn sơn lại phòng ngủ khoảng 20m2. Có bác nào nhận làm không báo giá giúp mình với ạ. Mình cần sơn màu trắng kem.',
    timestamp: '2 giờ trước',
    likes: 5,
    isLiked: false,
    comments: [
      {
        id: 'c9',
        userId: 'worker9',
        userName: 'Sơn Nhà Trọn Gói',
        userAvatar: 'https://i.pravatar.cc/150?u=worker9.jpg',
        content: 'Chào chị, chị check tin nhắn chờ em tư vấn loại sơn và chi phí nhé.',
        timestamp: '1 giờ trước',
        replies: [],
        role: 'worker',
      }
    ],
  },
];

export const PostProvider = ({ children }: { children: ReactNode }) => {
  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS);
  const { role } = useAuth();

  // Mock current user - in a real app this would come from AuthContext
  const CURRENT_USER = {
    id: 'current_user',
    name: role === 'worker' ? 'Thợ Máy' : 'Tôi',
    avatar: 'https://i.pravatar.cc/150?u=me',
    role: role || 'customer',
  };

  const addPost = (content: string, images?: string[], video?: string) => {
    const newPost: Post = {
      id: Date.now().toString(),
      userId: CURRENT_USER.id,
      userName: CURRENT_USER.name,
      userAvatar: CURRENT_USER.avatar,
      content,
      images,
      video,
      timestamp: 'Vừa xong',
      likes: 0,
      isLiked: false,
      comments: [],
    };
    setPosts([newPost, ...posts]);
  };

  const addCommentToTree = (comments: Comment[], parentId: string, newComment: Comment): Comment[] => {
    return comments.map(comment => {
      if (comment.id === parentId) {
        return {
          ...comment,
          replies: [...(comment.replies || []), newComment]
        };
      }
      if (comment.replies && comment.replies.length > 0) {
        return {
          ...comment,
          replies: addCommentToTree(comment.replies, parentId, newComment)
        };
      }
      return comment;
    });
  };

  const addComment = (postId: string, content: string, parentId?: string) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        const newComment: Comment = {
          id: Date.now().toString(),
          userId: CURRENT_USER.id,
          userName: CURRENT_USER.name,
          userAvatar: CURRENT_USER.avatar,
          content,
          timestamp: 'Vừa xong',
          replies: [],
          parentId,
          role: CURRENT_USER.role as 'customer' | 'worker',
        };

        if (parentId) {
          return {
            ...post,
            comments: addCommentToTree(post.comments, parentId, newComment)
          };
        }

        return {
          ...post,
          comments: [...post.comments, newComment]
        };
      }
      return post;
    }));
  };

  const likePost = (postId: string) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          likes: post.isLiked ? post.likes - 1 : post.likes + 1,
          isLiked: !post.isLiked
        };
      }
      return post;
    }));
  };

  return (
    <PostContext.Provider value={{ posts, addPost, addComment, likePost }}>
      {children}
    </PostContext.Provider>
  );
};

export const usePosts = () => {
  const context = useContext(PostContext);
  if (!context) {
    throw new Error('usePosts must be used within a PostProvider');
  }
  return context;
};
