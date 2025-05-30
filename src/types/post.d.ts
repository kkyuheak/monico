interface PostData {
  id: number;
  created_at: string | Date;
  title: string;
  description: string;
  hashTags: string[];
  images: string[];
  user_id: string;
  usersinfo: UserInfoType;
}
