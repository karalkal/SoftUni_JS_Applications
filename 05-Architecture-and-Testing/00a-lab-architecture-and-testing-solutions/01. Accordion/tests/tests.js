const { chromium } = require('playwright-chromium');
const { expect, assert } = require('chai');


let browser, page; // Declare reusable variables

describe('accordion tests', async function () {
    this.timeout(6200)

    before(async () => { browser = await chromium.launch({ headless: false, slowMo: 500 }); });
    after(async () => { await browser.close(); });
    beforeEach(async () => { page = await browser.newPage(); });
    afterEach(async () => { await page.close(); });

    it('works', async () => {
        await page.goto('http://localhost:5500');

        await page.screenshot({ path: `index.png` });
    });

    it('must contain specific text', async () => {
        await page.goto('http://localhost:5500');

        // await page.waitForTimeout(300)
        await page.waitForSelector('.accordion')

        const content = await page.textContent('#main')

        assert.include(content, 'Scalable Vector Graphics')
        assert.include(content, 'Open standard')
        assert.include(content, 'Unix')
        assert.include(content, 'ALGOL')
    });

    it('must display text when More is clicked', async () => {
        await page.goto('http://localhost:5500');

        // click automatically waits for the element/text to appear
        await page.click('text=More')

        await page.screenshot({ path: `index.png` });

        const visible = await page.isVisible('.extra')

        assert.isTrue(visible)
    });

    it.only('must hide text when Less is clicked', async () => {
        await page.goto('http://localhost:5500');

        // click automatically waits for the element/text to appear
        await page.click('text=More')

        let visible = await page.isVisible('.extra')

        assert.isTrue(visible)

        await page.click('text=Less')

        visible = await page.isVisible('.extra')

        assert.isFalse(visible)


    });

});