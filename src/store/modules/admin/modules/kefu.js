/**
 * 用户信息
 * */
export default {
  namespaced: true,
  state: {
    // 用户信息
    info: {},
    socketStatus: false,
  },
  mutations: {
    setStatus(state, val) {
      state.socketStatus = val;
    },
  },
  actions: {
    /**
     * @description 设置用户数据
     * @param {Object} state vuex state
     * @param {Object} dispatch vuex dispatch
     * @param {*} info info
     */
    set({ state, dispatch }, info) {
      return new Promise(async (resolve) => {
        // store 赋值
        state.info = info;
        // 持久化
        await dispatch(
          "admin/db/set",
          {
            dbName: "sys",
            path: "user.info",
            value: info,
            user: true,
          },
          { root: true }
        );
        // end
        resolve();
      });
    },
    /**
     * @description 从数据库取用户数据
     * @param {Object} state vuex state
     * @param {Object} dispatch vuex dispatch
     */
    load({ state, dispatch }) {
      return new Promise(async (resolve) => {
        // store 赋值
        state.info = await dispatch(
          "admin/db/get",
          {
            dbName: "sys",
            path: "user.info",
            defaultValue: {},
            user: true,
          },
          { root: true }
        );
        // end
        resolve();
      });
    },
  },
};
