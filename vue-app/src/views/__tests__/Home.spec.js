import {shallowMount} from "@vue/test-utils";
import Home from "@/views/Home";

describe('Home.vue', function () {
    it("should component exists", () => {
        const wrapper = shallowMount(Home)
        expect(wrapper.exists()).toBeTruthy()
    })
});
