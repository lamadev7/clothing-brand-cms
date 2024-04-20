import { ENV } from "../constants";
import productionConfig from "./production";
import developmentConfig from "./development";

export default process.env.NODE_ENV === ENV.DEVELOPMENT ? developmentConfig : productionConfig;