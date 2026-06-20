const APP_SCRIPT_PARTS = [
  './app.part1.b64',
  './app.part2.b64',
  './app.part3.b64',
  './app.part4.b64',
  './app.part5.b64',
  './app.part6.b64',
  './app.part7.b64'
];

function decodeBase64Utf8(base64Text) {
  const binary = atob(base64Text.replace(/\s+/g, ''));
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

Promise.all(
  APP_SCRIPT_PARTS.map((url) => fetch(url, { cache: 'no-cache' }).then((response) => {
    if (!response.ok) throw new Error(`${url} returned ${response.status}`);
    return response.text();
  }))
).then((parts) => {
  const source = decodeBase64Utf8(parts.join(''));
  (0, eval)(source);
}).catch((error) => {
  console.error('Cut tracker failed to load.', error);
  document.body.insertAdjacentHTML(
    'beforeend',
    '<div class="app-error" role="alert"><strong>Tracker load issue.</strong><br>Refresh once. If it still looks stuck, clear the site data for this page and reopen the link.</div>'
  );
});
