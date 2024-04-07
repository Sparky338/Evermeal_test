// for each obj in events array at indicies, check for highest value for the given key,
// store index of the highest value in variable, return events[stored value]

const max_by_key = (events, name) => {
  let highestIndex = 0;
  let highestVal = 0;

  for (let i = 0; i < events.length; i++) {
    let event = events[i];

    // check event[name], if value is higher than highestVal, update highestVal and index
    // if ()
    if (event[name] > highestVal) {
      highestVal = event[name];
      highestIndex = i;
    }
  }
  return events[highestIndex];
};

const max_by_keys = (events, nameArr) => {
  let highestIndex = 0;
  let highestVal = 0;
  let name = nameArr[0];
  let tie = false;

  let tieArr = [];
  let nameArr2 = [];
  let tieTrack = new Set();

  for (let i = 0; i < events.length; i++) {
    let event = events[i];

    // check event[name], if value is higher than highestVal, update highestVal and index

    if (event[name] > highestVal) {
      highestVal = event[name];
      highestIndex = i;
      if (tie) {
        // reset tie, tieArr, and tietrack to starting values if there was a previous tie
        tie = false;
        tieArr = [];
        tieTrack = new Set();
      }
    } else if (event[name] === highestVal) {
      tie = true;
      if (!tieTrack.has(highestIndex)) tieArr.push(events[highestIndex]); // if this is the first time the highest index has been tied, add it to the tie array
      tieArr.push(event);
      tieTrack.add(highestIndex).add(i); // add the tieing indicies, Set will ignore duplicates, add method is chainable https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/add
    }
  }

  if (tie) {
    nameArr2 = nameArr.toSpliced(0, 1);
    return max_by_keys(tieArr, nameArr2);
  }

  return events[highestIndex];
};

events = [
  {
    alice: 2,
    bob: 100,
  },
  {
    alice: 2,
    bob: 200,
  },
  {
    alice: 1,
    bob: 300,
  },
  {
    alice: 3,
    bob: 300,
  },
];

nameArr = ["alice", "bob"];

//   console.log(max_by_key(events, "bob"))
//   console.log(max_by_key(events, "alice"))

// if key doesn't exist, assume 0

console.log(max_by_keys(events, nameArr));
