/**
 * Namespace declaration if needed.
 * @namespace
 */
var pulse = pulse || {};

/**
 * Sprites are the basic object for moving, animated graphics on
 * the screen. They have an image, the sprite sheet, which is a
 * collection of "frames" that can be played in succession to
 * produce an animation.
 * @param {object} params parameters that can be set as initialized options
 * on the node
 * @config {string|pulse.Texture} src the texture filename to use or a
 * pulse.Texture to use
 * @config {string} [name] name of the node
 * @config {size} [size] initial size width and height to use for the sprite
 * @author PFP
 * @class The sprite object.
 * @augments pulse.Sprite
 * @copyright 2013 VGMoose
 */
pulse.Sprite = pulse.Visual.extend(