import { createServer } from 'http';
import { readFile } from 'fs';
import { parse } from 'url';
import { parse as _parse } from 'querystring';
import figlet from 'figlet';
import { getComputerChoice, getResult } from './utils.js';

const server = createServer((req, res) => {
  const page = parse(req.url).pathname;
  const params = _parse(parse(req.url).query);
  console.log(page);

  switch(page) {
    case '/':
      readFile('public/index.html', function(err, data) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        res.end();
      });
      break;
    case '/api':
      if('rockpaperscissors' in params) {
        res.writeHead(200, {'Content-Type': 'application/json'});
        let computerChoice = getComputerChoice();
        const objToJson = {
          playerChoice: params['rockpaperscissors'],
          computerChoice: computerChoice,
          result: getResult(params['rockpaperscissors'], computerChoice)
        }
        res.end(JSON.stringify(objToJson));
      }
      break;
    case '/css/style.css':
      readFile('public/css/style.css', function(err, data) {
        res.write(data);
        res.end();
      });
      break;
    case '/js/main.js':
      readFile('public/js/main.js', function(err, data) {
        res.writeHead(200, {'Content-Type': 'text/javascript'});
        res.write(data);
        res.end();
      });
      break;
    default:
      figlet('404!!', function(err, data) {
        if (err) {
            console.log('Something went wrong...');
            console.dir(err);
            return;
        }
        res.write(data);
        res.end();
      });
      break;
  }
});

server.listen(8000);
