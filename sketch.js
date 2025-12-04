
let uX, uY; // タッチしているポイントの座標
let cX, cY; // 回転検出のセンター座標
let pX, pY; // 表示のセンター座標
let circle_in, circle_out; // タッチする円の内径、外径
let rect_length,rect_width; // 表示する四角の長さと幅
let touch_onoff;

let img = []; //画像の配列をつくる

// 画像を読み込む
function preload() 
{
  img[0] = loadImage("phenakistiscope_face_1833s.png"); 
}

function setup() 
{

  //スクロールを固定
  
    window.addEventListener("touchstart", function (event) { event.preventDefault(); }, { passive: false });
  window.addEventListener("touchmove", function (event) { event.preventDefault(); }, { passive: false });

  createCanvas(windowWidth, windowHeight);
  ww = windowWidth;
  wh = windowHeight;
}

function draw() {
  background(200);
  
  // タッチがある場合はタッチ座標を使用し、ない場合はマウス座標を使用

     if (touches.length > 0) {
        uX = touches[0].x;
        uY = touches[0].y;
       
      } else {
        uX = mouseX;
        uY = mouseY;
      }

  //画面の縦横どっちが長いかで表示位置を変える
  if(ww < wh)
  {
    cX = ww/2;
    cY = wh/6*5;
    pX = ww/2;
    pY = wh/6*2;
    if(touch_onoff)
    {
      circle_in = ww/3;
      circle_out = ww/5;
    }
    else
    {
      circle_in = ww/3*0.95;
      circle_out = ww/5*1.05;
    }
      rect_length = ww*0.8;
      rect_width = ww*0.1;
  }
  else
  {
    cX = ww/6*5;
    cY = wh/2;
    pX = ww/6*2;
    pY = wh/2;
    if(touch_onoff)
    {
      circle_in = wh/3;
      circle_out = wh/5;
    }
    else
    {
      circle_in = wh/3*0.95;
      circle_out = wh/5*1.05;
    }
    rect_length = wh*0.8;
    rect_width = wh*0.1;
  }
    
  push();
  translate(cX, cY);
  noStroke();
  if(touch_onoff)
  {
    fill(255,210,210);
  }
  else
  {
    fill(255,200,200);
  }
  ellipse(0,0,circle_in,circle_in);
  
  noStroke();
  fill(200);
  ellipse(0,0,circle_out,circle_out);
  pop();
  
  // 原点に対するマウスの座標を取得
  let x = uX - cX;
  let y = uY - cY;

  // マウスと原点の間の角度を計算
  let a = atan2(y, x);

  push();
  // 原点を中心に移動
  translate(pX, pY);

  // 回転
  rotate(a);

  push();

    if(ww < wh)
  {
    scale(ww/img[0].width*0.8);
  }
  else
  {
    scale(wh/img[0].width*0.8);
  }
  
  // 驚き盤画像を描画 画像の中心を原点に
  image(img[0], -img[0].width/2,-img[0].height/2);
  pop();

/*  
  fill(255);
  rect(-rect_length/2, -rect_width/2, rect_length, rect_width);
*/
  pop();
  
}

function mousePressed() 
{
//    snd[0].play();
  uX = mouseX;
  uY = mouseY;
  touch_onoff = true;
}

function mouseReleased() 
{
  touch_onoff = false;
}

function touchStarted() 
{
  touch_onoff = true;
}

function touchEnded() 
{
  touch_onoff = false;
}
/*
function touchMoved() 
{
  uX = touches[0].x;
  uY = touches[0].y;
}
*/