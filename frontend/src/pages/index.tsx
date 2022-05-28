import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css"

export function Index() {
    const navigate = useNavigate()

    const [count, setCount] = useState(0)
    const [result, setResult] = useState(false) as [string | false, React.Dispatch<React.SetStateAction<string | false>>]

    useEffect(() => {
        // eslint-disable-next-line no-restricted-globals
        fetch(`${location.origin}/count`, { method: "GET" })
            .then(res => res.json())
            .then(res => setCount(res?.count))
    })

    const Form = () => {
        return (
            <form action="none">
                <input type="text" name="url" placeholder="Cole seu link aqui..." /> <br />
                <button type="button" onClick={onSubmit}>Encurtar</button>
            </form>
        )
    }

    const Result = () => {
        // eslint-disable-next-line no-restricted-globals
        const url = `${location.origin}/${result}`
        return (
            <div>
                <input type="text" value={url}  disabled/> <br />
                <button type="button" onClick={() => navigator.clipboard.writeText(url)}>Copiar</button>
            </div>
        )
    }

    function onSubmit() {
        const input = document.querySelector('input') as HTMLInputElement

        const body = {
            url: input.value
        }

        fetch("/create", {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.count) {
                    setCount(data.count)
                    setResult(data.id)
                }
            })
    }

    return (
        <>
            <header>
                <div>
                    &lt;/&gt; Encurtador de Links
                </div>
                <div>
                    <span onClick={() => navigate("/list")}>Links encurtados: </span><span id="count">{count}</span>
                </div>
            </header>
            <main>

                {result ? <Result /> : <Form />}

            </main>
            <footer>
                &copy;Arthur Lobo
            </footer>
        </>
    );
}