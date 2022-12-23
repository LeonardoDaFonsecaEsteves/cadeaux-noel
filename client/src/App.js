import React from "react";
import LecteurVideo from "./components/LecteurVideo";
import Contenue from "./components/Contenue";
import CONSTANTS from "./constants";
import logo_rejouer from "./assets/replay-icon.png";

const mobileOuOrdinateur = !!navigator.maxTouchPoints ? "mobile" : "ordinateur";
const portraitOuPaysage = !navigator.maxTouchPoints
  ? "bureau"
  : !window.screen.orientation.angle
  ? "portrait"
  : "paysage";

const etatInitial = {
  infoTextAfficher: {
    terminer: false,
    text: CONSTANTS.text_debut,
  },
  peripherique: mobileOuOrdinateur,
  orientation: portraitOuPaysage,
};

const App = () => {
  const [etat, changerEtat] = React.useState(etatInitial);
  // extrait des valeurs de l'etat pour une lecture plus simple
  const { peripherique, orientation, infoTextAfficher } = etat;
  const { terminer, text } = infoTextAfficher;

  // function appeller pour recharger la page
  const rechargerApplication = () => window.location.reload();

  // function qui est apelle une fois le contenue terminer
  const estTerminer = ({ nouveauText, nouveauEtatTerminer }) => {
    changerEtat({
      ...etat,
      infoTextAfficher: {
        text: nouveauText,
        terminer: nouveauEtatTerminer,
      },
    });
  };

  // function qui renvoi une image a afficher
  const retourneTelephoneImage = () => {
    return (
      <img
        onClick={() => rechargerApplication()}
        width="160px"
        height="160px"
        alt="image_rejouer"
        src={logo_rejouer}
      />
    );
  };

  // Cycle de vie une fois la page charger le contenue de cette function est executer en premier
  React.useEffect(() => {
    // function pour detecter le type de peripherique utiliser
    const detectTypeDePeripherique = () => {
      changerEtat({
        ...etat,
        peripherique: mobileOuOrdinateur,
        orientation: portraitOuPaysage,
      });
      if (peripherique === "mobile" && portraitOuPaysage === "paysage") {
        rechargerApplication();
      }
    };
    // on ecoute les changement de dimension de l'ecran pour determiner le type de periopherique utilisé
    window.addEventListener("resize", detectTypeDePeripherique);
    // on ecoute diferrente valeur pour determiner si l'application doit ce re rendre
  }, [etat, peripherique, changerEtat]);

  // si le peripherique utilisé est un mobile et que celui ci est en mode portait on affiche ce contenue
  if (peripherique === "mobile" && orientation === "portrait") {
    return (
      <div className="rotate">
        <Contenue vitesse={50} text={CONSTANTS.text_retourne_telephone} />
      </div>
    );
  }
  // si l'etat de terminer est stirctement egal a faux on afficher ce contenue
  if (terminer === false) {
    return (
      <Contenue
        vitesse={200}
        text={text}
        estTerminer={() =>
          estTerminer({
            nouveauText: CONSTANTS.text_fin,
            nouveauEtatTerminer: true,
          })
        }
      >
        {text === CONSTANTS.text_fin && retourneTelephoneImage()}
      </Contenue>
    );
  }
  // si aucun des conditions précedents n'est remplie on affiche le lecteur video
  return (
    <div className="content">
      <LecteurVideo
        estTerminer={() =>
          estTerminer({
            nouveauText: CONSTANTS.text_fin,
            nouveauEtatTerminer: false,
          })
        }
      />
    </div>
  );
};

export default App;
