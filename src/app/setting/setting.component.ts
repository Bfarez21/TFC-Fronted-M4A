import { Component } from '@angular/core';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrl: './setting.component.css'
})
export class SettingComponent {

  formData: any = {}
  selectedFile: File | null = null;

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input && input.files && input.files.length) {
      this.selectedFile = input.files[0];
      console.log(this.selectedFile);
    }
  }

  onSubmit(): void {
    console.log(this.formData);
    if (this.selectedFile) {
      console.log(this.selectedFile);
    }
  }
}
