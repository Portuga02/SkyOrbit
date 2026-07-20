import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { OrbitShellComponent } from '../../components/shell/shell.component';

interface Dependent {
  id: string;
  name: string;
  cpf: string;
  age: number | null;
  relationship: string;
  photoPreview: string | null;
}

@Component({
  selector: 'app-patient-register',
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, OrbitShellComponent],
  templateUrl: './patient-register.page.html',
  styleUrls: ['./patient-register.page.scss'],
})
export class PatientRegisterPage {
  // Dados básicos
  photoPreview: string | null = null;
  name = '';
  birthDate = '';
  cpf = '';
  phone = '';
  email = '';
  insurance = '';

  // Medicação — pergunta condicional
  takesMedication: 'sim' | 'nao' | null = null;
  medicationDetails = '';

  // Dependentes — pergunta condicional com lista dinâmica
  hasDependents: 'sim' | 'nao' | null = null;
  dependents: Dependent[] = [];

  // Anamnese
  mainComplaint = '';
  history = '';

  constructor(private router: Router) {}

  onPhotoSelected(event: Event, target: 'patient' | Dependent) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      if (target === 'patient') {
        this.photoPreview = result;
      } else {
        target.photoPreview = result;
      }
    };
    reader.readAsDataURL(file);
  }

  addDependent() {
    this.dependents.push({
      id: Date.now().toString(),
      name: '',
      cpf: '',
      age: null,
      relationship: '',
      photoPreview: null,
    });
  }

  removeDependent(id: string) {
    this.dependents = this.dependents.filter(d => d.id !== id);
  }

  // Quando muda pra "Não", limpa os dados condicionais (evita salvar lixo escondido)
  onMedicationChange(value: 'sim' | 'nao') {
    this.takesMedication = value;
    if (value === 'nao') this.medicationDetails = '';
  }

  onDependentsChange(value: 'sim' | 'nao') {
    this.hasDependents = value;
    if (value === 'nao') this.dependents = [];
    if (value === 'sim' && this.dependents.length === 0) this.addDependent();
  }

  // TODO: enviar pro backend real (POST /patients), incluindo upload de fotos
  save() {
    if (!this.name || !this.birthDate) return;
    this.router.navigateByUrl('/patients');
  }

  cancel() {
    this.router.navigateByUrl('/patients');
  }
}
