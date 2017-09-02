var { graphql, buildSchema } = require('graphql');
var { _ } = require('lodash');
var dataBase ={
  droids: [
    {
      id: 1,
      name: "DROID 1"
    },
    {
      id: 2,
      name: "DROID 2"
    },
    {
      id: 3,
      name: "DROID 3"
    }
  ],
  weaponList: [
    {
      name: "weapon1",
      price: 3000
    },
    {
      name: "weapon2",
      price: 2000
    },
    {
      name: "weapon3",
      price: 4000
    },
    {
      name: "weapon4",
      price: 500
    }
  ]
}

var schema = buildSchema(`
  type Query {
    droid(id: ID!): Droid
    weaponList: [Weapon]
  }

  type Droid {
    id: ID,
    name: String
  }

  type Weapon {
    name: String,
    price: Int
  }

`);

var root = {
    droid: (props) => {
      var droid = _.find(dataBase.droids, x => x.id == props.id);
      return { id: droid.id, name: droid.name}; 
    },
    weaponList: () => { return dataBase.weaponList }
};



var query =  '{ droid(id: 3) { name }, weaponList { name, price } } '
graphql(schema, query, root).then((response) => {
  console.log(response.data);
});