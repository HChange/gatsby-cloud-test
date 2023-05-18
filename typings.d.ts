declare module '*.less';
declare module '*.css';
declare module '*.png';
declare module '*.gif';
type E<T, U> = T extends U ? never : T extends object ? { [K in keyof T]: E<T[K], null> } : T;

declare interface Window {
	ChatSDK:any
}
