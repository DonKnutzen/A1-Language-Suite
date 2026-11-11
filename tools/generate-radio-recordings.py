"""Generate checked-in MP3s from public, authored texts; no TTS service is used at playback.

Requires edge-tts 7.3.1. First run build-radio-recordings.cjs with a temporary JSON
output path, then pass that path and a temporary chunk-cache directory here.
"""
import asyncio
import hashlib
import json
from pathlib import Path
import sys
import edge_tts

ROOT = Path(__file__).resolve().parent.parent
VOICES = {'fr': {'female': 'fr-FR-DeniseNeural', 'male': 'fr-FR-HenriNeural'},
          'de': {'female': 'de-DE-KatjaNeural', 'male': 'de-DE-ConradNeural'},
          'en': {'female': 'en-GB-SoniaNeural', 'male': 'en-GB-RyanNeural'}}

async def main():
    jobs = json.loads(Path(sys.argv[1]).read_text(encoding='utf-8'))
    cache = Path(sys.argv[2]); cache.mkdir(parents=True, exist_ok=True)
    semaphore = asyncio.Semaphore(6)
    locks = {}
    completed = 0

    async def generate(job):
        nonlocal completed
        target = ROOT / 'shared/audio/radio' / job['file']
        if target.exists() and target.stat().st_size > 1000:
            completed += 1
            return
        chunks = []
        for turn in job['turns']:
            voice = VOICES[job['lang'][:2]][turn.get('gender', 'female')]
            # Speak dialogue text only; A/B are visual speaker labels.
            text = turn['text']
            chunk = cache / (hashlib.sha256((voice+'|'+text).encode()).hexdigest()+'.mp3')
            async with locks.setdefault(str(chunk), asyncio.Lock()):
                if not chunk.exists():
                    async with semaphore:
                        for attempt in range(4):
                            try:
                                temp = chunk.with_suffix('.part')
                                await edge_tts.Communicate(text, voice).save(str(temp))
                                if temp.stat().st_size < 1000:
                                    raise RuntimeError('Empty audio')
                                temp.replace(chunk)
                                break
                            except Exception:
                                if attempt == 3:
                                    raise
                                await asyncio.sleep(2*(attempt+1))
            chunks.append(chunk.read_bytes())
        target.parent.mkdir(parents=True, exist_ok=True)
        target.write_bytes(b''.join(chunks))
        completed += 1
        if completed % 8 == 0 or completed == len(jobs):
            print(json.dumps({'completed': completed, 'total': len(jobs)}), flush=True)

    await asyncio.gather(*(generate(job) for job in jobs))

asyncio.run(main())
