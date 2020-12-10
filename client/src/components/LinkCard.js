import React from 'react'

export const LinkCard = ({link}) => {
    return(
        <div>
        <h2>Информация о ссылке</h2>
        <ul>
            <li>Ваша ссылка: <a>{link.to}</a></li>
            <li>Откуда: <a>{link.from}</a></li>
            <li>Количество кликов по ссылке: <strong>{link.clicks}</strong></li>
            <li>Дата создания: <strong>{new Date(link.date).toLocaleDateString()}</strong></li>
        </ul>
        </div>
    )
}