'use client';

import Link from 'next/link';
import './globals.css';
import { usePathname } from 'next/navigation';

export default function Layout({ children }) {
    const pathname = usePathname();
    const navItems = [
        { name: 'Home', path: '/' },
        { name: 'Harem List Generator', path: '/mudaelistharem' },
        { name: 'Series List Generator', path: '/mudaelistseries' },
        { name: 'Harem Note Generator', path: '/mudaenote' },
        { name: 'Tax Calculator', path: '/mudaetax' },
    ];
    return (
        <>
            <nav className="nav-bar">
                <ul className="nav-list">
                    {navItems.map((item, index) => (
                        <li key={index} className={pathname === item.path ? 'active' : ''}>
                            <Link href={item.path}>{item.name}</Link>
                        </li>
                    ))}
                </ul>
            </nav>
            {children}
            <footer className="footer-bar">
                <p className="copyright">Powered By BidenJr © Copyright 2025</p>
            </footer>
        </>
    );
}
