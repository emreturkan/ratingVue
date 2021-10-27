<template>
  <div  class="flex flex-col justify-center items-center">
    <div id="searchName-strings">
      <span  class="searchName"></span>
    </div>
    
    <input
      v-model="searchMovie"
      @keydown="araMovie"
      type="search"
      name=""
      id=""
      class="shadow mt-5 w-64 h-8 p-2 "
    />
  </div>
  <div class="flex flex-wrap items-center justify-start ">
    <div  v-for="movie in movieList" :key="movie.id">
      <div class="m-10 w-72 h-5/6 shadow rounded flex flex-col  movie">
        <img
          :src="photoURL + movie.poster_path"
          class="image rounded max-h-96 bg-cover"
          alt=""
        />
        <div class="flex flex-col items-center justify-center p-2">
          <p class="text-xl font-mono mb-1 title ">{{ movie.title }}</p>
          <p class="font-light text-sm  text">
            {{
              movie.overview.length >= 250
                ? movie.overview.slice(0, 250) + "..."
                : movie.overview
            }}
          </p>
        </div>
        <div class="flex flex-row align-items justify-around  m-2">
          <div class="flex mr-3">
            <span class="bg-yellow-400 rounded shadow p-2 mr-2 font-bold "
              >İMDB</span
            >
            <span class="bg-yellow-400 rounded shadow p-2 font-bold">{{
              movie.vote_average
            }}</span>
          </div>
          <div class="flex">
            <span class="bg-blue-400 rounded shadow p-2 mr-2 font-bold"
              >BP</span
            >
            <span class="bg-blue-400 rounded shadow p-2 mr-2 font-bold">{{
              movie.rating
            }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="m-2 flex justify-around">
    <router-link
      to=""
      @click="geri"
      class="bg-blue-400 rounded shadow p-2 mr-2 font-bold cursor-pointer"
      >Geri</router-link
    >
    <router-link
      to=""
      @click="ileri"
      class="bg-blue-400 rounded shadow p-2 mr-2 font-bold cursor-pointer"
      >İLERİ</router-link
    >
  </div>
</template>

<script>
import axios from "axios";
import ScrollReveal from "scrollreveal";
import Typed from "typed.js";
export default {
  data() {
    return {
      movieList: [],
      photoURL: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/",
      pageNumber: 1,
      searchMovie: "",
    };
  },
  created() {
    this.getData(), this.scAnime(),
    setTimeout(() => {
      this.walkText()
    }, 1000)
  },
  methods: {
    getData() {
      axios
        .get(
          `https://api.themoviedb.org/3/account/9850288/rated/movies?api_key=9d107d4813dc3bd9f2afaa908e7fd901&language=tr-TR&session_id=b12ccc4125d883d5069b30b5c06cf1a9660fa12c&sort_by=created_at.desc&page=${this.pageNumber}`
        )
        .then((res) => {
          console.log(res.data.results);
          this.movieList = res.data.results;
          console.log(this.pageNumber);
        });
    },
    geri() {
      if (this.pageNumber > 1) {
        this.pageNumber--;
        this.getData(), this.scAnime();
      }
    },
    ileri() {
      this.pageNumber++;
      this.getData(), this.scAnime();
    },
    araMovie() {
      if (this.searchMovie == "") {
        this.getData();
      } else {
        this.movieList = this.movieList.filter((item) =>
          item.title.toLowerCase().includes(this.searchMovie.toLowerCase())
        );
      }
    },
    scAnime() {
      setTimeout(() => {
        ScrollReveal().reveal(".image", { reset:true, duration: 1000 });
      }, 1000);
    },
    walkText() {
      var options = {
        strings:["Film Ara...","Benim Ratinglerim..."],
        backSpeed:60,
        typeSpeed: 40,
        loop:true
            };

        var typed = new Typed('.searchName', options);
        return typed
        },
    
  },
};
</script>
