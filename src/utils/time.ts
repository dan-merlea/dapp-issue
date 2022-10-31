const MINUTE_IN_SECONDS = 60
const HOUR_IN_SECONDS = 3600
const DAY_IN_SECONDS = 86400
const MONTH_IN_SECONDS = 2629800

/**
 * Format number of seconds into year, month, day, hour, minute, seconds
 *
 * @param seconds
 */
export const getTimePeriods = (seconds: number) => {
  let delta = Math.abs(seconds)
  const timeLeft = {
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  }

  if (delta >= MONTH_IN_SECONDS) {
    timeLeft.months = Math.floor(delta / MONTH_IN_SECONDS)
    delta -= timeLeft.months * MONTH_IN_SECONDS
  }

  if (delta >= DAY_IN_SECONDS) {
    timeLeft.days = Math.floor(delta / DAY_IN_SECONDS)
    delta -= timeLeft.days * DAY_IN_SECONDS
  }

  if (delta >= HOUR_IN_SECONDS) {
    timeLeft.hours = Math.floor(delta / HOUR_IN_SECONDS)
    delta -= timeLeft.hours * HOUR_IN_SECONDS
  }

  if (delta >= MINUTE_IN_SECONDS) {
    timeLeft.minutes = Math.floor(delta / MINUTE_IN_SECONDS)
    delta -= timeLeft.minutes * MINUTE_IN_SECONDS
  }

  timeLeft.seconds = Math.round(delta)

  return timeLeft
}

const timeLeftToShortString = (seconds: number) => {
	const periods = getTimePeriods(seconds)

	if (periods.months > 0) {
		return `${periods.months}M ${periods.days}D`
	}
	if (periods.days > 0) {
		return `${periods.days}D ${periods.hours}H`
	}
	if (periods.hours > 0) {
		return `${periods.hours}H ${periods.minutes}m`
	}
	if (periods.minutes > 0) {
		return `${periods.minutes}m ${periods.seconds}s`
	}
	return `${periods.seconds}s`
}

export default timeLeftToShortString