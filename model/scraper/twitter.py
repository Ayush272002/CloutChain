import tweepy
import pandas as pd
import datetime
import os
from dotenv import load_dotenv

load_dotenv()

# Twitter API credentials
BEARER_TOKEN = os.getenv("X_BEARER_TOKEN")

print(BEARER_TOKEN)

# Initialize Tweepy client
client = tweepy.Client(bearer_token=BEARER_TOKEN)

# Query for fetching tweets about Zora Coin
query = "ZoraAI OR #ZoraAI OR Zora Coin -is:retweet lang:en"

# Fetch latest 100 tweets
tweets = client.search_recent_tweets(query=query, tweet_fields=["created_at", "public_metrics"], max_results=100)

# Store tweets in a list
tweet_data = []

for tweet in tweets.data:
    tweet_data.append({
        "timestamp": tweet.created_at,
        "tweet_text": tweet.text,
        "retweets": tweet.public_metrics["retweet_count"],
        "likes": tweet.public_metrics["like_count"],
    })

# Convert to DataFrame
df = pd.DataFrame(tweet_data)

# Save to CSV file
csv_filename = f"zora_tweets_{datetime.datetime.now().strftime('%Y-%m-%d_%H-%M-%S')}.csv"
df.to_csv(csv_filename, index=False, encoding="utf-8")

print(f"✅ Saved {len(df)} tweets to {csv_filename}")
