import os
import json
import requests
import pandas as pd

base_dir = os.path.join(os.path.dirname(__file__), '..', 'ML')

df_big = pd.read_csv(os.path.join(base_dir, 'Coin.csv'))
df_coin = pd.read_csv(os.path.join(base_dir, 'Coin_new.csv'))
example_post = df_big.loc[0].copy()

# Replace NaN in string columns with empty strings
df_coin_clean = df_coin.copy().fillna('')
example_post_clean = example_post.copy().fillna('')

# Convert DataFrame to JSON-friendly format
payload = {
    "example_post": example_post_clean.to_dict(),
    "coin_data": df_coin_clean.to_dict(orient="records") 
}

# print(payload)
payload_json = json.dumps(payload, indent=4)

# Print the JSON string
print(payload_json)

# response = requests.post("http://127.0.0.1:5000/predict", json=payload)
# print(response)