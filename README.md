# 🖐️ LibrAi - EM DESENVOLVIMENTO

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-LibrAi-blue?logo=github)](https://mateusdepaulajr.github.io/LibrAi/)

> **Comunicação sem barreiras** — um app acessível que traduz fala, texto e frases simples em **Libras**, além de oferecer leitura em voz alta.  
> Construído com foco em **acessibilidade, inclusão e usabilidade**.

---

## ✨ Funcionalidades (v2.4)

- 🎙️ **Fala → Texto (STT)**  
  Reconhecimento de fala em tempo real (**atalho S**) com feedback visual no avatar.  
  🔧 Corrigido bug de duplicação no ditado.

- 🗣️ **Texto → Voz (TTS)**  
  Leitura em voz alta com escolha de vozes disponíveis no navegador.  
  O avatar coloca **óculos** enquanto lê.

- 🖐️ **Texto → Libras (Protótipo)**  
  Tradução de frases pré-configuradas em **vídeos de Libras**.  
  Fácil de expandir: edite `public/data/phrases.json` e adicione vídeos em `public/clips/`.

- 🧑‍🤝‍🧑 **Avatar animado**  
  - **Normal**: mascote LibrAi acolhedor  
  - **Ouvindo**: mão na orelha + ondas sonoras  
  - **Lendo**: com óculos 👓  

- 🌗 **Alto contraste (H)**  
  Alterna entre modo padrão e alto contraste para leitura acessível.

---

## 📂 Estrutura do projeto

```
LibrAi/
 ├─ public/
 │   ├─ assets/           # Imagens e avatar
 │   ├─ clips/            # Clipes de Libras (.mp4)
 │   ├─ data/phrases.json # Mapeia frases → vídeos
 │   ├─ index.html        # Página principal
 │   ├─ style.css         # Estilos
 │   └─ scripts.js        # Lógica do app
 ├─ .gitignore
 ├─ LICENSE
 └─ README.md
```

---

## 🚀 Como rodar localmente

1. Clone o repositório:
   ```bash
   git clone https://github.com/MateusDePaulaJr/LibrAi.git
   cd LibrAi
   ```

2. Abra o arquivo `public/index.html` no navegador **(Chrome ou Edge recomendado)**.

> **Dica**: o app funciona 100% estático, sem necessidade de servidor backend.

---

## 📌 Roadmap

- [ ] Suporte a **frases compostas** em Libras (exibir sequência de sinais).
- [ ] **Dicionário visual** de sinais por palavra.
- [ ] **PWA** (instalável offline).
- [ ] Avatar em **3D/Animações vetoriais** para Libras.
- [ ] Melhorias de acessibilidade (atalhos, ARIA).

---

## 🤝 Contribuição

1. Crie uma branch a partir da `dev`:
   ```bash
   git checkout -b feature/minha-feature
   ```
2. Faça commit das alterações.
3. Abra um **Pull Request** para `dev`.

---

## 📄 Licença

Este projeto está sob a licença MIT — sinta-se à vontade para usar, modificar e compartilhar.

---

👋 Desenvolvido com ❤️ por [Mateus Junior](https://github.com/MateusDePaulaJr)
