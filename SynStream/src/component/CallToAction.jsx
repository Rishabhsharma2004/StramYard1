import React, { useEffect, useState } from 'react';

export default function CallToAction() {
  const [articles, setArticles] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await fetch('https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=2052932c911d4b5fad70de942a3b7ba8');
        const data = await res.json();
        if (!res.ok) {
          console.log(data.message);
          return;
        } else {
          setArticles(data.articles);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchArticles();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 3) % articles.length);
    }, 60000); // 60000ms = 1 minute
    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, [articles]);

  const currentArticles = articles.slice(currentIndex, currentIndex + 3);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Tech News</h1>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {currentArticles.length > 0 ? (
          currentArticles.map((article, index) => (
            <div key={index} className="max-w-sm rounded overflow-hidden shadow-lg">
              {article.urlToImage && (
                <img className="w-full h-48 object-cover" src={article.urlToImage} alt={article.title} />
              )}
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{article.title !== null && article.title.length > 40 ? `${article.title.substring(0, 40)}...` : article.title}</div>
                <p className="text-gray-700 text-base dark:text-gray-200">
                  {article.description !== null && article.description.length > 100 ? `${article.description.substring(0, 100)}...` : article.description}
                </p>
              </div>
              <div className="px-6 pt-4 pb-2 flex justify-between self-center">
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{article.author !== null && article.author.length > 10? `${article.author.substring(0,10)}...`: article.author}</span>
                <a href={article.url} target="_blank" rel="noopener noreferrer" className="inline-block bg-blue-500 rounded-full px-3 py-1 text-sm font-semibold text-white">Read more</a>
              </div>
            </div>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}
