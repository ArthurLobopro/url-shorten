import { useState } from "react"
import "./index.css"

export function List() {
    const [content, setContent] = useState([] as { id: string, url: string }[])

    fetch("/list", { method: "POST"}).then(res => res.json()).then(res => setContent(res))

    return (
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>URL</th>
                </tr>
            </thead>
            <tbody>
                {
                    content.map(item => {
                        return (
                            <>
                                <tr>
                                    <td>{item.id}</td>
                                    <td><a href={item.url} target="_blank" rel="noreferrer">{item.url}</a></td>
                                </tr>
                            </>
                        )
                    })
                }
            </tbody>
        </table>
    )
}