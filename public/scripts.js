// Elementos
const voiceSelect = document.getElementById("voiceSelect");
const inputText = document.getElementById("inputText");
const speakBtn = document.getElementById("speakBtn");
const listenBtn = document.getElementById("listenBtn");
const listenStatus = document.getElementById("listenStatus");
const avatarMsg = document.getElementById("avatarMsg");
const contrastBtn = document.getElementById("contrastBtn");
const listenPulse = document.getElementById("listenPulse");

// Preferências
const PREFS_KEY = "librai_prefs_v2";
const prefs = JSON.parse(localStorage.getItem(PREFS_KEY) || "{}");
function savePrefs(){ localStorage.setItem(PREFS_KEY, JSON.stringify(prefs)); }

// Alto contraste
function applyContrastPref(){
  document.body.classList.toggle('high-contrast', !!prefs.contrast);
}
applyContrastPref();
contrastBtn?.addEventListener('click', () => {
  prefs.contrast = !prefs.contrast; savePrefs(); applyContrastPref();
});

// Atalhos globais
window.addEventListener('keydown', (e) => {
  if (e.target && ['INPUT','TEXTAREA','SELECT'].includes(e.target.tagName)) return;
  if (e.key.toLowerCase() === 'h') { e.preventDefault(); contrastBtn?.click(); }
  if (e.key.toLowerCase() === 's') { e.preventDefault(); listenBtn?.click(); }
});

// ---- TTS
function loadVoices() {
  const voices = speechSynthesis.getVoices();
  voiceSelect.innerHTML = "";
  const preferred = [], others = [];
  voices.forEach(v => (v.lang?.toLowerCase().startsWith("pt") ? preferred : others).push(v));
  [...preferred, ...others].forEach(v => {
    const opt = document.createElement("option");
    opt.value = v.voiceURI; opt.textContent = `${v.name} (${v.lang})${v.default ? " — padrão" : ""}`;
    voiceSelect.appendChild(opt);
  });
  if (prefs.voiceURI) voiceSelect.value = prefs.voiceURI;
}
window.speechSynthesis.onvoiceschanged = loadVoices;
try { loadVoices(); } catch(_) {}

voiceSelect?.addEventListener("change", () => { prefs.voiceURI = voiceSelect.value; savePrefs(); });

function speak(text) {
  if (!("speechSynthesis" in window)) return alert("Seu navegador não suporta TTS.");
  const u = new SpeechSynthesisUtterance(text);
  const v = speechSynthesis.getVoices().find(v => v.voiceURI === voiceSelect.value);
  if (v) u.voice = v; u.lang = (v && v.lang) || "pt-BR";
  speechSynthesis.cancel(); speechSynthesis.speak(u);
}
speakBtn?.addEventListener("click", () => {
  const text = inputText.value.trim();
  if (!text) return alert("Digite algo para ouvir.");
  speak(text);
});

// ---- STT
const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
if (SR) {
  const rec = new SR();
  rec.lang = "pt-BR"; rec.interimResults = true; rec.continuous = true;
  let listening = false;
  function setListening(on){
    listening = on;
    listenBtn.textContent = on ? "⏸️ Pausar ditado" : "🎙️ Iniciar ditado";
    listenStatus.textContent = on ? "Ouvindo…" : "Parado.";
    listenPulse.classList.toggle('active', on);
    avatarMsg.textContent = on ? "Estou te ouvindo 👂" : "Pronto! Transcrição concluída ✅";
  }
  rec.onresult = (e) => {
    let finalText = "";
    for (let i = e.resultIndex; i < e.results.length; i++) {
      const chunk = e.results[i][0].transcript;
      if (e.results[i].isFinal) finalText += chunk + " ";
      else inputText.value = (inputText.value.replace(/\s*$/, "")) + " " + chunk;
    }
    if (finalText) inputText.value += finalText;
  };
  rec.onstart = () => setListening(true);
  rec.onend   = () => setListening(false);
  rec.onerror = (ev) => { listenStatus.textContent = "Erro: " + ev.error; };
  listenBtn?.addEventListener("click", () => { if (!listening) { try { rec.start(); } catch(_){} } else rec.stop(); });
} else {
  listenStatus.textContent = "Seu navegador não suporta ditado (STT). Tente Chrome/Edge.";
}

// Acessibilidade: evitar quebra do layout por textos longos nas opções de voz
if (voiceSelect) voiceSelect.style.maxWidth = '100%';
