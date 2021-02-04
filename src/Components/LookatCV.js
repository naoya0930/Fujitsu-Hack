import React from 'react'
import * as faceapi from 'face-api.js'
//import cv from './opencv.js';
//import tf from 'te'

//const cv = require('./opencv.js');
//const cv = loadOpenCV('opencv.js');
//const cv = require('@mjyc/opencv.js');
//var cv;

async function setupModel(){
  await faceapi.nets.tinyFaceDetector.load("/");
  await faceapi.nets.faceLandmark68TinyNet.load("/");
  //cv = window.cv;
}

async function detect() {
  const stream = await navigator.mediaDevices.getUserMedia({
    video: true,
    audio: false,
  });
  const video = document.getElementById('video');
  video.srcObject = stream;
  await video.play();

  requestAnimationFrame(detect);

  //  webカメラの映像から顔認識を行う
  const useTinyModel = true;
  const detection = await faceapi
    .detectSingleFace(
      video,
      new faceapi.TinyFaceDetectorOptions({
      inputSize: 160,
      })
    )
    .withFaceLandmarks(useTinyModel);

  if (!detection) {
    return;
  }

  // 認識データをリサイズ
  const resizedDetection = faceapi.resizeResults(detection, {
    width: video.width,
    height: video.height,
  });
  faceapi.BoundingBox.

  // ランドマークをキャンバスに描画
  const canvas = document.getElementById('canvas1');
  canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
  faceapi.draw.drawFaceLandmarks(canvas, resizedDetection);

  // 以後使用するランドマーク座標
  const landmarks = resizedDetection.landmarks;
  const nose = landmarks.getNose()[3];
  const leftEye = landmarks.getLeftEye()[0];
  const rightEye = landmarks.getRightEye()[3];
  const jaw = landmarks.getJawOutline()[8];
  const leftMouth = landmarks.getMouth()[0];
  const rightMouth = landmarks.getMouth()[6];
  const leftOutline = landmarks.getJawOutline()[0];
  const rightOutline = landmarks.getJawOutline()[16];

  return {
    nose, 
    leftEye, 
    rightEye, 
    jaw, 
    leftMouth, 
    rightMouth, 
    leftOutline, 
    rightOutline,
  };
}

/*
function headpose({ rvec, tvec, cameraMatrix, distCoeffs, imagePoints }) {
  const noseEndPoint2DZ = new cv.Mat();
  const noseEndPoint2DY = new cv.Mat();
  const noseEndPoint2DX = new cv.Mat();

  const pointZ = new cv.matFromArray(1, 3, cv.CV_64FC1, [0.0, 0.0, 500.0]);
  const pointY = new cv.matFromArray(1, 3, cv.CV_64FC1, [0.0, 500.0, 0.0]);
  const pointX = new cv.matFromArray(1, 3, cv.CV_64FC1, [500.0, 0.0, 0.0]);
  const jaco = new cv.Mat();

  cv.projectPoints(
    pointZ,
    rvec,
    tvec,
    cameraMatrix,
    distCoeffs,
    noseEndPoint2DZ,
    jaco
  );
  cv.projectPoints(
    pointY,
    rvec,
    tvec,
    cameraMatrix,
    distCoeffs,
    noseEndPoint2DY,
    jaco
  );
  cv.projectPoints(
    pointX,
    rvec,
    tvec,
    cameraMatrix,
    distCoeffs,
    noseEndPoint2DX,
    jaco
  );

  const canvas2 = document.getElementById('canvas2');
  const context = canvas2.getContext('2d');

  const position = {
    nose: {
      x: imagePoints.data64F[0],
      y: imagePoints.data64F[1],
    },
    x: {
      x: noseEndPoint2DX.data64F[0],
      y: noseEndPoint2DX.data64F[1],
    },
    y: {
      x: noseEndPoint2DY.data64F[0],
      y: noseEndPoint2DY.data64F[1],
    },
    z: {
      x: noseEndPoint2DZ.data64F[0],
      y: noseEndPoint2DZ.data64F[1],
    },
  };

  context.clearRect(0, 0, canvas2.width, canvas2.height);

  context.beginPath();
  context.lineWidth = 2;
  context.strokeStyle = 'rgb(255, 0, 0)';
  context.moveTo(position.nose.x, position.nose.y);
  context.lineTo(position.z.x, position.z.y);
  context.stroke();
  context.closePath();

  context.beginPath();
  context.lineWidth = 2;
  context.strokeStyle = 'rgb(0, 0, 255)';
  context.moveTo(position.nose.x, position.nose.y);
  context.lineTo(position.x.x, position.x.y);
  context.stroke();
  context.closePath();

  context.beginPath();
  context.lineWidth = 2;
  context.strokeStyle = 'rgb(0, 255, 0)';
  context.moveTo(position.nose.x, position.nose.y);
  context.lineTo(position.y.x, position.y.y);
  context.stroke();
  context.closePath();

  const rmat = new cv.Mat();
  cv.Rodrigues(rvec, rmat);

  const projectMat = cv.Mat.zeros(3, 4, cv.CV_64FC1);
  projectMat.data64F[0] = rmat.data64F[0];
  projectMat.data64F[1] = rmat.data64F[1];
  projectMat.data64F[2] = rmat.data64F[2];
  projectMat.data64F[4] = rmat.data64F[3];
  projectMat.data64F[5] = rmat.data64F[4];
  projectMat.data64F[6] = rmat.data64F[5];
  projectMat.data64F[8] = rmat.data64F[6];
  projectMat.data64F[9] = rmat.data64F[7];
  projectMat.data64F[10] = rmat.data64F[8];

  const cmat = new cv.Mat();
  const rotmat = new cv.Mat();
  const travec = new cv.Mat();
  const rotmatX = new cv.Mat();
  const rotmatY = new cv.Mat();
  const rotmatZ = new cv.Mat();
  const eulerAngles = new cv.Mat();

  cv.decomposeProjectionMatrix(
    projectMat,
    cmat,
    rotmat,
    travec,
    rotmatX,
    rotmatY,
    rotmatZ,
    eulerAngles // 顔の角度情報
  );

  return {
    yaw: eulerAngles.data64F[1],
    pitch: eulerAngles.data64F[0],
    roll: eulerAngles.data64F[2],
  };
}

// capture model points
const detectPoints = [
  // nose
  [0.0, 0.0, 0.0],
  // jaw
  [0, -330, -65],
  // left eye
  [-240, 170, -135],
  // right eye
  [240, 170, -135],
  // left mouth
  [-150, -150, -125],
  // right mouth
  [150, -150, -125],
  // left outline
  [-480, 170, -340],
  // right outline
  [480, 170, -340],
];

function solve({
  nose,
  leftEye,
  rightEye,
  jaw,
  leftMouth,
  rightMouth,
  leftOutline,
  rightOutline,
}) {
  
  var m = cv.Mat(3,3);
  const rows = detectPoints.length / 3;
  const modelPoints = new cv.matFromArray(rows, 3, cv.CV_64FC1, detectPoints);

  // camera matrix
  const size = {
    width: 640,
    height: 480,
  };
  const center = [size.width / 2, size.height / 2];
  const cameraMatrix = new cv.matFromArray(3, 3, cv.CV_64FC1, [
    ...[size.width, 0, center[0]],
    ...[0, size.width, center[1]],
    ...[0, 0, 1],
  ]);

  // image matrix
  const imagePoints = new cv.Mat.zeros(rows, 2, cv.CV_64FC1);
  const distCoeffs = new cv.Mat.zeros(4, 1, cv.CV_64FC1);
  const rvec = new cv.Mat({ width: 1, height: 3 }, cv.CV_64FC1);
  const tvec = new cv.Mat({ width: 1, height: 3 }, cv.CV_64FC1);

  [
    nose,
    jaw,
    leftEye,
    rightEye,
    leftMouth,
    rightMouth,
    leftOutline,
    rightOutline,
  ].map((v, i) => {
    imagePoints.data64F[i] = v;
  });

  // 移動ベクトルと回転ベクトルの初期値を与えることで推測速度の向上をはかる
  tvec.data64F[0] = -100;
  tvec.data64F[1] = 100;
  tvec.data64F[2] = 1000;
  const distToLeftEyeX = Math.abs(leftEye[0] - nose[0]);
  const distToRightEyeX = Math.abs(rightEye[0] - nose[0]);
  if (distToLeftEyeX < distToRightEyeX) {
    // 左向き
    rvec.data64F[0] = -1.0;
    rvec.data64F[1] = -0.75;
    rvec.data64F[2] = -3.0;
  } else {
    // 右向き
    rvec.data64F[0] = 1.0;
    rvec.data64F[1] = -0.75;
    rvec.data64F[2] = -3.0;
  }

  const success = cv.solvePnP(
    modelPoints,
    imagePoints,
    cameraMatrix,
    distCoeffs,
    rvec,
    tvec,
    true
  );

  return {
    success,
    imagePoints,
    cameraMatrix,
    distCoeffs,
    rvec, // 回転ベクトル
    tvec, // 移動ベクトル
  };
}
/**/

class WebcamCapture extends React.Component {
  constructor(props) {
    super(props);
    setupModel();
  }

  render(){
    //headpose(solve(
    detect()
    //));

    return(
      <div >
        {//<script src="/opencv.js" type="text/javascript"></script>
        }<video id="video" width="640" height="480" ></video>
        <canvas id="canvas1" width="640" height="480"></canvas>
        <canvas id="canvas2" width="640" height="480"></canvas>
      </div>
    );
  }
}
  
export default WebcamCapture;