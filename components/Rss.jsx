'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Rss({ xml }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  let document = null;
  if (typeof window !== 'undefined') {
    document = new DOMParser().parseFromString(xml, 'text/xml');
  }

  let articles = [];

  if (document) {
    const item = document.querySelectorAll('item');
    for (let i = 0; i < 5; i++) {
      const title = item[i].querySelector('title').textContent;
      const description = item[i].querySelector('description').textContent;
      const link = item[i].querySelector('link').textContent;
      const pubDate = item[i].querySelector('pubDate').textContent;
      const guid = item[i].querySelector('guid').textContent;
      const image = item[i].querySelector('enclosure').getAttribute('url');
      articles.push({ title, description, link, pubDate, guid, image });
    }
  }
  return (
    <>
      {isClient && (
        <div>
          {articles?.map((article) => (
            <Link key={article.guid} href={article.link}>
              <h2>{article.title}</h2>
              <p className="text-slate-500">{article.description}</p>
              <p>{article.pubDate}</p>
              <img src={article.image} alt="" />
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
