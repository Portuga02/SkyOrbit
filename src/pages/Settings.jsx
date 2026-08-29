import { useState } from 'react';
import { 
  Camera, 
  Pencil, 
  X, 
  Check, 
  User, 
  Sliders, 
  Bell, 
  Mail, 
  Phone, 
  Award,
  BookOpen
} from 'lucide-react';
import Shell from '../components/Shell.jsx';
import './Settings.css';

export default function Settings() {
  const [editing, setEditing] = useState(false);
  const [savedAlert, setSavedAlert] = useState(false);

  // Estados dos Dados do Profissional
  const [photoPreview, setPhotoPreview] = useState(null);
  const [name, setName] = useState('Sávio Gomes');
  const [role, setRole] = useState('Psicólogo Clínico');
  const [crp, setCrp] = useState('CRP 02/12345');
  const [email] = useState('savio@skyorbit.dev');
  const [phone, setPhone] = useState('(81) 99999-8888');
  const [approach, setApproach] = useState('Terapia Cognitivo-Comportamental (TCC)');
  const [bio, setBio] = useState('Especialista em regulação emocional, ansiedade e reestruturação cognitiva.');
  
  // Preferências Clínicas
  const [sessionPrice, setSessionPrice] = useState('180,00');
  const [sessionDuration, setSessionDuration] = useState('50');

  // Notificações
  const [notifyEmail, setNotifyEmail] = useState(true);
  const [notifySms, setNotifySms] = useState(false);
  const [autoReminder, setAutoReminder] = useState(true);

  function onPhotoSelected(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setPhotoPreview(reader.result);
    reader.readAsDataURL(file);
  }

  function toggleEdit() {
    setEditing((prev) => !prev);
  }

  function save(e) {
    e.preventDefault();
    setEditing(false);
    setSavedAlert(true);
    setTimeout(() => setSavedAlert(false), 3000);
  }

  return (
    <Shell activeTab="settings">
      <div className="settings-page">
        <div className="settings-wrap">
          
          <div className="page-header">
            <div>
              <h1>Configurações &amp; Perfil</h1>
              <p>Gerencie suas credenciais profissionais e preferências de atendimento.</p>
            </div>
            
            <button 
              type="button" 
              className={`ion-btn round btn-toggle-edit ${editing ? 'cancel' : 'primary'}`} 
              onClick={toggleEdit}
            >
              {editing ? (
                <>
                  <X size={15} />
                  <span>Cancelar</span>
                </>
              ) : (
                <>
                  <Pencil size={15} />
                  <span>Editar Perfil</span>
                </>
              )}
            </button>
          </div>

          {savedAlert && (
            <div className="alert-toast">
              <Check size={18} />
              <span>Perfil e preferências atualizados com sucesso!</span>
            </div>
          )}

          <form onSubmit={save} className="settings-form">

            {/* HERO DO PERFIL COM UPLOAD DE FOTO */}
            <div className="panel profile-hero-panel">
              <div className="profile-hero-content">
                <div className="avatar-wrapper">
                  <div className="profile-large-avatar">
                    {photoPreview ? (
                      <img src={photoPreview} alt={name} />
                    ) : (
                      <span>{name.charAt(0)}</span>
                    )}
                  </div>
                  
                  <label className="avatar-upload-badge" htmlFor="pro-photo" title="Alterar foto de perfil">
                    <Camera size={16} />
                  </label>
                  <input
                    id="pro-photo"
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={onPhotoSelected}
                  />
                </div>

                <div className="hero-details">
                  <div className="hero-name-row">
                    <h2>{name}</h2>
                    <span className="crp-pill">{crp}</span>
                  </div>
                  <p className="hero-role">{role} • {approach}</p>
                  <p className="hero-bio">{bio}</p>
                </div>
              </div>
            </div>

            {/* DADOS PROFISSIONAIS */}
            <div className="panel form-panel">
              <div className="panel-title-with-icon">
                <User size={18} className="panel-icon" />
                <h2>Dados Profissionais</h2>
              </div>

              <div className="field-grid two-cols">
                <div className="form-group">
                  <label>Nome Completo</label>
                  {editing ? (
                    <input 
                      className="form-control" 
                      value={name} 
                      onChange={(e) => setName(e.target.value)} 
                      required 
                    />
                  ) : (
                    <div className="readonly-val">{name}</div>
                  )}
                </div>

                <div className="form-group">
                  <label>Título / Especialidade</label>
                  {editing ? (
                    <input 
                      className="form-control" 
                      value={role} 
                      onChange={(e) => setRole(e.target.value)} 
                    />
                  ) : (
                    <div className="readonly-val">{role}</div>
                  )}
                </div>

                <div className="form-group">
                  <label>Registro Profissional (CRP)</label>
                  {editing ? (
                    <input 
                      className="form-control" 
                      value={crp} 
                      onChange={(e) => setCrp(e.target.value)} 
                    />
                  ) : (
                    <div className="readonly-val">{crp}</div>
                  )}
                </div>

                <div className="form-group">
                  <label>Telefone / WhatsApp</label>
                  {editing ? (
                    <input 
                      className="form-control" 
                      value={phone} 
                      onChange={(e) => setPhone(e.target.value)} 
                    />
                  ) : (
                    <div className="readonly-val">{phone}</div>
                  )}
                </div>

                <div className="form-group full-width">
                  <label>E-mail de Acesso</label>
                  <div className="readonly-val email-val">
                    <Mail size={15} />
                    <span>{email}</span>
                  </div>
                </div>

                <div className="form-group full-width">
                  <label>Abordagem Terapêutica</label>
                  {editing ? (
                    <input 
                      className="form-control" 
                      value={approach} 
                      onChange={(e) => setApproach(e.target.value)} 
                    />
                  ) : (
                    <div className="readonly-val">{approach}</div>
                  )}
                </div>

                <div className="form-group full-width">
                  <label>Minibiografia Clínica</label>
                  {editing ? (
                    <textarea 
                      className="form-control" 
                      rows={3} 
                      value={bio} 
                      onChange={(e) => setBio(e.target.value)} 
                    />
                  ) : (
                    <div className="readonly-val textarea-val">{bio}</div>
                  )}
                </div>
              </div>
            </div>

            {/* PARÂMETROS DA CLÍNICA */}
            <div className="panel form-panel">
              <div className="panel-title-with-icon">
                <Sliders size={18} className="panel-icon" />
                <h2>Parâmetros de Consulta</h2>
              </div>

              <div className="field-grid two-cols">
                <div className="form-group">
                  <label>Valor Base por Sessão (R$)</label>
                  {editing ? (
                    <input 
                      className="form-control" 
                      value={sessionPrice} 
                      onChange={(e) => setSessionPrice(e.target.value)} 
                    />
                  ) : (
                    <div className="readonly-val">R$ {sessionPrice}</div>
                  )}
                </div>

                <div className="form-group">
                  <label>Duração Padrão (minutos)</label>
                  {editing ? (
                    <input 
                      type="number"
                      className="form-control" 
                      value={sessionDuration} 
                      onChange={(e) => setSessionDuration(e.target.value)} 
                    />
                  ) : (
                    <div className="readonly-val">{sessionDuration} minutos</div>
                  )}
                </div>
              </div>
            </div>

            {/* NOTIFICAÇÕES */}
            <div className="panel form-panel">
              <div className="panel-title-with-icon">
                <Bell size={18} className="panel-icon" />
                <h2>Notificações &amp; Alertas</h2>
              </div>

              <div className="toggles-list">
                <div className="toggle-row">
                  <div className="toggle-label-wrap">
                    <span className="toggle-title">Lembretes automáticos para pacientes</span>
                    <span className="toggle-sub">Disparo de aviso de confirmação 24h antes da sessão.</span>
                  </div>
                  <label className="orbit-toggle">
                    <input 
                      type="checkbox" 
                      checked={autoReminder} 
                      onChange={(e) => setAutoReminder(e.target.checked)} 
                    />
                    <span className="track"><span className="thumb" /></span>
                  </label>
                </div>

                <div className="toggle-row">
                  <div className="toggle-label-wrap">
                    <span className="toggle-title">Notificações por e-mail</span>
                    <span className="toggle-sub">Receba resumos semanais e avisos de cancelamento.</span>
                  </div>
                  <label className="orbit-toggle">
                    <input 
                      type="checkbox" 
                      checked={notifyEmail} 
                      onChange={(e) => setNotifyEmail(e.target.checked)} 
                    />
                    <span className="track"><span className="thumb" /></span>
                  </label>
                </div>

                <div className="toggle-row">
                  <div className="toggle-label-wrap">
                    <span className="toggle-title">Notificações por SMS</span>
                    <span className="toggle-sub">Alertas de segurança e avisos urgentes no celular.</span>
                  </div>
                  <label className="orbit-toggle">
                    <input 
                      type="checkbox" 
                      checked={notifySms} 
                      onChange={(e) => setNotifySms(e.target.checked)} 
                    />
                    <span className="track"><span className="thumb" /></span>
                  </label>
                </div>
              </div>
            </div>

            {/* BOTÃO SALVAR */}
            {editing && (
              <div className="actions-row">
                <button type="button" className="ion-btn outline round btn-cancel" onClick={toggleEdit}>
                  Cancelar
                </button>
                <button type="submit" className="ion-btn round btn-save">
                  Salvar Alterações
                </button>
              </div>
            )}

          </form>
        </div>
      </div>
    </Shell>
  );
}