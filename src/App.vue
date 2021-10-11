<template >
<div class="flex flex-col justify-center items-center">
 <label for="search">Film Ara</label>  <input v-model="searchMovie" @keydown="araMovie" type="search" name="" id="" class="shadow mt-5 w-64 h-8 p-2 ">
</div>
 <div class="flex flex-wrap items-center justify-around">
    <div class="m-10 w-80 h-5/6 shadow rounded flex flex-col" v-for="movie in movieList" :key="movie.id">
    <img :src="photoURL + movie.poster_path" class="rounded max-h-96 bg-cover" alt="">
    <div class="flex flex-col items-center justify-center p-2">
      <p class="text-xl font-mono mb-1">{{movie.title}}</p>
      <p class="font-light text-sm">{{movie.overview.length >= 250
                  ? movie.overview.slice(0, 250) + "..."
                  : movie.overview}}</p>
    </div>
    <div class="flex flex-row align-items justify-around  m-2">
      <div class="flex mr-3">
        <span class="bg-yellow-400 rounded shadow p-2 mr-2 font-bold">İMDB</span>
        <span class="bg-yellow-400 rounded shadow p-2 font-bold">{{movie.vote_average}}</span>
      </div>
      <div class="flex">
        <span class="bg-blue-400 rounded shadow p-2 mr-2 font-bold">BP</span>
        <span class="bg-blue-400 rounded shadow p-2 mr-2 font-bold">{{movie.rating}}</span>
      </div>
    </div>
  </div>
 </div>

 <div class="m-2 flex justify-around">
   <span class="bg-blue-400 rounded shadow p-2 mr-2 font-bold cursor-pointer" @click="geri">GERİ</span>
   <span class="bg-blue-400 rounded shadow p-2 mr-2 font-bold cursor-pointer" @click="ileri">İLERİ</span>
 </div>
</template>

<script>
import axios from "axios"
export default {
  data() {
    return {
      movieList : [],
      photoURL : "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/",
      pageNumber : 1,
      searchMovie : ""
    }
  },
  created(){
    this.getData()
  },
  methods:{
    getData(){
      axios.get(`https://api.themoviedb.org/3/account/9850288/rated/movies?api_key=9d107d4813dc3bd9f2afaa908e7fd901&language=tr-TR&session_id=b12ccc4125d883d5069b30b5c06cf1a9660fa12c&sort_by=created_at.asc&page=${this.pageNumber}`).then(res=> {
      console.log(res.data.results);
      this.movieList = res.data.results;
      console.log(this.pageNumber);
    })
    },
    ileri(){
      this.pageNumber++
      this.getData()
    },
    geri(){
      if(this.pageNumber >1){
        this.pageNumber-- 
      }
      this.getData()
    },
    araMovie(){
     if(this.searchMovie == ""){
       this.getData()
     }
     else{
        this.movieList = this.movieList.filter(item => item.title.toLowerCase().includes(this.searchMovie.toLowerCase()))
     }
    }
  }
}
</script>