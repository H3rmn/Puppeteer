const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({
        headless: false,
        slowMo: 100,
        userDataDir: "./tmp"
    });

    const page = await browser.newPage();
    await page.setViewport({width: 1920, height: 1080 });
    
    //To clear the browser data
    await page.goto('chrome://settings/clearBrowserData');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await page.waitForTimeout(2000);

    //To go to the URL 
    await page.goto('https://sms-test.steelx.co/');

    // await page.click('button#dshbuttonlogout');
    // await page.waitForTimeout(2000);

    //To delete the value in type box 
    const inputSelector = '[name=UserName]';
    await page.$eval(inputSelector, input => input.value = '');

    //Tp login
    await page.type('[name=UserName]', 'steenl');
    await page.type('[name=Password]', 'sl8413');
    await page.click('.btn-success');
    await page.waitForTimeout(3000);

    //Dashboard
    await page.click('button#btnCreateQuote');
    await page.waitForTimeout(3000);

    //Search Location
    await page.type('input#addressSearch', '8 Woodland Dr Reedy Creek QLD, Australia');
    await page.waitForTimeout(3000);
    await page.click('.pac-container');
    await page.waitForTimeout(3000);
    await page.click('.select-button');

    //Standard Selection
    await page.click('div:nth-of-type(4) > div:nth-of-type(1) > .category-text');
    await page.waitForTimeout(3000);
    await page.click('.standard-tab');
    await page.click('.colour-type-buttons > button:nth-of-type(1)');
    await page.waitForTimeout(10000);

    //Shed layout page
    await page.click('div#divErrorDialog > .modal-footer > input:nth-of-type(2)');
    await page.waitForTimeout(3000);

    //To click the "design criteria" button
    await page.click('div#li-design-criteria .MuiListItemText-primary.MuiTypography-body1.MuiTypography-root.css-10hburv-MuiTypography-root');
    await page.click('.col-xs-12 > button:nth-of-type(1)');
    await page.waitForTimeout(5000);

    //To zoom in map
    for (let i = 0; i < 5; i++) {
        await page.click("button[title='Zoom in']");
    }

    //Creating a boundingbox for the green box in the map
    const selector = ".gm-style [tabindex] .mdb4-label";
    const element = await page.$(selector);
    const box = await element.boundingBox();

    //Calculation for the dimension where to put the green box
    const startX = box.x + box.width / 1;
    const startY = box.y + box.height / 100;
    const endX = startX + 5;
    const endY = startY + 260;

    //Mouse movement to move/drag the green box
    await page.mouse.move(startX, startY);
    await page.mouse.down();
    await page.mouse.move(endX, endY, { steps: 50 });
    await page.mouse.up();

    //To rotate the green box to 95 degree
    await page.click('.rs-tooltip-text');
    const spanElement = await page.$('.rs-tooltip-text');
    await page.keyboard.press('Backspace');
    await spanElement.type('95');
    await page.keyboard.press('Enter');

    //To set the Terrain Category dropdown to 3
    await page.click('select#TerrainCategoryddl');
    for (let i = 0; i < 8; i++) {
        await page.keyboard.press('ArrowDown');
    }
    await page.keyboard.press('Enter');
    await page.click('#SaveAndCloseButton');
    await page.waitForTimeout(3000);

    //Edit the Dimension
    await page.click("div:nth-of-type(3) > .estimator_menu_trigger.nav-header > div[role='button']  .MuiListItemText-primary.MuiTypography-body1.MuiTypography-root.css-10hburv-MuiTypography-root");
    await page.click('div#li-dimensions .MuiListItemText-primary.MuiTypography-body1.MuiTypography-root.css-10hburv-MuiTypography-root');
    await page.click('#shedSize .btn-success');
    
    //Edit the Leanto
    await page.click('div#li-leanto .MuiListItemText-primary.MuiTypography-body1.MuiTypography-root.css-10hburv-MuiTypography-root');

    //To check the Left Include checkbox
    await page.click('input#include-left');

    //Starting Bay Dropdown
    await page.click('div:nth-of-type(1) > div:nth-of-type(1) > .form-group.row > .col-xs-12 > .form-control');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');

    //Bay Count Dropdown 
    await page.click('div:nth-of-type(1) > div:nth-of-type(2) > .form-group.row > .col-xs-12 > .form-control');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');

    //Span and Drop inputbox
    await page.type("fieldset [class='col-xs-6']:nth-of-type(1) div:nth-child(5) [value]", '.5');
    await page.type("fieldset [class='col-xs-6']:nth-of-type(1) div:nth-child(6) [value]", '.3');

    //To copy the input value in Left Leanto to the Right Leanto
    await page.click('.btn-primary.margin-right');
    await page.click('.bootstrap-wrapper .btn-success');

    //Edit the Eaves
    await page.click("div[data-target='eaves'] span[class='MuiTypography-root MuiTypography-body1 MuiListItemText-primary css-10hburv-MuiTypography-root']");

    //Left End, Main Shed
    await page.click("div:nth-of-type(2) > div:nth-of-type(4) > .input-group-addon > input[value='on']");
    await page.keyboard.press('Tab');
    await page.type("div:nth-of-type(2) > div:nth-of-type(4) > div > div > .form-control", '0.4');

    //To copy the inputed value
    await page.keyboard.down('Control');
    await page.keyboard.press('A');
    await page.keyboard.up('Control');
    await page.keyboard.down('Control');
    await page.keyboard.press('C');
    await page.keyboard.up('Control');

    await page.click("div:nth-of-type(2) > div:nth-of-type(5) > .input-group-addon > input[value='on']");
    await page.keyboard.press('Tab');
    await page.keyboard.down('Control');
    await page.keyboard.press('V');
    await page.keyboard.up('Control');

    await page.click("div:nth-of-type(3) > div:nth-of-type(2) > .input-group-addon > input[value='on']");
    await page.keyboard.press('Tab');
    await page.keyboard.down('Control');
    await page.keyboard.press('V');
    await page.keyboard.up('Control');

    await page.click("div:nth-of-type(3) > div:nth-of-type(4) > .input-group-addon > input[value='on']");
    await page.keyboard.press('Tab');
    await page.keyboard.down('Control');
    await page.keyboard.press('V');
    await page.keyboard.up('Control');

    await page.click("div:nth-of-type(3) > div:nth-of-type(5) > .input-group-addon > input[value='on']");
    await page.keyboard.press('Tab');
    await page.keyboard.down('Control');
    await page.keyboard.press('V');
    await page.keyboard.up('Control');

    await page.click("div:nth-of-type(4) > div:nth-of-type(3) > .input-group-addon > input[value='on']");
    await page.keyboard.press('Tab');
    await page.keyboard.down('Control');
    await page.keyboard.press('V');
    await page.keyboard.up('Control');

    await page.click("div:nth-of-type(4) > div:nth-of-type(4) > .input-group-addon > input[value='on']");
    await page.keyboard.press('Tab');
    await page.keyboard.down('Control');
    await page.keyboard.press('V');
    await page.keyboard.up('Control');

    await page.click("div:nth-of-type(4) > div:nth-of-type(5) > .input-group-addon > input[value='on']");
    await page.keyboard.press('Tab');
    await page.keyboard.down('Control');
    await page.keyboard.press('V');
    await page.keyboard.up('Control');
    await page.click('.bootstrap-wrapper .btn-success');

    //For Roller door
    await page.click("div:nth-of-type(4) > .estimator_menu_trigger.nav-header > div[role='button']");
    await page.click('div#li-roller');
    await page.waitForTimeout(3000);
    await page.click("[transform='translate\(386\.4 204\.61289967694995\)'] [transform='translate\(0 104\.86289967694995\)']:nth-child(3) [x]");
    await page.click('.OkCancelBtns .btn-success');
    await page.waitForTimeout(6000);

    const elementHandle = await page.$("[transform] g [y='-63']:nth-child(3)");
    await elementHandle.click({ button: 'right'});
    await page.click('div:nth-of-type(1) > li > div');

    //For Sectional door
    await page.click('div#li-sectional .MuiListItemText-primary.MuiTypography-body1.MuiTypography-root.css-10hburv-MuiTypography-root');
    await page.click("[transform] g:nth-child(17) [transform='translate\(84 104\.86289967694995\)'] g:nth-of-type(1) [x]");
    await page.waitForTimeout(6000);

    const sectionalDelete = await page.$("[transform] g [y='-63']:nth-child(3)");
    await sectionalDelete.click({ button: 'right'});
    await page.click('div:nth-of-type(1) > li > div');

    //For Sliding door
    await page.click('div#li-sliding .MuiListItemText-primary.MuiTypography-body1.MuiTypography-root.css-10hburv-MuiTypography-root');
    await page.click("[transform] g:nth-child(17) [transform='translate\(84 104\.86289967694995\)'] g:nth-of-type(1) [x]");
    await page.waitForTimeout(2000);

    const slidingDelete = await page.$("[transform='translate\(0\,0\)'] [x='0']");
    await slidingDelete.click({ button: 'right'});
    await page.click('div:nth-of-type(1) > li > div');
    
    //For PA door
    await page.click('div#li-padoor .MuiListItemText-primary.MuiTypography-body1.MuiTypography-root.css-10hburv-MuiTypography-root');
    await page.waitForTimeout(2000);
    await page.click('.bootstrap-wrapper li:nth-of-type(1) a');
    await page.click("[transform='translate\(386\.4 204\.61289967694995\)'] [transform='translate\(252 104\.86289967694995\)'] [x]");
    await page.waitForTimeout(2000);

    const paDelete = await page.$(".SmallComponent rect");
    await paDelete.click({ button: 'right'});
    await page.click('div:nth-of-type(1) > li > div');

    await page.waitForTimeout(10000);

    //For Open Bays
    await page.click('div#li-openbay .MuiListItemText-primary.MuiTypography-body1.MuiTypography-root.css-10hburv-MuiTypography-root');
    await page.click("[transform='translate\(386\.4 204\.61289967694995\)'] [transform='translate\(336 104\.86289967694995\)'] [x]");
    await page.waitForTimeout(2000);

    const openDelete = await page.$("[transform='translate\(0 0\) rotate\(0\)'] g:nth-of-type(1) [x='0']:nth-of-type(2)");
    await openDelete.click({ button: 'right'});
    await page.click('div:nth-of-type(1) > li > div');

    //For Windows 
    await page.click('div#li-windows .MuiListItemText-primary.MuiTypography-body1.MuiTypography-root.css-10hburv-MuiTypography-root');
    await page.waitForTimeout(2000);
    await page.click('.bootstrap-wrapper li:nth-of-type(6) a');
    await page.click("[transform='translate\(386\.4 204\.61289967694995\)'] [transform='translate\(252 104\.86289967694995\)'] [x]");
    await page.waitForTimeout(2000);

    const windowsDelete = await page.$('.SmallComponent > g > g > g > g > rect:nth-of-type(2)');
    await windowsDelete.click({ button: 'right'});
    await page.click('div:nth-of-type(1) > li > div');

    await page.waitForTimeout(3000);

    //To add Internal Dividing Walls
    await page.click('div#inside .MuiListItemText-primary.MuiTypography-body1.MuiTypography-root.css-10hburv-MuiTypography-root');
    await page.click('div#li-verminproof .MuiListItemText-primary.MuiTypography-body1.MuiTypography-root.css-10hburv-MuiTypography-root');
    await page.click('.form-group .btn-danger');
    await page.click('div#li-dividingwalls .MuiListItemText-primary.MuiTypography-body1.MuiTypography-root.css-10hburv-MuiTypography-root');
    await page.click("[transform] > [transform] > [cx='84']:nth-child(3)");
    await page.click("[transform] [transform] [cx='84']:nth-child(4)");
    await page.click("[transform] > [transform] > [cx='0']:nth-child(2)");
    await page.click("[transform] [transform] [cx='84']:nth-child(5)");
    
    //To edit the Mezzanine Properties
    await page.click('div#li-mezzaninefloor .MuiListItemText-primary.MuiTypography-body1.MuiTypography-root.css-10hburv-MuiTypography-root');
    await page.click('div:nth-of-type(2) > .col-xs-6 > .form-control');
    for (let i = 0; i < 2; i++) {
        await page.keyboard.press('ArrowDown');
    }
    await page.keyboard.press('Enter');
    await page.click('div:nth-of-type(3) > .col-xs-6 > .form-control');
    for (let i = 0; i < 2; i++) {
        await page.keyboard.press('ArrowDown');
    }
    await page.keyboard.press('Enter');
    await page.click('.bootstrap-wrapper .btn-success');

    //Stud Walls
    await page.click('div#li-studwalls .MuiListItemText-primary.MuiTypography-body1.MuiTypography-root.css-10hburv-MuiTypography-root');
    await page.click("div:nth-of-type(1) > .col-xs-1 > input[name='enabled']");
    await page.keyboard.press('Tab');
    await page.keyboard.press('5');
    await page.keyboard.press('Tab');
    await page.keyboard.press('5');

    await page.click("div:nth-of-type(2) > .col-xs-1 > input[name='enabled']");
    await page.keyboard.press('Tab');
    await page.keyboard.press('5');
    await page.keyboard.press('Tab');
    await page.keyboard.press('5');

    await page.click("div:nth-of-type(3) > .col-xs-1 > input[name='enabled']");
    await page.keyboard.press('Tab');
    await page.keyboard.press('5');
    await page.keyboard.press('Tab');
    await page.keyboard.press('5');
    await page.click('.form-group .btn-success');

    //To edit the Skylights in the Cladding
    await page.click('div#cladding .MuiListItemText-primary.MuiTypography-body1.MuiTypography-root.css-10hburv-MuiTypography-root');
    await page.click('input#skylights');
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('Backspace');
    await page.type('input#skylights', '10');
    await page.click('.bootstrap-wrapper .btn-success');

    await page.click('div#engineering .MuiListItemText-primary.MuiTypography-body1.MuiTypography-root.css-10hburv-MuiTypography-root');
    await page.click("div:nth-of-type(8) > .estimator_menu_trigger.nav-header > div[role='button']  .MuiListItemText-primary.MuiTypography-body1.MuiTypography-root.css-10hburv-MuiTypography-root");
    await page.click("div:nth-of-type(9) > .estimator_menu_trigger.nav-header > div[role='button']  .MuiListItemText-primary.MuiTypography-body1.MuiTypography-root.css-10hburv-MuiTypography-root");

    await page.waitForTimeout(10000);
    await page.screenshot({path: 'example.png'});
    
    await browser.close();
})();