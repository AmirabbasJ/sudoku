type Setter<T> = (value: T | ((x: T) => T)) => void;
