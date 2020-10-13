<template>
	<v-container>
		<v-row wrap>
			<v-col xs12>
				<v-card class="primary">
					<v-container fluid>					
						<v-row v-for="(item,i) in meetUps" :key="item.id" :src="item.src" @click="goToMeetup(item.place)">
							<v-col xs5>
								<v-card class="d-flex" >
									<v-avatar class="ma-3" size="175" tile >
										<v-img :src="item.src"></v-img>
									</v-avatar>
									<div class="d-flex flex-no-wrap justify-space-between">
										<div>
											<v-card-title class="headline">{{item.place}} </v-card-title>
											<v-card-subtitle >{{item.date}} - {{item.time}}</v-card-subtitle>
											<v-card-subtitle >{{item.details}}</v-card-subtitle>
											<v-btn class="ma-2" tile outlined color="primary" @click="goToMeetup(item.place)">
										      <v-icon left>arrow_forward</v-icon> View Meetup
										    </v-btn>
										</div>
									</div>
								</v-card>												
							</v-col>
						</v-row>
					</v-container>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import { mapState } from "vuex";

export default {
    data() {
        return {
        }
    },
  	computed: {
    	...mapState(['loadedMeetups']),
  		meetUps() {
  			return this.$store.getters.loadedMeetups
  		}
  	},
    methods: {
    	goToMeetup(idMeet) {
    		this.$router.push('/meetup/' + idMeet)
    	}
    },

 }
</script>
