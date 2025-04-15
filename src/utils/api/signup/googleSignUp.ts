import { supabase } from "@/lib/supabase/supabase";

export const googleSignUp = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: { redirectTo: "/" },
  });
  console.log(data);
  if (error) {
    console.error(error);
    return;
  }
};
