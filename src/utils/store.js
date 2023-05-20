import { createStore } from "vuex";

export const STORE_TYPE = {
  isLoading: "isLoading",
  loginUserIdx: "loginUserIdx",
  contentData: "contentData",
  boardIdx: "boardIdx",
  commentIdx: "commentIdx",
  detailData: "detailData",
};

const store = createStore({
  state: {
    isLoading: false,
    loginUserIdx: "",
    contentData: [],
    boardIdx: "",
    commentIdx: "",
    popupList: [],
    detailData: [],
  },
  mutations: {
    /**
     * @param {store} state
     * @param {boolean} value
     */
    isLoading(state, value) {
      state.isLoading = value;
    },
    /**
     * @param {store} state
     * @param {string} value
     */
    loginUserIdx(state, value) {
      state.loginUserIdx = value;
    },
    /**
     *
     * @param {store} state
     * @param {string} value
     */
    contentData(state, value) {
      state.contentData = value;
    },
    /**
     *
     * @param {store} state
     * @param {string} value
     */
    commentIdx(state, value) {
      state.commentIdx = value;
    },
    /**
     *
     * @param {store} state
     * @param {string} value
     */
    boardIdx(state, value) {
      state.boardIdx = value;
    },
    detailData(state, value) {
      state.detailData = value;
    },
  },
});

export default store;

export const getStore = () => {
  return store;
};
