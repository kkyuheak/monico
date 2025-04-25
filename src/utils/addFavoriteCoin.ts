import { supabase } from "@/lib/supabase/supabase";

export const addFavoriteCoin = async (coinName: string) => {
  const { data: userData, error: userDataError } =
    await supabase.auth.getUser();
  console.log(userData);

  if (userDataError) {
    console.error(userDataError);
    return;
  }

  const { id } = userData.user;

  const { data: userTable, error: userTableError } = await supabase
    .from("usersinfo")
    .select("favorite")
    .eq("id", id)
    .single();

  if (userTableError) {
    console.error(userTableError);
    return;
  }

  console.log(userTable);

  const updateFavorite = [...userTable.favorite, coinName];

  const { data: updateUserTable, error: updateUserTableError } = await supabase
    .from("usersinfo")
    .update({ favorite: updateFavorite })
    .eq("id", id)
    .single();

  if (updateUserTableError) {
    console.error(updateUserTableError);
    return;
  }
  console.log(updateUserTable);
};
