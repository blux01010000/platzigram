var page = require('page');
var empty = require('empty-element');
var template = require('./template');
var title = require('title');
var request = require('superagent');
var header = require('../header');
var axios = require('axios');
var Webcam = require('webcamjs');
var picture = require('../picture-card');

page('/', header, asyncLoad, function (ctx, next) {
  title('Platzigram');
  var main = document.getElementById('main-container');

  empty(main).appendChild(template(ctx.pictures));

  const picturePreview = $('#picture-preview');
  const camaraInput = $('#camara-input')
  const cancelPicture = $('#cancelPicture');
  const shootButton = $('#shoot');
  const uploadButton = $('#uploadButton')

  function reset() {
    picturePreview.addClass('hide');
    camaraInput.removeClass('hide');
    cancelPicture.addClass('hide');
    shootButton.removeClass('hide');
    uploadButton.addClass('hide');
  }

  cancelPicture.click(reset);

  $('.modal').modal({
    ready: function (modal, trigger) {
      Webcam.attach('#camara-input')
      shootButton.click((ev) => {
        Webcam.snap((data_uri) => {
          picturePreview.html(`<img src="${data_uri}"/>`);
          picturePreview.removeClass('hide');
          camaraInput.addClass('hide');
          cancelPicture.removeClass('hide');
          shootButton.addClass('hide');
          uploadButton.removeClass('hide');
          uploadButton.off('click');
          uploadButton.click(() => {
            const pic = {
              url: data_uri,
              likes: 0,
              liked: false,
              createdAt: +new Date(),
              user: {
                avatar: "https://pbs.twimg.com/profile_images/940520304979468293/Gi_7jUy3_400x400.jpg",
                username: "mbprats"
              }
            }
            $('#picture-cards').prepend(picture(pic));
            reset();
            $('#modalCamara').closeModal();
          });
        });
      })
    },
    complete: function () {
      Webcam.reset();
      reset();
    }
  });
})

function loadPictures(ctx, next) {
  request
    .get('/api/pictures')
    .end(function (err, res) {
      if (err) return console.log(err);

      ctx.pictures = res.body;
      next();
    })
}

function loadPicturesAxios(ctx, next) {
  axios
    .get('/api/pictures')
    .then(function (res) {
      ctx.pictures = res.data;
      next();
    })
    .catch(function (err) {
      console.log(err);
    })
}

function loadPicturesFetch(ctx, next) {
  fetch('/api/pictures')
    .then(function (res) {
      return res.json();
    })
    .then(function (pictures) {
      ctx.pictures = pictures;
      next();
    })
    .catch(function (err) {
      console.log(err);
    })
}

async function asyncLoad(ctx, next) {
  try {
    ctx.pictures = await fetch('/api/pictures').then(res => res.json());
    next();
  } catch (err) {
    return console.log(err);
  }
}