import { supabase } from "@/lib/supabase/supabase";

export const checkFavoriteCoin = async () => {
  const { data: userData, error: userDataError } =
    await supabase.auth.getUser();

  if (userData.user === null) {
    return null;
  }

  if (userDataError) {
    console.error(userDataError);
    return;
  }

  const { id } = userData.user;

  const { data: userFavoriteCoin, error: userFavoriteCoinError } =
    await supabase.from("usersinfo").select("favorite").eq("id", id).single();

  if (userFavoriteCoinError) {
    console.error(userFavoriteCoinError);
    return;
  }

  return userFavoriteCoin.favorite;
};
