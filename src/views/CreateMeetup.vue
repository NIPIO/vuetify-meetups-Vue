<template>
<div class="home">
	<v-container>
		<v-row>
			<v-col xs12 sm6 offset-sm3>
				<h4 class="primary--text">Create a new Meetup</h4>
			</v-col>
		</v-row>
		 <v-row>
			<v-col xs12>
				<!-- <v-form> -->
					<v-row>
						<v-col xs12 sm6 offset-sm3>
							<v-text-field v-model="place" name="place" :counter="5" label="Place" required ></v-text-field>
						</v-col>
					</v-row>
					<v-row>
						<v-col xs12 sm6 offset-sm3>
							<v-text-field v-model="details" name="details" :counter="5" label="Details" required ></v-text-field>
						</v-col>
					</v-row>
					<v-row>
						<v-col xs12 sm6 offset-sm3>
							<v-text-field v-model="imageURL" name="image" :counter="5" label="Image URL" required ></v-text-field>
							<img :src="imageURL" alt="" height="250" class="ms-auto">
						</v-col>
					</v-row>
					<v-row>
						<v-col xs12 sm6 offset-sm3>
							<v-date-picker v-model="date" :show-current="true"></v-date-picker>
						</v-col>
						<v-col xs12 sm6 offset-sm3>
							<v-time-picker v-model="time"></v-time-picker>
						</v-col>
					</v-row>
					<v-row>
						<v-col xs12 sm6 offset-sm3>
							<v-btn type="submit"  @click="createMeet()" :disabled="!formValid" color="primary" class="mr-4">Create Meetup</v-btn>
						</v-col>
					</v-row>
			    <!-- </v-form> -->
			</v-col>
		</v-row>
	</v-container>
</div>
</template>

<script>
import { axios } from "axios";
import { mapMutations } from "vuex";
import * as firebase from 'firebase'
import { validationMixin } from "vuelidate";
import { required, minLength, maxLength, email, sameAs } from "vuelidate/lib/validators";

export default {
	data() {
		return {
			place:'',
			details:'',
			imageURL:'',
			date:'',
			time:'',
		}
	},
	computed: {
		formValid() {
			return this.place !== '' && this.details !== '' &&  this.imageURL !== '' && this.time !== '' &&  this.date !== ''
		}
	},
	methods: {
		...mapMutations(['createMeetup']),
		createMeet() {
			console.log(this.time)
			if (this.formValid) {
				const meetUp =  {
					date : this.date,
					time : this.time,
					details : this.details,
					place : this.place,
					src : this.imageURL
				}
				//set it store.js
				this.createMeetup(meetUp)
				this.createMeetupInFirebase(meetUp)
				this.$router.push('/meetups')
			}
		},
		// createMeetupInFirebase ({commit}, payload) {
		createMeetupInFirebase (meetUp) {
			firebase.database().ref('meetups').push(meetUp)
			.then((data)=>{
				console.log(data)
			})
			.catch((error) => {
				console.log(error)
			})
			// commit('createMeetup', meetUp)
	    }
	}
}
</script>
