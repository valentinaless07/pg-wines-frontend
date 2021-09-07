const initialState = {
    cartState: [{
        "id": 3,
        "name": "Monster Energy Ultra Sunrise 473 ml",
        "cost": 185,
        "discount": 0,
        "image": "https://digitalyactual.com/delsur/01_1618943034.jpg",
        "category": "Sin Alcohol"
      },
      {
        "id": 4,
        "name": "Pulpo Blanco Tonica 350 ml",
        "cost": 110,
        "discount": 0,
        "image": "https://digitalyactual.com/delsur/01_1617998252.jpg",
        "category": "Sin Alcohol"
      },
      {
        "id": 5,
        "name": "Santa Quina Pomelo Rosado 200 ml",
        "cost": 150,
        "discount": 0,
        "image": "https://digitalyactual.com/delsur/01_1630090203.jpg",
        "category": "Sin Alcohol"
      }]
}

export default function cartReducer (state = initialState, action) {

    switch(action.type){
        
        
        default: return state
    }

}