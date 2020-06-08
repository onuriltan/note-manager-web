import { shallowMount, createLocalVue } from "@vue/test-utils";
import { BootstrapVue } from "bootstrap-vue";
import Vuex from "vuex";
import Header from "./Header";

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(BootstrapVue);

describe("Header.vue", () => {
  let actions;
  let getters;
  let store;

  it("renders application name", () => {
    // Arrange
    const applicationName = "NoteManager";
    actions = {
      logout: jest.fn(),
    };
    getters = {
      isAuthenticated: () => false,
    };
    store = new Vuex.Store({
      modules: {
        auth: {
          namespaced: true,
          actions,
          getters,
        },
      },
    });

    // Act
    const wrapper = shallowMount(Header, {
      store,
      localVue,
      stubs: ["router-link"],
    });

    // Assert
    expect(wrapper.text()).toMatch(applicationName);
  });

  it("calls logout vuex action if isLoggedIn and logout is clicked", async () => {
    // Arrange
    actions = {
      logout: jest.fn(),
    };
    getters = {
      isAuthenticated: () => true,
    };
    store = new Vuex.Store({
      modules: {
        auth: {
          namespaced: true,
          actions,
          getters,
        },
      },
    });

    // Act
    const wrapper = shallowMount(Header, {
      store,
      localVue,
      stubs: ["router-link"],
    });
    const logoutDropdown = wrapper.findComponent({ ref: "logout" });
    logoutDropdown.trigger("click");

    // Assert
    expect(actions.logout).toHaveBeenCalled();
  });
});
