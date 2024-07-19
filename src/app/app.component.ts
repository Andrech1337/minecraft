import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { data } from '../assets/data/data';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'minecraft';
  locations: any = data.locations;
  selectedLocation: string = 'forest';
  updateLocation() {
    this.rows = this.locations[this.selectedLocation];
    this.background = this.selectedLocation;
    console.log(this.background);
  }
  rows = this.locations.forest;
  hardness: { [key: string]: number } = data.hardness;
  background = 'forest';
  miningSpeed = 1;
  broken: number[][] = [];
  pickaxeLvl = 0;
  pickaxeStatus = 0;
  ngOnInit() {
    this.broken = this.rows.map((row: any[]) => row.map(() => 0));
  }
  delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  async mining(miningTime: number) {
    for (; miningTime > 0; miningTime -= 300) {
      this.pickaxeStatus = 1;
      await this.delay(150);
      this.pickaxeStatus = 0;
      await this.delay(150);
    }
  }
  async bedrockHit() {
    this.pickaxeStatus = -1;
    await this.delay(150);
    this.pickaxeStatus = 0;
    await this.delay(150);
  }
  tryUpdrage(block: string) {
    if (block == 'wood' && this.pickaxeLvl === 0) {
      this.pickaxeLvl++;
      this.miningSpeed++;
    }
    if (block == 'cobble' && this.pickaxeLvl === 1) {
      this.pickaxeLvl++;
      this.miningSpeed++;
    }
    if (block == 'iron' && this.pickaxeLvl === 2) {
      this.pickaxeLvl++;
      this.miningSpeed++;
    }
  }
  remove(rowIndex: number, blockIndex: number) {
    const block = this.rows[rowIndex][blockIndex];
    switch (block) {
      case 'bedrock':
        this.bedrockHit();
        break;
      case 'empty':
        console.log('nothing to break');
        break;
      default:
        let miningTime = (600 * this.hardness[block]) / 1.5 ** this.miningSpeed;
        this.mining(miningTime);
        this.broken[rowIndex][blockIndex] = 1;
        setTimeout(() => {
          this.broken[rowIndex][blockIndex] = 2;
          setTimeout(() => {
            this.broken[rowIndex][blockIndex] = 3;
            setTimeout(() => {
              this.rows[rowIndex][blockIndex] = 'empty';
              this.broken[rowIndex][blockIndex] = 0;
              this.tryUpdrage(block);
            }, miningTime / 3);
          }, miningTime / 3);
        }, miningTime / 3);
    }
  }
}
