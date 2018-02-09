const cheerio = require('cheerio');
const superagent = require('superagent');


// const ourl = "http://travel.qunar.com/travelbook/api/index/notes?";
const ourl = "http://travel.qunar.com/travelbook/list.htm?";

module.exports = function get(params) {
    return new Promise(function(resolve, reject) {
        const url = ourl + `order=${params.elite}&page=${params.page}`;
        superagent(url)
            .end(function(err, res) {
                if (err) {
                    resolve('err')
                } else {
                    const $ = cheerio.load(res.text)
                    const data = [];
                    $('.b_strategy_list').children().each(function(i, el) {
                        let obj = {}
                        obj.id = $(this).find('h2').attr('data-bookid')
                        obj.title = $(this).find('h2').text()
                        obj.name = $(this).find('.user_name').text()
                        obj.userpic = $(this).find('.face').find('img').attr('src')
                        obj.days = $(this).find('.date').text().substring(0, 10)
                        obj.bgimg = $(this).find('.pics').children().eq(0).find('img').attr('src')
                        data.push(obj)
                    })
                    // console.log(data)
                    // resolve($.html())
                    resolve(data)
                }
            });
    })
};