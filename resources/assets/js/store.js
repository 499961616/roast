/**
 * Adds the promise polyfill for IE 11
 */
require('es6-promise').polyfill();

/**
 * Import Vue and Vuex
 */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use( Vuex )

/**
 * Export the data store.
 */
export default new Vuex.Store({
    modules: {

    }
});
