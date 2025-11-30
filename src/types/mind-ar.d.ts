declare module 'mind-ar/dist/mindar-image-three.prod.js' {
  export class MindARThree {
    constructor(options: any);
    start(): Promise<void>;
    stop(): void;
    addAnchor(index: number): any;
    renderer: any;
    scene: any;
    camera: any;
  }
}

declare module 'mind-ar/dist/mindar-face-three.prod.js' {
  export class MindARThree {
    constructor(options: any);
    start(): Promise<void>;
    stop(): void;
    addAnchor(index: number): any;
    renderer: any;
    scene: any;
    camera: any;
  }
}

declare module 'three/examples/jsm/loaders/GLTFLoader' {
  import { Loader } from 'three';
  export class GLTFLoader extends Loader {
    constructor();
    load(
      url: string,
      onLoad: (gltf: any) => void,
      onProgress?: (event: ProgressEvent) => void,
      onError?: (event: ErrorEvent) => void
    ): void;
  }
}
