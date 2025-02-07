import Link from 'next/link';
import Layout from './navigation';

export default function Home() {
    const linkItems = [
        { name: 'Harem List Generator', path: '/mudaelistharem' },
        { name: 'Series List Generator', path: '/mudaelistseries' },
        { name: 'Tax Calculator', path: '/mudaetax' },
        { name: 'Harem Note Generator', path: '/mudaenote' },
    ];

    return (
        <Layout>
            <div className="wrapper home-wrapper">
                <h1>Mudae Utility Homepage</h1>
                {linkItems.map((item, index) => (
                    <Link key={index} href={item.path}>{`To Mudae ${item.name}`}</Link>
                ))}
            </div>
        </Layout>
    );
}
