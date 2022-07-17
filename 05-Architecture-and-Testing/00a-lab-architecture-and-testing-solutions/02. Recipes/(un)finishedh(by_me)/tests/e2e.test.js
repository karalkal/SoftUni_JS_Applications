//@ts-check
const { chromium } = require('playwright-chromium');
const { expect, assert } = require('chai');


let browser;
let context;
let page;

describe('E2E tests', function () {
    const validEmail = 'peter@abv.bg'
    const validPassword = '123456'
    const invalidEmail = 'Kur'
    const invalidPassword = 'Kur'

    this.timeout(6000);

    before(async () => {
        browser = await chromium.launch({ headless: false, slowMo: 910 });
        // browser = await chromium.launch();
    });
    after(async () => { await browser.close(); });
    beforeEach(async () => {
        context = await browser.newContext();

        // block intensive resources and external calls (page routes take precedence)
        await context.route('**/*.{png,jpg,jpeg}', route => route.abort());
        await context.route(url => {
            return url.hostname != 'localhost';
        }, route => route.abort());

        page = await context.newPage();
    });
    afterEach(async () => {
        await page.close();
        await context.close();
    });

    describe('catalog and home tests', () => {

        it('must display recipes on load', async () => {
            await page.goto('http://localhost:5500');

            await page.waitForSelector('.preview')

            let preview = await page.textContent('#catalog')

            assert.include(preview, 'Easy Lasagna')
            assert.include(preview, 'Grilled Duck Fillet')
            assert.include(preview, 'Roast Trout')
        });

        it('must display recipes when catalog is clicked after register', async () => {
            await page.goto('http://localhost:5500');

            await page.click('id=registerLink');        //goto register and confirm no items from catalog appear
            let preview = await page.textContent('main')
            assert.notInclude(preview, 'Easy Lasagna')

            await page.click('id=catalogLink');         // back to catalog

            await page.waitForSelector('.preview')

            preview = await page.textContent('#catalog')

            assert.include(preview, 'Easy Lasagna')
            assert.include(preview, 'Grilled Duck Fillet')
            assert.include(preview, 'Roast Trout')
        });

        it('must display recipes when catalog is clicked after login', async () => {
            await page.goto('http://localhost:5500');

            await page.click('id=loginLink');        //goto login and confirm no items from catalog appear
            let preview = await page.textContent('main')
            assert.notInclude(preview, 'Easy Lasagna')

            await page.click('id=catalogLink');         // back to catalog

            await page.waitForSelector('.preview')

            preview = await page.textContent('#catalog')

            assert.include(preview, 'Easy Lasagna')
            assert.include(preview, 'Grilled Duck Fillet')
            assert.include(preview, 'Roast Trout')
        });

        it('must display recipes details when recipe clicked after login', async () => {
            await page.goto('http://localhost:5500');

            await page.waitForSelector('.preview')

            await page.click('text="Easy Lasagna"');

            let details = await page.textContent('article')

            assert.include(details, 'Easy Lasagna')

            assert.include(details, 'Easy Lasagna')
            assert.include(details, 'Ingredients:')
            assert.include(details, '1 tbsp Ingredient 1')
            assert.include(details, 'Preparation:')
            assert.include(details, 'Cook until done')
        });
    });


    describe('Authentication', () => {
        it('must make correct API call after login is clicked', async () => {
            await page.goto('http://localhost:5500');

            await page.click('id=loginLink');

            page.route('**' + '/users/login', route => route.fulfill(
                {
                    status: 200,
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ _id: '0001', validEmail, accessToken: 'AAAA' })
                }
            ));

            await page.waitForSelector('form');

            await page.fill('[name="email"]', validEmail);
            await page.fill('[name="password"]', validPassword);

            const [response] = await Promise.all([
                page.waitForResponse('**' + '/users/login'),
                page.click('[type="submit"]')
            ]);

            const postData = JSON.parse(response.request().postData());
            expect(postData.email).to.equal(validEmail);
            expect(postData.password).to.equal(validPassword);
        });


        it('must make correct API call after register is clicked', async () => {
            await page.goto('http://localhost:5500');

            await page.click('id=registerLink');

            page.route('**' + '/users/register', route => route.fulfill(
                {
                    status: 200,
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ _id: '0001', validEmail, accessToken: 'AAAA' })
                }
            ));

            await page.waitForSelector('form');

            await page.fill('[name="email"]', validEmail);
            await page.fill('[name="password"]', validPassword);
            await page.fill('[name="rePass"]', validPassword);

            const [response] = await Promise.all([
                page.waitForResponse('**' + '/users/register'),
                page.click('[type="submit"]')
            ]);

            const postData = JSON.parse(response.request().postData());
            expect(postData.email).to.equal(validEmail);
            expect(postData.password).to.equal(validPassword);
        });
    });


    describe('CRUD oprations', () => {
        /* Login user */
        beforeEach(async () => {
            await page.goto('http://localhost:5500');

            await page.click('id=loginLink');

            page.route('**' + '/users/login', route => route.fulfill(
                {
                    status: 200,
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ _id: '0001', validEmail, accessToken: 'AAAA' })
                }
            ));

            await page.waitForSelector('form');

            await page.fill('[name="email"]', validEmail);
            await page.fill('[name="password"]', validPassword);

            const [response] = await Promise.all([
                page.waitForResponse('**' + '/users/login'),
                page.click('[type="submit"]')
            ]);
        })

        it('logged in user must see createLink', async () => {
            await page.waitForSelector('#createLink');

            const visible = await page.isVisible('#createLink');

            assert.isTrue(visible)
        })

        it('logged in user must see logoutBtn', async () => {
            await page.waitForSelector('#logoutBtn');

            const visible = await page.isVisible('#logoutBtn');

            assert.isTrue(visible)
        })

        it('logged in user must see create form after clicking createLink', async () => {
            const mock = {
                name: 'Name1',
                img: '/assets/new.png',
                ingredients: ['i1', 'i2'],
                steps: ['s1', 's2'],
                _id: '0002',
                _ownerId: '0001'
            };

            page.route('**' + '/data/recipes', route => route.fulfill(
                {
                    status: 200,
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(mock)
                }
            ));

            page.click('#createLink')

            await page.waitForSelector('section#create');

            await page.fill('[name="name"]', mock.name);
            await page.fill('[name="img"]', mock.img);
            await page.fill('[name="ingredients"]', mock.ingredients.join('\n'));
            await page.fill('[name="steps"]', mock.steps.join('\n'));

            const [response] = await Promise.all([
                page.waitForResponse('/data/recipes'),
                page.click('[type="submit"]')
            ]);

            const postData = JSON.parse(response.request().postData());
            expect(postData.name).to.equal(mock.name);
            expect(postData.img).to.equal(mock.img);
            expect(postData.ingredients).to.deep.equal(mock.ingredients);
            expect(postData.steps).to.deep.equal(mock.steps);

        })


        it.only('logged in user must see Edit button when clicking on article', async () => {

            await page.click('.preview')


            // incomplete - next line returns error
            await page.waitForSelector('article div.controls');
        })
    })
})



