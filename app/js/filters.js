/**
 * Converts any value into checked / unchecked UTF character
 * 
 * @param {mixed} value
 */
angular.filter('checked', function(value) {
  return value ? "\u2714" : "\u2716";
});