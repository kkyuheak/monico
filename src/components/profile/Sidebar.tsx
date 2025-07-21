"use client";

import { Inbox, Settings, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { twMerge } from "tailwind-merge";

const SIDEBAR_ITEMS = [
  { label: "프로필", href: "/profile", icon: User },
  {
    label: "내 글",
    href: "/profile/posts?category=coin&page=1",
    icon: Inbox,
  },
  { label: "설정", href: "/profile/settings", icon: Settings },
];

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <div className="w-[250px] h-[calc(100vh-53px)] border-r border-gray-200 dark:border-gray-800 py-6">
      <ul className="flex flex-col gap-2 py-2 px-1">
        {SIDEBAR_ITEMS.map((item) => (
          <li key={item.label} className="">
            <Link
              href={item.href}
              className={twMerge(
                "flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700",
                pathname === item.href.split("?")[0]
                  ? "bg-gray-100 dark:bg-gray-700"
                  : ""
              )}
            >
              <item.icon size={20} />
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
