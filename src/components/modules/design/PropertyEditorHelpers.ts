import Property from '../../../classes/Property';

/**
 * Helper functions used across property editors.
 *
 * @export
 * @class PropertyEditorHelpers
 */
export default class PropertyEditorHelpers {
  /**
   * Gets set or, when unavailable, calculated display name for the property.
   *
   * @static
   * @param {Property} p
   * @returns {string}
   */
  public static getDisplayName(p: Property): string {
    // add order no to display name so it's easy to see elements that need to be tagged
    // @todo remove after testing
    // eslint-disable-next-line prefer-const
    let suffix = '';
    // if (window.location.hostname === 'localhost') {
    //   suffix = ` (${p.orderNo})`;
    // }

    if (p.name === 'SpriteState') {
      // special case for states
      if (p.properties) {
        const stateNameProp = p.properties.find(prop => prop.name === 'name');
        if (stateNameProp) {
          return stateNameProp.value + suffix;
        }
      }
    }
    if (p.displayName !== undefined && p.displayName !== p.name) {
      return p.displayName + suffix;
    } else {
      const sentenceName = p.name.replace(/([a-z])([A-Z])/g, '$1 $2');
      return (
        sentenceName.charAt(0).toUpperCase() +
        sentenceName.slice(1).toLowerCase() +
        suffix
      );
    }
  }

  /**
   * Gets string representation for the property based on toStringProperty (if set) or display name otherwise.
   *
   * @static
   * @param {Property} p
   * @returns {string}
   */
  public static getDisplayString(p: Property): string {
    if (p.toStringProperty && p.properties) {
      const tSP = p.properties.find(sp => sp.name === p.toStringProperty);
      if (tSP && tSP.value) {
        return tSP.value.toString();
      }
    }
    return PropertyEditorHelpers.getDisplayName(p);
  }
}
