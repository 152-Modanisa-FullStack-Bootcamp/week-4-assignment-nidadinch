const {Given, When, Then} = require("cucumber");
const openUrl = require("../support/action/openUrl");
const checkElementExists = require("../support/check/checkElementExists");
const checkUrlContains = require("../support/check/checkUrlContains");

const assert = require("assert");

Given("that User goes to Video Site Project's HomePage", async function () {
    await openUrl.call(this, 'http://localhost:8080/')
})
When(/^page is loaded$/, async function () {
    await checkElementExists.call(this, '.home', false)
});
Then(/^User can see some of videos' title like$/, async function (videoTitle) {
    const allTitles = await this.page.$$eval('.video-container', async (items, videoTitle) => {
        // get children of items that has been selected using .video-container selector
        // const children = items.map(item => item.children)
        // console.log(children)

        // get HTML elements using #video-title selector
        const elements = document.querySelectorAll("#video-title")

        // convert HTML elements to array
        let elementsArr = Array.from(elements);
        // console.log(elementsArr)

        // get titles of elements
        const titles = elementsArr.map(element => element.innerText)
        // console.log(titles)
        return titles;
    })
    // convert rawTable to 1D array
    let videoTitlesArr = videoTitle.rawTable.flat();
    // check titles array includes all titles that was given from feature
    let checker = (array, target) => target.every(item => array.includes(item));
    const result = checker(allTitles, videoTitlesArr);
    //console.log(result)
    assert(result === true, `Expected: "true", got: "${result}"`);
});

Given(/^that User is on Video Site Project's HomePage$/, async function () {
    await openUrl.call(this, "http://localhost:8080/")
    await checkElementExists.call(this, '.home', false)
});
When(/^User clicks "([^"]*)" video$/, async function (videoTitle) {
    this.videoId = await this.page.$$eval('.video-list-item', async (items, videoTitle) => {
        //console.log(items)
        const videoItem = items.find(item => item.querySelector('#video-title').textContent.includes(videoTitle))
        //console.log(videoItem)
        const title = videoItem.querySelector("#video-title")
        //console.log(title)
        const videoID = videoItem.dataset.id
        //console.log(videoID)
        await title.click();
        return videoID
        },
        videoTitle
    )
});
Then(/^User should see watch url correctly$/, async function () {
    await this.page.waitForSelector('#watch-id')
    await checkUrlContains.call(this, false, `/${this.videoId}`)
});
When(/^User hovers "([^"]*)" video$/, async function (videoTitle) {
    const videoItems = await this.page.$$(".video-list-item")
    let desiredVideo
    for(let video of videoItems){
        const title = await video.$("#video-title")
        const titleJSHandle = await title.getProperty("innerHTML")
        const titleText = await titleJSHandle.jsonValue()
        //console.log(titleText)
        if(titleText.includes(videoTitle)){
            desiredVideo = video
        }
    }

    const videoImg = await desiredVideo.$("#video-image")
    const imgJSHandle = await videoImg.getProperty("src")
    const imgSrc = await imgJSHandle.jsonValue()
    this.imgSrc = imgSrc
    //console.log(imgText)
    await videoImg.hover()

    const imgJSHandleAfterHover = await videoImg.getProperty("src")
    const imgSrcAfterHover = await imgJSHandleAfterHover.jsonValue()
    this.imgSrcAfterHover = imgSrcAfterHover
});
Then(/^User should see hovered image$/, async function () {
    await this.page.waitForTimeout(3000)
    assert.notEqual(this.imgSrc, this.imgSrcAfterHover);
});
