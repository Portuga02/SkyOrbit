import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterLink } from '@angular/router';

export type OrbitTab =
  | 'dashboard' | 'patients' | 'agenda' | 'records'
  | 'financeiro' | 'documents' | 'teleatendimento' | 'reports' | 'settings';

@Component({
  selector: 'app-orbit-shell',
  standalone: true,
  imports: [CommonModule, IonicModule, RouterLink],
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
})
export class OrbitShellComponent {
  @Input() activeTab: OrbitTab = 'dashboard';
  @Input() professionalName = 'Sávio Gomes';
  @Input() professionalRole = 'Psicólogo(a)';
}
