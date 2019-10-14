const http = require('http');
const Koa = require('koa');
const Router = require('koa-router');
const koaBody = require('koa-body');
const cors = require('koa2-cors');
const app = new Koa();

app.use(cors());

app.use(koaBody({
  text: true,
  urlencoded: true,
  multipart: true,
  json: true,
}));

const data = [{'id': 1, 'npp': 1, 'user': 'Иван Петров', 'task': 'Отправить письмо заказчику', 'date': '01-11-2019'},
{'id': 2, 'npp': 2, 'user': 'Петр Иванов', 'task': 'Получить оплату по проекту', 'date': '03-11-2019'},
{'id': 3, 'npp': 3, 'user': 'Василий Сергеев', 'task': 'Согласовать стадию П', 'date': '01-11-2019'},
{'id': 4, 'npp': 4, 'user': 'Иван Петров', 'task': 'Дать ответ на письмо', 'date': '03-11-2019'},
{'id': 5, 'npp': 5, 'user': 'Петр Иванов', 'task': 'Выдать зарплату', 'date': '10-11-2019'}];

const router = new Router();

router.get('/data', async (ctx, next) => {
  ctx.response.body = data;
});

app.use(router.routes())
app.use(router.allowedMethods());

const port = process.env.PORT || 7070;
const server = http.createServer(app.callback());
server.listen(port);
