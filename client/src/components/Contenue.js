import React from "react";

import AfficheTextLentement from "./AfficheTextLentement";

const Contenue = ({ children, ...resteDesPropriete }) => {
  return (
    <div className="content">
      <AfficheTextLentement {...resteDesPropriete} />
      {children}
    </div>
  );
};

export default Contenue;
