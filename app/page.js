import Link from 'next/link';

export default function Home() {
    return (
        <div className="home-wrapper">
            <h1>Mudae Utility Homepage</h1>
            <Link href={'/mudaelist'}>To Mudae List Generator</Link>
            <Link href={'/mudaetax'}>To Mudae Tax Calculator</Link>
        </div>
    );
}
