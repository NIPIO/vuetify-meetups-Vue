<template>
	<div class="about">
		<v-container>
		    <v-row  wrap class=" text-center">
		    	<v-col xs12 sm6 class="text-sm-right">
		    		<v-btn large class="primary" router to="/meetups">Explore Meetups</v-btn>
		    	</v-col>
		    	<v-col xs12 sm6 class=" text-sm-left">
		    		<v-btn large class="primary" router to="/createMeetup">Organize Meetups</v-btn>
		    	</v-col> 
		    </v-row>
		    <v-row>
		    	<v-col xs12>
					<v-carousel>
						<v-carousel-item v-for="(item,i) in meetUps" :key="item.id" :src="item.src" reverse-transition="fade-transition" @click="goToMeetup(item.place)" transition="fade-transition">
							<div class="title">
								<h3>Veamonos en {{item.place}}</h3>
							</div>
						</v-carousel-item>
					</v-carousel>
		    	</v-col>
		    </v-row>
		</v-container>
	</div>
</template>
<style>
	.title {
		position:  absolute;
		width: 100%;
		bottom:  50px;
		color:  white;
		font-size:  2em;
		text-align: center
	}
	.title h3 {
		padding: 20px;
		background-color: rgba(0,0,0,0.5);
	}
</style>
<script>
  export default {
  	computed: {
  		meetUps() {
  			console.log(this.$store.getters.getUser)
  			return this.$store.getters.loadedMeetups
  		}
  	},
    methods: {
    	goToMeetup(idMeet) {
    		this.$router.push('/meetup/' + idMeet)
    	}
    }
  }
</script>
