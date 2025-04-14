import requests
import pandas as pd
import time
import os
from dotenv import load_dotenv

load_dotenv()

NEWS_API_KEY = os.getenv("NEWS_API_KEY")
CRYPTO_PANIC_API_KEY = os.getenv("CRYPTO_PANIC_API_KEY")

# File paths
ALL_NEWS_CSV = "crypto_news_all.csv"
ZORA_NEWS_CSV = "crypto_news_zora.csv"

def fetch_cryptopanic_news(pages=5):
    all_articles = []
    for page in range(1, pages + 1):
        url = f"https://cryptopanic.com/api/v1/posts/?auth_token={CRYPTO_PANIC_API_KEY}&public=true&page={page}"
        try:
            response = requests.get(url)
            response.raise_for_status()
            articles = response.json().get("results", [])
            all_articles.extend([
                {
                    "source": "CryptoPanic",
                    "title": article.get("title", "No Title"),
                    "description": article.get("body", "No Description"),
                    "url": article.get("url", ""),
                    "timestamp": article.get("created_at", ""),
                }
                for article in articles
            ])
            if len(articles) < 100:
                break
        except Exception as e:
            print(f"Error fetching from CryptoPanic: {e}")
            break
    return all_articles

def fetch_reddit_news():
    subreddits = ["cryptocurrency", "CryptoMarkets", "altcoin", "CryptoMoonShots"]
    all_posts = []
    
    for subreddit in subreddits:
        url = f"https://www.reddit.com/r/{subreddit}/new.json?limit=100"
        headers = {"User-Agent": "Mozilla/5.0"}
        
        try:
            response = requests.get(url, headers=headers)
            response.raise_for_status()
            posts = response.json()["data"]["children"]
            all_posts.extend([
                {
                    "source": f"Reddit/{subreddit}",
                    "title": post["data"].get("title", "No Title"),
                    "description": post["data"].get("selftext", "No Description"),
                    "url": f"https://www.reddit.com{post['data'].get('permalink', '')}",
                    "timestamp": post["data"].get("created_utc", ""),
                }
                for post in posts
            ])
        except Exception as e:
            print(f"Error fetching from Reddit/{subreddit}: {e}")
    
    return all_posts

def filter_zora_news(all_news):
    return [
        article
        for article in all_news
        if "zora" in (article["title"] or "").lower()
        or "zora" in (article["description"] or "").lower()
    ]

def save_to_csv(news_data, filename):
    df = pd.DataFrame(news_data)
    df.to_csv(filename, index=False, mode="a", header=False)
    print(f"✅ Saved {len(news_data)} news articles to {filename}")

def main():
    print("📡 Fetching news from all sources...")
    news = fetch_cryptopanic_news(pages=5) + fetch_reddit_news()

    print(f"🔍 Found {len(news)} general crypto news articles.")

    # Save all news
    save_to_csv(news, filename=ALL_NEWS_CSV)

    # Filter & save Zora-specific news
    zora_news = filter_zora_news(news)
    print(f"📰 Found {len(zora_news)} Zora-related news articles.")

    if zora_news:
        save_to_csv(zora_news, filename=ZORA_NEWS_CSV)

    print("✅ News fetching complete!")

### 🔄 Run every hour 
if __name__ == "__main__":
    while True:
        main()
        print("⏳ Sleeping for 1 hour before next fetch...")
        time.sleep(3600)  # Fetch news every hour