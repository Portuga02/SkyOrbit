import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { OrbitShellComponent } from '../../components/shell/shell.component';

@Component({
  selector: 'app-new-appointment',
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, OrbitShellComponent],
  templateUrl: './new-appointment.page.html',
  styleUrls: ['./new-appointment.page.scss'],
})
export class NewAppointmentPage {
  // TODO: substituir por lista real de pacientes vinda da API
  patients = ['Amanda Silva', 'Carlos Eduardo', 'Beatriz Lima', 'Lucas Pereira', 'Juliana Martins'];

  selectedPatient = '';
  date = '';
  time = '';
  duration = 50;
  type: 'Online' | 'Presencial' = 'Online';
  notes = '';

  constructor(private router: Router) {}

  // TODO: enviar pro backend real (POST /appointments)
  save() {
    if (!this.selectedPatient || !this.date || !this.time) return;
    this.router.navigateByUrl('/agenda');
  }

  cancel() {
    this.router.navigateByUrl('/agenda');
  }
}
