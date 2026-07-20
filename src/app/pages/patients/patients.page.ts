import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { OrbitShellComponent } from '../../components/shell/shell.component';

interface Patient {
  id: string;
  name: string;
  age: number;
  status: 'Ativa' | 'Inativa';
  lastSession: string;
  avatarColor: string;
}

@Component({
  selector: 'app-patients',
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, OrbitShellComponent],
  templateUrl: './patients.page.html',
  styleUrls: ['./patients.page.scss'],
})
export class PatientsPage {
  searchTerm = '';

  // TODO: substituir por lista real vinda da API
  patients: Patient[] = [
    { id: '1', name: 'Amanda Silva', age: 28, status: 'Ativa', lastSession: '08/07/2025', avatarColor: '#e786c9' },
    { id: '2', name: 'Carlos Eduardo', age: 34, status: 'Ativa', lastSession: '05/07/2025', avatarColor: '#38bdf8' },
    { id: '3', name: 'Beatriz Lima', age: 22, status: 'Ativa', lastSession: '01/07/2025', avatarColor: '#f2c879' },
    { id: '4', name: 'Lucas Pereira', age: 41, status: 'Ativa', lastSession: '28/06/2025', avatarColor: '#4ade80' },
    { id: '5', name: 'Juliana Martins', age: 30, status: 'Ativa', lastSession: '24/06/2025', avatarColor: '#6c5ce7' },
    { id: '6', name: 'Rafael Nogueira', age: 26, status: 'Inativa', lastSession: '02/05/2025', avatarColor: '#ef4444' },
  ];

  get filtered(): Patient[] {
    if (!this.searchTerm.trim()) return this.patients;
    const term = this.searchTerm.toLowerCase();
    return this.patients.filter(p => p.name.toLowerCase().includes(term));
  }

  constructor(private router: Router) {}

  openPatient(patient: Patient) {
    this.router.navigate(['/patients', patient.id]);
  }
}
