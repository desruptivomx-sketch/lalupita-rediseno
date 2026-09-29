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
