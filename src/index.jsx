import React from "react";
import ReactDOM from "react-dom";
import imgIco from "./content/icoNLGD.jpg";

const img = document.createElement('img');
img.src = imgIco;

ReactDOM.render(
    <div>
        <h2>Texto desde ReactDom</h2>
    </div>,
    document.getElementById("root")
);

document.getElementById("icoContainer").appendChild(img);