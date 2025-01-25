const footerLinks = [
  { name: 'Company', href: '#' },
  { name: 'Jobs', href: '#' },
  { name: 'Press', href: '#' },
  { name: 'Investor relations', href: '#' },
  { name: 'Mobile apps - searching on the go', href: '#' },
  { name: 'trivago Business Studio', href: '#' },
  { name: 'Affiliate', href: '#' },
  { name: 'Help', href: '#' },
  { name: 'Learn how trivago works', href: '#' },
  { name: 'Terms and conditions', href: '#' },
  { name: 'Legal information', href: '#' },
  { name: 'Do not sell my personal information', href: '#' },
  { name: 'Privacy notice', href: '#' },
  { name: 'DSA information', href: '#' },
  { name: 'Cyber Security', href: '#' },
];

const FooterLinks = () => {
  return (
    <div className="text-white">
      <div className="grid grid-cols-2 gap-1 text-[14px]">
        {footerLinks.map((category) => (
          <div key={category.name}>
            <ul className="space-y-1">
              <li>
                <a className="whitespace-nowrap" href={category.href}>
                  {category.name}
                </a>
              </li>
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FooterLinks;
