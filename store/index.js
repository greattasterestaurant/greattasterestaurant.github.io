export const getters = {
  variables: state => ({
    "--main-content-width": state.route.path === "/" ? "30vw" : "55em"
  })
}
