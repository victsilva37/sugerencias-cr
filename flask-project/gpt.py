import os
import json
import requests
from dotenv import load_dotenv

load_dotenv()  # Carga las variables de entorno desde .env

GROQ_API_KEY = os.getenv("GROQ_API_KEY")

def crear_prompt(batallas_filtradas, modos_juego, objetivo, tipoSugerencia, analisisMazo, nivelAnalisis):
    resumen = f"Tengo {len(batallas_filtradas)} partidas recientes en Clash Royale.\n"
    resumen += f"Modos seleccionados: {', '.join(modos_juego)}.\n"
    resumen += f"Objetivo del análisis: {objetivo}.\n"
    resumen += f"Tipo de sugerencia: {tipoSugerencia}.\n"
    resumen += f"Análisis de mazos: {analisisMazo}.\n"
    resumen += f"Nivel de análisis: {nivelAnalisis}\n"
    
    victorias = 0
    derrotas = 0

    for i, batalla in enumerate(batallas_filtradas, 1):
        tipo = batalla.get('type', 'Desconocido')
        mi_nombre = batalla.get('team', [{}])[0].get('name', 'Yo')
        oponente = batalla.get('opponent', [{}])[0].get('name', 'Oponente')
        mis_coronas = batalla.get('team', [{}])[0].get('crowns', 0)
        coronas_opp = batalla.get('opponent', [{}])[0].get('crowns', 0)
        nombres_cartas = [carta.get("name") for carta in batalla.get("team", [{}])[0].get("cards", [])]

        resultado = "Victoria" if mis_coronas > coronas_opp else "Derrota"
        if resultado == "Victoria":
            victorias += 1
        else:
            derrotas += 1

        resumen += (
            f"Partida {i} - Tipo: {tipo}, Resultado: {resultado}, "
            f"{mi_nombre} {mis_coronas} - {coronas_opp} {oponente}\n"
            f"Cartas usadas: {nombres_cartas}\n"
        )

    resumen += f"\nResumen general: {victorias} victorias y {derrotas} derrotas.\n"
    resumen += "Dame UNA sugerencia concreta de mejora en 50 caracteres máximo."

    # ✅ Debug
    print(resumen)
    print("-----")
    
    return resumen


def analizar_batallas(batallas, modos_juego, objetivo, tipoSugerencia, analisisMazo, nivelAnalisis):
    if not batallas:
        return {"error": "No se encontraron batallas para analizar."}

    # 🔥 Normalizamos ambos a minúsculas para hacer coincidencias exactas
    modos_juego_normalizados = [m.lower() for m in modos_juego]
    batallas_filtradas = [b for b in batallas if b.get("type", "").lower() in modos_juego_normalizados]

    if not batallas_filtradas:
        return {"error": "No hay batallas que coincidan con los modos seleccionados."}

    prompt = crear_prompt(batallas_filtradas, modos_juego, objetivo, tipoSugerencia, analisisMazo, nivelAnalisis)

    url = "https://api.groq.com/openai/v1/chat/completions"
    headers = {
        "Authorization": f"Bearer {GROQ_API_KEY}",
        "Content-Type": "application/json"
    }

    body = {
        "model": "meta-llama/llama-4-scout-17b-16e-instruct",
        "messages": [
            {
                "role": "system",
                "content": (
                    "Eres un analista experto de Clash Royale. "
                    "Con base en las últimas batallas del jugador, da UNA sola sugerencia concreta. "
                    "Debe tener máximo 50 caracteres. Sin introducciones ni repeticiones. "
                    "Ve directo al punto y enfócate en el área indicada por el jugador."
                )
            },
            {
                "role": "user",
                "content": prompt
            }
        ],
        "temperature": 0.6
    }

    response = requests.post(url, headers=headers, json=body)

    if response.status_code != 200:
        return {"error": f"Error de la API: {response.status_code}", "detalle": response.text}

    data = response.json()
    return data['choices'][0]['message']['content']
