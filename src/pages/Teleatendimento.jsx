import { useState, useEffect, useRef } from 'react';
import {
  Circle,
  MessageCircle,
  Mic,
  MicOff,
  Video,
  VideoOff,
  Monitor,
  Paperclip,
  MoreHorizontal,
  Phone,
  Send,
} from 'lucide-react';
import Shell from '../components/Shell.jsx';
import './Teleatendimento.css';

// TODO: histórico real da sessão + envio via WebSocket
const INITIAL_MESSAGES = [
  { id: '1', text: 'Bom dia, Sávio! Tudo bem?', fromMe: false, time: '09:00' },
  { id: '2', text: 'Bom dia, Amanda! Tudo ótimo 😊', fromMe: true, time: '09:01' },
  { id: '3', text: 'Claro, vamos lá!', fromMe: false, time: '09:02' },
];

function formatTime(totalSeconds) {
  const h = Math.floor(totalSeconds / 3600).toString().padStart(2, '0');
  const m = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, '0');
  const s = (totalSeconds % 60).toString().padStart(2, '0');
  return `${h}:${m}:${s}`;
}

export default function Teleatendimento() {
  const patientName = 'Amanda Silva';
  const [seconds, setSeconds] = useState(0);
  const [micOn, setMicOn] = useState(true);
  const [camOn, setCamOn] = useState(true);
  const [draft, setDraft] = useState('');
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const messagesEndRef = useRef(null);

  // TODO: só iniciar contagem quando a sessão WebRTC conectar de fato
  useEffect(() => {
    const timer = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ block: 'nearest' });
  }, [messages]);

  function send() {
    const text = draft.trim();
    if (!text) return;
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        text,
        fromMe: true,
        time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
    setDraft('');
  }

  function onComposerKeyDown(e) {
    if (e.key === 'Enter') send();
  }

  return (
    <Shell activeTab="teleatendimento">
      <div className="tele-page">
        <div className="tele-wrap">
          <div className="tele-topbar">
            <span className="tele-title">
              <Circle className="connected-dot" size={9} fill="currentColor" />
              Teleatendimento · Conectado
            </span>
            <span className="tele-timer">{formatTime(seconds)}</span>
          </div>

          <div className="tele-grid">
            <div className="video-area">
              <div className="remote-video">
                <div className="avatar-placeholder">{patientName.charAt(0)}</div>
              </div>
              <div className={`local-video ${!camOn ? 'cam-off' : ''}`}>
                {!camOn && <VideoOff size={26} />}
              </div>

              <div className="tele-controls">
                <button
                  className={`ctrl-btn ${!micOn ? 'off' : ''}`}
                  aria-label={micOn ? 'Desligar microfone' : 'Ligar microfone'}
                  onClick={() => setMicOn((v) => !v)}
                >
                  {micOn ? <Mic size={19} /> : <MicOff size={19} />}
                </button>
                <button
                  className={`ctrl-btn ${!camOn ? 'off' : ''}`}
                  aria-label={camOn ? 'Desligar câmera' : 'Ligar câmera'}
                  onClick={() => setCamOn((v) => !v)}
                >
                  {camOn ? <Video size={19} /> : <VideoOff size={19} />}
                </button>
                <button className="ctrl-btn" aria-label="Compartilhar tela">
                  <Monitor size={19} />
                </button>
                <button className="ctrl-btn" aria-label="Anexos">
                  <Paperclip size={19} />
                </button>
                <button className="ctrl-btn" aria-label="Mais opções">
                  <MoreHorizontal size={19} />
                </button>
                <button className="ctrl-btn hangup" aria-label="Encerrar sessão">
                  <Phone size={19} />
                </button>
              </div>
            </div>

            <div className="chat-panel">
              <div className="chat-header">
                <MessageCircle size={16} /> Chat
              </div>

              <div className="chat-messages">
                <div className="chat-meta">Início da sessão · 09:00</div>
                {messages.map((m) => (
                  <div className={`msg-row ${m.fromMe ? 'mine' : ''}`} key={m.id}>
                    <div className={`msg-bubble ${m.fromMe ? 'mine' : ''}`}>
                      {m.text}
                      <span className="msg-time">{m.time}</span>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              <div className="chat-composer">
                <input
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  placeholder="Digite uma mensagem..."
                  className="composer-input"
                  onKeyDown={onComposerKeyDown}
                />
                <button className="send-icon" aria-label="Enviar mensagem" onClick={send}>
                  <Send size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Shell>
  );
}
