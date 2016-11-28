 // angular.module('BrandImageManagerApp')
//        .controller('EditPhotoController', EditPhotoController);
//
//
// function EditPhotoController (Upload, AccessService) {
//   var photo = this;
//   $(document).ready(function() {
//
//     console.log('EditPhotoController loaded!');
//
//
//     photo.canvas = document.getElementById('canvas');
//     photo.ctx = canvas.getContext('2d');
//
//
//     /**
//      * Demonstrates how to download a canvas an image with a single
//      * direct click on a link.
//      */
//
//
//     photo.doCanvas = function() {
//         var img = document.getElementById('hedgehog');
//         img.onload = function (){
//             photo.ctx.drawImage(img, 0, 0, img.width * 1, img.height * 0.8, 0, 0, img.width * 1, img.height * 1);
//         }
//         console.log('hedgehog img var made');
//     };
//
//     photo.redLeft = function() {
//         photo.ctx.clearRect(0, 0, photo.canvas.width, photo.canvas.height);
//         var img = document.getElementById('hedgehog');
//         photo.ctx.drawImage(img, 0, 0, img.width * 1, img.height * 0.8, 0, 0, img.width * 1, img.height * 1);
//         photo.ctx.fillStyle = 'blanchedalmond';
//         photo.ctx.fillRect(img.width * 0, img.height * 0, img.width * 0.2, img.height * 1);
//     };
//
//     photo.redBottom = function() {
//         photo.ctx.clearRect(0, 0, photo.canvas.width, photo.canvas.height);
//         var img = document.getElementById('hedgehog');
//         photo.ctx.drawImage(img, 0, 0, img.width * 1, img.height * 0.8, 0, 0, img.width * 1, img.height * 1);
//         photo.ctx.fillStyle = 'skyblue';
//         photo.ctx.fillRect(img.width * 0, img.width * 0.6, img.width * 1, img.height * 0.3);
//     };
//
//     photo.redRight = function() {
//         photo.ctx.clearRect(0, 0, photo.canvas.width, photo.canvas.height);
//         var img = document.getElementById('hedgehog');
//         photo.ctx.drawImage(img, 0, 0, img.width * 1, img.height * 0.8, 0, 0, img.width * 1, img.height * 1);
//         photo.ctx.fillStyle = 'forestgreen';
//         photo.ctx.fillRect(img.width * 0.8, img.height * 0, img.width * 0.2, img.height * 1);
//     };
//
//     /**
//      * This is the function that will take care of image extracting and
//      * setting proper filename for the download.
//      * IMPORTANT: Call it from within a onclick event.
//     */
//     photo.downloadCanvas = function (link) {
//       console.log('downloadCanvas run', link);
//         function() {
//           link.href = document.getElementById('canvas').toDataURL();
//           link.download = 'test.png';
//         }, false
//     };
//
//     document.getElementById('download').addEventListener('click', function() {
//         photo.downloadCanvas(this);
//     }, false);
//
//     // $('download').on('click', function(){
//     //     downloadCanvas(this, 'canvas', 'test.png');
//     // });
//     /**
//      * The event handler for the link's onclick event. We give THIS as a
//      * parameter (=the link element), ID of the canvas and a filename.
//     */
//     document.getElementById('redLeft').addEventListener('click', function() {
//         photo.redLeft();
//     }, false);
//
//     document.getElementById('redRight').addEventListener('click', function() {
//         photo.redRight();
//     }, false);
//
//     document.getElementById('redBottom').addEventListener('click', function() {
//         photo.redBottom();
//     }, false);
//
//     /**
//      * Draw something to canvas
//      */
//     photo.doCanvas();
//
//   });
// };

angular.module('BrandImageManagerApp')
       .controller('EditPhotoController', EditPhotoController);

function EditPhotoController(Upload, AccessService) {

  console.log('PhotoController loaded');
  var photo = this;
  var canvas = document.getElementById('canvas');
  photo.canvas = document.getElementById('canvas');

  // Uploads Image to S3 if one is selected.  Also sends image url to SQL db
  // with department_id.
    photo.downloadCanvas = function(canvas) {
        canvas = document.getElementById('canvas');

        // link.href = document.getElementById(canvasId).toDataURL();
        // link.download = filename;
        photo.submission = {};
        var theCanvas = canvas.toDataURL();
        console.log('so far so good');
        var blob = Upload.dataUrltoBlob(theCanvas, 'pic.png');
        // var blob = upload.dataUrltoBlob(dataurl, name);
        console.log('blob', blob);
        photo.submission.deptId = 1;
        Upload.upload({
            url: '/image/submissions',
            method: 'POST',
            data: {
                originalname : "ryan",
                file: blob
            }
        });
    }
}
