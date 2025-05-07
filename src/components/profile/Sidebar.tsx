"use client";

import { Inbox, Settings, User } from "lucide-react";
import Link from "next/link";

const SIDEBAR_ITEMS = [
  { label: "프로필", href: "/profile", icon: User },
  { label: "내 글", href: "/profile/posts", icon: Inbox },
  { label: "설정", href: "/profile/settings", icon: Settings },
];

const Sidebar = () => {
  return (
    <div className="w-[300px] h-[calc(100vh-53px)] bg-gray-200">
      <ul className="flex flex-col gap-2 py-2 px-1">
        {SIDEBAR_ITEMS.map((item) => (
          <li key={item.label} className="">
            <Link
              href={item.href}
              className="flex items-center gap-2 bg-amber-50 p-2 rounded-md hover:bg-amber-100"
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
