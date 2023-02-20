import css from './notifications.module.css'
import cn from 'classnames'
import { useObservable } from '../../utilsFunctions/useHook'
import { notifications$, setNotifications } from './notifications.view-model'
import { useEffect } from 'react'

type NotificateProp = {
    text: string
}
const Notificate = ({ text }: NotificateProp) => {
    return (
        <div className={css.notifications}>
            <span>{text}</span>
        </div>
    )
}

export const Notifications = () => {
    const notifications = useObservable<Array<string>>(notifications$) ?? []

    useEffect(() => {
        const clearF = setInterval(() => {
            setNotifications(notifications.splice(1))
        }, 3000)
        return () => {
            clearInterval(clearF)
        }
    }, [notifications])

    return (
        // <div className={css.wrap}>
        //     {notifications.reverse().map(el => (<Notificate text={el}/>))}
        // </div>
        <>
            {/* {notifications.reverse().map(el => (<Notificate text={el}/>))} */}
            <div className={css.wrap2}>
                {notifications.reverse().map((el) => (
                    <Notificate text={el} key={el} />
                ))}
                {/* <Notificate text={'qweqweqweqweqweqweqweqweqweqweqweqweqweqweqwe'}/> */}
                {/* <Notificate text={'qweqweqweqweqwe'}/> */}
                {/* <Notificate text={'qweqweqweqweqwe'}/> */}
            </div>
        </>
    )
}
