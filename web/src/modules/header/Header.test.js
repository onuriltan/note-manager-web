import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import Header from "./Header";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("Header.vue", () => {
  let actions;
  let store;

  beforeEach(() => {
    actions = {
      actionClick: jest.fn(),
      actionInput: jest.fn(),
    };
    store = new Vuex.Store({
      actions,
    });
  });

  it("renders application name", () => {
    // Arrange
    const applicationName = "new message";
    // Act
    const wrapper = shallowMount(Header, { store, localVue });
    // Assert
    expect(wrapper.text()).toMatch(applicationName);
  });
});
