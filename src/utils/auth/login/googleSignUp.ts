import { supabase } from "@/lib/supabase/supabase";

export const googleSignUp = async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: { redirectTo: "http://localhost:3000" },
  });
  if (error) {
    console.error(error);
    return;
  }
};
