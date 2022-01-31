const { hasOwnProperty } = Object.prototype;

/**
 * Safe wrapper for `object.hasOwnProperty()`
 *
 * @param {object} object
 * @param {string} key
 *
 * @returns {boolean}
 */
const has = ( object, key ) =>
{
	return hasOwnProperty.call (object, key);
};

/**
 * Clamps number to range [min, max].
 *
 * @param {number} number
 * @param {number} min
 * @param {number} max
 *
 * @returns {number} `number` clamped to range [min, max]
 */
const clamp = ( number, min, max ) =>
{
	return Math.min (Math.max (number, min), max);
};


export { has, clamp };
