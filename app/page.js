import Link from 'next/link';

export default function Home() {
    return (
        <div className="home-wrapper">
            <h1>Mudae Utility Homepage</h1>
            <Link href={'/mudaelistharem'}>To Mudae Harem List Generator</Link>
            <Link href={'/mudaelistseries'}>To Mudae Series List Generator</Link>
            <Link href={'/mudaetax'}>To Mudae Tax Calculator</Link>
        </div>
    );
}
