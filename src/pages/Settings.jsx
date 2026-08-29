import { useState } from 'react';
import { Pencil, X } from 'lucide-react';
import Shell from '../components/Shell.jsx';
import './shared.css';
import './Settings.css';

export default function Settings() {
  const [name, setName] = useState('Sávio Gomes');
  const [email] = useState('savio@skyorbit.dev');
  const [crp, setCrp] = useState('CRP 00/00000');
  const [notifyEmail, setNotifyEmail] = useState(true);
  const [notifySms, setNotifySms] = useState(false);
  const [editing, setEditing] = useState(false);

  function toggleEdit() {
    setEditing((v) => !v);
  }

  // TODO: enviar alterações reais pro backend (PUT /professionals/me)
  function save() {
    setEditing(false);
  }

  return (
    <Shell activeTab="settings">
      <div className="orbit-settings-page">
        <div className="settings-wrap">
          <div className="page-header">
            <h1>Configurações</h1>
            <button className="ion-btn outline small" onClick={toggleEdit}>
              {editing ? <X size={15} /> : <Pencil size={15} />}
              {editing ? 'Cancelar' : 'Editar'}
            </button>
          </div>

          <div className="panel">
            <h2>Dados profissionais</h2>

            <div className="field-row">
              <label>Nome</label>
              {editing ? (
                <input className="edit-input" value={name} onChange={(e) => setName(e.target.value)} />
              ) : (
                <p>{name}</p>
              )}
            </div>

            <div className="field-row">
              <label>E-mail</label>
              <p className="readonly">{email}</p>
            </div>

            <div className="field-row">
              <label>Registro (CRP)</label>
              {editing ? (
                <input className="edit-input" value={crp} onChange={(e) => setCrp(e.target.value)} />
              ) : (
                <p>{crp}</p>
              )}
            </div>

            {editing && (
              <button className="ion-btn round block btn-save" onClick={save}>
                Salvar alterações
              </button>
            )}
          </div>

          <div className="panel">
            <h2>Notificações</h2>
            <div className="toggle-row">
              <span>Notificações por e-mail</span>
              <label className="orbit-toggle">
                <input type="checkbox" checked={notifyEmail} onChange={(e) => setNotifyEmail(e.target.checked)} />
                <span className="track">
                  <span className="thumb" />
                </span>
              </label>
            </div>
            <div className="toggle-row">
              <span>Notificações por SMS</span>
              <label className="orbit-toggle">
                <input type="checkbox" checked={notifySms} onChange={(e) => setNotifySms(e.target.checked)} />
                <span className="track">
                  <span className="thumb" />
                </span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </Shell>
  );
}
