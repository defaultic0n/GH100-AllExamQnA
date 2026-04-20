async function loadApp() {
  const reg = await fetch('decks.json').then(r=>r.json());
  const sel = document.getElementById('deckSelect');
  let loaded = 0;

  for (const d of reg.decks) {
    const o = document.createElement('option');
    o.value = d.id;
    o.textContent = d.name;
    sel.appendChild(o);
    try {
      await fetch(d.file).then(r=>r.json());
      loaded++;
    } catch(e) { console.error('Failed:', d.file); }
  }
  document.getElementById('status').textContent = `Loaded ${loaded} of ${reg.decks.length} decks`;

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js');
  }
}
window.onload = loadApp;