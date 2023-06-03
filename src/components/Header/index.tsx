import Link from 'next/link';
import { useState } from 'react';

import s from './Header.module.scss';

import Container from '@/components/layouts/Container';
import Switch from '@/components/Switch';

const links = [
  { href: '/', label: 'Styles' },
  { href: '/', label: 'Components' },
  { href: '/login', label: 'login' },
];

export default function Header() {
  const [isDark, setIsDark] = useState(false);



  const handleThemeChange = () => {
    setIsDark(!isDark);
  };


  return (
    <header className={`${s.Header} ${isDark ? s.Dark : ''}`}>
      <Container>
        <Link href='/'>
          Logo
        </Link>
        <nav>
          <ul>
            {links.map(({ href, label }) => (
              <li key={`${href}${label}`}>
                <Link href={href}>{label}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <Switch
          labelText=''
          labelA='Light Mode'
          labelB='Dark Mode'
          id='themeToggle'
          onClick={handleThemeChange}
        />
      </Container>
    </header>
  );
}
