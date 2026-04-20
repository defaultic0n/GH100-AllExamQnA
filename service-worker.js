
const CACHE_NAME = 'gh100-quiz-v4';
const ASSETS = [
  '/', 'index.html','styles.css','app.js','app.baseline2e.patched.js',
  'cards.json','hard.json','Actual4Test_cards.json','MS_Practise_QnA_cards.json',
  'QnAfromMultiSite_cards.json','ShapingPixel_cards.json','GH100-AllExamQnA.json'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(resp => resp || fetch(event.request))
  );
});
