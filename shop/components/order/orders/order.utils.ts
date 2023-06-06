import { Orders } from '../../../type.store';

export const getOrderStatus = (status: string) => {
    switch (status) {
        case 'awaiting_payment':
            return 'Ожидает оплаты';
        case 'forming':
            return 'Формируется';
        case 'in_delivery':
            return 'Доставка';
        case 'finished':
            return 'Завершён';
        case 'canceled_by_system':
            return 'Отменен системой';
        case 'canceled_by_user':
            return 'Отменен';
        default:
            return 'Неизвестный статус';
    }
};

export const getOrderStatusType = (status: string) => {
    switch (status) {
        case 'awaiting_payment':
        case 'forming':
        case 'in_delivery':
            return 'progress';
        case 'finished':
            return 'sucess';
        default:
            return 'error';
    }
};

export const getAvalibleCancel = (s: string) =>
    getOrderStatusType(s) === 'progress';

export const getOrderDeliveryType = (delivery: string) => {
    switch (delivery) {
        case 'pickup':
            return 'Самовывоз';
        case 'delivery':
            return 'Доставка';
        default:
            return 'Ошибка чтения';
    }
};

export const getAdress = ({ shop }: Pick<Orders, 'shop'>) => {
    const address = shop.city + ' ' + shop.street + ' ' + shop.building;
    return address.replaceAll('null', ' ').trim().length > 0 ? address : '-X-';
};
