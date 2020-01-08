import observer from "node-observer";


export class Utils {

}
export class Registry {
  static _objects = {};

  static register(key, object) {
    Registry._objects[key] = object;
    observer.send(this, "registered", {
      key: key,
      data: object
    });
  }

  static registered(key) {
    if (Registry._objects.hasOwnProperty(key))
      return Registry._objects[key];
    return null;
  }

  static observe(cls, key, callback = function (data) { }) {
    observer.subscribe(cls, "registered", (cls, data) => {
      if (data.key === key)
        callback(data.data);
    });

    return Registry.registered(key);
  }

  static remove(key) {
    Registry.register(key, null);
  }
}

export default Utils;