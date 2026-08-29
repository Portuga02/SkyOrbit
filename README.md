# SkyOrbit — React (Web + PWA)

Conversão do projeto original (Ionic + Angular) para **React.js puro (web)**, com **React Router** para navegação e configurado como **PWA** (instalável em celular, com ícone, splash e funcionamento offline básico via service worker).

## Stack

- **React 19 + Vite**
- **react-router-dom** — rotas
- **lucide-react** — ícones (substituindo os `ion-icon` do projeto original)
- **vite-plugin-pwa** — manifest.json + service worker

## Como rodar

```bash
npm install
npm run dev
```

Abre em `http://localhost:5173`.

## Build de produção

```bash
npm run build
npm run preview
```

O `npm run build` gera a pasta `dist/` já com o service worker e o manifest do PWA prontos. É essa pasta que você sobe pra qualquer hospedagem estática (Vercel, Netlify, GitHub Pages etc).

## Estrutura

```
src/
  components/
    Shell.jsx      -> sidebar (desktop) + topbar/drawer (mobile), usado em quase todas as páginas
  pages/
    Login.jsx
    Dashboard.jsx
    Patients.jsx          -> lista de pacientes
    PatientDetail.jsx     -> detalhe do paciente (abas: resumo/prontuário/sessões/financeiro)
    PatientRegister.jsx   -> cadastro (com campos condicionais: medicação, dependentes)
    Agenda.jsx             -> grade semanal
    NewAppointment.jsx
    Financeiro.jsx
    Teleatendimento.jsx   -> chamada de vídeo mockada + chat
    Reports.jsx            -> geração de PDF mockada
    Settings.jsx
  App.jsx           -> rotas
  main.jsx          -> entrada, BrowserRouter
  index.css         -> variáveis de tema (cores, etc)
```

## O que é mock (ainda sem backend)

Igual ao projeto original, os dados são fixos no código (arrays e objetos no topo de cada página), marcados com comentários `// TODO:`. Pontos que vão precisar de integração real:

- Login (`Login.jsx`) — hoje só simula delay e navega
- Listas de pacientes, agenda, financeiro — dados mockados
- Teleatendimento — não conecta em WebRTC de verdade
- Relatórios — não gera PDF de verdade

## PWA

Configurado em `vite.config.js` via `vite-plugin-pwa`. Os ícones estão em `public/icons/`. Para testar a instalação:

1. `npm run build && npm run preview`
2. Abra no Chrome (desktop ou Android) e use "Instalar app" / "Adicionar à tela inicial"
