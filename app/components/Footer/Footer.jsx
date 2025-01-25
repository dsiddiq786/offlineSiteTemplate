'use client';
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaLinkedinIn,
} from 'react-icons/fa6';
import { TbBrandX } from 'react-icons/tb';

import CountrySelect from './components/CountrySelect';
import FooterLinks from './components/FooterLinks';
import NewsletterSubscription from './components/NewsLetterSubscription';

import { TrivagoLogo } from '@/public/icons/icons';

const Footer = () => {
  return (
    <footer className="bg-[#171717] px-6 py-5 pb-10">
      <div className="container mx-auto max-w-5xl">
        {/* Logo and social links */}
        <div className="mb-[24px] flex w-full items-center justify-between">
          <div>
            <a href="#" rel="noopener noreferrer">
              <TrivagoLogo />
            </a>
          </div>
          <div className="flex items-center gap-2">
            {[
              { icon: <FaFacebookF className="text-sm" />, link: '#' },
              { icon: <TbBrandX className="text-sm" />, link: '#' }, // Twitter (X)
              { icon: <FaInstagram className="text-sm" />, link: '#' },
              { icon: <FaYoutube className="text-sm" />, link: '#' },
              { icon: <FaLinkedinIn className="text-sm" />, link: '#' },
            ].map((item, index) => (
              <a
                key={index}
                className="flex h-5 w-5 items-center justify-center rounded-full bg-white"
                href={item.link}
                rel="noopener noreferrer"
                target="_blank"
              >
                {item.icon}
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <div>
            <CountrySelect />
          </div>
          <div className="flex w-full flex-col items-center gap-6 lg:flex-row">
            <FooterLinks />
            <div className="grow">
              <NewsletterSubscription />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
