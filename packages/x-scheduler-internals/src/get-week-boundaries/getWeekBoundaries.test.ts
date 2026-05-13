import { adapter } from 'test/utils/scheduler/adapters';
import { getStartOfWeek, getEndOfWeek } from './getWeekBoundaries';

const wednesday = adapter.date('2025-01-08T12:00:00.000Z', 'UTC');

describe('getStartOfWeek', () => {
  it('delegates to adapter.startOfWeek when weekStartsOn is undefined', () => {
    const result = getStartOfWeek(adapter, wednesday, undefined);
    expect(adapter.isSameDay(result, adapter.startOfWeek(wednesday))).to.equal(true);
  });

  it('returns Sunday (2025-01-05) when weekStartsOn is 0', () => {
    const result = getStartOfWeek(adapter, wednesday, 0);
    expect(adapter.isSameDay(result, adapter.date('2025-01-05T12:00:00.000Z', 'UTC'))).to.equal(
      true,
    );
  });

  it('returns Monday (2025-01-06) when weekStartsOn is 1', () => {
    const result = getStartOfWeek(adapter, wednesday, 1);
    expect(adapter.isSameDay(result, adapter.date('2025-01-06T12:00:00.000Z', 'UTC'))).to.equal(
      true,
    );
  });

  it('returns Saturday (2025-01-04) when weekStartsOn is 6', () => {
    const result = getStartOfWeek(adapter, wednesday, 6);
    expect(adapter.isSameDay(result, adapter.date('2025-01-04T12:00:00.000Z', 'UTC'))).to.equal(
      true,
    );
  });
});

describe('getEndOfWeek', () => {
  it('delegates to adapter.endOfWeek when weekStartsOn is undefined', () => {
    const result = getEndOfWeek(adapter, wednesday, undefined);
    expect(adapter.isSameDay(result, adapter.endOfWeek(wednesday))).to.equal(true);
  });

  it('returns Saturday (2025-01-11) when weekStartsOn is 0 (Sun–Sat week)', () => {
    const result = getEndOfWeek(adapter, wednesday, 0);
    expect(adapter.isSameDay(result, adapter.date('2025-01-11T12:00:00.000Z', 'UTC'))).to.equal(
      true,
    );
  });

  it('returns Sunday (2025-01-12) when weekStartsOn is 1 (Mon–Sun week)', () => {
    const result = getEndOfWeek(adapter, wednesday, 1);
    expect(adapter.isSameDay(result, adapter.date('2025-01-12T12:00:00.000Z', 'UTC'))).to.equal(
      true,
    );
  });

  it('returns Friday (2025-01-10) when weekStartsOn is 6 (Sat–Fri week)', () => {
    const result = getEndOfWeek(adapter, wednesday, 6);
    expect(adapter.isSameDay(result, adapter.date('2025-01-10T12:00:00.000Z', 'UTC'))).to.equal(
      true,
    );
  });

  it('end of week is always 6 days after start of week', () => {
    const start = getStartOfWeek(adapter, wednesday, 1);
    const end = getEndOfWeek(adapter, wednesday, 1);
    expect(adapter.isSameDay(adapter.addDays(start, 6), end)).to.equal(true);
  });
});
