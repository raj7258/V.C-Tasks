import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    width: 164,
    height: 250,
    margin: "10px 3px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "35px 0",
  },
  cardDiv: {
    display: "flex",
    flexWrap: "wrap",
  },
  heading: {
    margin: 20,
    color: "#3a5d9f",
  },
  pokemon: {
    height: 100,
    width: 100,
    borderRadius: 100,
    backgroundColor: "white",
    padding: 10,
  },
  name: {
    margin: 10,
    textTransform: "capitalize",
  },
  move: {
    backgroundColor: "grey",
    color: "white",
    borderRadius: "10px",
    padding: "4px 8px",
    textTransform: "capitalize",
  },
});

let backColor = [
  "#6f35fc",
  "rgba(242, 48, 48, 1)",
  "rgba(255, 76, 35, 1)",
  "#b6a136",
  "rgba(61, 153, 245, 1)",
  "rgba(121, 97, 242, 1)",
];

export default function SavedPokemon(props) {
  const classes = useStyles();
  let cards = props.pokemons.map((pokemon, index) => {
    return (
      <div key={index}>
        <Card
          className={classes.root}
          style={{ backgroundColor: backColor[index] }}
        >
          <CardContent>
            <img
              src={pokemon.sprites.front_default}
              alt="Pokemon"
              className={classes.pokemon}
            />
            <Typography className={classes.name}>{pokemon.name}</Typography>
            <Typography className={classes.move}>
              {pokemon.moves[0].move.name}
            </Typography>
          </CardContent>
        </Card>
      </div>
    );
  });
  return (
    <>
      <Typography variant="h6" className={classes.heading}>
        Selected Squad
      </Typography>

      <div className={classes.cardDiv}>{cards}</div>
    </>
  );
}
