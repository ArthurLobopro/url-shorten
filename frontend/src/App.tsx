import { useEffect, useState } from "react";

function App() {
  const [state, setState] = useState([])

  useEffect(() => {
    fetch("https://api.github.com/users/arthurlobopro")
    .then( res => res.json())
    .then( res => setState(res))
  })

  return (
    <div>{JSON.stringify(state)}</div>
  );
}

export default App;
