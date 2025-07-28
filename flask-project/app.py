from flask import Flask, jsonify
from flask_cors import CORS
from clash_api import fetch_from_clashroyale_api

app = Flask(__name__)
CORS(app)  # permite peticiones desde localhost:3000

#Endpoint para obtener información de un jugador
@app.route('/players/<player_tag>', methods=['GET'])
def get_player(player_tag):
    tag_encoded = f"%23{player_tag.upper()}"
    response = fetch_from_clashroyale_api(f"players/{tag_encoded}")

    if response.status_code != 200:
        return jsonify({"error": "Jugador no encontrado"}), response.status_code

    data = response.json()
    return jsonify({
        "tag": data.get("tag"),
        "name": data.get("name"),
        "expLevel": data.get("expLevel")
    })

# Endpoint para obtener el registro de batallas de un jugador
@app.route('/players/<player_tag>/battlelog', methods=['GET'])
def get_battlelog(player_tag):
    tag_encoded = f"%23{player_tag.upper()}"
    response = fetch_from_clashroyale_api(f"players/{tag_encoded}/battlelog")

    if response.status_code != 200:
        return jsonify({"error": "No se pudo obtener el battlelog"}), response.status_code

    raw_battles = response.json()
    battles = []

    for b in raw_battles:
        try:
            battles.append({
                "type": b.get("type"),
                "battleTime": b.get("battleTime"),
                "gameMode": b.get("gameMode"),  # <-- objeto completo
                "arena": b.get("arena", {}).get("name"),
                "deckSelection": b.get("deckSelection"),
                "isLadderTournament": b.get("isLadderTournament"),
                "team": b.get("team"),
                "opponent": b.get("opponent")
            })
        except Exception as e:
            print(f"Error procesando batalla: {e}")
            continue

    return jsonify(battles)

if __name__ == '__main__':
    app.run(debug=True)
