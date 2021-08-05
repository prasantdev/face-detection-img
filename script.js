const mainContainer = document.getElementById('main-container');
const img = document.getElementById('myImg');
const inputImg = document.getElementById('input-image');
const detectBtn = document.getElementById('detect-btn');
// console.log(faceapi.nets)
const getData = async () => {
    
    const canvas = faceapi.createCanvasFromMedia(img);
    mainContainer.append(canvas);
    const displaySize = {
        width: img.width,
        height: img.height
    };
    faceapi.matchDimensions(canvas, displaySize);
    const detections = await faceapi.detectAllFaces(img, new faceapi.TinyFaceDetectorOptions())
    .withFaceLandmarks()
    .withFaceExpressions()
    // .withAgeAndGender()
    // .withFaceDescriptors();
    console.log(detections)
    if(!detections.length) return alert(`Sory ! I couldn't detect any face...`)
    const resizedDetection = faceapi.resizeResults(detections, displaySize)
    faceapi.draw.drawDetections(canvas, resizedDetection)
    faceapi.draw.drawFaceLandmarks(canvas, resizedDetection)
    faceapi.draw.drawFaceExpressions(canvas, resizedDetection)
}
// (async () => {
//     await faceapi.nets.ssdMobilenetv1.loadFromUri('/models')
// // accordingly for the other models:
// await faceapi.nets.faceLandmark68Net.loadFromUri('/models')
// await faceapi.nets.faceRecognitionNet.loadFromUri('/models')
// await faceapi.nets.tinyFaceDetector.loadFromUri('/models')
// faceapi.nets.faceExpressionNet.loadFromUri('/models')
// // ...

// })().then(getData);

Promise.all([
//     faceapi.nets.tinyFaceDetector.loadFromUri('https://prasantdev.github.io/face-detection-img/models'),
//     faceapi.nets.faceLandmark68Net.loadFromUri('https://prasantdev.github.io/face-detection-img/models'),
//     faceapi.nets.faceRecognitionNet.loadFromUri('https://prasantdev.github.io/face-detection-img/models'),
//     faceapi.nets.faceExpressionNet.loadFromUri('https://prasantdev.github.io/face-detection-img/models')
    faceapi.nets.tinyFaceDetector.loadFromUri('./models'),
    faceapi.nets.faceLandmark68Net.loadFromUri('./models'),
    faceapi.nets.faceRecognitionNet.loadFromUri('./models'),
    faceapi.nets.faceExpressionNet.loadFromUri('./models')
    //faceapi.nets.ssdMobilenetv1.loadFromUri('models')
]).then(getData)

inputImg.addEventListener('input', () => {
    let newUrl = URL.createObjectURL(inputImg.files[0]);
    console.log(newUrl);
    mainContainer.removeChild(document.getElementsByTagName('canvas')[0]);
    img.src = URL.createObjectURL(inputImg.files[0]);
});
detectBtn.addEventListener('click', () => {
    console.log('pre detect')
    if(!inputImg.files.length) return alert(`Please choose a file first.`);
    console.log('post detect')
    // mainContainer.removeChild(document.getElementsByTagName('canvas')[0]);
    // img.src = URL.createObjectURL(inputImg.files[0]);
    getData();
    console.log('last detect')
});

// window.addEventListener('resize', ()=> {
//     let cvs = document.getElementsByTagName('canvas')[0];
//     if(!cvs) return;
//     cvs.height = img.height;
//     cvs.width = img.width;
// })
