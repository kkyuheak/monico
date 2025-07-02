import { supabase } from "@/lib/supabase/supabase";

export const googleSignUp = async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: { redirectTo: "https://monico.vercel.app" },
  });
  if (error) {
    console.error(error);
    return;
  }
};
