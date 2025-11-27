import { Component, signal, effect, CUSTOM_ELEMENTS_SCHEMA, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';

import { MatIconModule } from '@angular/material/icon';
import { BottomNavComponent } from '../../layout/bottom-nav/bottom-nav.component';
import { HeaderComponent } from '../../layout/header/header.component';
import { CommonModule } from '@angular/common';
//import { MindARThree } from 'mind-ar/dist/mindar-image-three.prod.js';
import { WebGLRenderer, Scene, PerspectiveCamera, Group  } from "three";

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';



@Component({
  selector: 'app-ar.page',
  imports: [BottomNavComponent, HeaderComponent, CommonModule, MatIconModule],
  templateUrl: './ar.page.html',
  styleUrl: './ar.page.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ArPage implements AfterViewInit, OnDestroy {
@ViewChild('arContainer') arContainer!: ElementRef<HTMLDivElement>;

  selectedProduct = signal(1);
  detected = signal(false);
  //private mindarThree!: MindARThree;
  private renderer!: WebGLRenderer;
  private scene!: Scene;
  private camera!: PerspectiveCamera;
  private currentModel: Group | null = null;

  products = [
    { id: 1, name: 'Aviator Frames', thumb: 'https://images.unsplash.com/photo-1574258492283-574a1441dcfc?w=200', model: '/assets/ar/sunglasses.glb' },
    { id: 2, name: 'Tailored Blazer', thumb: 'https://images.unsplash.com/photo-1596755092358-87e503d79f3c?w=200', model: '/assets/ar/blazer.glb' },
    { id: 3, name: 'Silk Dress', thumb: 'https://images.unsplash.com/photo-1594223272480-4479c2c2f1aa?w=200', model: '/assets/ar/dress.glb' }
  ];

  constructor() {
    // Reactive effect for product changes
    effect(() => {
      const productId = this.selectedProduct();
      this.loadModelForProduct(productId);
    });
  }

  ngAfterViewInit() {
    this.initAR();
  }

  ngOnDestroy() {
   // this.mindarThree?.stop();
    this.renderer.dispose();
  }

  private async initAR() {
    const container = this.arContainer.nativeElement;

    // Init MindAR
    // this.mindarThree = new MindARThree({
    //   container,
    //   imageTargetSrc: '/assets/ar/targets.mind',  // Your face/image target
    //   filterMinCF: 0.001,
    //   filterBeta: 1000,
    //   uiLoading: 'no',
    //   uiScanning: 'no'
    // });

   // const { renderer, scene, camera } = this.mindarThree;
    // this.renderer = renderer;
    // this.scene = scene;
    // this.camera = camera;

    // Anchor for face detection
   // const anchor = this.mindarThree.addAnchor(0);  // Index 0 for face target

    // Load initial model
    this.loadModelForProduct(this.selectedProduct());

    // Detection callback
    // anchor.onTargetFound = () => {
    //   this.detected.set(true);
    // };
    // anchor.onTargetLost = () => {
    //   this.detected.set(false);
    // };

    // await this.mindarThree.start();
    // this.renderer.setAnimationLoop(() => {
    //   this.renderer.render(this.scene, this.camera);
    // });
  }

  private loadModelForProduct(productId: number) {
    const product = this.products.find(p => p.id === productId);
    //if (!product || !this.mindarThree) return;

    // Remove old model
    if (this.currentModel) {
    //  this.mindarThree.renderer.scene.remove(this.currentModel);
      this.currentModel.clear();  // Custom clear if needed
    }

    const loader = new GLTFLoader();
    // loader.load(product.model, (gltf) => {
    //   this.currentModel = gltf.scene;
    //   this.currentModel?.scale.set(0.5, 0.5, 0.5);  // Scale for face
    //   this.currentModel?.position.set(0, -0.3, 0.1);  // Position on face
    //   this.mindarThree.renderer.scene.add(this.currentModel);
    // });
  }

  close() {
    window.history.back();
  }

  toggleCamera() {
    // Switch to back camera if supported
    //this.mindarThree.camera.switchCamera(1);  // 0=front, 1=back
  }

  capture() {
    // Capture canvas to image (add to gallery/wishlist)
    const link = document.createElement('a');
    link.download = 'ar-tryon.png';
    link.href = this.renderer.domElement.toDataURL();
    link.click();
    // Or emit to parent for wishlist integration
  }
}
