//Getting elements
const mainContainer = document.getElementById('main-container');
let img = document.getElementById('myImg');
const inputImg = document.getElementById('input-image');
const detectBtn = document.getElementById('detect-btn');
// console.log(faceapi.nets)
//Assumptions
let isVideo = false;
let myVideo;
//Function
const getData = async () => {
    let detectElem;
    if (isVideo) {
        detectElem = document.getElementById('myVideo');
    } else {
        detectElem = document.getElementById('myImg');
    }
    const canvas = faceapi.createCanvasFromMedia(detectElem);
    canvas.style.pointerEvents = 'none';
    mainContainer.append(canvas);
    const displaySize = {
        width: detectElem.width,
        height: detectElem.height
    };
    faceapi.matchDimensions(canvas, displaySize);
    let inter = 0;
    setInterval(async () => {
        const detections = await faceapi.detectAllFaces(detectElem, new faceapi.TinyFaceDetectorOptions())
            .withFaceLandmarks()
            .withFaceExpressions()
        // .withAgeAndGender()
        // .withFaceDescriptors();
        // console.log(detections)
        inter++;
        if (!detections.length) return inter<=1?alert(`Sorry ! Couldn't detect any face: ${inter}`):false;
        
        const resizedDetection = faceapi.resizeResults(detections, displaySize)
        canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
        faceapi.draw.drawDetections(canvas, resizedDetection)
        faceapi.draw.drawFaceLandmarks(canvas, resizedDetection)
        faceapi.draw.drawFaceExpressions(canvas, resizedDetection)
    }, 100);
}

// Loading Models
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
/*Alternative */
// (async () => {
//     await faceapi.nets.ssdMobilenetv1.loadFromUri('/models')
// // accordingly for the other models:
// await faceapi.nets.faceLandmark68Net.loadFromUri('/models')
// await faceapi.nets.faceRecognitionNet.loadFromUri('/models')
// await faceapi.nets.tinyFaceDetector.loadFromUri('/models')
// faceapi.nets.faceExpressionNet.loadFromUri('/models')
// // ...

// })().then(getData);

// Event Listeners
inputImg.addEventListener('input', () => {
    if (inputImg.files[0] && inputImg.files[0].type.toLowerCase().includes('video')) {
        isVideo = true;
    } else {
        isVideo = false;
    }
    let newUrl = URL.createObjectURL(inputImg.files[0]);
    console.log(newUrl);
    if (document.getElementsByTagName('canvas')[0]) mainContainer.removeChild(document.getElementsByTagName('canvas')[0]);
    if (isVideo) {
        myVideo = document.getElementById('myVideo');
        img.style.display = 'none';
        myVideo.style.display = 'block';
        myVideo.src = URL.createObjectURL(inputImg.files[0]);
        mainContainer.append(myVideo);

    } else {
        img.style.display = 'block';
        if (myVideo) {
            myVideo.style.display = 'none';
        }
        img.src = URL.createObjectURL(inputImg.files[0]);
    }

});
detectBtn.addEventListener('click', () => {
    document.getElementById('main-container').childNodes.forEach(e => {
        if (e.tagName == 'CANVAS') {
            console.log('e is:')
            console.log(e);
            document.getElementById('main-container').removeChild(e);
        }
    })
    // document.getElementsByName('canvas').forEach(e => {
    //     console.log('e is:')
    //     console.log(e);
    //     document.getElementById('main-container').removeChild(e);
    // })
    console.log('pre detect')
    if (!inputImg.files.length) return alert(`Please choose a file first.`);
    console.log('post detect')
    // mainContainer.removeChild(document.getElementsByTagName('canvas')[0]);
    // img.src = URL.createObjectURL(inputImg.files[0]);
    getData();
    console.log('last detect')
});

myVideo?.addEventListener('click', () => {
    myVideo.paused ? myVideo.play() : myVideo.pause();
});
myVideo?.addEventListener('play', () => {
    setInterval(() => {
        console.log('playing')
    }, 1000);
})

// window.addEventListener('resize', ()=> {
//     let cvs = document.getElementsByTagName('canvas')[0];
//     if(!cvs) return;
//     cvs.height = img.height;
//     cvs.width = img.width;
// })


//Lib
function setAttributes(el, attrs) {
    for (var key in attrs) {
        el.setAttribute(key, attrs[key]);
    }
}