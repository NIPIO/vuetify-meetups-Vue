<template>
	<v-container>
		<v-row wrap>
			<v-col xs12>
			 <v-card class="mx-auto">
			    <v-img class="white--text align-end" height="200px" :src="meetDetail.src" >
			      <v-card-title>{{meetDetail.place}}</v-card-title>
			    </v-img>
			    <v-card-subtitle class="pb-0">{{meetDetail.date}}</v-card-subtitle>
			    <v-card-text class="text--primary">
			      <div>{{meetDetail.details}}</div>
			    </v-card-text>
			       
			    <v-divider class="mx-4"></v-divider>
				<v-row class="d-flex  justify-space-between" wrap>
					<v-col md="6" xs="12">
					    <v-card-title>Horario de encuentro</v-card-title>
					    <v-card-text> 
					    	<v-time-picker v-model="meetDetail.time" :landscape="true" disabled ></v-time-picker>
				    	</v-card-text>
					</v-col>
			    	<v-col md="6" xs="12">
						<v-list-item two-line>
							<v-list-item-content>
								<v-list-item-title class="headline">{{meetDetail.place}}</v-list-item-title>
								<v-list-item-subtitle>{{meetDetail.date}}</v-list-item-subtitle>
							</v-list-item-content>
							</v-list-item>
							<v-card-text>
								<v-row align="center">
									<v-col class="display-3" cols="6">23&deg;C</v-col>
									<v-col cols="6">
										<v-img src="https://cdn.vuetifyjs.com/images/cards/sun.png" alt="Sunny image" width="92" ></v-img>
									</v-col>
								</v-row>
							</v-card-text>
						</v-list-item>
					</v-col>
				</v-row>
		    	
			    <v-card-actions>
			      <v-btn color="orange" text >
			        Share
			      </v-btn>
			    </v-card-actions>
			  </v-card>
			</v-col>
		</v-row>
	</v-container>
</template>		

<script>
	export default {
		data: () => ({
		}),
		computed: {
			meetDetail() {
				return this.$store.getters.loadMeetup(this.$route.params.place)
			}
		},
	}
</script>
