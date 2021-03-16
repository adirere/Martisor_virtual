import "./styles.css";
import { imagini } from "./imagini";
import { useState } from "react";

export default function App() {
  const [imagineAleasa, setImagineAleasa] = useState(undefined);
  const [textMartisor, setTextMartisor] = useState(undefined);
  const [email, setEmail] = useState("");
  const [ok, setOK] = useState(false);

  function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(String(email).toLowerCase())) {
      if (email.includes("@veolia.com")) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  return !ok ? (
    <>
      <div className="part">
        <h1 className="site-title">Martisor virtual</h1>
        <h2 className="ofera">Ofera un martisor virtual unei colege</h2>
        <h3 className="alege-imaginea">&#8595; alege imaginea </h3>
      </div>
      <div className="part">
        <div className="gallery">
          {imagini.map((imagine, index) => {
            return (
              <img
                src={imagine}
                alt="imagine floare"
                key={`imagine${index}`}
                className={`imagine-floare ${
                  imagineAleasa === index + 1 ? "imagine-aleasa" : ""
                }`}
                onClick={(e) => setImagineAleasa(index + 1)}
              />
            );
          })}
        </div>
        {imagineAleasa !== undefined ? (
          <>
            <h3>
              <span>👍</span> imagine aleasa
            </h3>
            <h3 className="alege-mesajul">&#8595; compune mesajul </h3>
          </>
        ) : null}
      </div>
      {imagineAleasa !== undefined ? (
        <div className="part">
          {textMartisor !== undefined &&
          textMartisor !== "" &&
          textMartisor.length >= 50 ? (
            <h3>
              <span>👍</span> mesaj compus
            </h3>
          ) : (
            <h3>
              mesajul mai trebuie sa contina cel putin{" "}
              <span className="caractere">{`${
                50 - (textMartisor ? textMartisor.length : 0)
              }`}</span>{" "}
              de caractere.
            </h3>
          )}
          <textarea
            className="text-martisor"
            spellcheck="false"
            name="text-martisor"
            onChange={(e) => setTextMartisor(e.target.value)}
          />
          {textMartisor !== undefined &&
          textMartisor !== "" &&
          textMartisor.length >= 50 ? (
            <h3 className="alege-destinatarul">
              &#8595; introdu emailul destinatarului si transmite martisorul{" "}
            </h3>
          ) : null}
        </div>
      ) : null}
      {imagineAleasa !== undefined &&
      textMartisor !== undefined &&
      textMartisor !== "" &&
      textMartisor.length >= 50 ? (
        <div className="part">
          <div className="destinatar">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setOK(true);
              }}
            >
              <h3 className="catre">Catre</h3>
              <input
                className="alege-destinatar"
                type="email"
                pattern=".+@veolia.com"
                onChange={(e) => setEmail(e.target.value)}
                required
              ></input>
              <button type="submit" className="transmitere">
                &#8594; TRANSMITE <span>🛩️</span>
              </button>
            </form>
            {email !== "" && !validateEmail(email) ? (
              <h3>emailul este invalid</h3>
            ) : email === "" ? null : (
              <h3>
                <span>👍</span> email valid
              </h3>
            )}
          </div>
        </div>
      ) : null}
    </>
  ) : (
    <>
      <div className="part">
        <h1 className="site-title">Martisorul a fost transmis!</h1>
        <h2 className="ofera">Doresti sa mai oferi un martisor virtual?</h2>
        <button
          className="transmitere"
          onClick={(e) => {
            setOK(false);
            setImagineAleasa(undefined);
            setTextMartisor(undefined);
            setEmail("");
          }}
        >
          &#8594; TRANSMITE ALT MARTISOR <span>🛩️</span>
        </button>
      </div>
    </>
  );
}
