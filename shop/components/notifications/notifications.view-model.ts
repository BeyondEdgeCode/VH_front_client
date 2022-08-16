import { BehaviorSubject } from "rxjs";
import { createSetterStore } from "../../utilsFunctions/utils";

const notificationsStore$ = new BehaviorSubject<Array<string>>([]);

export const setNotifications = createSetterStore(notificationsStore$);

export const notifications$ = notificationsStore$.asObservable();
