import {shallowMount} from "@vue/test-utils";
import Watch from "@/views/Watch";

describe('Watch.vue', function () {
    it("should component exists", () => {
        const wrapper = shallowMount(Watch)
        expect(wrapper.exists()).toBeTruthy()
    })
});
