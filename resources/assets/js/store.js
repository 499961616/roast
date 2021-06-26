/*
 |-------------------------------------------------------------------------------
 | VUEX store.js
 |-------------------------------------------------------------------------------
 | Builds the data store from all of the modules for the Roast app.
 */

/**
 * Adds the promise polyfill for IE 11
 */
require('es6-promise').polyfill();

/**
 * Import Vue and Vuex
 */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.config.devtools = true;
/**
 * Initializes Vuex on Vue.
 */
Vue.use( Vuex )

import { cafes } from './modules/cafes.js'
import { brewMethods } from './modules/brewMethods.js'
/**
 * Export our data store.
 */
export default new Vuex.Store({
    modules: {
        cafes,
        brewMethods
    }
});
