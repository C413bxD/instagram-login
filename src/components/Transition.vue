<template>
    <div class=" contenido_cel">
      <v-img
        class="marco"
        width="283px"
        src="../assets/marco.png"
      ></v-img>
      <v-img
        class="screen"
        width="250px"
        src="../assets/screenshot3.png"
      ></v-img>
      <v-img
        class="marco1"
        width="283px"
        src="../assets/marco.png"
      ></v-img>
      <!-- <v-img
        class="screen1"
        width="250px"
        src="../assets/screenshot1.png"
      ></v-img> -->
      <div class="cuadrado">
      </div>
    </div>
    
</template>

<script>
export default {
  data: () => ({
    colors: [
        'screenshot1.png',
        'screenshot2.png',
        'screenshot3.png',
      ],
    count: 0
  }),
  mounted() {
    this.transition();
  },
  computed: {},

  methods: {
    transition(){
      setTimeout(() => {
        while(this.count<3){
          console.log(this.colors[this.count])
          this.count++
        }
       
        
    }, 2000);
    }
  },
};
</script>

<style>
template {
  font-family: Helvetica, Arial, sans-serif;
}
.contenido_cel{
  position: relative;
  margin: 0 auto;
  width: 380px;
}
.marco{
  position: absolute;

}
.screen{
  position: absolute;
  top: 16px;
  left: 16px;
}
.marco1{
  position: absolute;
  top: 16px;
  left: 96px;
  z-index: 1;
}
.screen1{
  position: absolute;
  top: 31px;
  left: 111px;
  z-index: 1;
}
.cuadrado{
  position: absolute;
  top:31px;
  left: 111px;
  width: 250px;
  height: 541px;
  background-image: url(../assets/screenshot4.png);
  z-index: 2;
  animation-name:cambio_image;
  animation-duration: 6s;
  animation-timing-function: linear;
  animation-direction: alternate;
  animation-iteration-count: infinite;
}
@keyframes cambio_image{
  0% { background-image: url(../assets/screenshot1.png);}
  50% { background-image: url(../assets/screenshot2.png);}
  100% { background-image: url(../assets/screenshot4.png);}
}
</style>
