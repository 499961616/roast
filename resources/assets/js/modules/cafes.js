/*
 |-------------------------------------------------------------------------------
 | VUEX modules/cafes.js
 |-------------------------------------------------------------------------------
 | The Vuex data store for the cafes
 */

import CafeAPI from '../api/cafe.js';

export const cafes = {
    /**
     * Defines the state being monitored for the module.

     status = 0 -> 数据尚未加载
     status = 1 -> 数据开始加载
     status = 2 -> 数据加载成功
     status = 3 -> 数据加载失败
     */
    state: {
        //咖啡店数组，
        cafes: [],
        cafesLoadStatus: 0,
        //存储单个咖啡店的对象
        cafe: {},
        cafeLoadStatus: 0,

        //咖啡店添加状态
        cafeAddStatus: 0,
        //喜欢咖啡店状态
        cafeLikeActionStatus: 0,
        //取消喜欢咖啡店状态
        cafeUnlikeActionStatus: 0,

        cafeLiked: false
    },
    /**
     * Defines the actions used to retrieve the data.
     */
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

        },

        addCafe( { commit, state, dispatch }, data ){
            // 状态1表示开始添加
            commit( 'setCafeAddStatus', 1 );

            CafeAPI.postAddNewCafe(data.name, data.locations, data.website, data.description, data.roaster)
                .then( function( response ){
                    // 状态2表示添加成功
                    commit( 'setCafeAddStatus', 2 );
                    dispatch( 'loadCafes' );
                })
                .catch( function(){
                    // 状态3表示添加失败
                    commit( 'setCafeAddStatus', 3 );
                });
        },

        likeCafe({ commit ,state},data){
            commit('setCafeLikeActionStatus',1);

            CafeAPI.postAddNewCafe(data.id)
                .then(function (response) {
                    commit('setCafeLikedStatus', false);
                    commit('setCafeUnlikeActionStatus', 2);
                })
                .catch(function () {
                    commit('setCafeUnlikeActionStatus', 3);
                });
        }
    },
    /**
     * Defines the mutations used
     */
    mutations: {
        setCafesLoadStatus( state, status ){
            state.cafesLoadStatus = status;
        },

        setCafes( state, cafes ){
            state.cafes = cafes;
        },

        setCafeLoadStatus( state, status ){
            state.cafeLoadStatus = status;
        },

        setCafe( state, cafe ){
            state.cafe = cafe;
        },
        setCafeAddStatus(state, status) {
            state.cafeAddStatus = status;
        },
        setCafeLikedStatus(state, status) {
            state.cafeLiked = status;
        },

        setCafeLikeActionStatus(state, status) {
            state.cafeLikeActionStatus = status;
        },

        setCafeUnlikeActionStatus(state, status) {
            state.cafeUnlikeActionStatus = status;
        }

    },
    /**
     * Defines the getters used by the module
     */
    getters: {
        getCafesLoadStatus( state ){
            return state.cafesLoadStatus;
        },

        getCafes( state ){
            return state.cafes;
        },

        getCafeLoadStatus( state ){
            return state.cafeLoadStatus;
        },

        getCafe( state ){
            return state.cafe;
        },
        getCafeAddStatus( state) {
            return state.cafeAddStatus;
        },
        getCafeLikedStatus( state ){
            return state.cafeLiked;
        },

        getCafeLikeActionStatus( state ){
            return state.cafeLikeActionStatus;
        },

        getCafeUnlikeActionStatus( state ){
            return state.cafeUnlikeActionStatus;
        }
    }
};
