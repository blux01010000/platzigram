var express = require('express');
var multer  = require('multer');
var ext = require('file-extension');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    cb(null, +Date.now() + '.' + ext(file.originalname))
  }
})
 
var upload = multer({ storage: storage }).single('picture');

var app = express();

app.set('view engine', 'pug');

app.use(express.static('public'));

app.get('/', function (req, res) {
  res.render('index', { title: 'Platzigram' });
})

app.get('/signup', function (req, res) {
  res.render('index', { title: 'Platzigram - Signup' });
})

app.get('/signin', function (req, res) {
  res.render('index', { title: 'Platzigram - Signin' });
})

app.get('/api/pictures', function(req, res, next) {
	var pictures = [
 {
  user: {
   username: 'mbprats',
   avatar: 'https://pbs.twimg.com/profile_images/940520304979468293/Gi_7jUy3_400x400.jpg',
 },
 url: 'https://scontent.ftuc1-2.fna.fbcdn.net/v/t1.0-9/10987454_10206163430626805_5123103400652600953_n.jpg?_nc_eui2=v1%3AAeEoxgeipyciTsgKhgFS_07vN27ePRy72-53ufDwWU29MoSLRrhM8-Uy2najwp5zdQ64L59aXuytg4lfn2tpGf-QyWztsF4XIYjr0B-shqykzA&oh=b1986b920becfc09151363f0ff209302&oe=5B49EA77',
 likes: 0,
 liked: false,
 createdAt: new Date().getTime()
},
{
  user: {
   username: 'mbprats',
   avatar: 'https://pbs.twimg.com/profile_images/940520304979468293/Gi_7jUy3_400x400.jpg',
 },
 url: 'https://scontent.ftuc1-2.fna.fbcdn.net/v/t1.0-9/10384727_10206162330479302_3048121524254796025_n.jpg?_nc_eui2=v1%3AAeG94I19nhxijg5mnDZGXNAmxH_l_JiIbYyDJciIk_FHhzaNxBs3KA5Pp_UtbzSpews9b8tYuTDmg7uf0Vo6bSpyyALjQcBkhgPFZCvqKrT4LQ&oh=d71eccb9b68342f0974f457782326aee&oe=5B0B70EF',
 likes: 2,
 liked: true,
 createdAt: new Date().setDate(new Date().getDate() - 10)
}
];
  setTimeout(function () {
    res.send(pictures);  
  }, 2000)
})

app.post('/api/pictures', function (req, res) {
  upload(req, res, function (err) {
    if (err) {
      return res.send(500, "Error uploading file");
    }
    res.send('File uploaded');
  })
})

app.get('/api/user/:username', function (req, res) {
  const user = {
    username: 'mbprats',
    avatar: 'https://pbs.twimg.com/profile_images/940520304979468293/Gi_7jUy3_400x400.jpg',
    pictures: [
      {
        id: 1,
        src: 'https://scontent.ftuc1-1.fna.fbcdn.net/v/t1.0-9/1488014_10208392620555160_8941779244291280645_n.jpg?oh=e14522d95aa08bf62b697aefa36aa9d8&oe=5B4C9DBF',
        likes: 20
      },
      {
        id: 2,
        src: 'https://scontent.ftuc1-1.fna.fbcdn.net/v/t1.0-9/12079221_10207877781444504_975028699236698750_n.jpg?oh=1a65961c1cb77a4c7988d7c1cbb9ce52&oe=5B1277E5',
        likes: 25
      },
      {
        id: 3,
        src: 'https://scontent.ftuc1-1.fna.fbcdn.net/v/t1.0-9/17202856_10212441103724709_8357464188561146660_n.jpg?oh=3db2062ed3b5d2881f27080e07f66a29&oe=5B1171B2',
        likes: 35
      },
      {
        id: 4,
        src: 'https://scontent.ftuc1-1.fna.fbcdn.net/v/t1.0-9/17201400_10212419340060631_3670522802647307358_n.jpg?oh=571549e582cdf883cd3bc130404f9cd4&oe=5B12BCA8',
        likes: 40
      },
      {
        id: 5,
        src: 'https://scontent.ftuc1-1.fna.fbcdn.net/v/t1.0-9/14650728_10210875406943268_1504716067745910376_n.jpg?oh=3975a0cf4f341e0325fa028216328ee3&oe=5B15097A',
        likes: 45
      }
    ]
  }
  res.send(user);
})

app.get('/:username', function (req, res) {
  res.render('index', { title: `Platzigram - ${req.params.username}` })
})

app.get('/:username/:id', function (req, res) {
  res.render('index', { title: `Platzigram - ${req.params.username}` })
})


app.listen(3000, function(err) {
  if (err) return console.log('Hubo un error'), process.exit(1);

  console.log('Platzigram escuchando en el puerto 3000');
})