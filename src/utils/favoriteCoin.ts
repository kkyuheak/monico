import { supabase } from "@/lib/supabase/supabase";

export const favoriteCoin = async (
  coinName: string,
  type: "add" | "delete"
) => {
  const { data: userData, error: userDataError } =
    await supabase.auth.getUser();

  if (userData === null) return;

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

  const updateFavorite =
    type === "add"
      ? [...userTable.favorite, coinName]
      : userTable.favorite.filter((coin: string) => coin !== coinName);

  const { data: updateUserTable, error: updateUserTableError } = await supabase
    .from("usersinfo")
    .update({ favorite: updateFavorite })
    .eq("id", id)
    .select()
    .single();

  if (updateUserTableError) {
    console.error(updateUserTableError);
    return;
  }
  console.log(updateUserTable);
};
