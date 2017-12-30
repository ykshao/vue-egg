import {auth} from '@/api'
import sharedEnvCode from 'shared/env/code'
import Cookie from 'js-cookie'
const state = {
  _info: null
}

const getters = {
  info: (state) => {
    return state._info
  }
}

const mutations = {
  setInfo (state, info) {
    state._info = info
  }
}

const actions = {
  login ({commit}, {username, password}) {
    return auth.login(username, password).then(data => {
      if (sharedEnvCode.equal(data.errCode, 'success')) {
        return data
      } else {
        return Promise.reject(data.errMsg)
      }
    })
  },
  getInfo ({getters, commit}) {
    if (getters.info) {
      return Promise.resolve(getters.info)
    }
    return auth.getInfo().then(data => {
      commit('setInfo', data.info)
      return getters.info
    }).catch(response => {
      commit('setInfo', null)
      Cookie.set('islogin', '')
      return null
    })
  },
  isAdmin ({dispatch, getters, commit}) {
    dispatch('getInfo').then(info => {
      return info && info.is_admin
    })
  },
  logout ({commit}) {
    return auth.logout().then(() => {
      commit('setInfo', null)
    })
  },
  isLoggedIn ({dispatch, getters}) {
    let isLogin = !!Cookie.get('islogin')
    return Promise.resolve(isLogin)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}