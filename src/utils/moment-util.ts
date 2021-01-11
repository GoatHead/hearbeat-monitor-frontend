import {MomentFormat} from "../enums/moment-format";
import moment from 'moment'

export function format(datetime: string, format: MomentFormat): string {
    console.log(datetime)
    return moment(datetime).utc().format(format)
}