import { Instagram, Twitter, Facebook, Youtube } from 'lucide-react';

interface SocialMediaProps {
  className?: string;
}

export default function SocialMedia({ className = "" }: SocialMediaProps) {
  const socialLinks = [
    {
      name: 'Instagram',
      icon: Instagram,
      href: '#',
      ariaLabel: 'Follow us on Instagram'
    },
    {
      name: 'Twitter',
      icon: Twitter,
      href: '#',
      ariaLabel: 'Follow us on Twitter'
    },
    {
      name: 'Facebook',
      icon: Facebook,
      href: '#',
      ariaLabel: 'Follow us on Facebook'
    },
    {
      name: 'YouTube',
      icon: Youtube,
      href: '#',
      ariaLabel: 'Subscribe to our YouTube channel'
    }
  ];

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {socialLinks.map((social) => (
        <a
          key={social.name}
          href={social.href}
          aria-label={social.ariaLabel}
          className="text-[var(--secondary)] hover:text-[var(--foreground)] transition-colors duration-200 p-2 rounded-full hover:bg-[var(--neutral)]"
        >
          <social.icon size={20} />
        </a>
      ))}
    </div>
  );
}