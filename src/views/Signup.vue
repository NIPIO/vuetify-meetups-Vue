<template>
      <v-dialog v-model="show" justify="center">
        <v-form @submit.prevent="signUp">
          <v-card class="elevation-12">
            <v-toolbar color="primary" dark flat >
              <v-toolbar-title>Sing up con Vuelidate</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-tooltip bottom>
                <span>Source</span>
              </v-tooltip>
            </v-toolbar>
            <v-card-text>
                <v-text-field
                    v-model="name"
                    :error-messages="nameErrors"
                    label="name"
                    required
                    @input="$v.name.$touch()"
                    @blur="$v.name.$touch()"
                    prepend-icon="mdi-mail"
                />
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
                <v-text-field
                    v-model="confirmPassword"
                    :type="showPassword ? 'text' : 'password'"
                    :error-messages="confirmPasswordErrors"
                    label="Password"
                    required
                    @input="$v.confirmPassword.$touch()"
                    @blur="$v.confirmPassword.$touch()"
                    prepend-icon="mdi-lock"
                    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append="showPassword = !showPassword"
                />
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
                <v-btn type="submit" color="primary" :disabled="!formValid">
                  <v-progress-circular indeterminate color="white" v-if="loading"></v-progress-circular>
                  <span  v-if="!loading">Entrar</span>
                </v-btn>
            </v-card-actions>

          </v-card>
        </v-form>
      <div class="text-center ma-2">
        <v-snackbar v-model="snackbar" color="red" timeout="2000" >{{ text }}
        </v-snackbar>
      </div>
      </v-dialog>
</template>

<script>
import * as firebase from 'firebase'
import { validationMixin } from "vuelidate";
import { required, minLength, maxLength, email, sameAs } from "vuelidate/lib/validators";
import { mapMutations } from "vuex";

  export default {
      name: 'Singup',
      mixins: [validationMixin],
      validations: {
        //required, minLenght, y demás, son configuraciones de vue que se pueden ver dentro de  console.log(this.$v.name) objeto y se puede validar desde ahí. 
        name: { required, minLength: minLength(4), maxLength: maxLength(10) },
        email: { required, email },
        password: { required, minLength: minLength(6) },
        confirmPassword: { required, sameAsPassword: sameAs("password") }
      },
      props: {
        value: false
      },
      data() {
        return {
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
          status: null,
          showPassword: false,
          snackbar: false,
          loading:false,
          text: '',
        };
      },
      methods: {
        ...mapMutations(['saveUserLogged']),
        async signUp() {
          this.loading = true
          firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
            .then(user=>{
              this.loading = false
              //guardo para chequear usuario en todas las paginas
              this.saveUserLogged({'mail' : this.email, 'pass': this.password})
              this.$router.push('/')
            })
            .catch(error=>{
              this.snackbar = true;
              this.loading = false
              this.text = 'Ya existe un usuario con ese email';
            })
        },
      },
      computed: {
        show: {
          get () {
            return this.value
          },
          set (value) {
             this.$emit('input', value)
          }
        },
        formValid() {
          return this.name !== '' && this.email !== '' &&  this.password !== '' &&  this.confirmPassword !== ''  && !this.$v.$anyError
        },
        nameErrors() {
          // console.log(this.$v.name)
          const errors = [];
          if (!this.$v.name.$dirty) return errors; 
          !this.$v.name.minLength && errors.push("Name must be at least 4 characters long.");
          !this.$v.name.maxLength && errors.push("Name must be at max 10 characters long.");
          !this.$v.name.required && errors.push("Name is required.");
          return errors;
        },
        emailErrors() {
          const errors = [];
          if (!this.$v.email.$dirty) return errors; 
          !this.$v.email.email && errors.push("Email debe tener @");
          !this.$v.email.required && errors.push("Email is required.");
          return errors;
        }, 
        passwordErrors() {
          const errors = [];
          if (!this.$v.password.$dirty) return errors; 
          !this.$v.password.minLength && errors.push("Password must be at least 6 characters long.");
          !this.$v.password.required && errors.push("Password is required.");
          return errors;
        },
        confirmPasswordErrors() {
          const errors = [];
          if (!this.$v.confirmPassword.$dirty) return errors; 
          !this.$v.confirmPassword.sameAsPassword && errors.push("ConfirmPassword must be equal as password.");
          !this.$v.confirmPassword.required && errors.push("ConfirmPassword is required.");
          return errors;
        }, 
      }
  }
</script>