import Rss from '@/components/Rss';

export default async function Home() {
  const data = await fetch('https://www.jaegerforbundet.dk/rss/', {
    cache: 'no-store',
  });
  const xml = await data.text();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Rss xml={xml} />
    </main>
  );
}
