import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';

const ngrok = require("ngrok");

const mainPort = 3003
const token = '1XI4GdbwUMTBaqvag4z1vadkll2_5PZHM29mk7ufffa4NWzC'
const subdomain = 'yad2'
const localdomain = 'localhost'


async function bootstrap() {
  const app = await NestFactory.create(AppModule,{ cors: true });
  app.use(bodyParser.json({limit: '50mb'}));
  app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
  app.enableCors()
  await app.listen(mainPort);
  try  {
    // await ngrok.authtoken(token);
    const externalUrl = await ngrok
      .connect({
        addr: `${localdomain}:${mainPort}`,
        authtoken: token,
        subdomain,
        hostHeader: `${localdomain}:${mainPort}`
      })
    console.log(externalUrl);
  }
  catch (e) {
    console.log(e);
  }

    // .then((url: string) => {
    //   // logger.info(url)
    // })
    // .catch((err: any) => {
    //   // logger.error(JSON.stringify(err))
    // });


}
bootstrap();
