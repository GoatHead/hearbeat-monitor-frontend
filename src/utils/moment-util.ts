import {MomentFormat} from "../enums/moment-format";
import moment from 'moment'

export function format(datetime: string, format: MomentFormat): string {
    return moment(datetime).format(format)
}