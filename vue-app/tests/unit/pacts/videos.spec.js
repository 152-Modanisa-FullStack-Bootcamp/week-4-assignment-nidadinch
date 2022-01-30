import {pactWith} from 'jest-pact';
import {like, eachLike, string} from "@pact-foundation/pact/src/dsl/matchers";
import {API} from "@/api";

pactWith({
    consumer: 'FrontEnd',
    provider: 'Backend'
}, provider => {
    describe('videos',  () => {
        let api
        beforeEach(() => {
            api = new API(provider.mockService.baseUrl);
        })
        it('get video list correctly', async function () {
            await provider.addInteraction({
                state: 'get video list successfully',
                uponReceiving: 'a request for video list',
                withRequest: {
                    method: 'GET',
                    path: '/videos'
                },
                willRespondWith:{
                    status: 200,
                    headers:{
                        'Content-Type': 'application/json; charset=UTF-8',
                    },
                    body:{
                        data: eachLike({
                            id: like(1),
                            coverImage: like("https://raw.githubusercontent.com/modanisa/bootcamp-video-db/main/video-images/1-cover.webp"),
                            title: string("Vue.js Course for Beginners [2021 Tutorial]"),
                            hoverImage: like("https://raw.githubusercontent.com/modanisa/bootcamp-video-db/main/video-images/1-hover.webp")
                        })
                    }
                }
            })
            const response = await api.getVideoList()
            expect(response.data[0].id).toEqual(1)
            //console.log(response)
        });
    });
})
