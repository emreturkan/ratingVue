import { createRouter, createWebHashHistory } from "vue-router";

const routes=[
    {path:"/",name:"HomePage",component:()=>import("@/views/movie.vue")}
]


const router = createRouter({
    
    history:createWebHashHistory(),
    routes:routes,
    scrollBehavior: (_, _2,savedPosition) => {
        if(savedPosition){
            return savedPosition
        }
        return{left:0,top:0}
        
    }
})

export default router