import { Component } from '@angular/core';
import { data } from '../../assets/data/data';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-editor',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.scss',
})
export class EditorComponent {
  replace(rowIndex: number, blockIndex: number) {
    this.rows[rowIndex][blockIndex] = this.selectedBlock;
  }
  logLevel() {
    navigator.clipboard.writeText(
      JSON.stringify(
        this.rows.map((innerArray) =>
          innerArray.map((element) =>
            element === 'template' ? 'empty' : element
          )
        )
      )
    );
    console.log(this.rows);
  }
  rows = [
    [
      'template',
      'template',
      'template',
      'template',
      'template',
      'template',
      'template',
      'template',
      'template',
      'template',
      'template',
    ],
    [
      'template',
      'template',
      'template',
      'template',
      'template',
      'template',
      'template',
      'template',
      'template',
      'template',
      'template',
    ],
    [
      'template',
      'template',
      'template',
      'template',
      'template',
      'template',
      'template',
      'template',
      'template',
      'template',
      'template',
    ],
    [
      'template',
      'template',
      'template',
      'template',
      'template',
      'template',
      'template',
      'template',
      'template',
      'template',
      'template',
    ],
    [
      'template',
      'template',
      'template',
      'template',
      'template',
      'template',
      'template',
      'template',
      'template',
      'template',
      'template',
    ],
    [
      'template',
      'template',
      'template',
      'template',
      'template',
      'template',
      'template',
      'template',
      'template',
      'template',
      'template',
    ],
    [
      'template',
      'template',
      'template',
      'template',
      'template',
      'template',
      'template',
      'template',
      'template',
      'template',
      'template',
    ],
    [
      'template',
      'template',
      'template',
      'template',
      'template',
      'template',
      'template',
      'template',
      'template',
      'template',
      'template',
    ],
    [
      'template',
      'template',
      'template',
      'template',
      'template',
      'template',
      'template',
      'template',
      'template',
      'template',
      'template',
    ],
  ];
  pool = Object.keys(data.hardness);
  selectedBlock = 'grass';
  select(block: string) {
    this.selectedBlock = block;
  }
}
