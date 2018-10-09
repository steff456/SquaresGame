//no se deberían dejar TODOS en la entrega final, porque dice lo que no se terminó
//use strict

import React from 'react';
import GameLoad from '../../containers/GameLoad/index';

//TODO Si el usuario no está registrado NO cargar GameLoad CHECK IF Meteor.userId=Null
function Home() {  
  return (
    <div>
      <GameLoad />
    </div>
  );
}

export default Home;
