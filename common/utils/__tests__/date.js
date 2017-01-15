import moment from 'moment';
import { since } from '../date';

describe('Date util', () => {
  it('should return time passed since given date', () => {
    const thirtySecondsAgo = moment().subtract(30, 's');
    const twentyMinutesAgo = moment().subtract(20, 'm');
    const threeHoursAgo    = moment().subtract(3, 'h');
    const twoDaysAgo       = moment().subtract(2, 'd');
    const aWeekAgo         = moment().subtract(1, 'w');
    const fourMonthsAgo    = moment().subtract(4, 'M');
    const fiveYearsAgo     = moment().subtract(5, 'Y');

    expect(since(thirtySecondsAgo)).toEqual('a few seconds ago');
    expect(since(twentyMinutesAgo)).toEqual('20 minutes ago');
    expect(since(threeHoursAgo)).toEqual('3 hours ago');
    expect(since(twoDaysAgo)).toEqual('2 days ago');
    expect(since(aWeekAgo)).toEqual('7 days ago');
    expect(since(fourMonthsAgo)).toEqual('4 months ago');
    expect(since(fiveYearsAgo)).toEqual('5 years ago');
  });
});
