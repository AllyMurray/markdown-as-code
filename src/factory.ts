type FactoryMap<T extends string> = {
  [key in T]: (...args: any[]) => any;
};

export type MapKeys<T extends FactoryMap<string>> = keyof T;

type MapReturnType<
  T extends FactoryMap<string>,
  K extends MapKeys<T>,
> = ReturnType<T[K]>;

export type MapClass<
  T extends FactoryMap<string>,
  K extends MapKeys<T>,
> = MapReturnType<T, K>;

export function createFactory<T extends FactoryMap<string>>(map: T) {
  return function factory<K extends MapKeys<T>>(type: K) {
    return map[type]() as MapClass<T, K>;
  };
}
