import { createServerClient } from "@supabase/ssr";
import { NextRequest, NextResponse } from "next/server";

export const middleware = async (request: NextRequest) => {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { session },
  } = await supabase.auth.getSession();
  console.log(session);

  const pathname = request.nextUrl.pathname;

  // 로그인한 사용자가 로그인 또는 회원가입 페이지에 접근하면 홈으로 리디렉션
  if (
    session !== null &&
    (pathname.startsWith("/login") || pathname.startsWith("/signup"))
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // 로그인하지 않은 사용자가 보호된 페이지에 접근하면 로그인 페이지로 리디렉션
  if (
    !session &&
    (pathname.startsWith("/mypage") || pathname.endsWith("/favorite"))
  ) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // 유저의 즐겨찾기 페이지 접근 시 해당 유저인지 확인
  if (session !== null && pathname.endsWith("/favorite")) {
    const userId = pathname.split("/")[1];
    const { data: userData } = await supabase
      .from("usersinfo")
      .select("id")
      .eq("id", userId)
      .single();

    if (userData?.id !== session.user.id) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return supabaseResponse;
};

export const config = {
  matcher: ["/login", "/signup", "/mypage/:path*", "/:user/favorite"],
};
