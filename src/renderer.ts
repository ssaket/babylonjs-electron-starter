import * as BABYLON from 'babylonjs';
import 'babylonjs-materials';
import 'babylonjs-loaders';

export default class Renderer {
    private _canvas: HTMLCanvasElement;
    private _engine: BABYLON.Engine;
    private _scene: BABYLON.Scene;

    createScene(canvas: HTMLCanvasElement, engine: BABYLON.Engine) {
        this._canvas = canvas;

        this._engine = engine;

        // This creates a basic Babylon Scene object (non-mesh)
        const scene = new BABYLON.Scene(engine);
        this._scene = scene;

        // This creates and positions a free camera (non-mesh)
        const camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 50, -100), scene);
        camera.attachControl(canvas, true);
        
        //light
        const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 10, 0), scene);
        light.intensity = 0.8;
        
        // Fur material
        var furMaterial = new BABYLON.FurMaterial("furD", scene);
        furMaterial.highLevelFur = false;
        furMaterial.furLength = 3; // Represents the maximum length of the fur, which is then adjusted randomly. Default value is 1.
        furMaterial.furAngle = Math.PI/6; // Represents the angle the fur lies on the mesh from 0 to Math.PI/2. The default angle of 0 gives fur sticking straight up and PI/2 lies along the mesh.

        var sphere = BABYLON.Mesh.CreateSphere("sphere", 200, 8, scene);
        sphere.material = furMaterial;

        //loader test
        BABYLON.SceneLoader.ImportMesh("", "assets/Dude/", "dude.babylon", scene, function (newMeshes) {
            // CHECK IF LOADED
            if(newMeshes.length !== 0 ) console.log("loaded", newMeshes);
        });
    }

    initialize(canvas: HTMLCanvasElement) {
        const engine = new BABYLON.Engine(canvas, true);
        this.createScene(canvas, engine);

        engine.runRenderLoop(() => {
            this._scene.render();
        });

        window.addEventListener('resize', function () {
            engine.resize();
        });
    }
}

const renderer = new Renderer();
renderer.initialize(document.getElementById('render-canvas') as HTMLCanvasElement);