const puppeteer = require('puppeteer');
const { TimeoutError } = require('puppeteer/Errors');
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  })

class Crawl {
    constructor() {
        this.userId = "z20240";
        this.userPwd = "z7895123z";
        this.browser = null;
        this.page = null;
    }

    async workflow() {

        try {

            this.browser = await puppeteer.launch({
                executablePath: process.env.CHROMIUM_PATH,
                args: ['--no-sandbox'],
                headless: true
            });
            this.page = await this.browser.newPage();
            await this.page.goto('https://member.ruten.com.tw/user/login.htm');

            await this.login(this.userId, this.userPwd);

            await this.browser.close();

        } catch (error) {
            if (error instanceof TimeoutError) { // 如果超时，做一些处理。
                console.log('Timeout');
            }
            console.error(error);
        }

    }

    async login(userId, password) {

        // 輸入帳號密碼
        await this.page.type("input#userid", userId);
        await this.page.type("input#userpass", password);
        await this.page.tap('input#btnLogin');

        // if 進入認證
        if (await this.page.url().includes("ogin_validation.php")) {

            await this.page.waitForSelector('button#btn_send_sms');
            await this.page.tap('button#btn_send_sms');

            await this.page.evaluate(() => document.querySelector("input#remember_code").checked = true );

            const token = await new Promise((resolve, reject) => readline.question(`please input the verify token you get.\n`, resolve) );
            await this.page.type("input#totp_code", token); // 輸入驗證碼

            await this.page.evaluate(() => Array.from(document.querySelectorAll('button')).find(el => el.innerHTML === '確認').click() );

        }
        // else

        // input_userId.value = userId;
        // input_userPwd.value = password;
    }


}

module.exports = Crawl;