// Menú móvil
const toggle = document.querySelector('.nav-toggle');
const menu = document.getElementById('menu');
toggle.addEventListener('click', () => {
  const open = menu.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(open));
  toggle.textContent = open ? 'Cerrar' : 'Menú';
});
menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  menu.classList.remove('open');
  toggle.setAttribute('aria-expanded', 'false');
  toggle.textContent = 'Menú';
}));

// Formulario de distribuidores: arma un mensaje y abre WhatsApp
const WHATSAPP = '529993013111';
const form = document.getElementById('dist-form');
const error = document.getElementById('dist-error');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const d = Object.fromEntries(new FormData(form));
  const missing = ['nombre', 'negocio', 'ciudad'].filter(k => !String(d[k] || '').trim());
  error.hidden = missing.length === 0;
  if (missing.length) {
    form.elements[missing[0]].focus();
    return;
  }
  const msg = `Hola, me interesa distribuir productos La Lupita.\n` +
    `Nombre: ${d.nombre}\nNegocio: ${d.negocio}\nTipo: ${d.tipo}\nCiudad: ${d.ciudad}`;
  window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener');
});

// ¿Qué se te antoja? — resalta las líneas que van con el antojo elegido
const LINE_NAMES = { new: 'Lo nuevo', trad: 'Tradicionales', hot: 'Atrevidos', snack: 'Botanas', nut: 'Cacahuates', tost: 'Tostadas', trod: 'Troddos' };
const lines = document.querySelector('.lines');
const result = document.getElementById('picker-result');
document.querySelectorAll('.picker-opts button').forEach(btn => {
  btn.addEventListener('click', () => {
    const wasOn = btn.getAttribute('aria-pressed') === 'true';
    document.querySelectorAll('.picker-opts button').forEach(b => b.setAttribute('aria-pressed', 'false'));
    lines.querySelectorAll('.line').forEach(l => l.classList.remove('is-match'));
    if (wasOn) { lines.classList.remove('filtering'); result.textContent = ''; return; }
    btn.setAttribute('aria-pressed', 'true');
    const keys = btn.dataset.lines.split(' ');
    keys.forEach(k => lines.querySelector(`[data-line="${k}"]`)?.classList.add('is-match'));
    lines.classList.add('filtering');
    const names = keys.map(k => LINE_NAMES[k]);
    result.textContent = `Te recomendamos: ${names.join(' y ')}.`;
  });
});

// ¿No encuentras tu favorito? — pregunta por WhatsApp
const ask = document.getElementById('ask-form');
ask.addEventListener('submit', (e) => {
  e.preventDefault();
  const d = Object.fromEntries(new FormData(ask));
  if (!String(d.lugar || '').trim()) { ask.elements.lugar.focus(); return; }
  const msg = `Hola, ¿dónde puedo encontrar ${d.producto} de La Lupita en ${d.lugar}?`;
  window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener');
});
