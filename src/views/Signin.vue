<template>
	<v-app id="inspire">
	    <v-main>
	      <v-container class="fill-height" fluid >
	        <v-row align="center" justify="center" >
	          <v-col cols="12" sm="8" md="4" >
	            <v-card class="elevation-12">
					<v-toolbar color="primary" dark flat >
						<v-toolbar-title>Login con Vuetify</v-toolbar-title>
						<v-spacer></v-spacer>
						<v-tooltip bottom>
							<span>Source</span>
						</v-tooltip>
					</v-toolbar>
					<v-form @submit.prevent="signIn">
						<v-card-text>
							<v-text-field
			                    v-model="email"
			                    :error-messages="emailErrors"
			                    label="Email"
			                    required
			                    @input="$v.email.$touch()"
			                    @blur="$v.email.$touch()"
			                    prepend-icon="mdi-mail"
			                />
			                <v-text-field
			                    v-model="password"
			                    :type="showPassword ? 'text' : 'password'"
			                    :error-messages="passwordErrors"
			                    label="Password"
			                    required
			                    @input="$v.password.$touch()"
			                    @blur="$v.password.$touch()"
			                    prepend-icon="mdi-lock"
			                    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
			                    @click:append="showPassword = !showPassword"
			                />
						</v-card-text>
						<v-card-actions>
							<v-btn color="purple" dark @click="openModal">Logueate</v-btn>
							<v-spacer></v-spacer>
							<v-btn type="submit" color="primary" :disabled="!formValid">
								<v-progress-circular indeterminate color="white" v-if="loading"></v-progress-circular>
								<span  v-if="!loading">Entrar</span>
							</v-btn>
						</v-card-actions>
	                </v-form>
	            </v-card>
	          </v-col>
	        </v-row>
	      </v-container>
	    </v-main>
	    <Signup v-model="signupComponent"></Signup>
		<div class="text-center ma-2">
			<v-snackbar v-model="snackbar" color="red" timeout="2000" >{{ text }}
			</v-snackbar>
		</div>
	</v-app>
</template>

<script>
import Signup from '../views/Signup'
import { mapMutations } from "vuex";
import * as firebase from 'firebase'
import { validationMixin } from "vuelidate";
import { required, minLength, maxLength, email, sameAs } from "vuelidate/lib/validators";

export default {
    data: () => ({
		email: '',
		password: '',
		signupComponent:false,
		snackbar: false,
		loading:false,
        showPassword: false,
		text: '',
    }),
    mixins: [validationMixin],
	validations: {
		//required, minLenght, y demás, son configuraciones de vue que se pueden ver dentro de  console.log(this.$v.name) objeto y se puede validar desde ahí. 
		email: { required, email },
		password: { required, minLength: minLength(6) },
	},

    methods: {
		...mapMutations(['saveUserLogged']),
		async signIn() {
			this.loading = true
			firebase.auth().signInWithEmailAndPassword(this.email, this.password)
				.then(user=>{
					this.loading = false
					//guardo para chequear usuario en todas las paginas
					this.saveUserLogged({'mail' : this.email, 'pass': this.password})
					this.$router.push('/')
				})
				.catch(error=>{
					this.loading = false
					error.code == "auth/wrong-password" ? this.text = 'Contraseña incorrecta' : this.text = 'Usuario inexistente. Debes loguearte.'
					this.snackbar = true 
				})
		},
        openModal() {
            this.signupComponent = !this.signupComponent;
        } 
    },
	components: {
		Signup
	},
    computed: {
		meetDetail() {
			return this.$store.getters.loadMeetup(this.$route.params.place)
		},
		emailErrors() {
          const errors = [];
          if (!this.$v.email.$dirty) return errors; 
          !this.$v.email.email && errors.push("Debe tener @ y .com");
          !this.$v.email.required && errors.push("Es requerido.");
          return errors;
        }, 
        passwordErrors() {
          const errors = [];
          if (!this.$v.password.$dirty) return errors; 
          !this.$v.password.minLength && errors.push("Por lo menos 6 caracteres");
          !this.$v.password.required && errors.push("Es requerido.");
          return errors;
        },
		formValid() {
			return this.email !== '' && this.password !== '' && !this.$v.$anyError
		},
    },
}
</script>