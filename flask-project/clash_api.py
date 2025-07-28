# Reemplaza este token con tu token real de Clash Royale
import os
import requests

API_TOKEN = f'Bearer {os.getenv("API_TOKEN")}'

def fetch_from_clashroyale_api(endpoint: str):
    headers = {
        "Authorization": API_TOKEN
    }
    url = f"https://api.clashroyale.com/v1/{endpoint}"
    return requests.get(url, headers=headers)
