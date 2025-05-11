import { supabase } from "@/lib/supabase/supabase";

export const getUserInfo = async () => {
  const { data: getUser, error: getUserError } = await supabase.auth.getUser();
  if (getUserError) {
    console.error(getUserError);
    return;
  }

  const { id: userId } = getUser.user;

  const { data: userInfo, error: userInfoError } = await supabase
    .from("usersinfo")
    .select("*")
    .eq("id", userId)
    .single();

  if (userInfoError) {
    console.error(userInfoError);
    return;
  }

  return userInfo;
};
