import os
import json
import requests
from dotenv import load_dotenv

load_dotenv()  # Carga las variables de entorno desde .env

GROQ_API_KEY = os.getenv("GROQ_API_KEY")

def crear_prompt(batallas, modos_juego, objetivo):
    resumen = f"Tengo {len(batallas)} partidas recientes en Clash Royale.\n"
    resumen += f"Modos seleccionados: {', '.join(modos_juego)}.\n"
    resumen += f"Objetivo del análisis: {objetivo}.\n\n"
    
    victorias = 0
    derrotas = 0

    for i, batalla in enumerate(batallas, 1):
        tipo = batalla.get('type', 'Desconocido').capitalize()
        mi_nombre = batalla.get('team', [{}])[0].get('name', 'Yo')
        oponente = batalla.get('opponent', [{}])[0].get('name', 'Oponente')
        mis_coronas = batalla.get('team', [{}])[0].get('crowns', 0)
        coronas_opp = batalla.get('opponent', [{}])[0].get('crowns', 0)

        resultado = "Victoria" if mis_coronas > coronas_opp else "Derrota"
        if resultado == "Victoria":
            victorias += 1
        else:
            derrotas += 1

        resumen += (
            f"Partida {i} - Tipo: {tipo}, Resultado: {resultado}, "
            f"{mi_nombre} {mis_coronas} - {coronas_opp} {oponente}\n"
        )

    resumen += f"\nResumen general: {victorias} victorias y {derrotas} derrotas.\n"
    resumen += "¿Qué estoy haciendo bien y qué podría mejorar en mi forma de jugar PvP? Dame sugerencias claras y concretas, por favor."
    print(resumen)  # Para depuración, puedes comentar esta línea si no es necesaria
    print("-----")  # Separador para facilitar la lectura en los logs
    return resumen


def analizar_batallas(batallas, modos_juego, objetivo):
    if not batallas:
        return {"error": "No se encontraron batallas para analizar."}

    prompt = crear_prompt(batallas, modos_juego, objetivo)

    url = "https://api.groq.com/openai/v1/chat/completions"
    headers = {
        "Authorization": f"Bearer {GROQ_API_KEY}",
        "Content-Type": "application/json"
    }

    body = {
        "model": "meta-llama/llama-4-scout-17b-16e-instruct",  # Puedes probar otros modelos si deseas
        "messages": [
            {
                "role": "system",
                "content": (
                    "Eres un analista experto de partidas de Clash Royale. "
                    "Tu tarea es analizar las batallas recientes del jugador, considerando los modos de juego seleccionados "
                    "y el objetivo que tiene el jugador para mejorar. Sólo muestra una sugerencia de no más de 100 caracteres"
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
