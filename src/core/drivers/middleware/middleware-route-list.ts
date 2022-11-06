/**
 * Middleware route list is a doubly linked list that contains all the middleware routes defined in its store. This list is used to chain the sequence that the middleware routes need to run.
 * @author Davood Najafi <davood@najafi.cc> 
 */

import { MiddlewareRouteHandle } from "../../type-def/abstract";
import { MiddlewareRouteListNode } from "./middleware-route-list-node";

export class MiddlewareRouteList {
  private _head: MiddlewareRouteListNode;
  private _tail: MiddlewareRouteListNode;
  private _size: number;

  constructor() {
    this._head = null;
    this._tail = null;
    this._size = 0;
  }

  /**
   * Adds a new node to the list.
   * @param {MiddlewareRouteHandle} route The route to add to the list.
   * @returns {MiddlewareRouteListNode} The node that was added to the list.
   * @memberof MiddlewareRouteList
   * @throws {Error} If the route is not a MiddlewareRouteHandle.
   * @throws {Error} If the route is already in the list.
   */
  public add(route: MiddlewareRouteHandle): MiddlewareRouteListNode {

    if (!(route instanceof MiddlewareRouteHandle)) {
      throw new Error('Route must be an instance of MiddlewareRouteHandle');
    }

    if (this.contains(route)) {
      throw new Error('Route already in list');
    }

    let node = new MiddlewareRouteListNode(route);

    if (this._head == null) {
      this._head = node;
      this._tail = node;
    } else {
      this._tail.next = node;
      node.prev = this._tail;
      this._tail = node;
    }

    this._size++;
    return node;
  }

  /**
   * Removes a node from the list.
   * @param {MiddlewareRouteHandle} route The route to remove from the list.
   * @returns {MiddlewareRouteListNode} The node that was removed from the list.
   * @memberof MiddlewareRouteList
   * @throws {Error} If the route is not a MiddlewareRouteHandle.
   * @throws {Error} If the route is not in the list.
   */
  public remove(route: MiddlewareRouteHandle): MiddlewareRouteListNode {
    if (!(route instanceof MiddlewareRouteHandle)) {
      throw new Error('Route must be an instance of MiddlewareRouteHandle');
    }

    if (!this.contains(route)) {
      throw new Error('Route not in list');
    }

    let node = this.findNode(route);

    if (node.prev != null) {
      node.prev.next = node.next;
    } else {
      this._head = node.next;
    }

    if (node.next != null) {
      node.next.prev = node.prev;
    } else {
      this._tail = node.prev;
    }

    this._size--;
    return node;
  }

  /**
   * Finds a node in the list.
   * @param {MiddlewareRouteHandle} route The route to find in the list.
   * @returns {MiddlewareRouteListNode} The node that was found in the list.
   * @memberof MiddlewareRouteList
   * @throws {Error} If the route is not a MiddlewareRouteHandle.
   * @throws {Error} If the route is not in the list.
   */
  public findNode(route: MiddlewareRouteHandle): MiddlewareRouteListNode {
    if (!(route instanceof MiddlewareRouteHandle)) {
      throw new Error('Route must be an instance of MiddlewareRouteHandle');
    }

    if (!this.contains(route)) {
      throw new Error('Route not in list');
    }

    let node = this._head;
    while (node != null) {
      if (node.route == route) {
        return node;
      }
      node = node.next;
    }

    return null;
  }

  /**
   * Finds a route in the list.
   * @param {MiddlewareRouteHandle} route The route to find in the list.
   * @returns {MiddlewareRouteHandle} The route that was found in the list.
   * @memberof MiddlewareRouteList
   * @throws {Error} If the route is not a MiddlewareRouteHandle.
   * @throws {Error} If the route is not in the list.
   */
  public find(route: MiddlewareRouteHandle): MiddlewareRouteHandle {
    if (!(route instanceof MiddlewareRouteHandle)) {
      throw new Error('Route must be an instance of MiddlewareRouteHandle');
    }

    if (!this.contains(route)) {
      throw new Error('Route not in list');
    }

    return this.findNode(route).route;
  }

  /**
   * Checks if a route is in the list.
   * @param {MiddlewareRouteHandle} route The route to check if it is in the list.
   * @returns {boolean} True if the route is in the list, false otherwise.
   * @memberof MiddlewareRouteList
   * @throws {Error} If the route is not a MiddlewareRouteHandle.
   */
  public contains(route: MiddlewareRouteHandle): boolean {
    if (!(route instanceof MiddlewareRouteHandle)) {
      throw new Error('Route must be an instance of MiddlewareRouteHandle');
    }

    let node = this._head;
    while (node != null) {
      if (node.route == route) {
        return true;
      }
      node = node.next;
    }

    return false;
  }

  public get head(): MiddlewareRouteListNode {
    return this._head;
  }

  public get tail(): MiddlewareRouteListNode {
    return this._tail;
  }

  public get size(): number {
    return this._size;
  }
}

