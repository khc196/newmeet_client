export const state = () => ({
    show: false,
})

export const mutations = {
    toggle (state) {
        state.show = !state.show;
    },
    close (state) {
        state.show = false;
    }
}