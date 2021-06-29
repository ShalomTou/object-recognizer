// Note: Require the cpu and webgl backend and add them to package.json as peer dependencies.
require('@tensorflow/tfjs-backend-cpu');
require('@tensorflow/tfjs-backend-webgl');
const cocoSsd = require('@tensorflow-models/coco-ssd');

(async () => {
  const img = document.getElementById('img');

  // Load the model.
  const model = await cocoSsd.load();

  // Classify the image.
  const predictions = await model.detect(img);

  console.log('Predictions: ');
  console.log(predictions);

  displayObjects(predictions)
})();

function displayObjects(arrayOfPredictions) {
  let container = document.querySelector(`.container`)
  let canvasArray = []
  for (const iterator of arrayOfPredictions) {
    let canvas = document.createElement(`canvas`)
    let ctx = canvas.getContext(`2d`)
    ctx.fillText(iterator.class,iterator.bbox[0],iterator.bbox[1])
    ctx.font ="30px Comic Sans MS"
    ctx.strokeStyle = `#FF0000`
    ctx.strokeRect(...iterator.bbox)
    canvasArray.push(canvas)
  }
  container.append(...canvasArray)

}