'use client';
import {
  IconRecentViewed,
  IconFavorites,
  IconLocalization,
  IconMenu,
  IconLogin,
} from '../../public/icons/icons';

// Example usage

export default function Header() {
  return (
    <>
      <div className="border-b border-gray-300">
        <header className="container mx-auto flex max-w-5xl flex-col items-center px-4 sm:flex-row sm:justify-between">
          {/* Logo */}
          <a
            aria-label="trivago logo"
            className="flex items-center space-x-2"
            href="#"
            title="trivago logo"
          >
            <img
              alt=""
              className="mt-4 h-full w-full sm:mt-0"
              loading="lazy"
              src="/images/logo/trivago-logo.svg"
            />
          </a>
          {/* Navigation */}
          <nav className="flex flex-wrap items-center sm:flex-nowrap">
            {/* Recently Viewed */}
            <button className="flex items-center gap-2 px-5 py-4 text-[14px] hover:bg-[#f2f2f1]">
              <IconRecentViewed />
              <span>Recently viewed</span>
            </button>
            {/* Favorites */}
            <button className="flex items-center gap-2 px-5 py-4 text-[14px] hover:bg-[#f2f2f1]">
              <IconFavorites />
              <span>Favorites</span>
            </button>
            {/* Language and Currency */}
            <button className="flex items-center gap-2 px-5 py-4 text-[14px] hover:bg-[#f2f2f1]">
              <IconLocalization />
              <span>EN · $</span>
            </button>
            {/* Login */}
            <button className="flex items-center gap-2 px-5 py-4 text-[14px] hover:bg-[#f2f2f1]">
              <IconLogin />
              <span>Log in</span>
            </button>
            {/* Menu */}
            <button className="flex items-center gap-2 px-5 py-4 text-[14px] hover:bg-[#f2f2f1]">
              <IconMenu />
              <span>Menu</span>
            </button>
          </nav>
        </header>
      </div>
    </>
  );
}
