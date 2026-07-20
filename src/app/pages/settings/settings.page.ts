import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { OrbitShellComponent } from '../../components/shell/shell.component';

@Component({
  selector: 'app-orbit-settings',
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, OrbitShellComponent],
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class OrbitSettingsPage {
  name = 'Sávio Gomes';
  email = 'savio@skyorbit.dev';
  crp = 'CRP 00/00000';
  notifyEmail = true;
  notifySms = false;
  editing = false;

  toggleEdit() {
    this.editing = !this.editing;
  }

  // TODO: enviar alterações reais pro backend (PUT /professionals/me)
  save() {
    this.editing = false;
  }
}
