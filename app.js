async function loadApp() {
  const status = document.getElementById("status");
  const select = document.getElementById("deckSelect");

  const registry = await fetch("decks.json").then(r => r.json());
  let loaded = 0;

  for (const deck of registry.decks) {
    const opt = document.createElement("option");
    opt.value = deck.id;
    opt.textContent = deck.name;
    select.appendChild(opt);

    try {
      await fetch(deck.file).then(r => r.json());
      loaded++;
    } catch (e) {
      console.error(`Failed to load deck: ${deck.file}`, e);
    }
  }

  status.textContent = `Loaded ${loaded} of ${registry.decks.length} decks`;

  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("sw.js");
  }
}

window.onload = loadApp;
