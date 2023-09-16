const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const heading = $("header h2");
const cdThumb = $(".cd-thumb");
const audio = $("#audio");
const togetherPlay = $(".btn-toggle-play");
const cd = $(".cd");
const player = $(".player");
const progress = $(".progress");
const nextSong = $(".btn-next");
const preSong = $(".btn-prev");
const btnRepeat = $(".btn-repeat");
const btnRandom = $(".btn-random");
const singer = $(".singer");
const playlist = $(".playlist");
const hourSecond = $(".second .hour-second");
const vlUp = $(".icon-vlup");
const vlDown = $(".icon-vldown");
const vl = $(".icon-vl");
const slider = $(".slider");
const LOCALStorgeKey = "HUYCUONG23";


const app = {
  currentIndex: 0,
  defaultVolum: 1,
  mouseDownProgress: false,
  isPlaying: false,
  isRandom: false,
  isRepeat: false,
  config: JSON.parse(localStorage.getItem(LOCALStorgeKey)) || {},
  
  setconfig: function (key, value) {
    this.config[key] = value;
    localStorage.setItem(LOCALStorgeKey, JSON.stringify(this.config));
  },
  loadconfig: function () {
    app.isRandom = app.config.isRandom;
    app.isRepeat = app.config.isRepeat;
    app.defaultVolum = app.config.defaultVolum || 1;
  },
  songs: [
    {
      name: "Nang tinh hay nhe long",
      singer: "Tong Gia Vi",
      path: "./access/path/1.mp3",
      image: "./access/img/1.jfif",
      isStar: false,
    },
    {
      name: "nu cuoi 18 20",
      singer: "Doan Hieu",
      path: "./access/path/2.mp3",
      image: "./access/img/2.jpg",
      isStar: false,
    },
    {
      name: "Xin",
      singer: "Dat G",
      path: "./access/path/3.mp3",
      image: "./access/img/3.jpg",
      isStar: false,
    },
    {
      name: "tam su tuoi 30",
      singer: "Trinh Thang Binh",
      path: "./access/path/4.mp3",
      image: "./access/img/4.jpg",
      isStar: false,
    },
    {
      name: "phan boi chinh minh",
      singer: "Quan AP",
      path: "./access/path/5.mp3",
      image: "./access/img/5.jpg",
      isStar: false,
    },
    {
      name: "buoc qua mua co don",
      singer: "Vũ",
      path: "./access/path/6.mp3",
      image: "./access/img/6.jfif",
      isStar: false,
    },
    {
      name: "bat coc con tim",
      singer: "Lou Hoàng",
      path: "./access/path/7.mp3",
      image: "./access/img/7.png",
      isStar: false,
    },
    {
      name: "Hanh Phuc Moi",
      singer: "Sơn Tùng MTP",
      path: "./access/path/8.mp3",
      image: "./access/img/8.jpg",
      isStar: false,
    },
    {
      name: "Trốn Tìm",
      singer: "Đen",
      path: "./access/path/9.mp3",
      image: "./access/img/9.jpg",
      isStar: false,
    },
  ],
  render: function () {
    const htmls = this.songs.map((song, index) => {
      star = song.isStar;
      return `<div data-index="${index}" class="song ${
        index === this.currentIndex ? "active" : ""
      }">
        <div
          class="thumb"
          style="
            background-image: url('${song.image}');
          "
        ></div>
        <div class="body">
          <h3 class="title">${song.name}</h3>
          <p class="author">${song.singer}</p>
        </div>
        <div data-index="${index}" class="option ${
        song.isStar == true ? "active" : ""
      }">
          <i class="ti-star"></i>
        </div>
      </div>`;
    });
    document.querySelector(".playlist").innerHTML = htmls.join("");
  },
  definePropoties: function () {
    Object.defineProperty(this, "currentSong", {
      get: function () {
        return this.songs[this.currentIndex];
      },
    });
  },
  handleEvent: function () {
    // click volumm
    const songs = this.songs;
    slider.onclick = function (e) {
      app.defaultVolum = e.target.value / 100;
      audio.volume = app.defaultVolum;
      app.setconfig("defaultVolum", app.defaultVolum)
    };
    vlUp.onclick = function () {
      if (app.defaultVolum < 0.9 && app.defaultVolum >= 0) {
        app.defaultVolum = app.defaultVolum + 0.1;
        audio.volume = app.defaultVolum;
        slider.value = app.defaultVolum * 100;
        app.setconfig("defaultVolum", app.defaultVolum)
      } else {
        app.defaultVolum = 1;
        audio.volume = app.defaultVolum;
        slider.value = app.defaultVolum * 100;
        app.setconfig("defaultVolum", app.defaultVolum)
      }
    };
    vlDown.onclick = function () {
      if (app.defaultVolum > 0.1 && app.defaultVolum <= 1) {
        app.defaultVolum = app.defaultVolum - 0.1;
        audio.volume = app.defaultVolum;
        slider.value = app.defaultVolum * 100;
        app.setconfig("defaultVolum", app.defaultVolum)

      } else {
        app.defaultVolum = 0;
        audio.volume = app.defaultVolum;
        slider.value = app.defaultVolum * 100;
        app.setconfig("defaultVolum", app.defaultVolum)

      }
    };
    vl.onclick = function () {
      if (audio.volume === 0) {
        audio.volume = app.defaultVolum;
        slider.value = app.defaultVolum * 100;
        app.setconfig("defaultVolum", app.defaultVolum)

      } else {
        audio.volume = 0;
        slider.value = 0;

      }
    };
    // xử lý phóng to thu nhỏ cd
    const csWidth = cd.offsetWidth;
    document.onscroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const newCdWidth = csWidth - scrollTop;
      cd.style.width = newCdWidth > 0 ? newCdWidth + "px" : 0 + "px";
      cd.style.opacity = newCdWidth / csWidth;
    };
    // xử lý play
    togetherPlay.onclick = () => {
      if (app.isPlaying == true) {
        audio.pause();
      } else {
        audio.play();
      }
    };
    audio.onplay = () => {
      app.isPlaying = true;
      player.classList.add("playing");
      cdThumb.classList.add("cd-playing");
    };
    audio.onpause = () => {
      app.isPlaying = false;
      player.classList.remove("playing");
      cdThumb.classList.remove("cd-playing");
    };
    // mousedown progress do not update
    progress.onmousedown = () => {
      app.mouseDownProgress = true;
    };
    progress.onmouseup = () => {
      app.mouseDownProgress = false;
    };
    audio.ontimeupdate = () => {
      if (!app.mouseDownProgress) {
        const progressPercent = Math.floor(
          (audio.currentTime / audio.duration) * 100
        );
        progress.value = progressPercent;
      }
    };
    // click time update
    progress.onclick = function (e) {
      const seekTime = (audio.duration / 100) * e.target.value;
      audio.currentTime = seekTime;
    };
    audio.onended = function () {
      if (app.isRepeat) {
        audio.currentTime = 0;
        audio.play();
      } else {
        if (app.isRandom) {
          app.playRandom();
        } else {
          app.playnext();
          app.render();
          audio.play();
        }
      }
    };
    document.body.onkeyup = function (e) {
      if (e.keyCode === 32) {
        app.spaceIsPlaying();
        setTimeout(() => {
          const songActive = $(".song.active");
          songActive.scrollIntoView({
            behavior: "smooth",
            block: "center",
            inline: "nearest",
          });
        }, 200);
      }
    };
    playlist.onclick = function (e) {
      const songNode = e.target.closest(".song:not(.active)");
      if (songNode || e.target.closest(".option")) {
        if (songNode && !e.target.closest(".option")) {
          $(".song.active").classList.remove("active");
          songNode.classList.add("active");
          app.currentIndex = songNode.dataset.index;
          app.loadCurrentSong();
          audio.play();
        }
        if (e.target.closest(".option")) {
          const starIndex = e.target.closest(".option").dataset.index;
          if (songs[starIndex].isStar === false) {
            e.target.closest(".option").classList.add("active");
            songs[starIndex].isStar = true;
          } else {
            e.target.closest(".option").classList.remove("active");
            songs[starIndex].isStar = false;
          }
        }
      }
    };
  },
  spaceIsPlaying: function () {
    if (app.isPlaying === true) {
      audio.pause();
    } else {
      audio.play();
    }
  },
  loadCurrentSong: function () {
    heading.textContent = this.currentSong.name;
    singer.innerHTML = this.currentSong.singer;

    cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`;
    audio.src = this.currentSong.path;
  },
  nextSong: function () {
    nextSong.onclick = function () {
      if (app.isRandom) {
        app.playRandom();
      } else {
        app.playnext();
        audio.play();
        app.render();
        app.scrollActiveSong();
      }
    };
  },
  preSong: function () {
    preSong.onclick = function () {
      if (app.isRandom) {
        app.playRandom();
      } else {
        app.preNext();
        audio.play();
        app.render();
        app.scrollActiveSong();
      }
    };
  },
  scrollActiveSong: function () {
    setTimeout(() => {
      const songActive = $(".song.active");
      songActive.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "nearest",
      });
    }, 300);
  },
  repeatSong: function () {
    btnRepeat.onclick = function () {
      if ($(".btn.active")) {
        btnRepeat.classList.remove("active");
        app.isRepeat = false;
        app.setconfig("isRepeat", app.isRepeat);
      } else {
        btnRepeat.classList.add("active");
        app.isRepeat = true;
        app.setconfig("isRepeat", app.isRepeat);

      }
    };
  },
  playnext: function () {
    app.currentIndex++;
    if (app.currentIndex >= app.songs.length) {
      app.currentIndex = 0;
    }
    app.loadCurrentSong();
  },
  preNext: function () {
    app.currentIndex--;
    if (app.currentIndex < 0) {
      app.currentIndex = app.songs.length - 1;
    }
    app.loadCurrentSong();
  },
  randomSong: function () {
    btnRandom.onclick = function () {
      if ($(".btn.active")) {
        btnRandom.classList.remove("active");
        app.isRandom = false;
        app.setconfig("isRandom", app.isRandom);
      } else {
        btnRandom.classList.add("active");
        app.isRandom = true;
        app.setconfig("isRandom", app.isRandom);
      }
    };
  },
  playRandom: function () {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * app.songs.length);
    } while (newIndex === this.currentIndex);
    app.currentIndex = newIndex;
    this.loadCurrentSong();
    this.render();
    audio.play();
  },
  start: function () {
    
    this.loadconfig();
    if (this.config.isRandom) {
      btnRandom.classList.add("active");
    }
    if (this.config.isRepeat) {
      btnRepeat.classList.add("active");
    }
    audio.volume = app.defaultVolum;
    slider.value = app.defaultVolum * 100;
    this.definePropoties();
    this.loadCurrentSong();
    this.handleEvent();
    this.nextSong();
    this.preSong();
    this.repeatSong();
    this.randomSong();
    this.render();
  },
};
app.start();
setInterval(function () {
  hourSecond.innerHTML = `${Math.floor(audio.currentTime)} s / ${Math.floor(
    audio.duration
  )} s`;
}, 100);
