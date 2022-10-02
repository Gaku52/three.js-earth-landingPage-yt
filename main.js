window.addEventListener("load", init);

function init() {
  /* サイズ作成 */
  const width = 960;
  const height = 540;
  let rot = 0;

  /* シーン作成 */
  const scene = new THREE.Scene();

  /* カメラ作成 */
  const camera = new THREE.PerspectiveCamera( 45, width / height);
  camera.position.z = 1000;

  /* レンダラー作成 */
  const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector("#myCanvas"),
  });
  renderer.setSize( window.innerWidth, window.innerHeight );

  /* 球体生成 */
  const geometry = new THREE.SphereGeometry( 15, 32, 16 );

  /* マテリアル作成、材質設定 */
  const material = new THREE.MeshBasicMaterial({
    map: new THREE.TextureLoader().load("textures/earthmap1k.jpg"),
  });
  /* メッシュ作成 */
  const earth = new THREE.Mesh( geometry, material );
  scene.add( earth );

  /* 平行光源 */
  const DirectionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
  DirectionalLight.position.set( 0, 1, 0 ); //default; light shining from top
  DirectionalLight.castShadow = true; // default false
  scene.add( DirectionalLight );

  /* ポイント光源 */
  const pointLight = new THREE.PointLight( 0xff0000, 1, 100 );
  pointLight.position.set( 50, 50, 50 );
  scene.add( pointLight );
  const pointLightHelper = new THREE.PointLightHelper( pointLight, 30 );
  scene.add( pointLightHelper );

  /* フレーム毎に呼び出される関数 */
  function tick() {
    rot += 0.5;
    /* ラジアン変換 */
    const radian = (rot * Math.PI) / 180;

  /* 角度に応じてカメラの位置を変更する */
  camera.position.x = 1000 * Math.sin(radian);

  /* ライトを周回させる */
  pointLight.position.set(
    500 * Math.sin(Date.now() / 500 ),
    500 * Math.sin(Date.now() / 1000 ),
    500 * Math.cos(Date.now() / 500 )
  );

  /* レンダリング */
  renderer.render(scene, camera);
  requestAnimationFrame(tick);
  }

  tick();

  // document.body.appendChild( renderer.domElement );
}