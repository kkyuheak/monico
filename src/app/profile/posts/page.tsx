import ProfilePosts from "@/components/profile/ProfilePosts";
import PostBoxSkeleton from "@/components/skeleton/PostBoxSkeleton";
import { Suspense } from "react";

const ProfilePostsPage = () => {
  return (
    <Suspense fallback={<PostBoxSkeleton />}>
      <ProfilePosts />
    </Suspense>
  );
};

export default ProfilePostsPage;
