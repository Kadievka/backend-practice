import log4js from "log4js";

const logger = log4js.getLogger();
logger.level = process.env.LOGGER_LEVEL;

const paginateUtil = (array, limit, page = 1) => {
  logger.info("[paginateUtil] INIT");
  logger.info(`[paginateUtil] docs: ${JSON.stringify(array)}`);
  logger.info(`[paginateUtil] limit: ${limit}`);
  logger.info(`[paginateUtil] page: ${page}`);
  let result = {
    docs: [],
    total: 0,
    limit,
    page: page,
    pages: 1,
  };
  logger.info(`[paginateUtil] result: ${JSON.stringify(result)}`);
  if (array) {
    result.total = array.length;
    result.pages = Math.ceil(result.total / result.limit);
    const init = result.limit * (result.page - 1);
    const end = result.limit * result.page;
    logger.info(`[paginateUtil] init: ${init}`);
    logger.info(`[paginateUtil] end: ${end}`);
    for (let i = init; i < end; i++) {
      //logger.info(`[paginateUtil] array[${i}]: ${array[i]}`);
      if (array[i]) result.docs.push(array[i]);
    }
  }
  logger.info(`[paginateUtil] result: ${JSON.stringify(result)}`);
  logger.info("[paginateUtil] FINISH");
  return result;
};

export default paginateUtil;
