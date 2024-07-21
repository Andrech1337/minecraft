import { Component } from '@angular/core';
import { data } from '../../assets/data/data';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [FormsModule, RouterLink, RouterLinkActive],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent {
  title = 'minecraft';
  locations: any = { ...JSON.parse(JSON.stringify(data.locations)), ...JSON.parse(localStorage.getItem('data') || "{}") };
  locationsNames = Object.keys(this.locations)
  selectedLocation: string = 'forest';
  updateLocation() {
    this.rows = this.locations[this.selectedLocation];
    this.background = (this.backgrounds as any)[this.selectedLocation];
  }
  rows = this.locations.forest;
  hardness: { [key: string]: number } = data.hardness;
  backgrounds = { ...JSON.parse(JSON.stringify(data.backgrounds)), ...JSON.parse(localStorage.getItem('backgrounds') || "{}") } // первый парс вообще не нужен
  background = (this.backgrounds as any)[this.selectedLocation];
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
    if (block == 'gold' && this.pickaxeLvl === 3) {
      this.pickaxeLvl++;
      this.miningSpeed++;
    }
    if (block == 'diamond' && this.pickaxeLvl === 4) {
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
  restoreLevel() {
    this.locations[this.selectedLocation] = JSON.parse(
      JSON.stringify((data.locations as any)[this.selectedLocation])
    );
    this.rows = this.locations[this.selectedLocation];
  }
}
