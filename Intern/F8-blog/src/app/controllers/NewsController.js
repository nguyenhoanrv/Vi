class NewsController {
    index(req, res) {
        res.send('news');
    }
    detail(req, res) {
        res.send('Detail news !');
    }
}
module.exports = new NewsController();
