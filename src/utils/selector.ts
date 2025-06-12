
/**
 * Manages a group of `Selector` instances, ensuring that only one selector is active (selected) at a time.
 *
 * The `SelectorGroup` class allows you to add or remove selectors, and provides a method to set a specific selector as selected.
 * When a selector is set as selected, all other selectors in the group are automatically unselected.
 *
 * @example
 * const group = new SelectorGroup();
 * group.add_selector(selector1);
 * group.add_selector(selector2);
 * group.set_selected(selector1); // selector1 is selected, selector2 is unselected
 */
export class SelectorGroup {

  private selectors = new Set<Selector>();

  constructor() { }

  /**
   * Sets the given selector as the selected one, unselecting all other selectors.
   *
   * Iterates through all selectors managed by this instance. For each selector that is not the one provided,
   * it calls `unselect()`. Finally, it calls `select()` on the provided selector to mark it as selected.
   *
   * @param s - The {@link Selector} instance to be set as selected.
   */
  set_selected(s: Selector) {
    for (const c_s of this.selectors)
      if (c_s != s)
        c_s.unselect();
    s.select();
  }

  /**
   * Adds a selector to the current set of selectors.
   *
   * @param s - The selector to add.
   */
  add_selector(s: Selector) { this.selectors.add(s); }
  /**
   * Removes the specified selector from the collection of selectors.
   *
   * @param s - The selector to be removed.
   */
  remove_selector(s: Selector) { this.selectors.delete(s); }
}

/**
 * Represents an interface for selectable objects.
 * 
 * Implementing classes should provide logic for selecting and unselecting themselves.
 *
 * @remarks
 * This interface can be used to standardize selection behavior across different components or entities.
 *
 * @interface Selector
 */
export interface Selector {

  /**
   * Selects the object, marking it as active or highlighted.
   * Implementing classes should define what "selecting" means for them.
   */
  select(): void;
  /**
   * Unselects the object, marking it as inactive or unhighlighted.
   * Implementing classes should define what "unselecting" means for them.
   */
  unselect(): void;
}