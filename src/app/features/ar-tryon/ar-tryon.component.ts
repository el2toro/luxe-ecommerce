import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Input, OnChanges, OnDestroy, signal, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-ar-tryon',
  templateUrl: './ar-tryon.component.html',
  styleUrls: ['./ar-tryon.component.scss'],
  imports: [MatIconModule, CommonModule]
})
export class ArTryonComponent implements AfterViewInit, OnDestroy, OnChanges {
@ViewChild('arContainer', { static: true }) container!: ElementRef<HTMLDivElement>;
@Input() product: any = {}; // ← THIS IS THE PROBLEM LINE

  // Convert to signal so template can read it safely
  productSignal = signal<any>({ name: 'Loading...', price: 0, gltfUrl: '', type: '' });
  isReady = signal(false);
  isTracking = signal(false);

  private mindAR: any;

  ngAfterViewInit() {
    this.loadMindAR();
  }

  // CRITICAL: Update signal when @Input changes
  ngOnChanges() {
    if (this.product) {
      this.productSignal.set(this.product);
    }
  }

  async loadMindAR() {
    // Load MindAR scripts
    await this.loadScript('https://cdn.jsdelivr.net/npm/mind-ar@1.2.5/dist/mindar-image.prod.js');
    await this.loadScript('https://aframe.io/releases/1.3.0/aframe.min.js');
    await this.loadScript('https://cdn.jsdelivr.net/npm/mind-ar@1.2.5/dist/mindar-image-aframe.prod.js');

    this.initAR();
  }

  private loadScript(src: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = () => resolve();
      script.onerror = () => reject();
      document.head.appendChild(script);
    });
  }

  private initAR() {
    const sceneEl = document.createElement('a-scene');
  sceneEl.setAttribute('mindar-image', `
    imageTargetSrc: /assets/ar/targets/tryon.mind;
    maxTrack: 1;
    filterMinCF: 0.0001;
    filterBeta: 0.01;
  `);
  sceneEl.setAttribute('renderer', 'colorManagement: true, physicallyCorrectLights: true');
  sceneEl.setAttribute('vr-mode-ui', 'enabled: false');
  sceneEl.setAttribute('device-orientation-permission-ui', 'enabled: false');

  // ASSETS — THIS IS THE KEY FIX
  const assets = document.createElement('a-assets');
  assets.setAttribute('timeout', '15000'); // Wait up to 15s for GLB

  const modelAsset = document.createElement('a-asset-item');
  modelAsset.id = 'model';
  modelAsset.setAttribute('src', this.product.gltfUrl || '/assets/ar/models/sunglasses.glb');
  
  // CRITICAL: Listen for load event before using #model
  modelAsset.addEventListener('loaded', () => {
    console.log('GLB loaded — AR ready');
    this.isReady.set(true);
  });

  modelAsset.addEventListener('error', () => {
    console.error('GLB failed to load');
    this.isReady.set(true); // Still show UI even if model fails
  });

  assets.appendChild(modelAsset);
  sceneEl.appendChild(assets);

  // ANCHOR + MODEL
  const anchor = document.createElement('a-entity');
  anchor.setAttribute('mindar-image-anchor', 'targetIndex: 0');

  const modelEntity = document.createElement('a-entity');
  modelEntity.setAttribute('gltf-model', '#model');
  modelEntity.setAttribute('scale', this.product.type === 'sunglasses' ? '0.8 0.8 0.8' : '0.5 0.5 0.5');
  modelEntity.setAttribute('position', this.product.type === 'sunglasses' ? '0 0.08 -0.25' : '0 0 0');
  modelEntity.setAttribute('rotation', '0 0 0');

  anchor.appendChild(modelEntity);
  sceneEl.appendChild(anchor);

  // Append to DOM
  this.container.nativeElement.appendChild(sceneEl);

  // Events
  sceneEl.addEventListener('targetFound', () => this.isTracking.set(true));
  sceneEl.addEventListener('targetLost', () => this.isTracking.set(false));
  }

  toggleCamera() {
    // MindAR doesn't support switch yet — future enhancement
  }

  capture() {
    // Take screenshot of AR view
    alert('Captured! Share your $48,500 look');
  }

  addToCart() {
    alert(`Added ${this.product.name} to cart — $${this.product.price.toLocaleString()}`);
  }

  close() {
    this.container.nativeElement.remove();
  }

  ngOnDestroy() {
    this.close();
  }
}
