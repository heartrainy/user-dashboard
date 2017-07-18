
export default {
  namespace: 'app',
  state: {
    collapsed: false,
    darkTheme: false,
    mode: "inline",
    navOpenKeys: JSON.parse(localStorage.getItem('navOpenKeys')) || [],
  },
  reducers: {
    toggle: function (state) {
      return {
        ...state,
        collapsed: !state.collapsed
      }
    },
    handleNavOpenKeys (state, { payload: navOpenKeys }) {
      return {
        ...state,
        ...navOpenKeys
      }
    }
  },
  effects: {},
  subscriptions: {},
};
