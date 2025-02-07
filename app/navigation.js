import Link from 'next/link';
import './globals.css';

export default function Layout({ children }) {
    return (
        <>
            <nav className="nav-bar">
                <ul className="nav-list">
                    <li>
                        <Link href={'/'}>Home</Link>
                    </li>
                    <li>
                        <Link href={'/mudaelistharem'}>Harem List Generator</Link>
                    </li>
                    <li>
                        <Link href={'/mudaelistseries'}>Series List Generator</Link>
                    </li>
                    <li>
                        <Link href={'/mudaetax'}>Tax Calculator</Link>
                    </li>
                </ul>
            </nav>
            {children}
        </>
    );
}
