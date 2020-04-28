import React, { useState } from "react";
import ReactDOM from "react-dom";

const MostVoted = (props) => {
  if (props.votes[props.mostVoted] === 0) {
    return <div>No votes registered</div>;
  } else {
    return (
      <div>
        <p>{props.anecdotes[props.mostVoted]}</p>
        <p>has {props.votes[props.mostVoted]} votes</p>
      </div>
    );
  }
};

const Button = (props) => {
  return <button onClick={props.handleClick}>{props.text}</button>;
};

const App = (props) => {
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(
    Array.apply(null, new Array(props.anecdotes.length)).map(
      Number.prototype.valueOf,
      0
    )
  );
  const [mostVoted, setMostVoted] = useState(0);

  const showAnecdote = () => {
    let random = Math.floor((Math.random() * props.anecdotes.length-1) + 1);
    setSelected(random);
  };

  const addVote = () => {
    let newVotes = [...votes];
    newVotes[selected] += 1;
    setVotes(newVotes);

    if (newVotes[selected] > newVotes[mostVoted]) {
      setMostVoted(selected);
    }
  };

  return (
    <div>
      <h2>Anecdote of the day</h2>
      <p>{props.anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <Button handleClick={addVote} text="vote" />
      <Button handleClick={showAnecdote} text="next anecdote" />
      <h2>Anecdote with most votes</h2>
      <MostVoted
        anecdotes={props.anecdotes}
        mostVoted={mostVoted}
        votes={votes}
      />
    </div>
  );
};

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"));
