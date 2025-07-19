
import React, { useState } from 'react';
import './App.css';

interface ShortenedUrl {
  shortCode: string;
  originalUrl: string;
  shortUrl: string;
}

function App() {
  const [url, setUrl] = useState('');
  const [alias, setAlias] = useState('');
  const [shortenedUrl, setShortenedUrl] = useState<ShortenedUrl | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;

    setLoading(true);
    setError('');
    setShortenedUrl(null);

    try {
      const response = await fetch('/api/shorten', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          originalUrl: url,
          alias: alias || undefined 
        }),
      });

      if (!response.ok) {
        throw new Error('Ошибка при сокращении URL');
      }

      const data = await response.json();
      setShortenedUrl({
        shortCode: data.shortCode,
        originalUrl: data.originalUrl,
        shortUrl: `${window.location.origin}/${data.shortCode}`
      });
      setUrl('');
      setAlias('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Произошла ошибка');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (shortenedUrl) {
      navigator.clipboard.writeText(shortenedUrl.shortUrl);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>🔗 Сокращатель URL</h1>
        
        <form onSubmit={handleSubmit} className="url-form">
          <div className="input-group">
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Введите URL для сокращения"
              required
              disabled={loading}
            />
          </div>
          
          <div className="input-group">
            <input
              type="text"
              value={alias}
              onChange={(e) => setAlias(e.target.value)}
              placeholder="Псевдоним (необязательно)"
              disabled={loading}
            />
          </div>
          
          <button type="submit" disabled={loading || !url}>
            {loading ? 'Сокращаем...' : 'Сократить URL'}
          </button>
        </form>

        {error && (
          <div className="error">
            ❌ {error}
          </div>
        )}

        {shortenedUrl && (
          <div className="result">
            <h3>✅ URL успешно сокращен!</h3>
            <div className="url-result">
              <p><strong>Оригинальный URL:</strong> {shortenedUrl.originalUrl}</p>
              <p><strong>Короткий URL:</strong> 
                <span className="short-url">{shortenedUrl.shortUrl}</span>
                <button onClick={copyToClipboard} className="copy-btn">
                  📋 Копировать
                </button>
              </p>
            </div>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
