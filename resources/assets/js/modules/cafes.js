/*
|-------------------------------------------------------------------------------
| VUEX modules/cafes.js
|-------------------------------------------------------------------------------
| The Vuex data store for the cafes
*/

import CafeAPI from '../api/cafe.js';
export const cafes = {
        state:{
            cafes: [],
            cafesLoadStatus: 0,
            cafe: {},
            cafeLoadStatus: 0,
        },
        //status = 0 -> 数据尚未加载
        // status = 1 -> 数据开始加载
        // status = 2 -> 数据加载成功
        // status = 3 -> 数据加载失败


    actions: {
        loadCafes( { commit } ){
            commit( 'setCafesLoadStatus', 1 );

            CafeAPI.getCafes()
                .then( function( response ){
                    commit( 'setCafes', response.data );
                    commit( 'setCafesLoadStatus', 2 );
                })
                .catch( function(){
                    commit( 'setCafes', [] );
                    commit( 'setCafesLoadStatus', 3 );
                });
        },

        loadCafe( { commit }, data ){
            commit( 'setCafeLoadStatus', 1 );

            CafeAPI.getCafe( data.id )
                .then( function( response ){
                    commit( 'setCafe', response.data );
                    commit( 'setCafeLoadStatus', 2 );
                })
                .catch( function(){
                    commit( 'setCafe', {} );
                    commit( 'setCafeLoadStatus', 3 );
                });

        }
    },
    mutations: {
        setCafesLoadStatus( state, status ){

        },

        setCafes( state, cafes ){

        },

        setCafeLoadStatus( state, status ){

        },

        setCafe( state, cafe ){

        }
    },
}
