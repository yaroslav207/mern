import React from 'react'

export const LinkList = ({links}) => {
    if (links.length === 0) {
        return <h2 className="center">Ссылок пока нет</h2>
    }
    return (
        <div>
            <h2 className="center">Ваши ссылки</h2>
            <table>
                <thead>
                <tr>
                    <th>№</th>
                    <th>Сокращенная</th>
                    <th>Оригинальная</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {links.map((link, index) => {
                    return (
                        <tr>
                            <td>{++index}</td>
                            <td>{link.to}</td>
                            <td>{link.from}</td>
                            <td><a href={`/details/${link._id}`}>Открыть</a></td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
        </div>
    )
}