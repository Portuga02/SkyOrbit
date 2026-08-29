import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Circle,
  MessageCircle,
  Mic,
  MicOff,
  Video,
  VideoOff,
  Monitor,
  PhoneOff,
  Send,
  ShieldCheck,
  X,
  Volume2,
  Maximize2
} from 'lucide-react';
import Shell from '../components/Shell.jsx';
import './Teleatendimento.css';

const INITIAL_MESSAGES = [
  { id: '1', text: 'Bom dia, Sávio! O áudio e vídeo estão ótimos por aqui.', fromMe: false, time: '09:00' },
  { id: '2', text: 'Bom dia, Amanda! Perfeito, vamos dar início à nossa sessão 😊', fromMe: true, time: '09:01' },
];

function formatTime(totalSeconds) {
  const h = Math.floor(totalSeconds / 3600).toString().padStart(2, '0');
  const m = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, '0');
  const s = (totalSeconds % 60).toString().padStart(2, '0');
  return `${h}:${m}:${s}`;
}

export default function Teleatendimento() {
  const navigate = useNavigate();
  const patientName = 'Amanda Silva';
  
  const [seconds, setSeconds] = useState(0);
  const [micOn, setMicOn] = useState(true);
  const [camOn, setCamOn] = useState(true);
  const [screenSharing, setScreenSharing] = useState(false);
  const [chatOpen, setChatOpen] = useState(true);
  
  const [draft, setDraft] = useState('');
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
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

  function handleKeyDown(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      send();
    }
  }

  function handleEndSession() {
    if (window.confirm('Deseja encerrar a sessão de teleatendimento?')) {
      navigate('/agenda');
    }
  }

  return (
    <Shell activeTab="teleatendimento">
      <div className="tele-page">
        <div className="tele-wrap">
          
          {/* Barra Superior da Sessão */}
          <div className="tele-topbar">
            <div className="tele-patient-status">
              <div className="status-indicator">
                <Circle size={8} fill="currentColor" className="dot-pulse" />
                <span>Em Atendimento</span>
              </div>
              <span className="divider">•</span>
              <span className="patient-name">{patientName}</span>
              <div className="encryption-pill">
                <ShieldCheck size={13} />
                <span>WebRTC E2EE</span>
              </div>
            </div>

            <div className="topbar-actions">
              <div className="tele-timer-badge">
                <span className="tele-timer">{formatTime(seconds)}</span>
              </div>
              <button 
                type="button" 
                className={`btn-topbar-toggle ${chatOpen ? 'active' : ''}`}
                onClick={() => setChatOpen((v) => !v)}
                title="Alternar painel de chat"
              >
                <MessageCircle size={17} />
              </button>
            </div>
          </div>

          {/* Grid Principal: Vídeo + Chat */}
          <div className={`tele-grid ${!chatOpen ? 'chat-collapsed' : ''}`}>
            
            {/* Área de Vídeo */}
            <div className="video-area">
              
              {/* Vídeo Remoto (Paciente) */}
              <div className="remote-video">
                <div className="remote-avatar-wrap">
                  <div className="avatar-placeholder">{patientName.charAt(0)}</div>
                  <span className="remote-label">{patientName}</span>
                </div>
              </div>

              {/* Vídeo Local (Profissional) - PIP */}
              <div className={`local-video-pip ${!camOn ? 'cam-off' : ''}`}>
                {camOn ? (
                  <div className="local-preview">
                    <span className="local-initial">S</span>
                    <span className="pip-label">Você</span>
                  </div>
                ) : (
                  <div className="cam-disabled-state">
                    <VideoOff size={22} />
                    <span>Câmera desligada</span>
                  </div>
                )}
              </div>

              {/* Barra de Controles Flutuante (Glassmorphism) */}
              <div className="tele-controls-dock">
                <button
                  type="button"
                  className={`ctrl-btn ${!micOn ? 'danger' : ''}`}
                  title={micOn ? 'Mutar microfone' : 'Ativar microfone'}
                  onClick={() => setMicOn((v) => !v)}
                >
                  {micOn ? <Mic size={20} /> : <MicOff size={20} />}
                </button>

                <button
                  type="button"
                  className={`ctrl-btn ${!camOn ? 'danger' : ''}`}
                  title={camOn ? 'Desligar câmera' : 'Ligar câmera'}
                  onClick={() => setCamOn((v) => !v)}
                >
                  {camOn ? <Video size={20} /> : <VideoOff size={20} />}
                </button>

                <button
                  type="button"
                  className={`ctrl-btn ${screenSharing ? 'active-feature' : ''}`}
                  title="Compartilhar tela"
                  onClick={() => setScreenSharing((v) => !v)}
                >
                  <Monitor size={20} />
                </button>

                <button
                  type="button"
                  className="ctrl-btn hangup"
                  title="Encerrar chamada"
                  onClick={handleEndSession}
                >
                  <PhoneOff size={20} />
                </button>
              </div>

            </div>

            {/* Painel Lateral de Chat */}
            {chatOpen && (
              <div className="chat-panel">
                <div className="chat-header">
                  <div className="chat-header-title">
                    <MessageCircle size={18} />
                    <span>Chat da Consulta</span>
                  </div>
                  <button 
                    type="button" 
                    className="btn-close-chat" 
                    onClick={() => setChatOpen(false)}
                  >
                    <X size={16} />
                  </button>
                </div>

                <div className="chat-messages">
                  <div className="chat-meta-notice">
                    <ShieldCheck size={13} />
                    <span>Mensagens temporárias protegidas por sigilo profissional.</span>
                  </div>

                  {messages.map((m) => (
                    <div className={`msg-row ${m.fromMe ? 'mine' : ''}`} key={m.id}>
                      <div className={`msg-bubble ${m.fromMe ? 'mine' : ''}`}>
                        <p className="msg-text">{m.text}</p>
                        <span className="msg-time">{m.time}</span>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>

                <div className="chat-composer">
                  <input
                    type="text"
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    placeholder="Digite sua mensagem..."
                    className="composer-input"
                    onKeyDown={handleKeyDown}
                  />
                  <button 
                    type="button" 
                    className="btn-send-msg" 
                    aria-label="Enviar mensagem" 
                    onClick={send}
                    disabled={!draft.trim()}
                  >
                    <Send size={16} />
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </Shell>
  );
}