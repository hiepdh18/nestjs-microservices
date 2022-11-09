import { Logger } from '@nestjs/common';
import * as chalk from 'chalk';
// import { REQUEST_ID, SESSION_USER } from '../../common/constant/constants';
// import { SessionMiddleware } from 'common/middleware/session.middleware';
import * as dayjs from 'dayjs';
// import { User } from 'modules/user/schemas/user.schema';
// import ecsFormat from '@elastic/ecs-winston-format';
import * as winston from 'winston';
import 'winston-daily-rotate-file';
import DailyRotateFile from 'winston-daily-rotate-file';

const formatter = (info) => {
  // const requestId = SessionMiddleware.get(REQUEST_ID) || '-';
  // const user = SessionMiddleware.get(SESSION_USER);
  // const email = user ? user.email : '-';

  // return `${dayjs(info.timestamp).format(
  //   'YYYY/MM/DD - hh:mm:ss A',
  // )} ${chalk.magentaBright(requestId)} ${email} [${info.level}] [${chalk.green(
  //   info.context,
  // )}] ${info.message}`;

  return `${dayjs(info.timestamp).format('YYYY/MM/DD - hh:mm:ss A')} [${
    info.level
  }] [${chalk.green(info.context)}] ${info.message}`;
};

const customFormat = winston.format.combine(
  winston.format.colorize(),
  winston.format.timestamp(),
  winston.format.prettyPrint(),
  winston.format.printf((info) => formatter(info)),
);

const transport: DailyRotateFile = new winston.transports.DailyRotateFile({
  filename: 'logs/server.log',
  format: winston.format.combine(winston.format.uncolorize()),
  level: 'error',
  datePattern: 'YYYY-MM-DD',
  maxFiles: 10,
});

export class BackendLogger extends Logger {
  public static winstonLogger = winston.createLogger({
    format: customFormat,
    transports: [transport],
  });

  private ctx: string;

  constructor(context: string) {
    super(context);
    this.ctx = context;
  }

  winstonLog(
    message: string,
    level: 'silly' | 'debug' | 'verbose' | 'http' | 'info' | 'warn' | 'error',
    trace?: string,
  ) {
    BackendLogger.winstonLogger.log({
      level,
      message,
      trace,
      context: this.ctx,
    });
  }

  error(message: string, trace: string) {
    this.winstonLog(message, 'error', trace);
    super.error(message, trace);
  }

  warn(message: string) {
    this.winstonLog(message, 'warn');
    super.warn(message);
  }

  info(message: string) {
    this.winstonLog(message, 'info');
    super.log(message);
  }
  http(message: string) {
    this.winstonLog(message, 'http');
    super.log(message);
  }
  verbose(message: string) {
    this.winstonLog(message, 'verbose');
    super.verbose(message);
  }

  debug(message: string) {
    this.winstonLog(message, 'debug');
    super.debug(message);
  }

  silly(message: string) {
    this.winstonLog(message, 'silly');
    super.log(message);
  }
}

// new winston.transports.DailyRotateFile({
//   filename: 'logs/serverAll.log',
//   format: winston.format.combine(winston.format.uncolorize()),
//   level: 'silly',
//   datePattern: 'YYYY-MM-DD',
//   maxFiles: 10,
// }),

// new winston.transports.File({
//   filename: 'logs/serverAll.log',
//   format: winston.format.combine(winston.format.uncolorize()),
//   tailable: false,
//   level: 'silly',
//   maxFiles: 30,
//   maxsize: 5 * 1024 * 1024, // 5 MB
// }),
// new winston.transports.DailyRotateFile({
//   filename: 'logs/combined-%DATE%.log',
//   level: 'error',
//   datePattern: 'YYYY-MM-DD-HH',
//   frequency: '72h',
//   maxFiles: 1,
// }),
