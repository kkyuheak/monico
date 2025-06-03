interface PostData {
  id: number;
  created_at: string | Date;
  title: string;
  description: string;
  hashTags: string[];
  images: string[];
  user_id: string;
  usersinfo: UserInfoType;
  likes: string[];
  coin_post_comments: CoinPostComment[];
}

interface CoinPostComment {
  id: string;
  postId: number;
  userId: string;
  content: string;
  usersinfo: UserInfoType;
  created_at: string | Date;
}
