from flask import Flask, jsonify, request
from flask_cors import CORS
from clash_api import fetch_from_clashroyale_api
from gpt import analizar_batallas

app = Flask(__name__)
CORS(app, origins=["*"])# permite peticiones desde localhost:3000

# Endpoint para obtener información de un jugador
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
                "gameMode": b.get("gameMode"),  # objeto completo
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

@app.route("/analizar", methods=["POST"])
def analizar():
    data = request.get_json()
    batallas = data.get("batallas", [])
    modos_juego = data.get("modos_juego", [])
    objetivo = data.get("objetivo", "mejorar-ataque")
    tipoSugerencia = data.get("tipoSugerencia", "tactica")
    analisisMazo = data.get("analisisMazo", "el-mas-usado")
    nivelAnalisis = data.get("nivelAnalisis", "lenguaje-simple")

    sugerencia = analizar_batallas(batallas, modos_juego, objetivo, tipoSugerencia, analisisMazo, nivelAnalisis)
    return jsonify({"sugerencia": sugerencia})



if __name__ == '__main__':
    app.run(debug=True)



