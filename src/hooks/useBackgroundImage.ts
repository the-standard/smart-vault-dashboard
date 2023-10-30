import { useEffect } from "react";
import { useVaultIdStore } from "../store/Store";
import { useLocation } from "react-router-dom";

const bgImages = [
  "/backgrounds/abstract1.png",
  "/backgrounds/abstract2.png",
  "/backgrounds/abstract3.png",
  "/backgrounds/abstract4.png",
  "/backgrounds/abstract5.png",
  "/backgrounds/abstract6.png",
  "/backgrounds/abstract7.png",
  "/backgrounds/abstract8.png",
  "/backgrounds/abstract9.png",
  "/backgrounds/abstract10.png",
  "/backgrounds/abstract11.png",
  "/backgrounds/abstract12.png",
  "/backgrounds/abstract13.png",
  "/backgrounds/abstract14.png",
  "/backgrounds/abstract15.png",
  "/backgrounds/abstract16.png",
  "/backgrounds/abstract17.png",
  "/backgrounds/abstract18.png",
  "/backgrounds/abstract19.png",
  "/backgrounds/abstract20.png",
  "/backgrounds/abstract21.png",
  "/backgrounds/abstract22.png",
  "/backgrounds/abstract23.png",
  "/backgrounds/abstract24.png",
  "/backgrounds/abstract25.png",
  "/backgrounds/abstract26.png",
  "/backgrounds/abstract27.png",
  "/backgrounds/abstract28.png",
  "/backgrounds/abstract29.png",
  "/backgrounds/abstract30.png",
  "/backgrounds/abstract31.png",
  "/backgrounds/abstract32.png",
  "/backgrounds/abstract33.png",
  "/backgrounds/abstract34.png",
  "/backgrounds/abstract35.png",
  "/backgrounds/abstract36.png",
  "/backgrounds/abstract37.png",
  "/backgrounds/abstract38.png",
  "/backgrounds/abstract39.png",
  "/backgrounds/abstract40.png",
  "/backgrounds/abstract41.png",
  "/backgrounds/abstract42.png",
  "/backgrounds/abstract43.png",
  "/backgrounds/abstract44.png",
  "/backgrounds/abstract45.png",
  "/backgrounds/abstract46.png",
  "/backgrounds/abstract47.png",
  "/backgrounds/abstract48.png",
];

// const homeBgImage = "/backgrounds/Home.png";
const homeBgImage = "/backgrounds/abstract1.png";

function getVaultBgImage(vaultId: number) {
  let index;
  if (vaultId <= 51) {
    index = vaultId - 1; // Since array index starts from 0
  } else {
    index = parseInt(vaultId.toString().slice(-1)) - 1;
  }
  return bgImages[index];
}

export function useBackgroundImage() {
  const vaultId = useVaultIdStore((state) => state.vaultID);
  const location = useLocation();

  useEffect(() => {
    let bgImage;
    if (location.pathname === "/" || location.pathname === "/history") {
      // if the current route is home
      bgImage = homeBgImage; // set the first image as the background
    } else {
      bgImage = getVaultBgImage(vaultId); // else, get the image based on the vaultId
    }

    const styleElement = document.createElement("style");
    styleElement.innerHTML = `
    html {
      background-image: url(${bgImage});
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center;
      background-attachment: fixed; 
      -webkit-transition: background 0.5s ease-in-out;
      -moz-transition: background 0.5s ease-in-out;
      -o-transition: background 0.5s ease-in-out;
      transition: background 0.5s ease-in-out;
    }
    body:before {
      content: "";
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;  
      backdrop-filter: brightness(0%);
      -webkit-backdrop-filter: brightness(0%);
      transition: all 0.5s ease-in-out;
    }
    body.loaded:before {
      backdrop-filter: brightness(100%);
      -webkit-backdrop-filter: brightness(100%);
    }
  `;

    document.head.appendChild(styleElement);

    const image = new Image();
    image.onload = () => {
      document.body.classList.add("loaded");
    };
    image.src = bgImage;
    return () => {
      document.head.removeChild(styleElement);
    };
  }, [vaultId, location]); // Add vaultId as a dependency of the useEffect hook
}
