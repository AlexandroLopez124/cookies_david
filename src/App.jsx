import "./App.css";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

const App = () => {
  const allCookies = Cookies.get() // Obtiene todas las cookies almacenadas en tu navegador
  const cookiesArray = Object.entries(allCookies);

  const [count, setCount] = useState(0); // Obtiene todas las cookies almacenadas en tu navegador
  const [token, setToken] = useState({ name: "", value: "" })

  // Esta función maneja la entrada del usuario - se ejecuta cuando el usuario escribe en las entradas
  const handleChange = (event) => {
    const { name, value } = event.target

    setToken((prevToken) => {
      return {
        ...prevToken,
        [name]: value,
      }
    })
  }

   // Esta función establece/guarda una cookie en el navegador
  const handleSubmit = () => {
    setCount((prevCount) => prevCount + 1); // Cambia el valor de la variable dependecy
    Cookies.set(token.name, token.value); // Establece/Guarda la cookie en el navegador
    // Borra los campos de entrada
    setToken((prevToken) => {
      return {
        ...prevToken,
        name: "",
        value: "",
      };
    });
  };

  // Esta función borra una cookie de donde está almacenada
  const handleDelete = (name) => {
    setCount((prevCount) => prevCount + 1); // Cambia el valor de la variable de dependencia
    Cookies.remove(name) // Deletes the cookie from the browser
  };

  // Un hook de react que ejecuta una función cuando se carga la página.
  // También vuelve a renderizar una página cuando cambia una variable en el array de dependencias
  useEffect(() => {}, [count]) // La matriz de dependencias

  return (
    <div className="main">
      <div className="title">
        <img src="/cookie.png" alt="cookies" />
        <span>Cookies</span>
      </div>
      <div className="content">
        <div className="cookies">
          <span>Your Cookies</span>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {cookiesArray.length > 0 &&
                cookiesArray.map((cookie, index) => (
                  <tr key={index}>
                    <td>{cookie[0]}</td>
                    <td>{cookie[1]}</td>
                    <td>
                      <button onClick={() => handleDelete(cookie[0])}>
                        <span>Delete</span>
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <div className="actions">
          <div>
            <span>Name:</span>
            <input
              name="name"
              value={token.name}
              onChange={handleChange}
              type="text"
              placeholder="Required.."
            />
          </div>
          <div>
            <span>Value:</span>
            <input
              name="value"
              value={token.value}
              onChange={handleChange}
              type="text"
              placeholder="Required.."
            />
          </div>
          <button disabled={!token.name || !token.value} onClick={handleSubmit}>
            <span>Submit</span>
          </button>
        </div>
      </div>
      <div className="footer">
        <a href="https://storyset.com/food">Food illustrations by Storyset</a>
      </div>
    </div>
  )
}

export default App;
