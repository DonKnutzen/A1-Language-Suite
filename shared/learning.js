/* Gemeinsame Lernfunktionen. Keine Änderungen an Profil- oder Kurskennungen. */
(() => {
  function loadState(key, defaults) {
    const fresh = JSON.parse(JSON.stringify(defaults));
    try {
      const saved = JSON.parse(localStorage.getItem(key) || '{}');
      if (!saved || typeof saved !== 'object' || Array.isArray(saved)) return fresh;
      const state = {...saved, ...fresh};
      for (const [name, fallback] of Object.entries(fresh)) {
        const value = saved[name];
        if (Array.isArray(fallback) && Array.isArray(value)) {
          state[name] = [...new Set(value.filter(v => typeof v === 'string' || (typeof v === 'number' && Number.isFinite(v))))];
        } else if (fallback && typeof fallback === 'object' && value && typeof value === 'object' && !Array.isArray(value)) {
          state[name] = value;
        } else if (typeof fallback === 'number' && typeof value === 'number' && Number.isFinite(value)) {
          state[name] = value;
        } else if (typeof fallback === 'boolean' && typeof value === 'boolean') {
          state[name] = value;
        }
      }
      return state;
    } catch { return fresh; }
  }

  function shuffle(items) {
    const result = [...items];
    for (let i = result.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
  }

  function countWords(text) {
    return String(text || '').trim().split(/\s+/).filter(word => /[\p{L}\p{N}]/u.test(word)).length;
  }

  let current = null;
  const urls = new Map();
  function cleanup() {
    if (current && (!current.start.isConnected || !current.playback.isConnected)) {
      const old = current;
      current = null;
      old.abandoned = true;
      if (old.recorder && old.recorder.state !== 'inactive') old.recorder.stop();
      old.stream?.getTracks().forEach(track => track.stop());
    }
    for (const [container, url] of urls) {
      if (!container.isConnected) { URL.revokeObjectURL(url); urls.delete(container); }
    }
  }

  function wireRecorder(id, onRecorded, labels, onUnavailable) {
    const start = document.getElementById('startRec' + id);
    const stop = document.getElementById('stopRec' + id);
    const status = document.getElementById('recStatus' + id);
    const playback = document.getElementById('playback' + id);
    if (!start || !stop || !status || !playback) return;
    // Optional self-confirmation for the skill practice menus, including devices without a microphone.
    if(onRecorded && labels.manual){
      const manual=document.createElement('details');manual.className='recorder-selfcheck';
      const summary=document.createElement('summary');summary.textContent=labels.manual;
      const hint=document.createElement('p');hint.className='muted';hint.textContent=labels.manualHint;
      const label=document.createElement('label');label.className='lesson-check';
      const check=document.createElement('input');check.type='checkbox';
      const span=document.createElement('span');span.textContent=labels.manualCheck;label.append(check,span);
      const button=document.createElement('button');button.className='soft-btn';button.type='button';button.disabled=true;button.textContent=labels.manualDone;
      check.onchange=()=>button.disabled=!check.checked;
      button.onclick=()=>{if(!check.checked)return;onRecorded();button.disabled=true;status.textContent=labels.manualDone;};
      manual.append(summary,hint,label,button);playback.after(manual);
    }
    if (!navigator.mediaDevices?.getUserMedia || !window.MediaRecorder) {
      start.onclick = () => { status.textContent = labels.unavailable; if (onUnavailable) onUnavailable('unavailable'); };
      return;
    }
    start.onclick = async () => {
      cleanup();
      if (current) return;
      const session = {start, playback, abandoned:false, stream:null, recorder:null};
      current = session;
      start.disabled = true;
      try {
        const stream = await navigator.mediaDevices.getUserMedia({audio:true});
        session.stream = stream;
        if (session.abandoned || !start.isConnected || current !== session) {
          stream.getTracks().forEach(track => track.stop());
          if (current === session) current = null;
          return;
        }
        const chunks = [];
        const recorder = new MediaRecorder(stream);
        session.recorder = recorder;
        recorder.ondataavailable = event => { if (event.data.size) chunks.push(event.data); };
        recorder.onstop = () => {
          stream.getTracks().forEach(track => track.stop());
          if (current === session) current = null;
          if (session.abandoned || !playback.isConnected) return;
          start.disabled = false;
          stop.disabled = true;
          const blob = new Blob(chunks, {type:recorder.mimeType || 'audio/webm'});
          if (!blob.size) { status.textContent = labels.empty; return; }
          if (urls.has(playback)) URL.revokeObjectURL(urls.get(playback));
          const url = URL.createObjectURL(blob);
          urls.set(playback, url);
          const audio = document.createElement('audio');
          audio.controls = true;
          audio.src = url;
          playback.replaceChildren(audio);
          status.textContent = labels.done;
          if (onRecorded) onRecorded();
        };
        recorder.start();
        stop.disabled = false;
        status.textContent = labels.recording;
      } catch {
        session.stream?.getTracks().forEach(track => track.stop());
        if (current === session) current = null;
        if (start.isConnected) { start.disabled = false; stop.disabled = true; status.textContent = labels.denied; if (onUnavailable) onUnavailable('denied'); }
      }
    };
    stop.onclick = () => {
      if (current?.start === start && current.recorder && current.recorder.state !== 'inactive') {
        stop.disabled = true;
        current.recorder.stop();
      }
    };
  }

  new MutationObserver(cleanup).observe(document.documentElement, {childList:true, subtree:true});
  window.addEventListener('pagehide', () => {
    if (current) {
      current.abandoned = true;
      if (current.recorder && current.recorder.state !== 'inactive') current.recorder.stop();
      current.stream?.getTracks().forEach(track => track.stop());
      current = null;
    }
    for (const url of urls.values()) URL.revokeObjectURL(url);
    urls.clear();
  });
  window.A1Learning = {loadState, shuffle, countWords, wireRecorder};
})();
