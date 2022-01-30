import {mount, shallowMount} from "@vue/test-utils";
import Video from "@/components/Video";

describe('Video.vue', function () {
    describe('exists check', function () {
        let wrapper
        beforeEach(() => {
            wrapper = mount(Video, {
                propsData: {
                    video: {}
                }
            })
        })
        it("should component exists", () => {
            expect(wrapper.exists()).toBeTruthy()
        })
        it('should render video image', () => {
            const img = wrapper.find('.video-cover-image')
            expect(img.exists()).toBeTruthy()
        });
        it('should render video title', () => {
            const title = wrapper.find('#video-title')
            expect(title.exists()).toBeTruthy()
        });
    });
    describe('Functionality check', function () {
        it('render video prop correctly', () => {
            const video = {
                "id": 1,
                "videoAddress": "https://www.youtube.com/watch?v=FXpIoQ_rT_c",
                "coverImage": "https://raw.githubusercontent.com/modanisa/bootcamp-video-db/main/video-images/1-cover.webp",
                "hoverImage": "https://raw.githubusercontent.com/modanisa/bootcamp-video-db/main/video-images/1-hover.webp",
                "title": "Vue.js Course for Beginners [2021 Tutorial]",
                "viewCount": 254,
                "publishDateInMonth": 4,
                "ownerImage": "https://yt3.ggpht.com/ytc/AKedOLTtJvQ1Vfew91vemeLaLdhjOwGx3tTBLlreK_QUyA=s68-c-k-c0x00ffffff-no-rj",
                "ownerName": "freeCodeCamp.org",
                "description": "Learn Vue 3 by in this full course. Vue.js is an open-source model–view–view model front end JavaScript framework for building user interfaces and single-page applications."
            }
            const wrapper = mount(Video, {
                propsData: {
                    video
                }
            })
            expect(wrapper.exists()).toBeTruthy()
            expect(wrapper.find('img').attributes('src')).toEqual(video.coverImage)
            expect(wrapper.find("#video-title").text()).toEqual(video.title)
        })
        it('video title click functionality', async () => {
            const goToWatchPageSpy = jest.spyOn(Video.methods, 'goToWatchPage')

            let video = {
                "id": 1,
                "videoAddress": "https://www.youtube.com/watch?v=FXpIoQ_rT_c",
                "coverImage": "https://raw.githubusercontent.com/modanisa/bootcamp-video-db/main/video-images/1-cover.webp",
                "hoverImage": "https://raw.githubusercontent.com/modanisa/bootcamp-video-db/main/video-images/1-hover.webp",
                "title": "Vue.js Course for Beginners [2021 Tutorial]",
                "viewCount": 254,
                "publishDateInMonth": 4,
                "ownerImage": "https://yt3.ggpht.com/ytc/AKedOLTtJvQ1Vfew91vemeLaLdhjOwGx3tTBLlreK_QUyA=s68-c-k-c0x00ffffff-no-rj",
                "ownerName": "freeCodeCamp.org",
                "description": "Learn Vue 3 by in this full course. Vue.js is an open-source model–view–view model front end JavaScript framework for building user interfaces and single-page applications."
            }

            const wrapper = shallowMount(Video, {
                propsData: {
                    video
                },
                mocks: {
                    $router: {
                        push: jest.fn()
                    }
                }
            })

            const title = wrapper.find("#video-title")
            await title.trigger('click')

            expect(goToWatchPageSpy).toBeCalled()
            expect(wrapper.vm.$router.push).toHaveBeenCalledWith("/watch/" + video.id)
        });
    });
});
