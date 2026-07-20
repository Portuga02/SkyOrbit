import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { OrbitShellComponent } from '../../components/shell/shell.component';

interface ChatMessage {
  id: string;
  text: string;
  fromMe: boolean;
  time: string;
}

@Component({
  selector: 'app-teleatendimento',
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, OrbitShellComponent],
  templateUrl: './teleatendimento.page.html',
  styleUrls: ['./teleatendimento.page.scss'],
})
export class TeleatendimentoPage implements OnInit, OnDestroy {
  patientName = 'Amanda Silva';
  seconds = 0;
  micOn = true;
  camOn = true;
  draft = '';
  private timer: any;

  // TODO: histórico real da sessão + envio via WebSocket
  messages: ChatMessage[] = [
    { id: '1', text: 'Bom dia, Sávio! Tudo bem?', fromMe: false, time: '09:00' },
    { id: '2', text: 'Bom dia, Amanda! Tudo ótimo 😊', fromMe: true, time: '09:01' },
    { id: '3', text: 'Claro, vamos lá!', fromMe: false, time: '09:02' },
  ];

  ngOnInit() {
    // TODO: só iniciar contagem quando a sessão WebRTC conectar de fato
    this.timer = setInterval(() => this.seconds++, 1000);
  }

  ngOnDestroy() {
    clearInterval(this.timer);
  }

  get formattedTime(): string {
    const h = Math.floor(this.seconds / 3600).toString().padStart(2, '0');
    const m = Math.floor((this.seconds % 3600) / 60).toString().padStart(2, '0');
    const s = (this.seconds % 60).toString().padStart(2, '0');
    return `${h}:${m}:${s}`;
  }

  toggleMic() { this.micOn = !this.micOn; }
  toggleCam() { this.camOn = !this.camOn; }

  send() {
    const text = this.draft.trim();
    if (!text) return;
    this.messages.push({
      id: Date.now().toString(),
      text,
      fromMe: true,
      time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
    });
    this.draft = '';
  }
}
