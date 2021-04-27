import { isAfter, parseISO } from 'date-fns';
import IDatefnsProvider from '../models/IDatefnsProvider';

export default class DatefnsProvider implements IDatefnsProvider {
  public async thisDateIsAfter(date: string): Promise<boolean> {
    const parseDate = parseISO(date);

    const response = isAfter(parseDate, new Date());

    return response;
  }
}
