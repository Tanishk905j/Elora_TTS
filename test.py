import edge_tts
import asyncio
import json

async def main():
    # Read text from JSON
    with open("data.json", "r", encoding="utf-8") as f:
        data = json.load(f)

    text = data.get("text", "Hello, I am Ava.")
    output_file = "ava_voice.mp3"
    voice = "en-US-AvaMultilingualNeural"

    tts = edge_tts.Communicate(text, voice)
    await tts.save(output_file)
    # print(f"✅ Saved voice to {output_file}")

asyncio.run(main())
