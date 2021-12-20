import "reflect-metadata";
import container from './inversify.config';
import { Classrome } from "./interface";
import { TYPES } from "./types";

const jiaoshi = container.get<Classrome>(TYPES.Classrome);


console.log(jiaoshi.study())