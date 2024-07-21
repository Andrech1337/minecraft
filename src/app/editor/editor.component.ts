import { Component } from '@angular/core';
import { data } from '../../assets/data/data';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgClass } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-editor',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgClass, FormsModule, ReactiveFormsModule,],
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.scss',
})
export class EditorComponent {
  bulkReplace(rowIndex: number, blockIndex: number) {
    if (this.isMouseDown === true) {
      if (this.pressedButton === "left") {
        this.replace(rowIndex, blockIndex)
      }
      else if (this.pressedButton === "right") {
        this.clear(rowIndex, blockIndex)
      }
    }
  }
  replace(rowIndex: number, blockIndex: number) {
    this.rows[rowIndex][blockIndex] = this.selectedBlock;
  }
  clear(rowIndex: number, blockIndex: number) {
    this.rows[rowIndex][blockIndex] = "template";
  }
  logLevel() {                                          // unused
    navigator.clipboard.writeText(
      JSON.stringify(
        this.levelPipe(this.rows)
      )
    );
  }
  levelPipe(arr: any[][]) {
    return (arr.map((innerArray) =>
      innerArray.map((element) =>
        element === 'template' ? 'empty' : element
      )
    ))
  }
  levelPipeBack(arr: any[][]) {
    return (arr.map((innerArray) =>
      innerArray.map((element) =>
        element === 'empty' ? 'template' : element
      )
    ))
  }
  selectedCustomLevel = "customLevel"
  updateLevel() {
    this.rows = this.customLevels[this.selectedCustomLevel];
  }
  inputCustomLevelName = new FormControl("customLevel");
  addLevel() {
    if (this.inputCustomLevelName.value != null) {
      (this.customLevels as any)[this.inputCustomLevelName.value] = this.createEmptyLevel();
      this.customLevelsNames = Object.keys(this.customLevels);
      this.selectedCustomLevel = this.inputCustomLevelName.value;
      this.updateLevel()
    }
  }
  customLevels: any = { ...JSON.parse(localStorage.getItem('data') || "{}") }
  customLevelsNames = Object.keys(this.customLevels);
  saveLevels() {
    let formattedLevels: any = {};
    for (const [key, value] of Object.entries(this.customLevels)) {
      if (Array.isArray(value)) {
        formattedLevels[key] = this.levelPipe(value);
        console.log(key)
      }
    }
    localStorage.setItem('data', JSON.stringify(formattedLevels));
    localStorage.setItem('backgrounds', JSON.stringify(this.backgrounds));
  }
  clearLocalStorage() {
    localStorage.removeItem('data');
    localStorage.removeItem('backgrounds');
    this.customLevels = {}
    this.customLevelsNames = [];
    this.updateLevel();
  }
  createEmptyLevel() {
    return (Array.from({ length: 9 }, () =>
      Array(11).fill('template')));
  }
  rows: any[][] = this.createEmptyLevel();
  pool = Object.keys(data.hardness);
  selectedBlock = 'grass';
  isMouseDown = false;
  pressedButton = "";
  mouseDown(event: MouseEvent) {
    this.isMouseDown = true;
    if (event.button === 0) {
      this.pressedButton = "left"
    }
    else if (event.button === 2) {
      this.pressedButton = "right"
    }
  }
  mouseUp() {
    this.isMouseDown = false;
  }
  select(block: string) {
    this.selectedBlock = block;
  }
  preventDefault(event: MouseEvent) {
    event.preventDefault();
  }


  uploadedImage = ""
  backgrounds = { ...JSON.parse(localStorage.getItem('backgrounds') || "{}") }
  saveImage() {
    (this.backgrounds as any)[this.selectedCustomLevel] = this.uploadedImage;
  }
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        this.uploadedImage = reader.result as string
      };

      reader.readAsDataURL(file);
    }
  }
  ngOnInit() {
    for (const [key, value] of Object.entries(this.customLevels)) {
      if (Array.isArray(value)) {
        this.customLevels[key] = this.levelPipeBack(value);
      }
    }
    this.updateLevel()
  }
}
