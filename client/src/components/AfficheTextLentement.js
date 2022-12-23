import React from "react";

const AfficheTextLentement = ({
  // vitesse par default si aucun vitesse n'est definie
  vitesse = 200,
  // text par default si aucun text n'est definie
  text = "",
  // fonction par default si aucun fonction n'est definie
  estTerminer = () => ({}),
}) => {
  const [textAfficher, miseAjourText] = React.useState("");

  // position du premier character du text on l'initialise en negatif
  const position = React.useRef(-1);

  // Cycle de vie une fois la page charger le contenue de cette function est executer en premier
  React.useEffect(() => {
    // function pour afficher lettre par lettre
    const afficheLettreParLettre = () => {
      // la position courant est augmenter de 1 a chaque lettre du text
      position.current++;
      // on mais a jour le text a afficher
      miseAjourText(textAfficher + text[position.current]);
    };
    // tant que la possition courrant est inferieur au nombre de lettre du text
    if (position.current < text.length - 1) {
      // on continue a afficher lettre par lettre avec interval regulier qui est definie par la vitesse
      let nouvelleLettre = setInterval(afficheLettreParLettre, vitesse);
      return () => clearInterval(nouvelleLettre);
    }
    // si la positon courant est egal au nombre de lettre du text
    if (position.current === text.length - 1) {
      // on l'aisse coullée 800 millisecon and de terminer le programe
      setTimeout(() => estTerminer(), 800);
    }
    // on ecoute les changement de l'etat
  }, [textAfficher, vitesse, text, estTerminer]);

  return (
    <div className="AfficheTextLentement-div">
      <span>{textAfficher}</span>
    </div>
  );
};

export default AfficheTextLentement;
