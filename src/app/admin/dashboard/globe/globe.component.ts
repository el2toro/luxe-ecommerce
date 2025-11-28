import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild, signal } from '@angular/core';
import * as THREE from 'three'

@Component({
  selector: 'app-globe',
  templateUrl: './globe.component.html',
  styleUrls: ['./globe.component.scss'],
  imports: [CommonModule]
})
export class GlobeComponent implements AfterViewInit, OnInit, OnDestroy {
@ViewChild('globeContainer', { static: true }) container!: ElementRef<HTMLDivElement>;

  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private earth!: THREE.Mesh;
  private atmosphere!: THREE.Mesh;
  private animationId?: number;

  onlineCount = signal(8421);

  ngOnInit() {
    this.initGlobe();
  }

  ngAfterViewInit() {
  this.handleResize();
  window.addEventListener('resize', this.onResize);
}

ngOnDestroy() {
  window.removeEventListener('resize', this.onResize);
  if (this.animationId) cancelAnimationFrame(this.animationId);
  this.renderer?.dispose();
}

private onResize = () => {
  const container = this.container.nativeElement;
  const width = container.clientWidth;
  const height = 520;

  this.camera.aspect = width / height;
  this.camera.updateProjectionMatrix();
  this.renderer.setSize(width, height);
};

private handleResize() {
  this.onResize();
}

  private initGlobe() {
    const container = this.container.nativeElement;

    // Scene
    this.scene = new THREE.Scene();

    // Camera
    this.camera = new THREE.PerspectiveCamera(45, container.clientWidth / 520, 0.1, 1000);
    this.camera.position.z = 15;

    // Renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setSize(container.clientWidth, 520);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(this.renderer.domElement);

    this.handleResize();

    // === EARTH WITH INSTANT FALLBACK ===
    const geometry = new THREE.SphereGeometry(5, 64, 64);

    // Solid color material first (shows instantly
    const fallbackMaterial = new THREE.MeshPhongMaterial({
      color: 0x1e3a8a,
      emissive: 0x0f172a,
      shininess: 10
    });

    this.earth = new THREE.Mesh(geometry, fallbackMaterial);
    this.scene.add(this.earth);

    // Try to load real texture — if it fails, we keep the beautiful fallback
    const loader = new THREE.TextureLoader();
    loader.load(
      'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_atmos_2048.jpg',
      (texture) => {
        this.earth.material = new THREE.MeshPhongMaterial({
          map: texture,
          bumpScale: 0.05,
          specular: new THREE.Color('grey'),
          shininess: 15
        });
      },
      undefined,
      () => {
        console.log('Texture failed — using luxury dark blue Earth (still looks elite)');
      }
    );

    // === ATMOSPHERE GLOW ===
    const atmGeo = new THREE.SphereGeometry(5.35, 64, 64);
    const atmMat = new THREE.MeshBasicMaterial({
      color: 0xc77dff,
      transparent: true,
      opacity: 0.12,
      side: THREE.BackSide
    });
    this.atmosphere = new THREE.Mesh(atmGeo, atmMat);
    this.scene.add(this.atmosphere);

    // === LIGHTS ===
    const ambient = new THREE.AmbientLight(0x404040, 1.2);
    this.scene.add(ambient);
    const light = new THREE.PointLight(0xffffff, 1.8);
    light.position.set(10, 8, 10);
    this.scene.add(light);

    // === MARKERS ===
    this.addMarker(40.7, -74, 'New York');
    this.addMarker(48.8, 2.3, 'Paris');
    this.addMarker(25.2, 55.3, 'Dubai');
    this.addMarker(35.7, 139.7, 'Tokyo');
    this.addMarker(51.5, -0.1, 'London');

    // === START ANIMATION IMMEDIATELY ===
    this.animate();

    // Live counter
    setInterval(() => {
      this.onlineCount.update(n => n + Math.floor(Math.random() * 60 - 30));
    }, 3500);
  }

  private addMarker(lat: number, lon: number, city: string) {
    const { x, y, z } = this.latLonToVector3(lat, lon, 5.2);

    const marker = new THREE.Mesh(
      new THREE.SphereGeometry(0.15, 16, 16),
      new THREE.MeshBasicMaterial({ color: 0xc77dff })
    );
    marker.position.set(x, y, z);
    this.scene.add(marker);

    const glow = new THREE.Mesh(
      new THREE.SphereGeometry(0.35, 16, 16),
      new THREE.MeshBasicMaterial({ color: 0xc77dff, transparent: true, opacity: 0.4 })
    );
    glow.position.set(x, y, z);
    this.scene.add(glow);
  }

  private animate = () => {
    this.animationId = requestAnimationFrame(this.animate);

    this.earth.rotation.y += 0.002;
    this.atmosphere.rotation.y += 0.0016;

    this.renderer.render(this.scene, this.camera);
  };

  private latLonToVector3(lat: number, lon: number, radius: number) {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lon + 180) * (Math.PI / 180);

    return {
      x: -(radius * Math.sin(phi) * Math.cos(theta)),
      y: radius * Math.cos(phi),
      z: radius * Math.sin(phi) * Math.sin(theta)
    };
  }
}
