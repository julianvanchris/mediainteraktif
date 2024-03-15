let canvas;
let simCanvasCermin, simCanvasLensa;
let currentTitle = null;
let mirrorType = null;
let objectType = null;
let mirrorButtons, objectButtons;
let c1, c2;
let a, b;

let mirrorLayer;
let objectLayer;

let sliderCembung, sliderCekung, sliderIndeks;
let radiusText, focusText, focusP1, lengkungP1, focusP2, lengkungP2, indeksText, indeksbiasText;
let s, s_aks;
let activeSlider;

let formtext1, formtext_, formtext12, formtext_2, formtext13, formtext_3, formtext_s, formtext_s_aks, formtext_f;
let formtext_plus, formtext_equal1, formtext_equal2;

let checkbox;

let datarMirrorImg, cembungMirrorImg, cekungMirrorImg;
let kotakImg, kotakFlipImg, kotakInvertImg;
let segitigaImg, segitigaFlipImg, segitigaInvertImg;
let pensilImg, pensilInvertImg;
let apelImg, apelFlipImg, apelInvertImg;
let fokusImg;
let pusatlengkungImg;

var dragging = false;
var rollover = false;

var xKotak, yKotak, wKotak, hKotak;
var xSegitiga, ySegitiga, wSegitiga, hSegitiga;
var xPensil, yPensil, wPensil, hPensil;
var xApel, yApel, wApel, hApel;
var offsetX, offsetY;
var hCCembung, hCCekung;
var xCCembung, xCCekung;
var rCCembung, rCCekung;
var fCCembung, fCCekung;
var indCembung, indCekung;
var jarak;
var sJarak, s_aksJarak;
var indeksBias;
var x1, x2, x3, x4, x5, x6, x7, x8;
var y1, y2, y3, y4, y5, y6, y7, y8;
var m1, m2, m3, m4;
var b1, b2, b3, b4;
var M;
var xIntersect, yIntersect, xIntersect2, yIntersect2;

function preload() {
  cembungLensImg = loadImage('images/cembunglens.png');
  cekungLensImg = loadImage('images/cekunglens.png');
  kotakImg = loadImage('images/kotak.png');
  kotakFlipImg = loadImage('images/kotak_flipped.png')
  kotakInvertImg = loadImage('images/kotak_invert.png')
  segitigaImg = loadImage('images/segitiga.png');
  segitigaFlipImg = loadImage('images/segitiga_flipped.png')
  segitigaInvertImg = loadImage('images/segitiga_invert.png')
  pensilImg = loadImage('images/pensil.png');
  pensilInvertImg = loadImage('images/pensil_invert.png')
  apelImg = loadImage('images/apel.png');
  apelFlipImg = loadImage('images/apel_flipped.png');
  apelInvertImg = loadImage('images/apel_invert.png')
  fokusImg = loadImage('images/fokus.png');
  pusatlengkungImg = loadImage('images/pusatlengkung.png');
}

function setup() {
  canvas = createCanvas(1095, 450);
  canvas.parent("sim-canvas-container");
  angleMode(DEGREES);

  // c2 = color(63, 191, 191);
  c1 = color(255);
  c2 = color(63, 191, 191);
  c3 = color(240,220,130);
  c4 = color(123, 63, 0);

  mirrorLayer = createGraphics(width, height);
  objectLayer = createGraphics(width, height);

  sliderCembung = createSlider(200, 500, 400);
  sliderCekung = createSlider(200, 500, 300);
  sliderIndeks = createSlider(120, 180, 130);
  sliderCembung.parent("sim-canvas-container");
  sliderCembung.class("slider");
  sliderCekung.parent("sim-canvas-container");
  sliderCekung.class("slider");
  sliderIndeks.parent("sim-canvas-container");
  sliderIndeks.class("slider");
  sliderCembung.position(-2000, -2000);
  sliderCekung.position(-2000, -2000);
  sliderIndeks.position(-2000, -2000);

  sliderCembung.changed(() => {
    activeSlider = sliderCembung;
  });

  sliderCekung.changed(() => {
    activeSlider = sliderCekung;
  });

  sliderIndeks.changed(() => {
    activeSlider = sliderIndeks;
  });

  radiusText = createElement("p", 'Radius &nbsp;' + (sliderCekung.value()/2) + ' cm');
  radiusText.parent("sim-canvas-container");
  radiusText.position(-2000, -2000);
  focusText = createElement("p", 'Focus&nbsp;&nbsp;&nbsp; ' + (rCCekung / 2) / 2 + ' cm');
  focusText.parent("sim-canvas-container");
  focusText.position(-2000, -2000);
  indeksText = createElement("p", 'Indeks&nbsp;&nbsp;&nbsp; ' + (rCCekung / 2) / 2 + ' cm');
  indeksText.parent("sim-canvas-container");
  indeksText.position(-2000, -2000);
  indeksbiasText = createElement("p", 'Indeks&nbsp;&nbsp;&nbsp; ' + (rCCekung / 2) / 2 + ' cm');
  indeksbiasText.parent("sim-canvas-container");
  indeksbiasText.position(-2000, -2000);

  focusP = createElement("p", 'F');
  focusP.parent("sim-canvas-container");
  focusP.position(-2000, -2000);
  lengkungP = createElement("p", 'M');
  lengkungP.parent("sim-canvas-container");
  lengkungP.position(-2000, -2000);

  s = createElement("p", 's');
  s.parent("sim-canvas-container");
  s.position(-2000, -2000);

  s_aks = createElement("p", 's`');
  s_aks.parent("sim-canvas-container");
  s_aks.position(-2000, -2000);

  formtext1 = createElement("p", 'f');
  formtext1.parent("sim-canvas-container");
  formtext1.position(-2000, -2000);

  formtext_ = createElement("p", 'f');
  formtext_.parent("sim-canvas-container");
  formtext_.position(-2000, -2000);

  formtext12 = createElement("p", 'f');
  formtext12.parent("sim-canvas-container");
  formtext12.position(-2000, -2000);

  formtext_2 = createElement("p", 'f');
  formtext_2.parent("sim-canvas-container");
  formtext_2.position(-2000, -2000);

  formtext13 = createElement("p", 'f');
  formtext13.parent("sim-canvas-container");
  formtext13.position(-2000, -2000);

  formtext_3 = createElement("p", 'f');
  formtext_3.parent("sim-canvas-container");
  formtext_3.position(-2000, -2000);

  formtext_s = createElement("p", 'f');
  formtext_s.parent("sim-canvas-container");
  formtext_s.position(-2000, -2000);

  formtext_s_aks = createElement("p", 'f');
  formtext_s_aks.parent("sim-canvas-container");
  formtext_s_aks.position(-2000, -2000);

  formtext_f = createElement("p", 'f');
  formtext_f.parent("sim-canvas-container");
  formtext_f.position(-2000, -2000);

  formtext_plus = createElement("p", 'f');
  formtext_plus.parent("sim-canvas-container");
  formtext_plus.position(-2000, -2000);

  formtext_equal1 = createElement("p", 'f');
  formtext_equal1.parent("sim-canvas-container");
  formtext_equal1.position(-2000, -2000);

  formtext_equal2 = createElement("p", 'f');
  formtext_equal2.parent("sim-canvas-container");
  formtext_equal2.position(-2000, -2000);

  checkbox = createCheckbox('Formula', false);
  checkbox.parent("sim-canvas-container");
  checkbox.position(-2000, -2000);

  jarak = 300

  xKotak = width / 2 - jarak;
  yKotak = height / 2 - 100;
  wKotak = 50;
  hKotak = 100;

  xSegitiga = width / 2 - jarak;
  ySegitiga = height / 2 - 100;
  wSegitiga = 100;
  hSegitiga = 100;

  xPensil = width / 2 - jarak;
  yPensil = height / 2 - 150;
  wPensil = 130;
  hPensil = 157;

  xApel = width / 2 - jarak;
  yApel = height / 2 - 113;
  wApel = 120;
  hApel = 120;

  hCCembung = 400;
  hCCekung = 400;

  // rCCembung = 300;
  // fCCembung = rCCembung / 2;

  // rCCekung = 300;
  // fCCekung = rCCekung / 2;

  const canvasContainer = document.getElementById("sim-canvas-container");

  canvasContainer.scrollIntoView({ behavior: "smooth" });

  simCanvasCermin = select('#simCanvasCermin');
  simCanvasLensa = select('#simCanvasLensa');

  currentTitle = createElement("h2", "Simulasi Lensa");
  currentTitle.class(
    "animate__animated animate__fadeIn"
  );

  currentTitle.style("font-size", "60px");
  currentTitle.style("color", "#ffffff");

  currentTitle.parent("sim-canvas-container");

  currentTitle.position(
    canvas.position().x + 270,
    canvas.position().y - 80
  );

  select("#menuButton1").mousePressed(() => window.location.href = "index.html#lensa");
  // select("#menuButton3").mousePressed(() => window.location.href = "simulasilensa.html");

  const mirrorButtons = createDiv();
  mirrorButtons.class("animate__animated animate__fadeInRight");
  mirrorButtons.id("mirrorButtons");

  const objectButtons = createDiv();
  objectButtons.class("animate__animated animate__fadeInLeft");
  objectButtons.id("objectButtons");

  const cembungButton = createButton("Cembung");
  cembungButton.mousePressed(() => setMirrorType("Cembung"));

  const cekungButton = createButton("Cekung");
  cekungButton.mousePressed(() => setMirrorType("Cekung"));

  const clearButton = createButton("Clear");
  clearButton.mousePressed(() => setMirrorType("Clear"));

  const apelButton = createButton("Apel");
  apelButton.mousePressed(() => setObjectType("Apel"));

  const pensilButton = createButton("Pensil");
  pensilButton.mousePressed(() => setObjectType("Pensil"));

  const kotakButton = createButton("Kotak");
  kotakButton.mousePressed(() => setObjectType("Kotak"));

  const segitigaButton = createButton("Segitiga");
  segitigaButton.mousePressed(() => setObjectType("Segitiga"));

  const objclearButton = createButton("Clear");
  objclearButton.mousePressed(() => setObjectType("Clear"));

  mirrorButtons.child(cembungButton); 
  mirrorButtons.child(cekungButton);
  mirrorButtons.child(clearButton);

  objectButtons.child(apelButton);
  objectButtons.child(pensilButton);
  objectButtons.child(kotakButton);
  objectButtons.child(segitigaButton);
  objectButtons.child(objclearButton);

  mirrorButtons.parent("sim-canvas-container");
  mirrorButtons.position(
    canvas.position().x + 1100,
    canvas.position().y + 130
  );

  objectButtons.parent("sim-canvas-container");
  objectButtons.position(
    canvas.position().x - 195,
    canvas.position().y + 65
  );

  mirrorButtons.style("transform", "translateY(-50%)");
  objectButtons.style("transform", "translateY(-50%)");
}

function draw() {
  clear();
  image(mirrorLayer, 0, 0);
  image(objectLayer, 0, 0);
  mirrorLayer.stroke(0);
  mirrorLayer.line(0, height / 2, width, height / 2);

  mirrorLayer.stroke(0, 0, 0);
  mirrorLayer.line(width / 2, 0, width / 2 , height);
  
  if (mirrorType === "Cembung") {
    mirrorLayer.clear();
    mirrorLayer.stroke(0);
    mirrorLayer.line(0, height / 2, width, height / 2);
    mirrorLayer.stroke(0, 0, 0);
    mirrorLayer.line(width / 2, 0, width / 2 , height);
    sliderCembung.parent("sim-canvas-container");
    sliderCembung.position(950, 100);
    sliderIndeks.parent("sim-canvas-container");
    sliderIndeks.position(-20, 100);
    sliderCekung.parent("sim-canvas-container");
    sliderCekung.position(-2000, -2000);
    if (activeSlider === sliderCembung) {
      rCCembung = sliderCembung.value();
    } else {
      rCCembung = 1 / (sliderIndeks.value() / 60000);
    }
    wCCembung = sliderCembung.value();
    xCCembung = - sliderCembung.value();
    indeksBias = sliderIndeks.value() / 98;

    if (indeksText) {
      indeksText.remove();
    }
    indeksText = createElement("p", "Indeks Bias");
    indeksText.parent("sim-canvas-container");
    indeksText.style("font-size", "30px");
    indeksText.style("color", "#2B4162");
    indeksText.position(80, 10);
    if (indeksbiasText) {
      indeksbiasText.remove();
    }
    indeksbiasText = createElement("p", "" + round(indeksBias, 2));
    indeksbiasText.parent("sim-canvas-container");
    indeksbiasText.style("font-size", "30px");
    indeksbiasText.style("color", "#2B4162");
    indeksbiasText.position(80, 50);
    if (radiusText) {
      radiusText.remove();
    }
    radiusText = createElement("p", 'Radius &nbsp;' + round(rCCembung / 2, 2) + ' cm');
    radiusText.parent("sim-canvas-container");
    radiusText.style("font-size", "30px");
    radiusText.style("color", "#2B4162");
    radiusText.position(800, 30);
    if (focusText) {
      focusText.remove();
    }
    focusText = createElement("p", 'Focus&nbsp;&nbsp;&nbsp; ' + round((rCCembung / 2) / 2, 2) + ' cm');
    focusText.parent("sim-canvas-container");
    focusText.style("font-size", "30px");
    focusText.style("color", "#2B4162");
    focusText.position(800, 60);
    if (focusP1) {
      focusP1.remove();
    }
    focusP1 = createElement("p", 'F');
    focusP1.parent("sim-canvas-container");
    focusP1.style("font-size", "30px");
    focusP1.style("color", "#2B4162");
    focusP1.position(width / 2 + fCCembung - 5, height / 2);
    if (lengkungP1) {
      lengkungP1.remove();
    }
    lengkungP1 = createElement("p", 'M');
    lengkungP1.parent("sim-canvas-container");
    lengkungP1.style("font-size", "30px");
    lengkungP1.style("color", "#2B4162");
    lengkungP1.position(width / 2 + rCCembung - 5, height / 2);
    fCCembung = rCCembung / 2;
    if (focusP2) {
      focusP2.remove();
    }
    focusP2 = createElement("p", 'F');
    focusP2.parent("sim-canvas-container");
    focusP2.style("font-size", "30px");
    focusP2.style("color", "#2B4162");
    focusP2.position(width / 2 - fCCembung - 5, height / 2);
    if (lengkungP2) {
      lengkungP2.remove();
    }
    lengkungP2 = createElement("p", 'M');
    lengkungP2.parent("sim-canvas-container");
    lengkungP2.style("font-size", "30px");
    lengkungP2.style("color", "#2B4162");
    lengkungP2.position(width / 2 - rCCembung - 5, height / 2);
    fCCembung = rCCembung / 2;

    drawObjectImage(cembungLensImg, width / 2 - 2 + (xCCembung/8), height / 2 - 200, (wCCembung/4), hCCembung, indeksBias / 2);
    mirrorLayer.image(fokusImg, width / 2 + fCCembung + 5, height / 2 + 5, -10, -10);
    mirrorLayer.image(pusatlengkungImg, width / 2 + rCCembung + 5, height / 2 + 5, -10, -10);
    mirrorLayer.image(fokusImg, width / 2 - fCCembung + 5, height / 2 + 5, -10, -10);
    mirrorLayer.image(pusatlengkungImg, width / 2 - rCCembung + 5, height / 2 + 5, -10, -10);
  }
  else if (mirrorType === "Cekung") {
    mirrorLayer.clear();
    mirrorLayer.stroke(0);
    mirrorLayer.line(0, height / 2, width, height / 2);
    mirrorLayer.stroke(0, 0, 0);
    mirrorLayer.line(width / 2, 0, width / 2 , height);
    sliderCekung.parent("sim-canvas-container");
    sliderCekung.position(950, 100);
    sliderIndeks.parent("sim-canvas-container");
    sliderIndeks.position(-20, 100);
    sliderCembung.parent("sim-canvas-container");
    sliderCembung.position(-2000, -2000);
    if (activeSlider === sliderCekung) {
      rCCekung = sliderCekung.value();
    } else {
      rCCekung = 1 / (sliderIndeks.value() / 60000);
    }
    wCCekung = sliderCekung.value();
    xCCekung = - sliderCekung.value();
    indeksBias = sliderIndeks.value() / 98;

    if (indeksText) {
      indeksText.remove();
    }
    indeksText = createElement("p", "Indeks Bias");
    indeksText.parent("sim-canvas-container");
    indeksText.style("font-size", "30px");
    indeksText.style("color", "#2B4162");
    indeksText.position(80, 10);
    if (indeksbiasText) {
      indeksbiasText.remove();
    }
    indeksbiasText = createElement("p", "" + round(indeksBias, 2));
    indeksbiasText.parent("sim-canvas-container");
    indeksbiasText.style("font-size", "30px");
    indeksbiasText.style("color", "#2B4162");
    indeksbiasText.position(80, 50);
    if (radiusText) {
      radiusText.remove();
    }
    radiusText = createElement("p", 'Radius &nbsp;' + round(rCCekung / 2, 2) + ' cm');
    radiusText.parent("sim-canvas-container");
    radiusText.style("font-size", "30px");
    radiusText.style("color", "#2B4162");
    radiusText.position(800, 30);
    if (focusText) {
      focusText.remove();
    }
    focusText = createElement("p", 'Focus&nbsp;&nbsp;&nbsp; ' + round((rCCekung / 2) / 2, 2) + ' cm');
    focusText.parent("sim-canvas-container");
    focusText.style("font-size", "30px");
    focusText.style("color", "#2B4162");
    focusText.position(800, 60);
    if (focusP1) {
      focusP1.remove();
    }
    focusP1 = createElement("p", 'F');
    focusP1.parent("sim-canvas-container");
    focusP1.style("font-size", "30px");
    focusP1.style("color", "#2B4162");
    focusP1.position(width / 2 + fCCekung - 5, height / 2);
    if (lengkungP1) {
      lengkungP1.remove();
    }
    lengkungP1 = createElement("p", 'M');
    lengkungP1.parent("sim-canvas-container");
    lengkungP1.style("font-size", "30px");
    lengkungP1.style("color", "#2B4162");
    lengkungP1.position(width / 2 + rCCekung - 5, height / 2);
    fCCekung = rCCekung / 2;
    if (focusP2) {
      focusP2.remove();
    }
    focusP2 = createElement("p", 'F');
    focusP2.parent("sim-canvas-container");
    focusP2.style("font-size", "30px");
    focusP2.style("color", "#2B4162");
    focusP2.position(width / 2 - fCCekung - 5, height / 2);
    if (lengkungP2) {
      lengkungP2.remove();
    }
    lengkungP2 = createElement("p", 'M');
    lengkungP2.parent("sim-canvas-container");
    lengkungP2.style("font-size", "30px");
    lengkungP2.style("color", "#2B4162");
    lengkungP2.position(width / 2 - rCCekung - 5, height / 2);
    fCCekung = rCCekung / 2;

    drawObjectImage(cekungLensImg, width / 2 - 2 + (xCCekung/8), height / 2 - 200, (wCCekung/4), hCCekung, indeksBias / 2);
    mirrorLayer.image(fokusImg, width / 2 - fCCekung + 5, height / 2 + 5, -10, -10);
    mirrorLayer.image(pusatlengkungImg, width / 2 - rCCekung + 5, height / 2 + 5, -10, -10);
    mirrorLayer.image(fokusImg, width / 2 + fCCekung + 5, height / 2 + 5, -10, -10);
    mirrorLayer.image(pusatlengkungImg, width / 2 + rCCekung + 5, height / 2 + 5, -10, -10);
  }
  else if (mirrorType === "Clear") {
    mirrorLayer.clear()
    mirrorLayer.stroke(0);
    mirrorLayer.line(0, height / 2, width, height / 2);
    mirrorLayer.stroke(0, 0, 0);
    mirrorLayer.line(width / 2, 0, width / 2 , height);

    sliderCembung.remove();
    sliderCekung.remove();
    sliderIndeks.remove();
    radiusText.remove();
    focusText.remove();
    indeksText.remove();
    indeksText.remove();
    indeksbiasText.remove();
    focusP1.remove();
    lengkungP1.remove();
    focusP2.remove();
    lengkungP2.remove();
    s.remove();
    s_aks.remove();
    checkbox.remove();
    formtext1.remove();
    formtext_.remove();
    formtext12.remove();
    formtext_2.remove();
    formtext13.remove();
    formtext_3.remove();
    formtext_s.remove();
    formtext_s_aks.remove();
    formtext_f.remove();
    formtext_plus.remove();
    formtext_equal1.remove();
    formtext_equal2.remove();
    s = createElement("p", 's');
    s.parent("sim-canvas-container");
    s.position(-2000, -2000);
    s_aks = createElement("p", 's`');
    s_aks.parent("sim-canvas-container");
    s_aks.position(-2000, -2000);
    checkbox = createCheckbox('Formula', false);
    checkbox.parent("sim-canvas-container");
    checkbox.position(-2000, -2000);
    formtext1 = createElement("p", 'f');
    formtext1.parent("sim-canvas-container");
    formtext1.position(-2000, -2000);
    formtext_ = createElement("p", 'f');
    formtext_.parent("sim-canvas-container");
    formtext_.position(-2000, -2000);
    formtext12 = createElement("p", 'f');
    formtext12.parent("sim-canvas-container");
    formtext12.position(-2000, -2000);
    formtext_2 = createElement("p", 'f');
    formtext_2.parent("sim-canvas-container");
    formtext_2.position(-2000, -2000);
    formtext13 = createElement("p", 'f');
    formtext13.parent("sim-canvas-container");
    formtext13.position(-2000, -2000);
    formtext_3 = createElement("p", 'f');
    formtext_3.parent("sim-canvas-container");
    formtext_3.position(-2000, -2000);
    formtext_s = createElement("p", 'f');
    formtext_s.parent("sim-canvas-container");
    formtext_s.position(-2000, -2000);
    formtext_s_aks = createElement("p", 'f');
    formtext_s_aks.parent("sim-canvas-container");
    formtext_s_aks.position(-2000, -2000);
    formtext_f = createElement("p", 'f');
    formtext_f.parent("sim-canvas-container");
    formtext_f.position(-2000, -2000);
    formtext_plus = createElement("p", 'f');
    formtext_plus.parent("sim-canvas-container");
    formtext_plus.position(-2000, -2000);
    formtext_equal1 = createElement("p", 'f');
    formtext_equal1.parent("sim-canvas-container");
    formtext_equal1.position(-2000, -2000);
    formtext_equal2 = createElement("p", 'f');
    formtext_equal2.parent("sim-canvas-container");
    formtext_equal2.position(-2000, -2000);
    sliderCembung = createSlider(200, 500, 400);
    sliderCekung = createSlider(200, 500, 300);
    sliderCembung.parent("sim-canvas-container");
    sliderCembung.class("slider");
    sliderCekung.parent("sim-canvas-container");
    sliderCekung.class("slider");
    sliderCembung.position(-2000, -2000);
    sliderCekung.position(-2000, -2000);
    radiusText = createElement("p", 'Radius &nbsp;' + (sliderCekung.value()/2) + ' cm');
    radiusText.parent("sim-canvas-container");
    radiusText.position(-2000, -2000);
    focusText = createElement("p", 'Focus&nbsp;&nbsp;&nbsp; ' + (rCCekung / 2) / 2 + ' cm');
    focusText.parent("sim-canvas-container");
    focusText.position(-2000, -2000);
    focusP1 = createElement("p", 'F');
    focusP1.parent("sim-canvas-container");
    focusP1.position(-2000, -2000);
    lengkungP1 = createElement("p", 'M');
    lengkungP1.parent("sim-canvas-container");
    lengkungP1.position(-2000, -2000);
    focusP2 = createElement("p", 'F');
    focusP2.parent("sim-canvas-container");
    focusP2.position(-2000, -2000);
    lengkungP2 = createElement("p", 'M');
    lengkungP2.parent("sim-canvas-container");
    lengkungP2.position(-2000, -2000);
    sliderIndeks = createSlider(120, 180, 130);
    sliderIndeks.parent("sim-canvas-container");
    sliderIndeks.class("slider");
    sliderIndeks.position(-2000, -2000);
    indeksText = createElement("p", 'Indeks&nbsp;&nbsp;&nbsp; ' + (rCCekung / 2) / 2 + ' cm');
    indeksText.parent("sim-canvas-container");
    indeksText.position(-2000, -2000);
    indeksbiasText = createElement("p", 'Indeks&nbsp;&nbsp;&nbsp; ' + (rCCekung / 2) / 2 + ' cm');
    indeksbiasText.parent("sim-canvas-container");
    indeksbiasText.position(-2000, -2000);
  }
  if (objectType === "Kotak") {
    objectLayer.clear();
    objectLayer.stroke(0);
    objectLayer.line(0, height / 2, width, height / 2);
    objectLayer.stroke(0, 0, 0);
    objectLayer.line(width / 2, 0, width / 2 , height);

    if (mouseX > xKotak && mouseX < xKotak + wKotak && mouseY > yKotak && mouseY < yKotak + hKotak) {
      rollover = true;
      cursor(HAND);
    } else {
      rollover = false;
      cursor(ARROW);
    }
  
    if (dragging) {
      if (mirrorType === "Cembung") {
        xKotak = constrain(mouseX + offsetX, 0, width / 2 - wKotak - 40);
        yKotak = height / 2 - 100;
      } else if (mirrorType === "Cekung") {
        xKotak = constrain(mouseX + offsetX, 0, width / 2 - wKotak - 40);
        yKotak = height / 2 - 100;
      } else {
        xKotak = constrain(mouseX + offsetX, 0, width / 2 - wKotak);
        yKotak = height / 2 - 100;
      }
    }

    objectLayer.image(kotakImg, xKotak, yKotak, wKotak, hKotak);

    if (mirrorType === "Cembung"){
      let xRayStart = xKotak + wKotak / 2;
      let yRayStart = yKotak;
      
      mirrorLayer.stroke(0, 0, 0);
      mirrorLayer.strokeWeight(2);
      mirrorLayer.line(xRayStart, yRayStart, width / 2, yRayStart);
      mirrorLayer.strokeWeight(1);

      mirrorLayer.stroke(0, 0, 0);
      mirrorLayer.strokeWeight(2);
      mirrorLayer.line(width / 2 + fCCembung, height / 2, width / 2, yRayStart);
      mirrorLayer.strokeWeight(1);

      let angle = atan2(height / 2 - yRayStart, width / 2 - (width / 2 + fCCembung));

      let extendedLength = 1000;
      let extendedX = width / 2 + fCCembung - extendedLength * cos(angle);
      let extendedY = height / 2 + extendedLength * sin(angle);      

      mirrorLayer.stroke(0, 0, 0);
      mirrorLayer.strokeWeight(2);
      mirrorLayer.line(width / 2 + fCCembung, height / 2, extendedX, extendedY);
      mirrorLayer.strokeWeight(1);

      mirrorLayer.stroke(0, 0, 0);
      mirrorLayer.strokeWeight(2);
      mirrorLayer.line(width / 2, height / 2, xRayStart, yRayStart);
      mirrorLayer.strokeWeight(1);

      let angle2 = atan2(height / 2 - yRayStart, xRayStart - width / 2);

      let extendedLength2 = 1000;
      let extendedX2 = width / 2 - extendedLength2 * cos(angle2);
      let extendedY2 = height / 2 + extendedLength * sin(angle2);      

      mirrorLayer.stroke(0, 0, 0);
      mirrorLayer.strokeWeight(2);
      mirrorLayer.line(width / 2, height / 2, extendedX2, extendedY2);
      mirrorLayer.strokeWeight(1);

      if (xKotak <= width / 2 - fCCembung - 70) {
        mirrorLayer.stroke(0, 0, 0);
        mirrorLayer.strokeWeight(2);
        mirrorLayer.line(xRayStart, yRayStart, width / 2 - fCCembung, height / 2);
        mirrorLayer.strokeWeight(1);

        let angle2 = atan2(yRayStart - height / 2, width / 2 - fCCembung - xRayStart);

        let extendedLength2 = 2000;
        let extendedX2 = xRayStart + extendedLength2 * cos(angle2);
        let extendedY2 = yRayStart - extendedLength2 * sin(angle2);

        mirrorLayer.stroke(0, 0, 0);
        mirrorLayer.strokeWeight(2);
        mirrorLayer.line(width / 2 - fCCembung, height / 2, extendedX2, extendedY2);
        mirrorLayer.strokeWeight(1);

        x1 = width / 2 - fCCembung;
        x2 = extendedX2;
        y1 = height / 2;
        y2 = extendedY2;
  
        m1 = (y2 - y1)/(x2 - x1);
        b1 = y1 - (m1 * x1);

        x3 = width / 2;
        x4 = width / 2 - 1;
        y3 = 0;
        y4 = height;
  
        m2 = (y4 - y3)/(x4 - x3);
        b2 = y3 - (m2 * x3);
  
        xIntersect = (b2 - b1)/(m1 - m2);
        yIntersect = (m2 * xIntersect) + b2 - 2;

        mirrorLayer.stroke(0, 0, 0);
        mirrorLayer.strokeWeight(2);
        mirrorLayer.line(width / 2, yIntersect, width, yIntersect);
        mirrorLayer.strokeWeight(1);

        x5 = width / 2;
        x6 = 0;
        y5 = yIntersect;
        y6 = yIntersect;

        m3 = (y6 - y5)/(x6 - x5);
        b3 = y5 - (m3 * x5);

        x7 = width / 2 - fCCembung;
        x8 = extendedX;
        y7 = height / 2;
        y8 = extendedY;

        m4 = (y8 - y7)/(x8 - x7);
        b4 = y7 - (m4 * x7);

        xIntersect2 = (b4 - b3)/(m3 - m4);
        yIntersect2 = (m4 * xIntersect2) + b4;

        x5 = width / 2;
        x6 = width;
        y5 = yIntersect;
        y6 = yIntersect;

        m3 = (y6 - y5)/(x6 - x5);
        b3 = y5 - (m3 * x5);

        x7 = width / 2 + fCCembung;
        x8 = extendedX;
        y7 = height / 2;
        y8 = extendedY;

        m4 = (y8 - y7)/(x8 - x7);
        b4 = y7 - (m4 * x7);

        xIntersect2 = (b4 - b3)/(m3 - m4);
        yIntersect2 = (m4 * xIntersect2) + b4;

        checkbox.parent("sim-canvas-container");
        checkbox.position(0, -50);

        const formula = checkbox.checked();
    
        if (formula) {
          if (s) {
            s.remove();
          }
      
          sJarak = (map(xKotak, 417.5, 0, 52, 265));
          s = createElement("p", 's &nbsp;' + nf(sJarak, 1, 2) + ' cm');
          s.parent("sim-canvas-container");
          s.style("font-size", "30px");
          s.style("color", "#2B4162");
          s.position(733, 275);
    
          if (s_aks) {
            s_aks.remove();
          }
      
          s_aksJarak = (map(xIntersect2 -25, 417.5, 0, 52, 265));
          s_aks = createElement("p", 's` &nbsp;' + nf(s_aksJarak, 1, 2) + ' cm');
          s_aks.parent("sim-canvas-container");
          s_aks.style("font-size", "30px");
          s_aks.style("color", "#2B4162");
          s_aks.position(733, 300);
  
          if (formtext1) {
            formtext1.remove();
          }
    
          formtext1 = createElement("p", '1');
          formtext1.parent("sim-canvas-container");
          formtext1.position(47, 270);
          formtext1.style("font-size", "30px");
          formtext1.style("color", "#2B4162");
  
          if (formtext_) {
            formtext_.remove();
          }
  
          formtext_ = createElement("p", '__');
          formtext_.parent("sim-canvas-container");
          formtext_.position(40, 280);
          formtext_.style("font-size", "30px");
          formtext_.style("color", "#2B4162");
  
          if (formtext_s) {
            formtext_s.remove();
          }
  
          formtext_s = createElement("p", nf(sJarak, 1, 2));
          formtext_s.parent("sim-canvas-container");
          formtext_s.position(20, 315);
          formtext_s.style("font-size", "30px");
          formtext_s.style("color", "#2B4162");
          
          if (formtext_plus) {
            formtext_plus.remove();
          }
  
          formtext_plus = createElement("p", '+');
          formtext_plus.parent("sim-canvas-container");
          formtext_plus.position(110, 275);
          formtext_plus.style("font-size", "50px");
          formtext_plus.style("color", "#2B4162");
  
          if (formtext12) {
            formtext12.remove();
          }
  
          formtext12 = createElement("p", '1');
          formtext12.parent("sim-canvas-container");
          formtext12.position(165, 270);
          formtext12.style("font-size", "30px");
          formtext12.style("color", "#2B4162");
  
          if (formtext_2) {
            formtext_2.remove();
          }
  
          formtext_2 = createElement("p", '__');
          formtext_2.parent("sim-canvas-container");
          formtext_2.position(157, 280);
          formtext_2.style("font-size", "30px");
          formtext_2.style("color", "#2B4162");
  
          if (formtext_s_aks) {
            formtext_s_aks.remove();
          }
  
          formtext_s_aks = createElement("p", nf(s_aksJarak, 1, 2));
          formtext_s_aks.parent("sim-canvas-container");
          formtext_s_aks.position(140, 315);
          formtext_s_aks.style("font-size", "30px");
          formtext_s_aks.style("color", "#2B4162");
  
          if (formtext_equal1) {
            formtext_equal1.remove();
          }
  
          formtext_equal1 = createElement("p", '~');
          formtext_equal1.parent("sim-canvas-container");
          formtext_equal1.position(220, 270);
          formtext_equal1.style("font-size", "50px");
          formtext_equal1.style("color", "#2B4162");
  
          if (formtext_equal2) {
            formtext_equal2.remove();
          }
          formtext_equal2 = createElement("p", '~');
          formtext_equal2.parent("sim-canvas-container");
          formtext_equal2.position(220, 280);
          formtext_equal2.style("font-size", "50px");
          formtext_equal2.style("color", "#2B4162");
  
          if (formtext13) {
            formtext13.remove();
          }
  
          formtext13 = createElement("p", '1');
          formtext13.parent("sim-canvas-container");
          formtext13.position(277, 270);
          formtext13.style("font-size", "30px");
          formtext13.style("color", "#2B4162");
  
          if (formtext_3) {
            formtext_3.remove();
          }
  
          formtext_3 = createElement("p", '__');
          formtext_3.parent("sim-canvas-container");
          formtext_3.position(270, 280);
          formtext_3.style("font-size", "30px");
          formtext_3.style("color", "#2B4162");
  
          if (formtext_f) {
            formtext_f.remove();
          }
  
          formtext_f = createElement("p", ((rCCembung / 2) / 2) * (-1));
          formtext_f.parent("sim-canvas-container");
          formtext_f.position(260, 315);
          formtext_f.style("font-size", "30px");
          formtext_f.style("color", "#2B4162");
        } else {
          s.hide();
          s_aks.hide();
          formtext1.hide();
          formtext_.hide();
          formtext12.hide();
          formtext_2.hide();
          formtext13.hide();
          formtext_3.hide();
          formtext_s.hide();
          formtext_s_aks.hide();
          formtext_f.hide();
          formtext_plus.hide();
          formtext_equal1.hide();
          formtext_equal2.hide();
        }

        drawObjectImage(kotakInvertImg, xIntersect2 - 27, yKotak + hKotak, wKotak, yIntersect2 - hKotak - 120, 0.6);
      } else {
        let angle3 = atan2(yRayStart - height / 2, width / 2 + fCCembung - (width / 2));
        let angle4 = atan2(yKotak - height / 2, width / 2 - (xKotak + wKotak / 2));

        let extendedLength3 = 1000;
        let extendedX3 = width / 2 - extendedLength3 * cos(angle3);
        let extendedY3 = yRayStart + extendedLength3 * sin(angle3);

        let extendedLength4 = 1000;
        let extendedX4 = xKotak + wKotak / 2 - extendedLength4 * cos(angle4);
        let extendedY4 = yKotak + extendedLength4 * sin(angle4);

        mirrorLayer.stroke(0, 0, 0);
        mirrorLayer.strokeWeight(2);
        mirrorLayer.drawingContext.setLineDash([5, 5]);
        mirrorLayer.line(width / 2, yRayStart, extendedX3, extendedY3);
        mirrorLayer.strokeWeight(1);
        mirrorLayer.drawingContext.setLineDash([]);

        mirrorLayer.stroke(0, 0, 0);
        mirrorLayer.strokeWeight(2);
        mirrorLayer.drawingContext.setLineDash([5, 5]);
        mirrorLayer.line(xKotak + wKotak / 2, yKotak, extendedX4, extendedY4);
        mirrorLayer.strokeWeight(1);
        mirrorLayer.drawingContext.setLineDash([]);

        x5 = xKotak + wKotak / 2;
        x6 = extendedX4;
        y5 = yKotak + 10;
        y6 = extendedY4;
  
        m3 = (y6 - y5)/(x6 - x5);
        b3 = y5 - (m3 * x5);
  
        x7 = width / 2;
        x8 = extendedX3;
        y7 = yRayStart;
        y8 = extendedY3;
  
        m4 = (y8 - y7)/(x8 - x7);
        b4 = y7 - (m4 * x7);
  
        xIntersect2 = (b4 - b3)/(m3 - m4);
        yIntersect2 = (m4 * xIntersect2) + b4;

        checkbox.parent("sim-canvas-container");
        checkbox.position(0, -50);

        const formula = checkbox.checked();
    
        if (formula) {
          if (s) {
            s.remove();
          }
      
          sJarak = (map(xKotak, 417.5, 0, 52, 265));
          s = createElement("p", 's &nbsp;' + nf(sJarak, 1, 2) + ' cm');
          s.parent("sim-canvas-container");
          s.style("font-size", "30px");
          s.style("color", "#2B4162");
          s.position(733, 275);
    
          if (s_aks) {
            s_aks.remove();
          }
      
          s_aksJarak = (map(xIntersect2 -25, 417.5, 0, 52, 265));
          s_aks = createElement("p", 's` &nbsp;' + nf(s_aksJarak, 1, 2) + ' cm');
          s_aks.parent("sim-canvas-container");
          s_aks.style("font-size", "30px");
          s_aks.style("color", "#2B4162");
          s_aks.position(733, 300);
  
          if (formtext1) {
            formtext1.remove();
          }
    
          formtext1 = createElement("p", '1');
          formtext1.parent("sim-canvas-container");
          formtext1.position(47, 270);
          formtext1.style("font-size", "30px");
          formtext1.style("color", "#2B4162");
  
          if (formtext_) {
            formtext_.remove();
          }
  
          formtext_ = createElement("p", '__');
          formtext_.parent("sim-canvas-container");
          formtext_.position(40, 280);
          formtext_.style("font-size", "30px");
          formtext_.style("color", "#2B4162");
  
          if (formtext_s) {
            formtext_s.remove();
          }
  
          formtext_s = createElement("p", nf(sJarak, 1, 2));
          formtext_s.parent("sim-canvas-container");
          formtext_s.position(20, 315);
          formtext_s.style("font-size", "30px");
          formtext_s.style("color", "#2B4162");
          
          if (formtext_plus) {
            formtext_plus.remove();
          }
  
          formtext_plus = createElement("p", '+');
          formtext_plus.parent("sim-canvas-container");
          formtext_plus.position(110, 275);
          formtext_plus.style("font-size", "50px");
          formtext_plus.style("color", "#2B4162");
  
          if (formtext12) {
            formtext12.remove();
          }
  
          formtext12 = createElement("p", '1');
          formtext12.parent("sim-canvas-container");
          formtext12.position(165, 270);
          formtext12.style("font-size", "30px");
          formtext12.style("color", "#2B4162");
  
          if (formtext_2) {
            formtext_2.remove();
          }
  
          formtext_2 = createElement("p", '__');
          formtext_2.parent("sim-canvas-container");
          formtext_2.position(157, 280);
          formtext_2.style("font-size", "30px");
          formtext_2.style("color", "#2B4162");
  
          if (formtext_s_aks) {
            formtext_s_aks.remove();
          }
  
          formtext_s_aks = createElement("p", nf(s_aksJarak, 1, 2));
          formtext_s_aks.parent("sim-canvas-container");
          formtext_s_aks.position(140, 315);
          formtext_s_aks.style("font-size", "30px");
          formtext_s_aks.style("color", "#2B4162");
  
          if (formtext_equal1) {
            formtext_equal1.remove();
          }
  
          formtext_equal1 = createElement("p", '~');
          formtext_equal1.parent("sim-canvas-container");
          formtext_equal1.position(220, 270);
          formtext_equal1.style("font-size", "50px");
          formtext_equal1.style("color", "#2B4162");
  
          if (formtext_equal2) {
            formtext_equal2.remove();
          }
          formtext_equal2 = createElement("p", '~');
          formtext_equal2.parent("sim-canvas-container");
          formtext_equal2.position(220, 280);
          formtext_equal2.style("font-size", "50px");
          formtext_equal2.style("color", "#2B4162");
  
          if (formtext13) {
            formtext13.remove();
          }
  
          formtext13 = createElement("p", '1');
          formtext13.parent("sim-canvas-container");
          formtext13.position(277, 270);
          formtext13.style("font-size", "30px");
          formtext13.style("color", "#2B4162");
  
          if (formtext_3) {
            formtext_3.remove();
          }
  
          formtext_3 = createElement("p", '__');
          formtext_3.parent("sim-canvas-container");
          formtext_3.position(270, 280);
          formtext_3.style("font-size", "30px");
          formtext_3.style("color", "#2B4162");
  
          if (formtext_f) {
            formtext_f.remove();
          }
  
          formtext_f = createElement("p", ((rCCembung / 2) / 2) * (-1));
          formtext_f.parent("sim-canvas-container");
          formtext_f.position(260, 315);
          formtext_f.style("font-size", "30px");
          formtext_f.style("color", "#2B4162");
        } else {
          s.hide();
          s_aks.hide();
          formtext1.hide();
          formtext_.hide();
          formtext12.hide();
          formtext_2.hide();
          formtext13.hide();
          formtext_3.hide();
          formtext_s.hide();
          formtext_s_aks.hide();
          formtext_f.hide();
          formtext_plus.hide();
          formtext_equal1.hide();
          formtext_equal2.hide();
        }
  
        drawObjectImage(kotakImg, xIntersect2 - 15, (yKotak / hKotak) + yIntersect2, wKotak, hKotak + (hKotak - yIntersect2) + 25, 0.6);
      }
    }
    else if (mirrorType === "Cekung") {
      let xRayStart = xKotak + wKotak / 2;
      let yRayStart = yKotak;
      
      mirrorLayer.stroke(0, 0, 0);
      mirrorLayer.strokeWeight(2);
      mirrorLayer.line(xRayStart, yRayStart, width / 2, yRayStart);
      mirrorLayer.strokeWeight(1);

      mirrorLayer.stroke(0, 0, 0);
      mirrorLayer.strokeWeight(2);
      mirrorLayer.drawingContext.setLineDash([5, 5]);
      mirrorLayer.line(width / 2 + fCCekung, height / 2, width / 2, yRayStart);
      mirrorLayer.strokeWeight(1);
      mirrorLayer.drawingContext.setLineDash([]);

      let angle = atan2(height / 2 - yRayStart, width / 2 - (width / 2 + fCCekung));

      let extendedLength = 1000;
      let extendedX = width / 2 + fCCekung - extendedLength * cos(angle);
      let extendedY = height / 2 + extendedLength * sin(angle);      

      mirrorLayer.stroke(0, 0, 0);
      mirrorLayer.strokeWeight(2);
      mirrorLayer.drawingContext.setLineDash([5, 5]);
      mirrorLayer.line(width / 2 + fCCekung, height / 2, extendedX, extendedY);
      mirrorLayer.strokeWeight(1);
      mirrorLayer.drawingContext.setLineDash([]);

      mirrorLayer.stroke(0, 0, 0);
      mirrorLayer.strokeWeight(2);
      mirrorLayer.drawingContext.setLineDash([5, 5]);
      mirrorLayer.line(width / 2, yRayStart, width / 2 - fCCekung, height / 2);
      mirrorLayer.strokeWeight(1);
      mirrorLayer.drawingContext.setLineDash([]);

      let angle2 = atan2(yRayStart - height / 2, width / 2  - (width / 2 - fCCekung));

      let extendedLength2 = 1000;
      let extendedX2 = width / 2 - fCCekung - extendedLength2 * cos(angle2);
      let extendedY2 = height / 2 - extendedLength2 * sin(angle2);

      mirrorLayer.stroke(0, 0, 0);
      mirrorLayer.strokeWeight(2);
      mirrorLayer.drawingContext.setLineDash([5, 5]);
      mirrorLayer.line(width / 2 - fCCekung, height / 2, extendedX2, extendedY2);
      mirrorLayer.strokeWeight(1);
      mirrorLayer.drawingContext.setLineDash([]);

      mirrorLayer.stroke(0, 0, 0);
      mirrorLayer.strokeWeight(2);
      mirrorLayer.drawingContext.setLineDash([5, 5]);
      mirrorLayer.line(width / 2 + fCCekung, height / 2, xKotak + wKotak / 2, yKotak);
      mirrorLayer.strokeWeight(1);
      mirrorLayer.drawingContext.setLineDash([]);

      let angle3 = atan2(yKotak - height / 2, xKotak + wKotak / 2 - (width / 2 + fCCekung));

      let extendedLength3 = 1000;
      let extendedX3 = width / 2 + fCCekung - extendedLength3 * cos(angle3);
      let extendedY3 = height / 2 - extendedLength3 * sin(angle3);

      mirrorLayer.stroke(0, 0, 0);
      mirrorLayer.strokeWeight(2);
      mirrorLayer.drawingContext.setLineDash([5, 5]);
      mirrorLayer.line(width / 2 + fCCekung, height / 2, extendedX3, extendedY3);
      mirrorLayer.strokeWeight(1);
      mirrorLayer.drawingContext.setLineDash([]);

      x1 = width / 2 + fCCekung;
      x2 = xKotak + wKotak / 2;
      y1 = height / 2;
      y2 = yKotak;

      m1 = (y2 - y1)/(x2 - x1);
      b1 = y1 - (m1 * x1);

      x3 = width / 2;
      x4 = width / 2 - 1;
      y3 = 0;
      y4 = height;

      m2 = (y4 - y3)/(x4 - x3);
      b2 = y3 - (m2 * x3);

      xIntersect = (b2 - b1)/(m1 - m2);
      yIntersect = (m2 * xIntersect) + b2 - 2;

      mirrorLayer.stroke(0, 0, 0);
      mirrorLayer.strokeWeight(2);
      mirrorLayer.drawingContext.setLineDash([5, 5]);
      mirrorLayer.line(width / 2, yIntersect, 0, yIntersect);
      mirrorLayer.strokeWeight(1);
      mirrorLayer.drawingContext.setLineDash([]);

      mirrorLayer.stroke(0, 0, 0);
      mirrorLayer.strokeWeight(2);
      mirrorLayer.line(width / 2, height / 2, xRayStart, yRayStart);
      mirrorLayer.strokeWeight(1);

      let angle4 = atan2(height / 2 - yRayStart, xRayStart - width / 2);

      let extendedLength4 = 1000;
      let extendedX4 = width / 2 - extendedLength4 * cos(angle4);
      let extendedY4 = height / 2 + extendedLength4 * sin(angle4);      

      mirrorLayer.stroke(0, 0, 0);
      mirrorLayer.strokeWeight(2);
      mirrorLayer.line(width / 2, height / 2, extendedX4, extendedY4);
      mirrorLayer.strokeWeight(1);

      let angle5 = atan2(yRayStart - height / 2, width / 2 - fCCekung - (width / 2));

      let extendedLength5 = 1000;
      let extendedX5 = width / 2 - extendedLength5 * cos(angle5);
      let extendedY5 = yRayStart + extendedLength5 * sin(angle5);

      mirrorLayer.stroke(0, 0, 0);
      mirrorLayer.strokeWeight(2);
      mirrorLayer.drawingContext.setLineDash([5, 5]);
      mirrorLayer.line(width / 2, yRayStart, extendedX5, extendedY5);
      mirrorLayer.strokeWeight(1);
      mirrorLayer.drawingContext.setLineDash([]);

      x5 = width / 2;
      x6 = xKotak + wKotak / 2;
      y5 = height / 2;
      y6 = yKotak;

      m3 = (y6 - y5)/(x6 - x5);
      b3 = y5 - (m3 * x5);

      x7 = width / 2;
      x8 = width / 2 - fCCekung;
      y7 = yRayStart;
      y8 = height / 2;

      m4 = (y8 - y7)/(x8 - x7);
      b4 = y7 - (m4 * x7);

      xIntersect2 = (b4 - b3)/(m3 - m4);
      yIntersect2 = (m4 * xIntersect2) + b4;

      checkbox.parent("sim-canvas-container");
      checkbox.position(0, -50);

      const formula = checkbox.checked();
  
      if (formula) {
        if (s) {
          s.remove();
        }
    
        sJarak = (map(xKotak, 417.5, 0, 52, 265));
        s = createElement("p", 's &nbsp;' + nf(sJarak, 1, 2) + ' cm');
        s.parent("sim-canvas-container");
        s.style("font-size", "30px");
        s.style("color", "#2B4162");
        s.position(733, 275);
  
        if (s_aks) {
          s_aks.remove();
        }
    
        s_aksJarak = (map(xIntersect2 -25, 417.5, 0, 52, 265));
        s_aks = createElement("p", 's` &nbsp;' + nf(s_aksJarak, 1, 2) + ' cm');
        s_aks.parent("sim-canvas-container");
        s_aks.style("font-size", "30px");
        s_aks.style("color", "#2B4162");
        s_aks.position(733, 300);

        if (formtext1) {
          formtext1.remove();
        }
  
        formtext1 = createElement("p", '1');
        formtext1.parent("sim-canvas-container");
        formtext1.position(47, 270);
        formtext1.style("font-size", "30px");
        formtext1.style("color", "#2B4162");

        if (formtext_) {
          formtext_.remove();
        }

        formtext_ = createElement("p", '__');
        formtext_.parent("sim-canvas-container");
        formtext_.position(40, 280);
        formtext_.style("font-size", "30px");
        formtext_.style("color", "#2B4162");

        if (formtext_s) {
          formtext_s.remove();
        }

        formtext_s = createElement("p", nf(sJarak, 1, 2));
        formtext_s.parent("sim-canvas-container");
        formtext_s.position(20, 315);
        formtext_s.style("font-size", "30px");
        formtext_s.style("color", "#2B4162");
        
        if (formtext_plus) {
          formtext_plus.remove();
        }

        formtext_plus = createElement("p", '+');
        formtext_plus.parent("sim-canvas-container");
        formtext_plus.position(110, 275);
        formtext_plus.style("font-size", "50px");
        formtext_plus.style("color", "#2B4162");

        if (formtext12) {
          formtext12.remove();
        }

        formtext12 = createElement("p", '1');
        formtext12.parent("sim-canvas-container");
        formtext12.position(165, 270);
        formtext12.style("font-size", "30px");
        formtext12.style("color", "#2B4162");

        if (formtext_2) {
          formtext_2.remove();
        }

        formtext_2 = createElement("p", '__');
        formtext_2.parent("sim-canvas-container");
        formtext_2.position(157, 280);
        formtext_2.style("font-size", "30px");
        formtext_2.style("color", "#2B4162");

        if (formtext_s_aks) {
          formtext_s_aks.remove();
        }

        formtext_s_aks = createElement("p", nf(s_aksJarak, 1, 2));
        formtext_s_aks.parent("sim-canvas-container");
        formtext_s_aks.position(140, 315);
        formtext_s_aks.style("font-size", "30px");
        formtext_s_aks.style("color", "#2B4162");

        if (formtext_equal1) {
          formtext_equal1.remove();
        }

        formtext_equal1 = createElement("p", '~');
        formtext_equal1.parent("sim-canvas-container");
        formtext_equal1.position(220, 270);
        formtext_equal1.style("font-size", "50px");
        formtext_equal1.style("color", "#2B4162");

        if (formtext_equal2) {
          formtext_equal2.remove();
        }
        formtext_equal2 = createElement("p", '~');
        formtext_equal2.parent("sim-canvas-container");
        formtext_equal2.position(220, 280);
        formtext_equal2.style("font-size", "50px");
        formtext_equal2.style("color", "#2B4162");

        if (formtext13) {
          formtext13.remove();
        }

        formtext13 = createElement("p", '1');
        formtext13.parent("sim-canvas-container");
        formtext13.position(277, 270);
        formtext13.style("font-size", "30px");
        formtext13.style("color", "#2B4162");

        if (formtext_3) {
          formtext_3.remove();
        }

        formtext_3 = createElement("p", '__');
        formtext_3.parent("sim-canvas-container");
        formtext_3.position(270, 280);
        formtext_3.style("font-size", "30px");
        formtext_3.style("color", "#2B4162");

        if (formtext_f) {
          formtext_f.remove();
        }

        formtext_f = createElement("p", ((rCCembung / 2) / 2) * (-1));
        formtext_f.parent("sim-canvas-container");
        formtext_f.position(260, 315);
        formtext_f.style("font-size", "30px");
        formtext_f.style("color", "#2B4162");
      } else {
        s.hide();
        s_aks.hide();
        formtext1.hide();
        formtext_.hide();
        formtext12.hide();
        formtext_2.hide();
        formtext13.hide();
        formtext_3.hide();
        formtext_s.hide();
        formtext_s_aks.hide();
        formtext_f.hide();
        formtext_plus.hide();
        formtext_equal1.hide();
        formtext_equal2.hide();
      }

      drawObjectImage(kotakImg, xIntersect2 - 25, (yKotak / hKotak) + yIntersect2 - 5, wKotak - 10, hKotak + (hKotak - yIntersect2) + 30, 0.6);
    }
  }
  else if (objectType === "Segitiga") {
    objectLayer.clear();
    objectLayer.stroke(0);
    objectLayer.line(0, height / 2, width, height / 2);

    if (mouseX > xSegitiga && mouseX < xSegitiga + wSegitiga && mouseY > ySegitiga && mouseY < ySegitiga + hSegitiga) {
      rollover = true;
      cursor(HAND);
    } else {
      rollover = false;
      cursor(ARROW);
    }
  
    if (dragging) {
      if (mirrorType === "Cembung") {
        xSegitiga = constrain(mouseX + offsetX, 0, width / 2 - wSegitiga - 30);
        ySegitiga = height / 2 - 100;
      } else if (mirrorType === "Cekung") {
        xSegitiga = constrain(mouseX + offsetX, 0, width / 2 - wSegitiga - 20);
        ySegitiga = height / 2 - 100;
      } else {
        xSegitiga = constrain(mouseX + offsetX, 0, width / 2 - wSegitiga);
        ySegitiga = height / 2 - 100;
      }
    }

    objectLayer.image(segitigaImg, xSegitiga, ySegitiga, wSegitiga, hSegitiga);
    if (mirrorType === "Cembung"){
      let xRayStart = xSegitiga + wSegitiga / 2;
      let yRayStart = ySegitiga;
      
      mirrorLayer.stroke(0, 0, 0);
      mirrorLayer.strokeWeight(2);
      mirrorLayer.line(xRayStart, yRayStart, width / 2, yRayStart);
      mirrorLayer.strokeWeight(1);

      mirrorLayer.stroke(0, 0, 0);
      mirrorLayer.strokeWeight(2);
      mirrorLayer.line(width / 2 + fCCembung, height / 2, width / 2, yRayStart);
      mirrorLayer.strokeWeight(1);

      let angle = atan2(height / 2 - yRayStart, width / 2 - (width / 2 + fCCembung));

      let extendedLength = 1000;
      let extendedX = width / 2 + fCCembung - extendedLength * cos(angle);
      let extendedY = height / 2 + extendedLength * sin(angle);      

      mirrorLayer.stroke(0, 0, 0);
      mirrorLayer.strokeWeight(2);
      mirrorLayer.line(width / 2 + fCCembung, height / 2, extendedX, extendedY);
      mirrorLayer.strokeWeight(1);

      mirrorLayer.stroke(0, 0, 0);
      mirrorLayer.strokeWeight(2);
      mirrorLayer.line(width / 2, height / 2, xRayStart, yRayStart);
      mirrorLayer.strokeWeight(1);

      let angle2 = atan2(height / 2 - yRayStart, xRayStart - width / 2);

      let extendedLength2 = 1000;
      let extendedX2 = width / 2 - extendedLength2 * cos(angle2);
      let extendedY2 = height / 2 + extendedLength * sin(angle2);      

      mirrorLayer.stroke(0, 0, 0);
      mirrorLayer.strokeWeight(2);
      mirrorLayer.line(width / 2, height / 2, extendedX2, extendedY2);
      mirrorLayer.strokeWeight(1);

      if (xSegitiga <= width / 2 - fCCembung - 70) {
        mirrorLayer.stroke(0, 0, 0);
        mirrorLayer.strokeWeight(2);
        mirrorLayer.line(xRayStart, yRayStart, width / 2 - fCCembung, height / 2);
        mirrorLayer.strokeWeight(1);

        let angle2 = atan2(yRayStart - height / 2, width / 2 - fCCembung - xRayStart);

        let extendedLength2 = 2000;
        let extendedX2 = xRayStart + extendedLength2 * cos(angle2);
        let extendedY2 = yRayStart - extendedLength2 * sin(angle2);

        mirrorLayer.stroke(0, 0, 0);
        mirrorLayer.strokeWeight(2);
        mirrorLayer.line(width / 2 - fCCembung, height / 2, extendedX2, extendedY2);
        mirrorLayer.strokeWeight(1);

        x1 = width / 2 - fCCembung;
        x2 = extendedX2;
        y1 = height / 2;
        y2 = extendedY2;
  
        m1 = (y2 - y1)/(x2 - x1);
        b1 = y1 - (m1 * x1);

        x3 = width / 2;
        x4 = width / 2 - 1;
        y3 = 0;
        y4 = height;
  
        m2 = (y4 - y3)/(x4 - x3);
        b2 = y3 - (m2 * x3);
  
        xIntersect = (b2 - b1)/(m1 - m2);
        yIntersect = (m2 * xIntersect) + b2 - 2;

        mirrorLayer.stroke(0, 0, 0);
        mirrorLayer.strokeWeight(2);
        mirrorLayer.line(width / 2, yIntersect, width, yIntersect);
        mirrorLayer.strokeWeight(1);

        x5 = width / 2;
        x6 = 0;
        y5 = yIntersect;
        y6 = yIntersect;

        m3 = (y6 - y5)/(x6 - x5);
        b3 = y5 - (m3 * x5);

        x7 = width / 2 - fCCembung;
        x8 = extendedX;
        y7 = height / 2;
        y8 = extendedY;

        m4 = (y8 - y7)/(x8 - x7);
        b4 = y7 - (m4 * x7);

        xIntersect2 = (b4 - b3)/(m3 - m4);
        yIntersect2 = (m4 * xIntersect2) + b4;

        x5 = width / 2;
        x6 = width;
        y5 = yIntersect;
        y6 = yIntersect;

        m3 = (y6 - y5)/(x6 - x5);
        b3 = y5 - (m3 * x5);

        x7 = width / 2 + fCCembung;
        x8 = extendedX;
        y7 = height / 2;
        y8 = extendedY;

        m4 = (y8 - y7)/(x8 - x7);
        b4 = y7 - (m4 * x7);

        xIntersect2 = (b4 - b3)/(m3 - m4);
        yIntersect2 = (m4 * xIntersect2) + b4;

        checkbox.parent("sim-canvas-container");
        checkbox.position(0, -50);

        const formula = checkbox.checked();
    
        if (formula) {
          if (s) {
            s.remove();
          }
      
          sJarak = (map(xSegitiga, 417.5, 0, 52, 265));
          s = createElement("p", 's &nbsp;' + nf(sJarak, 1, 2) + ' cm');
          s.parent("sim-canvas-container");
          s.style("font-size", "30px");
          s.style("color", "#2B4162");
          s.position(733, 275);
    
          if (s_aks) {
            s_aks.remove();
          }
      
          s_aksJarak = (map(xIntersect2 -25, 417.5, 0, 52, 265));
          s_aks = createElement("p", 's` &nbsp;' + nf(s_aksJarak, 1, 2) + ' cm');
          s_aks.parent("sim-canvas-container");
          s_aks.style("font-size", "30px");
          s_aks.style("color", "#2B4162");
          s_aks.position(733, 300);
  
          if (formtext1) {
            formtext1.remove();
          }
    
          formtext1 = createElement("p", '1');
          formtext1.parent("sim-canvas-container");
          formtext1.position(47, 270);
          formtext1.style("font-size", "30px");
          formtext1.style("color", "#2B4162");
  
          if (formtext_) {
            formtext_.remove();
          }
  
          formtext_ = createElement("p", '__');
          formtext_.parent("sim-canvas-container");
          formtext_.position(40, 280);
          formtext_.style("font-size", "30px");
          formtext_.style("color", "#2B4162");
  
          if (formtext_s) {
            formtext_s.remove();
          }
  
          formtext_s = createElement("p", nf(sJarak, 1, 2));
          formtext_s.parent("sim-canvas-container");
          formtext_s.position(20, 315);
          formtext_s.style("font-size", "30px");
          formtext_s.style("color", "#2B4162");
          
          if (formtext_plus) {
            formtext_plus.remove();
          }
  
          formtext_plus = createElement("p", '+');
          formtext_plus.parent("sim-canvas-container");
          formtext_plus.position(110, 275);
          formtext_plus.style("font-size", "50px");
          formtext_plus.style("color", "#2B4162");
  
          if (formtext12) {
            formtext12.remove();
          }
  
          formtext12 = createElement("p", '1');
          formtext12.parent("sim-canvas-container");
          formtext12.position(165, 270);
          formtext12.style("font-size", "30px");
          formtext12.style("color", "#2B4162");
  
          if (formtext_2) {
            formtext_2.remove();
          }
  
          formtext_2 = createElement("p", '__');
          formtext_2.parent("sim-canvas-container");
          formtext_2.position(157, 280);
          formtext_2.style("font-size", "30px");
          formtext_2.style("color", "#2B4162");
  
          if (formtext_s_aks) {
            formtext_s_aks.remove();
          }
  
          formtext_s_aks = createElement("p", nf(s_aksJarak, 1, 2));
          formtext_s_aks.parent("sim-canvas-container");
          formtext_s_aks.position(140, 315);
          formtext_s_aks.style("font-size", "30px");
          formtext_s_aks.style("color", "#2B4162");
  
          if (formtext_equal1) {
            formtext_equal1.remove();
          }
  
          formtext_equal1 = createElement("p", '~');
          formtext_equal1.parent("sim-canvas-container");
          formtext_equal1.position(220, 270);
          formtext_equal1.style("font-size", "50px");
          formtext_equal1.style("color", "#2B4162");
  
          if (formtext_equal2) {
            formtext_equal2.remove();
          }
          formtext_equal2 = createElement("p", '~');
          formtext_equal2.parent("sim-canvas-container");
          formtext_equal2.position(220, 280);
          formtext_equal2.style("font-size", "50px");
          formtext_equal2.style("color", "#2B4162");
  
          if (formtext13) {
            formtext13.remove();
          }
  
          formtext13 = createElement("p", '1');
          formtext13.parent("sim-canvas-container");
          formtext13.position(277, 270);
          formtext13.style("font-size", "30px");
          formtext13.style("color", "#2B4162");
  
          if (formtext_3) {
            formtext_3.remove();
          }
  
          formtext_3 = createElement("p", '__');
          formtext_3.parent("sim-canvas-container");
          formtext_3.position(270, 280);
          formtext_3.style("font-size", "30px");
          formtext_3.style("color", "#2B4162");
  
          if (formtext_f) {
            formtext_f.remove();
          }
  
          formtext_f = createElement("p", ((rCCembung / 2) / 2) * (-1));
          formtext_f.parent("sim-canvas-container");
          formtext_f.position(260, 315);
          formtext_f.style("font-size", "30px");
          formtext_f.style("color", "#2B4162");
        } else {
          s.hide();
          s_aks.hide();
          formtext1.hide();
          formtext_.hide();
          formtext12.hide();
          formtext_2.hide();
          formtext13.hide();
          formtext_3.hide();
          formtext_s.hide();
          formtext_s_aks.hide();
          formtext_f.hide();
          formtext_plus.hide();
          formtext_equal1.hide();
          formtext_equal2.hide();
        }

        drawObjectImage(segitigaInvertImg, xIntersect2 - 45, ySegitiga + hSegitiga, yIntersect2 - wSegitiga - 120, yIntersect2 - hSegitiga - 120, 0.6);
      } else {
        let angle3 = atan2(yRayStart - height / 2, width / 2 + fCCembung - (width / 2));
        let angle4 = atan2(ySegitiga - height / 2, width / 2 - (xSegitiga + wSegitiga / 2));

        let extendedLength3 = 1000;
        let extendedX3 = width / 2 - extendedLength3 * cos(angle3);
        let extendedY3 = yRayStart + extendedLength3 * sin(angle3);

        let extendedLength4 = 1000;
        let extendedX4 = xSegitiga + wSegitiga / 2 - extendedLength4 * cos(angle4);
        let extendedY4 = ySegitiga + extendedLength4 * sin(angle4);

        mirrorLayer.stroke(0, 0, 0);
        mirrorLayer.strokeWeight(2);
        mirrorLayer.drawingContext.setLineDash([5, 5]);
        mirrorLayer.line(width / 2, yRayStart, extendedX3, extendedY3);
        mirrorLayer.strokeWeight(1);
        mirrorLayer.drawingContext.setLineDash([]);

        mirrorLayer.stroke(0, 0, 0);
        mirrorLayer.strokeWeight(2);
        mirrorLayer.drawingContext.setLineDash([5, 5]);
        mirrorLayer.line(xSegitiga + wSegitiga / 2, ySegitiga, extendedX4, extendedY4);
        mirrorLayer.strokeWeight(1);
        mirrorLayer.drawingContext.setLineDash([]);

        x5 = xSegitiga + wSegitiga / 2;
        x6 = extendedX4;
        y5 = ySegitiga + 10;
        y6 = extendedY4;
  
        m3 = (y6 - y5)/(x6 - x5);
        b3 = y5 - (m3 * x5);
  
        x7 = width / 2;
        x8 = extendedX3;
        y7 = yRayStart;
        y8 = extendedY3;
  
        m4 = (y8 - y7)/(x8 - x7);
        b4 = y7 - (m4 * x7);
  
        xIntersect2 = (b4 - b3)/(m3 - m4);
        yIntersect2 = (m4 * xIntersect2) + b4;

        checkbox.parent("sim-canvas-container");
        checkbox.position(0, -50);

        const formula = checkbox.checked();
    
        if (formula) {
          if (s) {
            s.remove();
          }
      
          sJarak = (map(xSegitiga, 417.5, 0, 52, 265));
          s = createElement("p", 's &nbsp;' + nf(sJarak, 1, 2) + ' cm');
          s.parent("sim-canvas-container");
          s.style("font-size", "30px");
          s.style("color", "#2B4162");
          s.position(733, 275);
    
          if (s_aks) {
            s_aks.remove();
          }
      
          s_aksJarak = (map(xIntersect2 -25, 417.5, 0, 52, 265));
          s_aks = createElement("p", 's` &nbsp;' + nf(s_aksJarak, 1, 2) + ' cm');
          s_aks.parent("sim-canvas-container");
          s_aks.style("font-size", "30px");
          s_aks.style("color", "#2B4162");
          s_aks.position(733, 300);
  
          if (formtext1) {
            formtext1.remove();
          }
    
          formtext1 = createElement("p", '1');
          formtext1.parent("sim-canvas-container");
          formtext1.position(47, 270);
          formtext1.style("font-size", "30px");
          formtext1.style("color", "#2B4162");
  
          if (formtext_) {
            formtext_.remove();
          }
  
          formtext_ = createElement("p", '__');
          formtext_.parent("sim-canvas-container");
          formtext_.position(40, 280);
          formtext_.style("font-size", "30px");
          formtext_.style("color", "#2B4162");
  
          if (formtext_s) {
            formtext_s.remove();
          }
  
          formtext_s = createElement("p", nf(sJarak, 1, 2));
          formtext_s.parent("sim-canvas-container");
          formtext_s.position(20, 315);
          formtext_s.style("font-size", "30px");
          formtext_s.style("color", "#2B4162");
          
          if (formtext_plus) {
            formtext_plus.remove();
          }
  
          formtext_plus = createElement("p", '+');
          formtext_plus.parent("sim-canvas-container");
          formtext_plus.position(110, 275);
          formtext_plus.style("font-size", "50px");
          formtext_plus.style("color", "#2B4162");
  
          if (formtext12) {
            formtext12.remove();
          }
  
          formtext12 = createElement("p", '1');
          formtext12.parent("sim-canvas-container");
          formtext12.position(165, 270);
          formtext12.style("font-size", "30px");
          formtext12.style("color", "#2B4162");
  
          if (formtext_2) {
            formtext_2.remove();
          }
  
          formtext_2 = createElement("p", '__');
          formtext_2.parent("sim-canvas-container");
          formtext_2.position(157, 280);
          formtext_2.style("font-size", "30px");
          formtext_2.style("color", "#2B4162");
  
          if (formtext_s_aks) {
            formtext_s_aks.remove();
          }
  
          formtext_s_aks = createElement("p", nf(s_aksJarak, 1, 2));
          formtext_s_aks.parent("sim-canvas-container");
          formtext_s_aks.position(140, 315);
          formtext_s_aks.style("font-size", "30px");
          formtext_s_aks.style("color", "#2B4162");
  
          if (formtext_equal1) {
            formtext_equal1.remove();
          }
  
          formtext_equal1 = createElement("p", '~');
          formtext_equal1.parent("sim-canvas-container");
          formtext_equal1.position(220, 270);
          formtext_equal1.style("font-size", "50px");
          formtext_equal1.style("color", "#2B4162");
  
          if (formtext_equal2) {
            formtext_equal2.remove();
          }
          formtext_equal2 = createElement("p", '~');
          formtext_equal2.parent("sim-canvas-container");
          formtext_equal2.position(220, 280);
          formtext_equal2.style("font-size", "50px");
          formtext_equal2.style("color", "#2B4162");
  
          if (formtext13) {
            formtext13.remove();
          }
  
          formtext13 = createElement("p", '1');
          formtext13.parent("sim-canvas-container");
          formtext13.position(277, 270);
          formtext13.style("font-size", "30px");
          formtext13.style("color", "#2B4162");
  
          if (formtext_3) {
            formtext_3.remove();
          }
  
          formtext_3 = createElement("p", '__');
          formtext_3.parent("sim-canvas-container");
          formtext_3.position(270, 280);
          formtext_3.style("font-size", "30px");
          formtext_3.style("color", "#2B4162");
  
          if (formtext_f) {
            formtext_f.remove();
          }
  
          formtext_f = createElement("p", ((rCCembung / 2) / 2) * (-1));
          formtext_f.parent("sim-canvas-container");
          formtext_f.position(260, 315);
          formtext_f.style("font-size", "30px");
          formtext_f.style("color", "#2B4162");
        } else {
          s.hide();
          s_aks.hide();
          formtext1.hide();
          formtext_.hide();
          formtext12.hide();
          formtext_2.hide();
          formtext13.hide();
          formtext_3.hide();
          formtext_s.hide();
          formtext_s_aks.hide();
          formtext_f.hide();
          formtext_plus.hide();
          formtext_equal1.hide();
          formtext_equal2.hide();
        }
  
        drawObjectImage(segitigaImg, xIntersect2 - 90, (ySegitiga / hSegitiga) + yIntersect2 - 5, wSegitiga + (hSegitiga - yIntersect2) + 30, hSegitiga + (hSegitiga - yIntersect2) + 30, 0.6);
      }
    }
    else if (mirrorType === "Cekung") {
      let xRayStart = xSegitiga + wSegitiga / 2;
      let yRayStart = ySegitiga;
      
      mirrorLayer.stroke(0, 0, 0);
      mirrorLayer.strokeWeight(2);
      mirrorLayer.line(xRayStart, yRayStart, width / 2, yRayStart);
      mirrorLayer.strokeWeight(1);

      mirrorLayer.stroke(0, 0, 0);
      mirrorLayer.strokeWeight(2);
      mirrorLayer.drawingContext.setLineDash([5, 5]);
      mirrorLayer.line(width / 2 + fCCekung, height / 2, width / 2, yRayStart);
      mirrorLayer.strokeWeight(1);
      mirrorLayer.drawingContext.setLineDash([]);

      let angle = atan2(height / 2 - yRayStart, width / 2 - (width / 2 + fCCekung));

      let extendedLength = 1000;
      let extendedX = width / 2 + fCCekung - extendedLength * cos(angle);
      let extendedY = height / 2 + extendedLength * sin(angle);      

      mirrorLayer.stroke(0, 0, 0);
      mirrorLayer.strokeWeight(2);
      mirrorLayer.drawingContext.setLineDash([5, 5]);
      mirrorLayer.line(width / 2 + fCCekung, height / 2, extendedX, extendedY);
      mirrorLayer.strokeWeight(1);
      mirrorLayer.drawingContext.setLineDash([]);

      mirrorLayer.stroke(0, 0, 0);
      mirrorLayer.strokeWeight(2);
      mirrorLayer.drawingContext.setLineDash([5, 5]);
      mirrorLayer.line(width / 2, yRayStart, width / 2 - fCCekung, height / 2);
      mirrorLayer.strokeWeight(1);
      mirrorLayer.drawingContext.setLineDash([]);

      let angle2 = atan2(yRayStart - height / 2, width / 2  - (width / 2 - fCCekung));

      let extendedLength2 = 1000;
      let extendedX2 = width / 2 - fCCekung - extendedLength2 * cos(angle2);
      let extendedY2 = height / 2 - extendedLength2 * sin(angle2);

      mirrorLayer.stroke(0, 0, 0);
      mirrorLayer.strokeWeight(2);
      mirrorLayer.drawingContext.setLineDash([5, 5]);
      mirrorLayer.line(width / 2 - fCCekung, height / 2, extendedX2, extendedY2);
      mirrorLayer.strokeWeight(1);
      mirrorLayer.drawingContext.setLineDash([]);

      mirrorLayer.stroke(0, 0, 0);
      mirrorLayer.strokeWeight(2);
      mirrorLayer.drawingContext.setLineDash([5, 5]);
      mirrorLayer.line(width / 2 + fCCekung, height / 2, xSegitiga + wSegitiga / 2, ySegitiga);
      mirrorLayer.strokeWeight(1);
      mirrorLayer.drawingContext.setLineDash([]);

      let angle3 = atan2(ySegitiga - height / 2, xSegitiga + wSegitiga / 2 - (width / 2 + fCCekung));

      let extendedLength3 = 1000;
      let extendedX3 = width / 2 + fCCekung - extendedLength3 * cos(angle3);
      let extendedY3 = height / 2 - extendedLength3 * sin(angle3);

      mirrorLayer.stroke(0, 0, 0);
      mirrorLayer.strokeWeight(2);
      mirrorLayer.drawingContext.setLineDash([5, 5]);
      mirrorLayer.line(width / 2 + fCCekung, height / 2, extendedX3, extendedY3);
      mirrorLayer.strokeWeight(1);
      mirrorLayer.drawingContext.setLineDash([]);

      x1 = width / 2 + fCCekung;
      x2 = xSegitiga + wSegitiga / 2;
      y1 = height / 2;
      y2 = ySegitiga;

      m1 = (y2 - y1)/(x2 - x1);
      b1 = y1 - (m1 * x1);

      x3 = width / 2;
      x4 = width / 2 - 1;
      y3 = 0;
      y4 = height;

      m2 = (y4 - y3)/(x4 - x3);
      b2 = y3 - (m2 * x3);

      xIntersect = (b2 - b1)/(m1 - m2);
      yIntersect = (m2 * xIntersect) + b2 - 2;

      mirrorLayer.stroke(0, 0, 0);
      mirrorLayer.strokeWeight(2);
      mirrorLayer.drawingContext.setLineDash([5, 5]);
      mirrorLayer.line(width / 2, yIntersect, 0, yIntersect);
      mirrorLayer.strokeWeight(1);
      mirrorLayer.drawingContext.setLineDash([]);

      mirrorLayer.stroke(0, 0, 0);
      mirrorLayer.strokeWeight(2);
      mirrorLayer.line(width / 2, height / 2, xRayStart, yRayStart);
      mirrorLayer.strokeWeight(1);

      let angle4 = atan2(height / 2 - yRayStart, xRayStart - width / 2);

      let extendedLength4 = 1000;
      let extendedX4 = width / 2 - extendedLength4 * cos(angle4);
      let extendedY4 = height / 2 + extendedLength4 * sin(angle4);      

      mirrorLayer.stroke(0, 0, 0);
      mirrorLayer.strokeWeight(2);
      mirrorLayer.line(width / 2, height / 2, extendedX4, extendedY4);
      mirrorLayer.strokeWeight(1);

      let angle5 = atan2(yRayStart - height / 2, width / 2 - fCCekung - (width / 2));

      let extendedLength5 = 1000;
      let extendedX5 = width / 2 - extendedLength5 * cos(angle5);
      let extendedY5 = yRayStart + extendedLength5 * sin(angle5);

      mirrorLayer.stroke(0, 0, 0);
      mirrorLayer.strokeWeight(2);
      mirrorLayer.drawingContext.setLineDash([5, 5]);
      mirrorLayer.line(width / 2, yRayStart, extendedX5, extendedY5);
      mirrorLayer.strokeWeight(1);
      mirrorLayer.drawingContext.setLineDash([]);

      x5 = width / 2;
      x6 = xSegitiga + wSegitiga / 2;
      y5 = height / 2;
      y6 = ySegitiga;

      m3 = (y6 - y5)/(x6 - x5);
      b3 = y5 - (m3 * x5);

      x7 = width / 2;
      x8 = width / 2 - fCCekung;
      y7 = yRayStart;
      y8 = height / 2;

      m4 = (y8 - y7)/(x8 - x7);
      b4 = y7 - (m4 * x7);

      xIntersect2 = (b4 - b3)/(m3 - m4);
      yIntersect2 = (m4 * xIntersect2) + b4;

      checkbox.parent("sim-canvas-container");
      checkbox.position(0, -50);

      const formula = checkbox.checked();
  
      if (formula) {
        if (s) {
          s.remove();
        }
    
        sJarak = (map(xSegitiga, 417.5, 0, 52, 265));
        s = createElement("p", 's &nbsp;' + nf(sJarak, 1, 2) + ' cm');
        s.parent("sim-canvas-container");
        s.style("font-size", "30px");
        s.style("color", "#2B4162");
        s.position(733, 275);
  
        if (s_aks) {
          s_aks.remove();
        }
    
        s_aksJarak = (map(xIntersect2 -25, 417.5, 0, 52, 265));
        s_aks = createElement("p", 's` &nbsp;' + nf(s_aksJarak, 1, 2) + ' cm');
        s_aks.parent("sim-canvas-container");
        s_aks.style("font-size", "30px");
        s_aks.style("color", "#2B4162");
        s_aks.position(733, 300);

        if (formtext1) {
          formtext1.remove();
        }
  
        formtext1 = createElement("p", '1');
        formtext1.parent("sim-canvas-container");
        formtext1.position(47, 270);
        formtext1.style("font-size", "30px");
        formtext1.style("color", "#2B4162");

        if (formtext_) {
          formtext_.remove();
        }

        formtext_ = createElement("p", '__');
        formtext_.parent("sim-canvas-container");
        formtext_.position(40, 280);
        formtext_.style("font-size", "30px");
        formtext_.style("color", "#2B4162");

        if (formtext_s) {
          formtext_s.remove();
        }

        formtext_s = createElement("p", nf(sJarak, 1, 2));
        formtext_s.parent("sim-canvas-container");
        formtext_s.position(20, 315);
        formtext_s.style("font-size", "30px");
        formtext_s.style("color", "#2B4162");
        
        if (formtext_plus) {
          formtext_plus.remove();
        }

        formtext_plus = createElement("p", '+');
        formtext_plus.parent("sim-canvas-container");
        formtext_plus.position(110, 275);
        formtext_plus.style("font-size", "50px");
        formtext_plus.style("color", "#2B4162");

        if (formtext12) {
          formtext12.remove();
        }

        formtext12 = createElement("p", '1');
        formtext12.parent("sim-canvas-container");
        formtext12.position(165, 270);
        formtext12.style("font-size", "30px");
        formtext12.style("color", "#2B4162");

        if (formtext_2) {
          formtext_2.remove();
        }

        formtext_2 = createElement("p", '__');
        formtext_2.parent("sim-canvas-container");
        formtext_2.position(157, 280);
        formtext_2.style("font-size", "30px");
        formtext_2.style("color", "#2B4162");

        if (formtext_s_aks) {
          formtext_s_aks.remove();
        }

        formtext_s_aks = createElement("p", nf(s_aksJarak, 1, 2));
        formtext_s_aks.parent("sim-canvas-container");
        formtext_s_aks.position(140, 315);
        formtext_s_aks.style("font-size", "30px");
        formtext_s_aks.style("color", "#2B4162");

        if (formtext_equal1) {
          formtext_equal1.remove();
        }

        formtext_equal1 = createElement("p", '~');
        formtext_equal1.parent("sim-canvas-container");
        formtext_equal1.position(220, 270);
        formtext_equal1.style("font-size", "50px");
        formtext_equal1.style("color", "#2B4162");

        if (formtext_equal2) {
          formtext_equal2.remove();
        }
        formtext_equal2 = createElement("p", '~');
        formtext_equal2.parent("sim-canvas-container");
        formtext_equal2.position(220, 280);
        formtext_equal2.style("font-size", "50px");
        formtext_equal2.style("color", "#2B4162");

        if (formtext13) {
          formtext13.remove();
        }

        formtext13 = createElement("p", '1');
        formtext13.parent("sim-canvas-container");
        formtext13.position(277, 270);
        formtext13.style("font-size", "30px");
        formtext13.style("color", "#2B4162");

        if (formtext_3) {
          formtext_3.remove();
        }

        formtext_3 = createElement("p", '__');
        formtext_3.parent("sim-canvas-container");
        formtext_3.position(270, 280);
        formtext_3.style("font-size", "30px");
        formtext_3.style("color", "#2B4162");

        if (formtext_f) {
          formtext_f.remove();
        }

        formtext_f = createElement("p", ((rCCembung / 2) / 2) * (-1));
        formtext_f.parent("sim-canvas-container");
        formtext_f.position(260, 315);
        formtext_f.style("font-size", "30px");
        formtext_f.style("color", "#2B4162");
      } else {
        s.hide();
        s_aks.hide();
        formtext1.hide();
        formtext_.hide();
        formtext12.hide();
        formtext_2.hide();
        formtext13.hide();
        formtext_3.hide();
        formtext_s.hide();
        formtext_s_aks.hide();
        formtext_f.hide();
        formtext_plus.hide();
        formtext_equal1.hide();
        formtext_equal2.hide();
      }

      drawObjectImage(segitigaImg, xIntersect2 - 25, (ySegitiga / hSegitiga) + yIntersect2 - 5, wSegitiga + (wSegitiga - yIntersect2) + 30, hSegitiga + (hSegitiga - yIntersect2) + 30, 0.6);
    }
  }
  else if (objectType === "Pensil") {
    objectLayer.clear();
    objectLayer.stroke(0);
    objectLayer.line(0, height / 2, width, height / 2);

    if (mouseX > xPensil && mouseX < xPensil + wPensil && mouseY > yPensil && mouseY < yPensil + hPensil) {
      rollover = true;
      cursor(HAND);
    } else {
      rollover = false;
      cursor(ARROW);
    }
  
    if (dragging) {
      if (mirrorType === "Cembung") {
        xPensil = constrain(mouseX + offsetX, 0, width / 2 - wPensil + 15);
        yPensil = height / 2 - 150;
      } else if (mirrorType === "Cekung") {
        xPensil = constrain(mouseX + offsetX, 0, width / 2 - wPensil + 10);
        yPensil = height / 2 - 150;
      } else {
        xPensil = constrain(mouseX + offsetX, 0, width / 2 - wPensil);
        yPensil = height / 2 - 150;
      }
    }

    objectLayer.image(pensilImg, xPensil, yPensil, wPensil, hPensil);
    if (mirrorType === "Cembung"){
      let xRayStart = xPensil + wPensil / 2;
      let yRayStart = yPensil + 10;
      
      mirrorLayer.stroke(0, 0, 0);
      mirrorLayer.strokeWeight(2);
      mirrorLayer.line(xRayStart, yRayStart, width / 2, yRayStart);
      mirrorLayer.strokeWeight(1);

      mirrorLayer.stroke(0, 0, 0);
      mirrorLayer.strokeWeight(2);
      mirrorLayer.line(width / 2 + fCCembung, height / 2, width / 2, yRayStart);
      mirrorLayer.strokeWeight(1);

      let angle = atan2(height / 2 - yRayStart, width / 2 - (width / 2 + fCCembung));

      let extendedLength = 1000;
      let extendedX = width / 2 + fCCembung - extendedLength * cos(angle);
      let extendedY = height / 2 + extendedLength * sin(angle);      

      mirrorLayer.stroke(0, 0, 0);
      mirrorLayer.strokeWeight(2);
      mirrorLayer.line(width / 2 + fCCembung, height / 2, extendedX, extendedY);
      mirrorLayer.strokeWeight(1);

      mirrorLayer.stroke(0, 0, 0);
      mirrorLayer.strokeWeight(2);
      mirrorLayer.line(width / 2, height / 2, xRayStart, yRayStart);
      mirrorLayer.strokeWeight(1);

      let angle2 = atan2(height / 2 - yRayStart, xRayStart - width / 2);

      let extendedLength2 = 1000;
      let extendedX2 = width / 2 - extendedLength2 * cos(angle2);
      let extendedY2 = height / 2 + extendedLength * sin(angle2);      

      mirrorLayer.stroke(0, 0, 0);
      mirrorLayer.strokeWeight(2);
      mirrorLayer.line(width / 2, height / 2, extendedX2, extendedY2);
      mirrorLayer.strokeWeight(1);

      if (xPensil <= width / 2 - fCCembung - 70) {
        mirrorLayer.stroke(0, 0, 0);
        mirrorLayer.strokeWeight(2);
        mirrorLayer.line(xRayStart, yRayStart, width / 2 - fCCembung, height / 2);
        mirrorLayer.strokeWeight(1);

        let angle2 = atan2(yRayStart - height / 2, width / 2 - fCCembung - xRayStart);

        let extendedLength2 = 2000;
        let extendedX2 = xRayStart + extendedLength2 * cos(angle2);
        let extendedY2 = yRayStart - extendedLength2 * sin(angle2);

        mirrorLayer.stroke(0, 0, 0);
        mirrorLayer.strokeWeight(2);
        mirrorLayer.line(width / 2 - fCCembung, height / 2, extendedX2, extendedY2);
        mirrorLayer.strokeWeight(1);

        x1 = width / 2 - fCCembung;
        x2 = extendedX2;
        y1 = height / 2;
        y2 = extendedY2;
  
        m1 = (y2 - y1)/(x2 - x1);
        b1 = y1 - (m1 * x1);

        x3 = width / 2;
        x4 = width / 2 - 1;
        y3 = 0;
        y4 = height;
  
        m2 = (y4 - y3)/(x4 - x3);
        b2 = y3 - (m2 * x3);
  
        xIntersect = (b2 - b1)/(m1 - m2);
        yIntersect = (m2 * xIntersect) + b2 - 2;

        mirrorLayer.stroke(0, 0, 0);
        mirrorLayer.strokeWeight(2);
        mirrorLayer.line(width / 2, yIntersect, width, yIntersect);
        mirrorLayer.strokeWeight(1);

        x5 = width / 2;
        x6 = width;
        y5 = yIntersect;
        y6 = yIntersect;

        m3 = (y6 - y5)/(x6 - x5);
        b3 = y5 - (m3 * x5);

        x7 = width / 2 + fCCembung;
        x8 = extendedX;
        y7 = height / 2;
        y8 = extendedY;

        m4 = (y8 - y7)/(x8 - x7);
        b4 = y7 - (m4 * x7);

        xIntersect2 = (b4 - b3)/(m3 - m4);
        yIntersect2 = (m4 * xIntersect2) + b4;

        checkbox.parent("sim-canvas-container");
        checkbox.position(0, -50);

        const formula = checkbox.checked();
    
        if (formula) {
          if (s) {
            s.remove();
          }
      
          sJarak = (map(xPensil, 417.5, 0, 52, 265));
          s = createElement("p", 's &nbsp;' + nf(sJarak, 1, 2) + ' cm');
          s.parent("sim-canvas-container");
          s.style("font-size", "30px");
          s.style("color", "#2B4162");
          s.position(733, 275);
    
          if (s_aks) {
            s_aks.remove();
          }
      
          s_aksJarak = (map(xIntersect2 -25, 417.5, 0, 52, 265));
          s_aks = createElement("p", 's` &nbsp;' + nf(s_aksJarak, 1, 2) + ' cm');
          s_aks.parent("sim-canvas-container");
          s_aks.style("font-size", "30px");
          s_aks.style("color", "#2B4162");
          s_aks.position(733, 300);
  
          if (formtext1) {
            formtext1.remove();
          }
    
          formtext1 = createElement("p", '1');
          formtext1.parent("sim-canvas-container");
          formtext1.position(47, 270);
          formtext1.style("font-size", "30px");
          formtext1.style("color", "#2B4162");
  
          if (formtext_) {
            formtext_.remove();
          }
  
          formtext_ = createElement("p", '__');
          formtext_.parent("sim-canvas-container");
          formtext_.position(40, 280);
          formtext_.style("font-size", "30px");
          formtext_.style("color", "#2B4162");
  
          if (formtext_s) {
            formtext_s.remove();
          }
  
          formtext_s = createElement("p", nf(sJarak, 1, 2));
          formtext_s.parent("sim-canvas-container");
          formtext_s.position(20, 315);
          formtext_s.style("font-size", "30px");
          formtext_s.style("color", "#2B4162");
          
          if (formtext_plus) {
            formtext_plus.remove();
          }
  
          formtext_plus = createElement("p", '+');
          formtext_plus.parent("sim-canvas-container");
          formtext_plus.position(110, 275);
          formtext_plus.style("font-size", "50px");
          formtext_plus.style("color", "#2B4162");
  
          if (formtext12) {
            formtext12.remove();
          }
  
          formtext12 = createElement("p", '1');
          formtext12.parent("sim-canvas-container");
          formtext12.position(165, 270);
          formtext12.style("font-size", "30px");
          formtext12.style("color", "#2B4162");
  
          if (formtext_2) {
            formtext_2.remove();
          }
  
          formtext_2 = createElement("p", '__');
          formtext_2.parent("sim-canvas-container");
          formtext_2.position(157, 280);
          formtext_2.style("font-size", "30px");
          formtext_2.style("color", "#2B4162");
  
          if (formtext_s_aks) {
            formtext_s_aks.remove();
          }
  
          formtext_s_aks = createElement("p", nf(s_aksJarak, 1, 2));
          formtext_s_aks.parent("sim-canvas-container");
          formtext_s_aks.position(140, 315);
          formtext_s_aks.style("font-size", "30px");
          formtext_s_aks.style("color", "#2B4162");
  
          if (formtext_equal1) {
            formtext_equal1.remove();
          }
  
          formtext_equal1 = createElement("p", '~');
          formtext_equal1.parent("sim-canvas-container");
          formtext_equal1.position(220, 270);
          formtext_equal1.style("font-size", "50px");
          formtext_equal1.style("color", "#2B4162");
  
          if (formtext_equal2) {
            formtext_equal2.remove();
          }
          formtext_equal2 = createElement("p", '~');
          formtext_equal2.parent("sim-canvas-container");
          formtext_equal2.position(220, 280);
          formtext_equal2.style("font-size", "50px");
          formtext_equal2.style("color", "#2B4162");
  
          if (formtext13) {
            formtext13.remove();
          }
  
          formtext13 = createElement("p", '1');
          formtext13.parent("sim-canvas-container");
          formtext13.position(277, 270);
          formtext13.style("font-size", "30px");
          formtext13.style("color", "#2B4162");
  
          if (formtext_3) {
            formtext_3.remove();
          }
  
          formtext_3 = createElement("p", '__');
          formtext_3.parent("sim-canvas-container");
          formtext_3.position(270, 280);
          formtext_3.style("font-size", "30px");
          formtext_3.style("color", "#2B4162");
  
          if (formtext_f) {
            formtext_f.remove();
          }
  
          formtext_f = createElement("p", ((rCCembung / 2) / 2) * (-1));
          formtext_f.parent("sim-canvas-container");
          formtext_f.position(260, 315);
          formtext_f.style("font-size", "30px");
          formtext_f.style("color", "#2B4162");
        } else {
          s.hide();
          s_aks.hide();
          formtext1.hide();
          formtext_.hide();
          formtext12.hide();
          formtext_2.hide();
          formtext13.hide();
          formtext_3.hide();
          formtext_s.hide();
          formtext_s_aks.hide();
          formtext_f.hide();
          formtext_plus.hide();
          formtext_equal1.hide();
          formtext_equal2.hide();
        }

        drawObjectImage(pensilInvertImg, xIntersect2 - 65, yPensil + hPensil - 15, wPensil, yIntersect2 - hPensil - 50, 0.6);
      } else {
        let angle3 = atan2(yRayStart - height / 2, width / 2 + fCCembung - (width / 2));
        let angle4 = atan2(yPensil + 10 - height / 2, width / 2 - (xPensil + wPensil / 2));

        let extendedLength3 = 1000;
        let extendedX3 = width / 2 - extendedLength3 * cos(angle3);
        let extendedY3 = yRayStart + extendedLength3 * sin(angle3);

        let extendedLength4 = 1000;
        let extendedX4 = xPensil + wPensil / 2 - extendedLength4 * cos(angle4);
        let extendedY4 = yPensil + 10 + extendedLength4 * sin(angle4);

        mirrorLayer.stroke(0, 0, 0);
        mirrorLayer.strokeWeight(2);
        mirrorLayer.drawingContext.setLineDash([5, 5]);
        mirrorLayer.line(width / 2, yRayStart, extendedX3, extendedY3);
        mirrorLayer.strokeWeight(1);
        mirrorLayer.drawingContext.setLineDash([]);

        mirrorLayer.stroke(0, 0, 0);
        mirrorLayer.strokeWeight(2);
        mirrorLayer.drawingContext.setLineDash([5, 5]);
        mirrorLayer.line(xPensil + wPensil / 2, yPensil + 10, extendedX4, extendedY4);
        mirrorLayer.strokeWeight(1);
        mirrorLayer.drawingContext.setLineDash([]);

        x5 = xPensil + wPensil / 2;
        x6 = extendedX4;
        y5 = yPensil + 10;
        y6 = extendedY4;
  
        m3 = (y6 - y5)/(x6 - x5);
        b3 = y5 - (m3 * x5);
  
        x7 = width / 2;
        x8 = extendedX3;
        y7 = yRayStart;
        y8 = extendedY3;
  
        m4 = (y8 - y7)/(x8 - x7);
        b4 = y7 - (m4 * x7);
  
        xIntersect2 = (b4 - b3)/(m3 - m4);
        yIntersect2 = (m4 * xIntersect2) + b4;

        checkbox.parent("sim-canvas-container");
        checkbox.position(0, -50);

        const formula = checkbox.checked();
    
        if (formula) {
          if (s) {
            s.remove();
          }
      
          sJarak = (map(xPensil, 417.5, 0, 52, 265));
          s = createElement("p", 's &nbsp;' + nf(sJarak, 1, 2) + ' cm');
          s.parent("sim-canvas-container");
          s.style("font-size", "30px");
          s.style("color", "#2B4162");
          s.position(733, 275);
    
          if (s_aks) {
            s_aks.remove();
          }
      
          s_aksJarak = (map(xIntersect2 -25, 417.5, 0, 52, 265));
          s_aks = createElement("p", 's` &nbsp;' + nf(s_aksJarak, 1, 2) + ' cm');
          s_aks.parent("sim-canvas-container");
          s_aks.style("font-size", "30px");
          s_aks.style("color", "#2B4162");
          s_aks.position(733, 300);
  
          if (formtext1) {
            formtext1.remove();
          }
    
          formtext1 = createElement("p", '1');
          formtext1.parent("sim-canvas-container");
          formtext1.position(47, 270);
          formtext1.style("font-size", "30px");
          formtext1.style("color", "#2B4162");
  
          if (formtext_) {
            formtext_.remove();
          }
  
          formtext_ = createElement("p", '__');
          formtext_.parent("sim-canvas-container");
          formtext_.position(40, 280);
          formtext_.style("font-size", "30px");
          formtext_.style("color", "#2B4162");
  
          if (formtext_s) {
            formtext_s.remove();
          }
  
          formtext_s = createElement("p", nf(sJarak, 1, 2));
          formtext_s.parent("sim-canvas-container");
          formtext_s.position(20, 315);
          formtext_s.style("font-size", "30px");
          formtext_s.style("color", "#2B4162");
          
          if (formtext_plus) {
            formtext_plus.remove();
          }
  
          formtext_plus = createElement("p", '+');
          formtext_plus.parent("sim-canvas-container");
          formtext_plus.position(110, 275);
          formtext_plus.style("font-size", "50px");
          formtext_plus.style("color", "#2B4162");
  
          if (formtext12) {
            formtext12.remove();
          }
  
          formtext12 = createElement("p", '1');
          formtext12.parent("sim-canvas-container");
          formtext12.position(165, 270);
          formtext12.style("font-size", "30px");
          formtext12.style("color", "#2B4162");
  
          if (formtext_2) {
            formtext_2.remove();
          }
  
          formtext_2 = createElement("p", '__');
          formtext_2.parent("sim-canvas-container");
          formtext_2.position(157, 280);
          formtext_2.style("font-size", "30px");
          formtext_2.style("color", "#2B4162");
  
          if (formtext_s_aks) {
            formtext_s_aks.remove();
          }
  
          formtext_s_aks = createElement("p", nf(s_aksJarak, 1, 2));
          formtext_s_aks.parent("sim-canvas-container");
          formtext_s_aks.position(140, 315);
          formtext_s_aks.style("font-size", "30px");
          formtext_s_aks.style("color", "#2B4162");
  
          if (formtext_equal1) {
            formtext_equal1.remove();
          }
  
          formtext_equal1 = createElement("p", '~');
          formtext_equal1.parent("sim-canvas-container");
          formtext_equal1.position(220, 270);
          formtext_equal1.style("font-size", "50px");
          formtext_equal1.style("color", "#2B4162");
  
          if (formtext_equal2) {
            formtext_equal2.remove();
          }
          formtext_equal2 = createElement("p", '~');
          formtext_equal2.parent("sim-canvas-container");
          formtext_equal2.position(220, 280);
          formtext_equal2.style("font-size", "50px");
          formtext_equal2.style("color", "#2B4162");
  
          if (formtext13) {
            formtext13.remove();
          }
  
          formtext13 = createElement("p", '1');
          formtext13.parent("sim-canvas-container");
          formtext13.position(277, 270);
          formtext13.style("font-size", "30px");
          formtext13.style("color", "#2B4162");
  
          if (formtext_3) {
            formtext_3.remove();
          }
  
          formtext_3 = createElement("p", '__');
          formtext_3.parent("sim-canvas-container");
          formtext_3.position(270, 280);
          formtext_3.style("font-size", "30px");
          formtext_3.style("color", "#2B4162");
  
          if (formtext_f) {
            formtext_f.remove();
          }
  
          formtext_f = createElement("p", ((rCCembung / 2) / 2) * (-1));
          formtext_f.parent("sim-canvas-container");
          formtext_f.position(260, 315);
          formtext_f.style("font-size", "30px");
          formtext_f.style("color", "#2B4162");
        } else {
          s.hide();
          s_aks.hide();
          formtext1.hide();
          formtext_.hide();
          formtext12.hide();
          formtext_2.hide();
          formtext13.hide();
          formtext_3.hide();
          formtext_s.hide();
          formtext_s_aks.hide();
          formtext_f.hide();
          formtext_plus.hide();
          formtext_equal1.hide();
          formtext_equal2.hide();
        }
  
        drawObjectImage(pensilImg, xIntersect2 - 65, (yPensil / hPensil) + yIntersect2 - 15, wPensil, hPensil + (hPensil - yIntersect2) - 60, 0.6);
      }
    } else if (mirrorType === "Cekung") {
      let xRayStart = xPensil + wPensil / 2;
      let yRayStart = yPensil + 10;
      
      mirrorLayer.stroke(0, 0, 0);
      mirrorLayer.strokeWeight(2);
      mirrorLayer.line(xRayStart, yRayStart, width / 2, yRayStart);
      mirrorLayer.strokeWeight(1);

      mirrorLayer.stroke(0, 0, 0);
      mirrorLayer.strokeWeight(2);
      mirrorLayer.drawingContext.setLineDash([5, 5]);
      mirrorLayer.line(width / 2 + fCCekung, height / 2, width / 2, yRayStart);
      mirrorLayer.strokeWeight(1);
      mirrorLayer.drawingContext.setLineDash([]);

      let angle = atan2(height / 2 - yRayStart, width / 2 - (width / 2 + fCCekung));

      let extendedLength = 1000;
      let extendedX = width / 2 + fCCekung - extendedLength * cos(angle);
      let extendedY = height / 2 + extendedLength * sin(angle);      

      mirrorLayer.stroke(0, 0, 0);
      mirrorLayer.strokeWeight(2);
      mirrorLayer.drawingContext.setLineDash([5, 5]);
      mirrorLayer.line(width / 2 + fCCekung, height / 2, extendedX, extendedY);
      mirrorLayer.strokeWeight(1);
      mirrorLayer.drawingContext.setLineDash([]);

      mirrorLayer.stroke(0, 0, 0);
      mirrorLayer.strokeWeight(2);
      mirrorLayer.drawingContext.setLineDash([5, 5]);
      mirrorLayer.line(width / 2, yRayStart, width / 2 - fCCekung, height / 2);
      mirrorLayer.strokeWeight(1);
      mirrorLayer.drawingContext.setLineDash([]);

      let angle2 = atan2(yRayStart - height / 2, width / 2  - (width / 2 - fCCekung));

      let extendedLength2 = 1000;
      let extendedX2 = width / 2 - fCCekung - extendedLength2 * cos(angle2);
      let extendedY2 = height / 2 - extendedLength2 * sin(angle2);

      mirrorLayer.stroke(0, 0, 0);
      mirrorLayer.strokeWeight(2);
      mirrorLayer.drawingContext.setLineDash([5, 5]);
      mirrorLayer.line(width / 2 - fCCekung, height / 2, extendedX2, extendedY2);
      mirrorLayer.strokeWeight(1);
      mirrorLayer.drawingContext.setLineDash([]);

      mirrorLayer.stroke(0, 0, 0);
      mirrorLayer.strokeWeight(2);
      mirrorLayer.drawingContext.setLineDash([5, 5]);
      mirrorLayer.line(width / 2 + fCCekung, height / 2, xPensil + wPensil / 2, yPensil + 10);
      mirrorLayer.strokeWeight(1);
      mirrorLayer.drawingContext.setLineDash([]);

      let angle3 = atan2(yPensil + 10 - height / 2, xPensil + wPensil / 2 - (width / 2 + fCCekung));

      let extendedLength3 = 1000;
      let extendedX3 = width / 2 + fCCekung - extendedLength3 * cos(angle3);
      let extendedY3 = height / 2 - extendedLength3 * sin(angle3);

      mirrorLayer.stroke(0, 0, 0);
      mirrorLayer.strokeWeight(2);
      mirrorLayer.drawingContext.setLineDash([5, 5]);
      mirrorLayer.line(width / 2 + fCCekung, height / 2, extendedX3, extendedY3);
      mirrorLayer.strokeWeight(1);
      mirrorLayer.drawingContext.setLineDash([]);

      x1 = width / 2 + fCCekung;
      x2 = xPensil + wPensil / 2;
      y1 = height / 2;
      y2 = yPensil + 10;

      m1 = (y2 - y1)/(x2 - x1);
      b1 = y1 - (m1 * x1);

      x3 = width / 2;
      x4 = width / 2 - 1;
      y3 = 0;
      y4 = height;

      m2 = (y4 - y3)/(x4 - x3);
      b2 = y3 - (m2 * x3);

      xIntersect = (b2 - b1)/(m1 - m2);
      yIntersect = (m2 * xIntersect) + b2 - 2;

      mirrorLayer.stroke(0, 0, 0);
      mirrorLayer.strokeWeight(2);
      mirrorLayer.drawingContext.setLineDash([5, 5]);
      mirrorLayer.line(width / 2, yIntersect, 0, yIntersect);
      mirrorLayer.strokeWeight(1);
      mirrorLayer.drawingContext.setLineDash([]);

      mirrorLayer.stroke(0, 0, 0);
      mirrorLayer.strokeWeight(2);
      mirrorLayer.line(width / 2, height / 2, xRayStart, yRayStart);
      mirrorLayer.strokeWeight(1);

      let angle4 = atan2(height / 2 - yRayStart, xRayStart - width / 2);

      let extendedLength4 = 1000;
      let extendedX4 = width / 2 - extendedLength4 * cos(angle4);
      let extendedY4 = height / 2 + extendedLength4 * sin(angle4);      

      mirrorLayer.stroke(0, 0, 0);
      mirrorLayer.strokeWeight(2);
      mirrorLayer.line(width / 2, height / 2, extendedX4, extendedY4);
      mirrorLayer.strokeWeight(1);

      let angle5 = atan2(yRayStart - height / 2, width / 2 - fCCekung - (width / 2));

      let extendedLength5 = 1000;
      let extendedX5 = width / 2 - extendedLength5 * cos(angle5);
      let extendedY5 = yRayStart + extendedLength5 * sin(angle5);

      mirrorLayer.stroke(0, 0, 0);
      mirrorLayer.strokeWeight(2);
      mirrorLayer.drawingContext.setLineDash([5, 5]);
      mirrorLayer.line(width / 2, yRayStart, extendedX5, extendedY5);
      mirrorLayer.strokeWeight(1);
      mirrorLayer.drawingContext.setLineDash([]);

      x5 = width / 2;
      x6 = xPensil + wPensil / 2;
      y5 = height / 2;
      y6 = yPensil + 10;

      m3 = (y6 - y5)/(x6 - x5);
      b3 = y5 - (m3 * x5);

      x7 = width / 2;
      x8 = width / 2 - fCCekung;
      y7 = yRayStart;
      y8 = height / 2;

      m4 = (y8 - y7)/(x8 - x7);
      b4 = y7 - (m4 * x7);

      xIntersect2 = (b4 - b3)/(m3 - m4);
      yIntersect2 = (m4 * xIntersect2) + b4;

      checkbox.parent("sim-canvas-container");
      checkbox.position(0, -50);

      const formula = checkbox.checked();
  
      if (formula) {
        if (s) {
          s.remove();
        }
    
        sJarak = (map(xPensil, 417.5, 0, 52, 265));
        s = createElement("p", 's &nbsp;' + nf(sJarak, 1, 2) + ' cm');
        s.parent("sim-canvas-container");
        s.style("font-size", "30px");
        s.style("color", "#2B4162");
        s.position(733, 275);
  
        if (s_aks) {
          s_aks.remove();
        }
    
        s_aksJarak = (map(xIntersect2 -25, 417.5, 0, 52, 265));
        s_aks = createElement("p", 's` &nbsp;' + nf(s_aksJarak, 1, 2) + ' cm');
        s_aks.parent("sim-canvas-container");
        s_aks.style("font-size", "30px");
        s_aks.style("color", "#2B4162");
        s_aks.position(733, 300);

        if (formtext1) {
          formtext1.remove();
        }
  
        formtext1 = createElement("p", '1');
        formtext1.parent("sim-canvas-container");
        formtext1.position(47, 270);
        formtext1.style("font-size", "30px");
        formtext1.style("color", "#2B4162");

        if (formtext_) {
          formtext_.remove();
        }

        formtext_ = createElement("p", '__');
        formtext_.parent("sim-canvas-container");
        formtext_.position(40, 280);
        formtext_.style("font-size", "30px");
        formtext_.style("color", "#2B4162");

        if (formtext_s) {
          formtext_s.remove();
        }

        formtext_s = createElement("p", nf(sJarak, 1, 2));
        formtext_s.parent("sim-canvas-container");
        formtext_s.position(20, 315);
        formtext_s.style("font-size", "30px");
        formtext_s.style("color", "#2B4162");
        
        if (formtext_plus) {
          formtext_plus.remove();
        }

        formtext_plus = createElement("p", '+');
        formtext_plus.parent("sim-canvas-container");
        formtext_plus.position(110, 275);
        formtext_plus.style("font-size", "50px");
        formtext_plus.style("color", "#2B4162");

        if (formtext12) {
          formtext12.remove();
        }

        formtext12 = createElement("p", '1');
        formtext12.parent("sim-canvas-container");
        formtext12.position(165, 270);
        formtext12.style("font-size", "30px");
        formtext12.style("color", "#2B4162");

        if (formtext_2) {
          formtext_2.remove();
        }

        formtext_2 = createElement("p", '__');
        formtext_2.parent("sim-canvas-container");
        formtext_2.position(157, 280);
        formtext_2.style("font-size", "30px");
        formtext_2.style("color", "#2B4162");

        if (formtext_s_aks) {
          formtext_s_aks.remove();
        }

        formtext_s_aks = createElement("p", nf(s_aksJarak, 1, 2));
        formtext_s_aks.parent("sim-canvas-container");
        formtext_s_aks.position(140, 315);
        formtext_s_aks.style("font-size", "30px");
        formtext_s_aks.style("color", "#2B4162");

        if (formtext_equal1) {
          formtext_equal1.remove();
        }

        formtext_equal1 = createElement("p", '~');
        formtext_equal1.parent("sim-canvas-container");
        formtext_equal1.position(220, 270);
        formtext_equal1.style("font-size", "50px");
        formtext_equal1.style("color", "#2B4162");

        if (formtext_equal2) {
          formtext_equal2.remove();
        }
        formtext_equal2 = createElement("p", '~');
        formtext_equal2.parent("sim-canvas-container");
        formtext_equal2.position(220, 280);
        formtext_equal2.style("font-size", "50px");
        formtext_equal2.style("color", "#2B4162");

        if (formtext13) {
          formtext13.remove();
        }

        formtext13 = createElement("p", '1');
        formtext13.parent("sim-canvas-container");
        formtext13.position(277, 270);
        formtext13.style("font-size", "30px");
        formtext13.style("color", "#2B4162");

        if (formtext_3) {
          formtext_3.remove();
        }

        formtext_3 = createElement("p", '__');
        formtext_3.parent("sim-canvas-container");
        formtext_3.position(270, 280);
        formtext_3.style("font-size", "30px");
        formtext_3.style("color", "#2B4162");

        if (formtext_f) {
          formtext_f.remove();
        }

        formtext_f = createElement("p", ((rCCembung / 2) / 2) * (-1));
        formtext_f.parent("sim-canvas-container");
        formtext_f.position(260, 315);
        formtext_f.style("font-size", "30px");
        formtext_f.style("color", "#2B4162");
      } else {
        s.hide();
        s_aks.hide();
        formtext1.hide();
        formtext_.hide();
        formtext12.hide();
        formtext_2.hide();
        formtext13.hide();
        formtext_3.hide();
        formtext_s.hide();
        formtext_s_aks.hide();
        formtext_f.hide();
        formtext_plus.hide();
        formtext_equal1.hide();
        formtext_equal2.hide();
      }

      drawObjectImage(pensilImg, xIntersect2 - 65, (yPensil / hPensil) + yIntersect2 - 10, wPensil, hPensil + (hPensil - yIntersect2) - 75, 0.6);
    }
  }
  else if (objectType === "Apel") {
    objectLayer.clear();
    objectLayer.stroke(0);
    objectLayer.line(0, height / 2, width, height / 2);

    if (mouseX > xApel && mouseX < xApel + wApel && mouseY > yApel && mouseY < yApel + hApel) {
      rollover = true;
      cursor(HAND);
    } else {
      rollover = false;
      cursor(ARROW);
    }
  
    if (dragging) {
        if (mirrorType === "Cembung") {
        xApel = constrain(mouseX + offsetX, 0, width / 2 - wApel - 10);
        yApel = height / 2 - 113;
      } else if (mirrorType === "Cekung") {
        xApel = constrain(mouseX + offsetX, 0, width / 2 - wApel - 20);
        yApel = height / 2 - 113;
      } else {
        xApel = constrain(mouseX + offsetX, 0, width / 2 - wApel);
        yApel = height / 2 - 113;
      }
    }

    objectLayer.image(apelImg, xApel, yApel, wApel, hApel);
    if (mirrorType === "Cembung"){
      let xRayStart = xApel + wApel / 2;
      let yRayStart = yApel + 10;
      
      mirrorLayer.stroke(0, 0, 0);
      mirrorLayer.strokeWeight(2);
      mirrorLayer.line(xRayStart, yRayStart, width / 2, yRayStart);
      mirrorLayer.strokeWeight(1);

      mirrorLayer.stroke(0, 0, 0);
      mirrorLayer.strokeWeight(2);
      mirrorLayer.line(width / 2 + fCCembung, height / 2, width / 2, yRayStart);
      mirrorLayer.strokeWeight(1);

      let angle = atan2(height / 2 - yRayStart, width / 2 - (width / 2 + fCCembung));

      let extendedLength = 1000;
      let extendedX = width / 2 + fCCembung - extendedLength * cos(angle);
      let extendedY = height / 2 + extendedLength * sin(angle);      

      mirrorLayer.stroke(0, 0, 0);
      mirrorLayer.strokeWeight(2);
      mirrorLayer.line(width / 2 + fCCembung, height / 2, extendedX, extendedY);
      mirrorLayer.strokeWeight(1);

      mirrorLayer.stroke(0, 0, 0);
      mirrorLayer.strokeWeight(2);
      mirrorLayer.line(width / 2, height / 2, xRayStart, yRayStart);
      mirrorLayer.strokeWeight(1);

      let angle2 = atan2(height / 2 - yRayStart, xRayStart - width / 2);

      let extendedLength2 = 1000;
      let extendedX2 = width / 2 - extendedLength2 * cos(angle2);
      let extendedY2 = height / 2 + extendedLength * sin(angle2);      

      mirrorLayer.stroke(0, 0, 0);
      mirrorLayer.strokeWeight(2);
      mirrorLayer.line(width / 2, height / 2, extendedX2, extendedY2);
      mirrorLayer.strokeWeight(1);
      
      if (xApel <= width / 2 - fCCembung - 70) {
        mirrorLayer.stroke(0, 0, 0);
        mirrorLayer.strokeWeight(2);
        mirrorLayer.line(xRayStart, yRayStart, width / 2 - fCCembung, height / 2);
        mirrorLayer.strokeWeight(1);

        let angle2 = atan2(yRayStart - height / 2, width / 2 - fCCembung - xRayStart);

        let extendedLength2 = 2000;
        let extendedX2 = xRayStart + extendedLength2 * cos(angle2);
        let extendedY2 = yRayStart - extendedLength2 * sin(angle2);

        mirrorLayer.stroke(0, 0, 0);
        mirrorLayer.strokeWeight(2);
        mirrorLayer.line(width / 2 - fCCembung, height / 2, extendedX2, extendedY2);
        mirrorLayer.strokeWeight(1);

        x1 = width / 2 - fCCembung;
        x2 = extendedX2;
        y1 = height / 2;
        y2 = extendedY2;
  
        m1 = (y2 - y1)/(x2 - x1);
        b1 = y1 - (m1 * x1);

        x3 = width / 2;
        x4 = width / 2 - 1;
        y3 = 0;
        y4 = height;
  
        m2 = (y4 - y3)/(x4 - x3);
        b2 = y3 - (m2 * x3);
  
        xIntersect = (b2 - b1)/(m1 - m2);
        yIntersect = (m2 * xIntersect) + b2 - 2;

        mirrorLayer.stroke(0, 0, 0);
        mirrorLayer.strokeWeight(2);
        mirrorLayer.line(width / 2, yIntersect, width, yIntersect);
        mirrorLayer.strokeWeight(1);

        x5 = width / 2;
        x6 = 0;
        y5 = yIntersect;
        y6 = yIntersect;

        m3 = (y6 - y5)/(x6 - x5);
        b3 = y5 - (m3 * x5);

        x7 = width / 2 - fCCembung;
        x8 = extendedX;
        y7 = height / 2;
        y8 = extendedY;

        m4 = (y8 - y7)/(x8 - x7);
        b4 = y7 - (m4 * x7);

        xIntersect2 = (b4 - b3)/(m3 - m4);
        yIntersect2 = (m4 * xIntersect2) + b4;

        x5 = width / 2;
        x6 = width;
        y5 = yIntersect;
        y6 = yIntersect;

        m3 = (y6 - y5)/(x6 - x5);
        b3 = y5 - (m3 * x5);

        x7 = width / 2 + fCCembung;
        x8 = extendedX;
        y7 = height / 2;
        y8 = extendedY;

        m4 = (y8 - y7)/(x8 - x7);
        b4 = y7 - (m4 * x7);

        xIntersect2 = (b4 - b3)/(m3 - m4);
        yIntersect2 = (m4 * xIntersect2) + b4;

        checkbox.parent("sim-canvas-container");
        checkbox.position(0, -50);

        const formula = checkbox.checked();
    
        if (formula) {
          if (s) {
            s.remove();
          }
      
          sJarak = (map(xApel, 417.5, 0, 52, 265));
          s = createElement("p", 's &nbsp;' + nf(sJarak, 1, 2) + ' cm');
          s.parent("sim-canvas-container");
          s.style("font-size", "30px");
          s.style("color", "#2B4162");
          s.position(733, 275);
    
          if (s_aks) {
            s_aks.remove();
          }
      
          s_aksJarak = (map(xIntersect2 -25, 417.5, 0, 52, 265));
          s_aks = createElement("p", 's` &nbsp;' + nf(s_aksJarak, 1, 2) + ' cm');
          s_aks.parent("sim-canvas-container");
          s_aks.style("font-size", "30px");
          s_aks.style("color", "#2B4162");
          s_aks.position(733, 300);
  
          if (formtext1) {
            formtext1.remove();
          }
    
          formtext1 = createElement("p", '1');
          formtext1.parent("sim-canvas-container");
          formtext1.position(47, 270);
          formtext1.style("font-size", "30px");
          formtext1.style("color", "#2B4162");
  
          if (formtext_) {
            formtext_.remove();
          }
  
          formtext_ = createElement("p", '__');
          formtext_.parent("sim-canvas-container");
          formtext_.position(40, 280);
          formtext_.style("font-size", "30px");
          formtext_.style("color", "#2B4162");
  
          if (formtext_s) {
            formtext_s.remove();
          }
  
          formtext_s = createElement("p", nf(sJarak, 1, 2));
          formtext_s.parent("sim-canvas-container");
          formtext_s.position(20, 315);
          formtext_s.style("font-size", "30px");
          formtext_s.style("color", "#2B4162");
          
          if (formtext_plus) {
            formtext_plus.remove();
          }
  
          formtext_plus = createElement("p", '+');
          formtext_plus.parent("sim-canvas-container");
          formtext_plus.position(110, 275);
          formtext_plus.style("font-size", "50px");
          formtext_plus.style("color", "#2B4162");
  
          if (formtext12) {
            formtext12.remove();
          }
  
          formtext12 = createElement("p", '1');
          formtext12.parent("sim-canvas-container");
          formtext12.position(165, 270);
          formtext12.style("font-size", "30px");
          formtext12.style("color", "#2B4162");
  
          if (formtext_2) {
            formtext_2.remove();
          }
  
          formtext_2 = createElement("p", '__');
          formtext_2.parent("sim-canvas-container");
          formtext_2.position(157, 280);
          formtext_2.style("font-size", "30px");
          formtext_2.style("color", "#2B4162");
  
          if (formtext_s_aks) {
            formtext_s_aks.remove();
          }
  
          formtext_s_aks = createElement("p", nf(s_aksJarak, 1, 2));
          formtext_s_aks.parent("sim-canvas-container");
          formtext_s_aks.position(140, 315);
          formtext_s_aks.style("font-size", "30px");
          formtext_s_aks.style("color", "#2B4162");
  
          if (formtext_equal1) {
            formtext_equal1.remove();
          }
  
          formtext_equal1 = createElement("p", '~');
          formtext_equal1.parent("sim-canvas-container");
          formtext_equal1.position(220, 270);
          formtext_equal1.style("font-size", "50px");
          formtext_equal1.style("color", "#2B4162");
  
          if (formtext_equal2) {
            formtext_equal2.remove();
          }
          formtext_equal2 = createElement("p", '~');
          formtext_equal2.parent("sim-canvas-container");
          formtext_equal2.position(220, 280);
          formtext_equal2.style("font-size", "50px");
          formtext_equal2.style("color", "#2B4162");
  
          if (formtext13) {
            formtext13.remove();
          }
  
          formtext13 = createElement("p", '1');
          formtext13.parent("sim-canvas-container");
          formtext13.position(277, 270);
          formtext13.style("font-size", "30px");
          formtext13.style("color", "#2B4162");
  
          if (formtext_3) {
            formtext_3.remove();
          }
  
          formtext_3 = createElement("p", '__');
          formtext_3.parent("sim-canvas-container");
          formtext_3.position(270, 280);
          formtext_3.style("font-size", "30px");
          formtext_3.style("color", "#2B4162");
  
          if (formtext_f) {
            formtext_f.remove();
          }
  
          formtext_f = createElement("p", ((rCCembung / 2) / 2) * (-1));
          formtext_f.parent("sim-canvas-container");
          formtext_f.position(260, 315);
          formtext_f.style("font-size", "30px");
          formtext_f.style("color", "#2B4162");
        } else {
          s.hide();
          s_aks.hide();
          formtext1.hide();
          formtext_.hide();
          formtext12.hide();
          formtext_2.hide();
          formtext13.hide();
          formtext_3.hide();
          formtext_s.hide();
          formtext_s_aks.hide();
          formtext_f.hide();
          formtext_plus.hide();
          formtext_equal1.hide();
          formtext_equal2.hide();
        }

        drawObjectImage(apelInvertImg, xIntersect2 - 70, yApel + hApel - 15, yIntersect2 - wApel - 70, yIntersect2 - hApel - 70, 0.6);
      } else {
        let angle3 = atan2(yRayStart - height / 2, width / 2 + fCCembung - (width / 2));
        let angle4 = atan2(yApel + 10 - height / 2, width / 2 - (xApel + wApel / 2));

        let extendedLength3 = 1000;
        let extendedX3 = width / 2 - extendedLength3 * cos(angle3);
        let extendedY3 = yRayStart + extendedLength3 * sin(angle3);

        let extendedLength4 = 1000;
        let extendedX4 = xApel + wApel / 2 - extendedLength4 * cos(angle4);
        let extendedY4 = yApel + 10 + extendedLength4 * sin(angle4);

        mirrorLayer.stroke(0, 0, 0);
        mirrorLayer.strokeWeight(2);
        mirrorLayer.drawingContext.setLineDash([5, 5]);
        mirrorLayer.line(width / 2, yRayStart, extendedX3, extendedY3);
        mirrorLayer.strokeWeight(1);
        mirrorLayer.drawingContext.setLineDash([]);

        mirrorLayer.stroke(0, 0, 0);
        mirrorLayer.strokeWeight(2);
        mirrorLayer.drawingContext.setLineDash([5, 5]);
        mirrorLayer.line(xApel + wApel / 2, yApel + 10, extendedX4, extendedY4);
        mirrorLayer.strokeWeight(1);
        mirrorLayer.drawingContext.setLineDash([]);

        x5 = xApel + wApel / 2;
        x6 = extendedX4;
        y5 = yApel + 10;
        y6 = extendedY4;
  
        m3 = (y6 - y5)/(x6 - x5);
        b3 = y5 - (m3 * x5);
  
        x7 = width / 2;
        x8 = extendedX3;
        y7 = yRayStart;
        y8 = extendedY3;
  
        m4 = (y8 - y7)/(x8 - x7);
        b4 = y7 - (m4 * x7);
  
        xIntersect2 = (b4 - b3)/(m3 - m4);
        yIntersect2 = (m4 * xIntersect2) + b4;

        checkbox.parent("sim-canvas-container");
        checkbox.position(0, -50);

        const formula = checkbox.checked();
    
        if (formula) {
          if (s) {
            s.remove();
          }
      
          sJarak = (map(xApel, 417.5, 0, 52, 265));
          s = createElement("p", 's &nbsp;' + nf(sJarak, 1, 2) + ' cm');
          s.parent("sim-canvas-container");
          s.style("font-size", "30px");
          s.style("color", "#2B4162");
          s.position(733, 275);
    
          if (s_aks) {
            s_aks.remove();
          }
      
          s_aksJarak = (map(xIntersect2 -25, 417.5, 0, 52, 265));
          s_aks = createElement("p", 's` &nbsp;' + nf(s_aksJarak, 1, 2) + ' cm');
          s_aks.parent("sim-canvas-container");
          s_aks.style("font-size", "30px");
          s_aks.style("color", "#2B4162");
          s_aks.position(733, 300);
  
          if (formtext1) {
            formtext1.remove();
          }
    
          formtext1 = createElement("p", '1');
          formtext1.parent("sim-canvas-container");
          formtext1.position(47, 270);
          formtext1.style("font-size", "30px");
          formtext1.style("color", "#2B4162");
  
          if (formtext_) {
            formtext_.remove();
          }
  
          formtext_ = createElement("p", '__');
          formtext_.parent("sim-canvas-container");
          formtext_.position(40, 280);
          formtext_.style("font-size", "30px");
          formtext_.style("color", "#2B4162");
  
          if (formtext_s) {
            formtext_s.remove();
          }
  
          formtext_s = createElement("p", nf(sJarak, 1, 2));
          formtext_s.parent("sim-canvas-container");
          formtext_s.position(20, 315);
          formtext_s.style("font-size", "30px");
          formtext_s.style("color", "#2B4162");
          
          if (formtext_plus) {
            formtext_plus.remove();
          }
  
          formtext_plus = createElement("p", '+');
          formtext_plus.parent("sim-canvas-container");
          formtext_plus.position(110, 275);
          formtext_plus.style("font-size", "50px");
          formtext_plus.style("color", "#2B4162");
  
          if (formtext12) {
            formtext12.remove();
          }
  
          formtext12 = createElement("p", '1');
          formtext12.parent("sim-canvas-container");
          formtext12.position(165, 270);
          formtext12.style("font-size", "30px");
          formtext12.style("color", "#2B4162");
  
          if (formtext_2) {
            formtext_2.remove();
          }
  
          formtext_2 = createElement("p", '__');
          formtext_2.parent("sim-canvas-container");
          formtext_2.position(157, 280);
          formtext_2.style("font-size", "30px");
          formtext_2.style("color", "#2B4162");
  
          if (formtext_s_aks) {
            formtext_s_aks.remove();
          }
  
          formtext_s_aks = createElement("p", nf(s_aksJarak, 1, 2));
          formtext_s_aks.parent("sim-canvas-container");
          formtext_s_aks.position(140, 315);
          formtext_s_aks.style("font-size", "30px");
          formtext_s_aks.style("color", "#2B4162");
  
          if (formtext_equal1) {
            formtext_equal1.remove();
          }
  
          formtext_equal1 = createElement("p", '~');
          formtext_equal1.parent("sim-canvas-container");
          formtext_equal1.position(220, 270);
          formtext_equal1.style("font-size", "50px");
          formtext_equal1.style("color", "#2B4162");
  
          if (formtext_equal2) {
            formtext_equal2.remove();
          }
          formtext_equal2 = createElement("p", '~');
          formtext_equal2.parent("sim-canvas-container");
          formtext_equal2.position(220, 280);
          formtext_equal2.style("font-size", "50px");
          formtext_equal2.style("color", "#2B4162");
  
          if (formtext13) {
            formtext13.remove();
          }
  
          formtext13 = createElement("p", '1');
          formtext13.parent("sim-canvas-container");
          formtext13.position(277, 270);
          formtext13.style("font-size", "30px");
          formtext13.style("color", "#2B4162");
  
          if (formtext_3) {
            formtext_3.remove();
          }
  
          formtext_3 = createElement("p", '__');
          formtext_3.parent("sim-canvas-container");
          formtext_3.position(270, 280);
          formtext_3.style("font-size", "30px");
          formtext_3.style("color", "#2B4162");
  
          if (formtext_f) {
            formtext_f.remove();
          }
  
          formtext_f = createElement("p", ((rCCembung / 2) / 2) * (-1));
          formtext_f.parent("sim-canvas-container");
          formtext_f.position(260, 315);
          formtext_f.style("font-size", "30px");
          formtext_f.style("color", "#2B4162");
        } else {
          s.hide();
          s_aks.hide();
          formtext1.hide();
          formtext_.hide();
          formtext12.hide();
          formtext_2.hide();
          formtext13.hide();
          formtext_3.hide();
          formtext_s.hide();
          formtext_s_aks.hide();
          formtext_f.hide();
          formtext_plus.hide();
          formtext_equal1.hide();
          formtext_equal2.hide();
        }
  
        drawObjectImage(apelImg, xIntersect2 - 120, (yApel / hApel) + yIntersect2 - 15, wApel + (hApel - yIntersect2) + 20, hApel + (hApel - yIntersect2) + 20, 0.6);
      }
    } else if (mirrorType === "Cekung") {
      let xRayStart = xApel + wApel / 2;
      let yRayStart = yApel + 10;
      
      mirrorLayer.stroke(0, 0, 0);
      mirrorLayer.strokeWeight(2);
      mirrorLayer.line(xRayStart, yRayStart, width / 2, yRayStart);
      mirrorLayer.strokeWeight(1);

      mirrorLayer.stroke(0, 0, 0);
      mirrorLayer.strokeWeight(2);
      mirrorLayer.drawingContext.setLineDash([5, 5]);
      mirrorLayer.line(width / 2 + fCCekung, height / 2, width / 2, yRayStart);
      mirrorLayer.strokeWeight(1);
      mirrorLayer.drawingContext.setLineDash([]);

      let angle = atan2(height / 2 - yRayStart, width / 2 - (width / 2 + fCCekung));

      let extendedLength = 1000;
      let extendedX = width / 2 + fCCekung - extendedLength * cos(angle);
      let extendedY = height / 2 + extendedLength * sin(angle);      

      mirrorLayer.stroke(0, 0, 0);
      mirrorLayer.strokeWeight(2);
      mirrorLayer.drawingContext.setLineDash([5, 5]);
      mirrorLayer.line(width / 2 + fCCekung, height / 2, extendedX, extendedY);
      mirrorLayer.strokeWeight(1);
      mirrorLayer.drawingContext.setLineDash([]);

      mirrorLayer.stroke(0, 0, 0);
      mirrorLayer.strokeWeight(2);
      mirrorLayer.drawingContext.setLineDash([5, 5]);
      mirrorLayer.line(width / 2, yRayStart, width / 2 - fCCekung, height / 2);
      mirrorLayer.strokeWeight(1);
      mirrorLayer.drawingContext.setLineDash([]);

      let angle2 = atan2(yRayStart - height / 2, width / 2  - (width / 2 - fCCekung));

      let extendedLength2 = 1000;
      let extendedX2 = width / 2 - fCCekung - extendedLength2 * cos(angle2);
      let extendedY2 = height / 2 - extendedLength2 * sin(angle2);

      mirrorLayer.stroke(0, 0, 0);
      mirrorLayer.strokeWeight(2);
      mirrorLayer.drawingContext.setLineDash([5, 5]);
      mirrorLayer.line(width / 2 - fCCekung, height / 2, extendedX2, extendedY2);
      mirrorLayer.strokeWeight(1);
      mirrorLayer.drawingContext.setLineDash([]);

      mirrorLayer.stroke(0, 0, 0);
      mirrorLayer.strokeWeight(2);
      mirrorLayer.drawingContext.setLineDash([5, 5]);
      mirrorLayer.line(width / 2 + fCCekung, height / 2, xApel + wApel / 2, yApel + 10);
      mirrorLayer.strokeWeight(1);
      mirrorLayer.drawingContext.setLineDash([]);

      let angle3 = atan2(yApel + 10 - height / 2, xApel + wApel / 2 - (width / 2 + fCCekung));

      let extendedLength3 = 1000;
      let extendedX3 = width / 2 + fCCekung - extendedLength3 * cos(angle3);
      let extendedY3 = height / 2 - extendedLength3 * sin(angle3);

      mirrorLayer.stroke(0, 0, 0);
      mirrorLayer.strokeWeight(2);
      mirrorLayer.drawingContext.setLineDash([5, 5]);
      mirrorLayer.line(width / 2 + fCCekung, height / 2, extendedX3, extendedY3);
      mirrorLayer.strokeWeight(1);
      mirrorLayer.drawingContext.setLineDash([]);

      x1 = width / 2 + fCCekung;
      x2 = xApel + wApel / 2;
      y1 = height / 2;
      y2 = yApel + 10;

      m1 = (y2 - y1)/(x2 - x1);
      b1 = y1 - (m1 * x1);

      x3 = width / 2;
      x4 = width / 2 - 1;
      y3 = 0;
      y4 = height;

      m2 = (y4 - y3)/(x4 - x3);
      b2 = y3 - (m2 * x3);

      xIntersect = (b2 - b1)/(m1 - m2);
      yIntersect = (m2 * xIntersect) + b2 - 2;

      mirrorLayer.stroke(0, 0, 0);
      mirrorLayer.strokeWeight(2);
      mirrorLayer.drawingContext.setLineDash([5, 5]);
      mirrorLayer.line(width / 2, yIntersect, 0, yIntersect);
      mirrorLayer.strokeWeight(1);
      mirrorLayer.drawingContext.setLineDash([]);

      mirrorLayer.stroke(0, 0, 0);
      mirrorLayer.strokeWeight(2);
      mirrorLayer.line(width / 2, height / 2, xRayStart, yRayStart);
      mirrorLayer.strokeWeight(1);

      let angle4 = atan2(height / 2 - yRayStart, xRayStart - width / 2);

      let extendedLength4 = 1000;
      let extendedX4 = width / 2 - extendedLength4 * cos(angle4);
      let extendedY4 = height / 2 + extendedLength4 * sin(angle4);      

      mirrorLayer.stroke(0, 0, 0);
      mirrorLayer.strokeWeight(2);
      mirrorLayer.line(width / 2, height / 2, extendedX4, extendedY4);
      mirrorLayer.strokeWeight(1);

      let angle5 = atan2(yRayStart - height / 2, width / 2 - fCCekung - (width / 2));

      let extendedLength5 = 1000;
      let extendedX5 = width / 2 - extendedLength5 * cos(angle5);
      let extendedY5 = yRayStart + extendedLength5 * sin(angle5);

      mirrorLayer.stroke(0, 0, 0);
      mirrorLayer.strokeWeight(2);
      mirrorLayer.drawingContext.setLineDash([5, 5]);
      mirrorLayer.line(width / 2, yRayStart, extendedX5, extendedY5);
      mirrorLayer.strokeWeight(1);
      mirrorLayer.drawingContext.setLineDash([]);

      x5 = width / 2;
      x6 = xApel + wApel / 2;
      y5 = height / 2;
      y6 = yApel + 10;

      m3 = (y6 - y5)/(x6 - x5);
      b3 = y5 - (m3 * x5);

      x7 = width / 2;
      x8 = width / 2 - fCCekung;
      y7 = yRayStart;
      y8 = height / 2;

      m4 = (y8 - y7)/(x8 - x7);
      b4 = y7 - (m4 * x7);

      xIntersect2 = (b4 - b3)/(m3 - m4);
      yIntersect2 = (m4 * xIntersect2) + b4;

      checkbox.parent("sim-canvas-container");
      checkbox.position(0, -50);

      const formula = checkbox.checked();
  
      if (formula) {
        if (s) {
          s.remove();
        }
    
        sJarak = (map(xApel, 417.5, 0, 52, 265));
        s = createElement("p", 's &nbsp;' + nf(sJarak, 1, 2) + ' cm');
        s.parent("sim-canvas-container");
        s.style("font-size", "30px");
        s.style("color", "#2B4162");
        s.position(733, 275);
  
        if (s_aks) {
          s_aks.remove();
        }
    
        s_aksJarak = (map(xIntersect2 -25, 417.5, 0, 52, 265));
        s_aks = createElement("p", 's` &nbsp;' + nf(s_aksJarak, 1, 2) + ' cm');
        s_aks.parent("sim-canvas-container");
        s_aks.style("font-size", "30px");
        s_aks.style("color", "#2B4162");
        s_aks.position(733, 300);

        if (formtext1) {
          formtext1.remove();
        }
  
        formtext1 = createElement("p", '1');
        formtext1.parent("sim-canvas-container");
        formtext1.position(47, 270);
        formtext1.style("font-size", "30px");
        formtext1.style("color", "#2B4162");

        if (formtext_) {
          formtext_.remove();
        }

        formtext_ = createElement("p", '__');
        formtext_.parent("sim-canvas-container");
        formtext_.position(40, 280);
        formtext_.style("font-size", "30px");
        formtext_.style("color", "#2B4162");

        if (formtext_s) {
          formtext_s.remove();
        }

        formtext_s = createElement("p", nf(sJarak, 1, 2));
        formtext_s.parent("sim-canvas-container");
        formtext_s.position(20, 315);
        formtext_s.style("font-size", "30px");
        formtext_s.style("color", "#2B4162");
        
        if (formtext_plus) {
          formtext_plus.remove();
        }

        formtext_plus = createElement("p", '+');
        formtext_plus.parent("sim-canvas-container");
        formtext_plus.position(110, 275);
        formtext_plus.style("font-size", "50px");
        formtext_plus.style("color", "#2B4162");

        if (formtext12) {
          formtext12.remove();
        }

        formtext12 = createElement("p", '1');
        formtext12.parent("sim-canvas-container");
        formtext12.position(165, 270);
        formtext12.style("font-size", "30px");
        formtext12.style("color", "#2B4162");

        if (formtext_2) {
          formtext_2.remove();
        }

        formtext_2 = createElement("p", '__');
        formtext_2.parent("sim-canvas-container");
        formtext_2.position(157, 280);
        formtext_2.style("font-size", "30px");
        formtext_2.style("color", "#2B4162");

        if (formtext_s_aks) {
          formtext_s_aks.remove();
        }

        formtext_s_aks = createElement("p", nf(s_aksJarak, 1, 2));
        formtext_s_aks.parent("sim-canvas-container");
        formtext_s_aks.position(140, 315);
        formtext_s_aks.style("font-size", "30px");
        formtext_s_aks.style("color", "#2B4162");

        if (formtext_equal1) {
          formtext_equal1.remove();
        }

        formtext_equal1 = createElement("p", '~');
        formtext_equal1.parent("sim-canvas-container");
        formtext_equal1.position(220, 270);
        formtext_equal1.style("font-size", "50px");
        formtext_equal1.style("color", "#2B4162");

        if (formtext_equal2) {
          formtext_equal2.remove();
        }
        formtext_equal2 = createElement("p", '~');
        formtext_equal2.parent("sim-canvas-container");
        formtext_equal2.position(220, 280);
        formtext_equal2.style("font-size", "50px");
        formtext_equal2.style("color", "#2B4162");

        if (formtext13) {
          formtext13.remove();
        }

        formtext13 = createElement("p", '1');
        formtext13.parent("sim-canvas-container");
        formtext13.position(277, 270);
        formtext13.style("font-size", "30px");
        formtext13.style("color", "#2B4162");

        if (formtext_3) {
          formtext_3.remove();
        }

        formtext_3 = createElement("p", '__');
        formtext_3.parent("sim-canvas-container");
        formtext_3.position(270, 280);
        formtext_3.style("font-size", "30px");
        formtext_3.style("color", "#2B4162");

        if (formtext_f) {
          formtext_f.remove();
        }

        formtext_f = createElement("p", ((rCCembung / 2) / 2) * (-1));
        formtext_f.parent("sim-canvas-container");
        formtext_f.position(260, 315);
        formtext_f.style("font-size", "30px");
        formtext_f.style("color", "#2B4162");
      } else {
        s.hide();
        s_aks.hide();
        formtext1.hide();
        formtext_.hide();
        formtext12.hide();
        formtext_2.hide();
        formtext13.hide();
        formtext_3.hide();
        formtext_s.hide();
        formtext_s_aks.hide();
        formtext_f.hide();
        formtext_plus.hide();
        formtext_equal1.hide();
        formtext_equal2.hide();
      }

      drawObjectImage(apelFlipImg, xIntersect2 - 25, (yApel / hApel) + yIntersect2 - 5, wApel + (wApel - yIntersect2) - 5, hApel + (hApel - yIntersect2) - 5, 0.6);
    }
  }
  else if (objectType === "Clear") {
    objectLayer.clear();
    objectLayer.stroke(0);
    objectLayer.line(0, height / 2, width, height / 2);
    xKotak = width / 2 - 300;
    yKotak = height / 2 - 100;
    xSegitiga = width / 2 - 300;
    ySegitiga = height / 2 - 100;
    s.remove();
    s_aks.remove();
    checkbox.remove();
    formtext1.remove();
    formtext_.remove();
    formtext12.remove();
    formtext_2.remove();
    formtext13.remove();
    formtext_3.remove();
    formtext_s.remove();
    formtext_s_aks.remove();
    formtext_f.remove();
    formtext_plus.remove();
    formtext_equal1.remove();
    formtext_equal2.remove();
    s = createElement("p", 's');
    s.parent("sim-canvas-container");
    s.position(-2000, -2000);
    s_aks = createElement("p", 's`');
    s_aks.parent("sim-canvas-container");
    s_aks.position(-2000, -2000);
    checkbox = createCheckbox('Formula', false);
    checkbox.parent("sim-canvas-container");
    checkbox.position(-2000, -2000);
    formtext1 = createElement("p", 'f');
    formtext1.parent("sim-canvas-container");
    formtext1.position(-2000, -2000);
    formtext_ = createElement("p", 'f');
    formtext_.parent("sim-canvas-container");
    formtext_.position(-2000, -2000);
    formtext12 = createElement("p", 'f');
    formtext12.parent("sim-canvas-container");
    formtext12.position(-2000, -2000);
    formtext_2 = createElement("p", 'f');
    formtext_2.parent("sim-canvas-container");
    formtext_2.position(-2000, -2000);
    formtext13 = createElement("p", 'f');
    formtext13.parent("sim-canvas-container");
    formtext13.position(-2000, -2000);
    formtext_3 = createElement("p", 'f');
    formtext_3.parent("sim-canvas-container");
    formtext_3.position(-2000, -2000);
    formtext_s = createElement("p", 'f');
    formtext_s.parent("sim-canvas-container");
    formtext_s.position(-2000, -2000);
    formtext_s_aks = createElement("p", 'f');
    formtext_s_aks.parent("sim-canvas-container");
    formtext_s_aks.position(-2000, -2000);
    formtext_f = createElement("p", 'f');
    formtext_f.parent("sim-canvas-container");
    formtext_f.position(-2000, -2000);
    formtext_plus = createElement("p", 'f');
    formtext_plus.parent("sim-canvas-container");
    formtext_plus.position(-2000, -2000);
    formtext_equal1 = createElement("p", 'f');
    formtext_equal1.parent("sim-canvas-container");
    formtext_equal1.position(-2000, -2000);
    formtext_equal2 = createElement("p", 'f');
    formtext_equal2.parent("sim-canvas-container");
    formtext_equal2.position(-2000, -2000);
  }
}

function windowResized() {
  resizeCanvas(1095, 450);
}

function setMirrorType(type) {
  mirrorType = type;
}

function setObjectType(type) {
  objectType = type;
}

function drawObjectImage(img, x, y, w, h, opacity) {
  let tempLayer = createGraphics(width, height);
  tempLayer.tint(255, opacity * 255);
  tempLayer.image(img, x, y, w, h);
  mirrorLayer.image(tempLayer, 0, 0);
}

function mousePressed() {
  if (objectType === "Kotak" && mouseX > xKotak && mouseX < xKotak + wKotak && mouseY > yKotak && mouseY < yKotak + hKotak) {
    dragging = true;

    offsetX = xKotak - mouseX;
    offsetY = yKotak - mouseY;
  }
  if (objectType === "Segitiga" && mouseX > xSegitiga && mouseX < xSegitiga + wSegitiga && mouseY > ySegitiga && mouseY < ySegitiga + hSegitiga) {
    dragging = true;

    offsetX = xSegitiga - mouseX;
    offsetY = ySegitiga - mouseY;
  }
  if (objectType === "Pensil" && mouseX > xPensil && mouseX < xPensil + wPensil && mouseY > yPensil && mouseY < yPensil + hPensil) {
    dragging = true;

    offsetX = xPensil - mouseX;
    offsetY = yPensil - mouseY;
  }
  if (objectType === "Apel" && mouseX > xApel && mouseX < xApel + wApel && mouseY > yApel && mouseY < yApel + hApel) {
    dragging = true;

    offsetX = xApel - mouseX;
    offsetY = yApel - mouseY;
  }
}

function mouseReleased() {
  dragging = false;
}
