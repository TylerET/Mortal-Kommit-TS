import React, { useState } from "react";
import "./App.css";
import axios from "axios";

const testData: Array<ProfileType> = [
  {
    name: "Johnny Cage",
    avatar_url: "/img/Johnny-Cage.png",
    commits: getCommits(),
  },
  { name: "Kano", avatar_url: "/img/Kano.png", commits: getCommits() },
  { name: "Random", avatar_url: "/img/logo.png", commits: getCommits() },
  { name: "SubZero", avatar_url: "/img/SubZero.png", commits: getCommits() },
  {
    name: "Sonya Blade",
    avatar_url: "/img/Sonya-Blade.png",
    commits: getCommits(),
  },
  { name: "Raiden", avatar_url: "/img/Raiden.png", commits: getCommits() },
  { name: "Liu Kang", avatar_url: "/img/Liu-Kang.png", commits: getCommits() },
  { name: "Scorpion", avatar_url: "/img/Scorpion.png", commits: getCommits() },
];

export interface ProfileType {
  name: string;
  avatar_url: string;
  company?: string;
  [index: string]: any;
}

export interface CardProp {
  profiles: Array<ProfileType>;
  state: ActivePlayer;
  setter: Function;
}

function getCommits() {
  return Math.floor(Math.random() * 400);
}

export interface apiData {
  data: ProfileType;
  [index: string]: any;
}

export interface onSubmitProp {
  onSubmit: (props: ProfileType) => void;
}

const sliceDataRow1 = (props: Array<ProfileType>) => {
  return props.slice(0, 5);
};

const sliceDataRow2 = (props: Array<ProfileType>) => {
  return props.slice(5);
};

const testFunction = (props: Array<ProfileType>) => {
  console.log(props[0]);
  console.log(props[1]);
};

export interface ActivePlayer {
  p1: ProfileType | null;
  p2: ProfileType | null;
}

export interface onClickProps {
  onClickSet: React.Dispatch<React.SetStateAction<ActivePlayer | null>>;
}

function App() {
  const [profiles, setProfiles] = useState(testData);
  const [activePlayers, setActivePlayers] = useState<ActivePlayer>({
    p1: null,
    p2: null,
  });

  const AddNewProfile = (props: ProfileType): void => {
    if (profiles.length >= 10) {
      profiles.pop();
    }
    const prevState = profiles;
    props.commits = getCommits();
    setProfiles([...prevState, props]);
  };

  return (
    <>
      <div className="container">
        {/* <Test/>  */}
        <Header />
        <ProfileForm onSubmitProfile={AddNewProfile} />
        <CardList
          profiles={profiles}
          state={activePlayers}
          setter={setActivePlayers}
        />
        {/* <PlayerContainer {...activePlayers} setter={setActivePlayers}/> */}
        <Footer />
      </div>
    </>
  );
}

const Header = () => (
  <header>
    <h1>Mortal Kommit</h1>
    <h2>Choose Your Fighter</h2>
  </header>
);

export interface FormProps {
  onSubmitProfile: (props: ProfileType) => void;
}

// const emptyProfileType = { name: '', avatar_url: '' };
// (props:ProfileType) => void)
const ProfileForm = ({ onSubmitProfile }: FormProps) => {
  const [userName, setUserName] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    //overrides native refresh during a submit

    // const resp2 = await axios.get(
    //   `https://api.github.com/users/${userName}/repos`
    // );
    // const repoNames = [];
    // for (let i = 0; i < resp2.data.length; i++) {
    //   let repoName = resp2.data[i].name;
    //   if (repoName !== "LandingPage") {
    //     repoNames.push(repoName);
    //   }
    // }
    // console.table(repoNames);
    // console.log(resp2.data);

    // var accum: number = 0;

    // for (var name in repoNames) {
    //   const resp2 = await axios.get(
    //     `https://api.github.com/repos/${userName}/${repoNames[name]}/commits`
    //   );
    //   accum += resp2.data.length;

    // console.log(resp2.data);
    // console.log(accum);
    // console.log(repoNames[name]);
    // }

    await axios
      .get(`https://api.github.com/users/${userName}`)
      .then((resp: apiData) => {
        setUserName("");
        console.log("handleSubmit", resp.data);
        // resp.data.commits = accum;
        onSubmitProfile(resp.data);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={userName}
        onChange={event => setUserName(event.target.value)}
        placeholder="GitHub username"
        required
      />
      <button>Add fighter</button>
    </form>
  );
};

const CardList = (props: CardProp, state: ActivePlayer) => {
  // console.log('CardList',props);
  // console.log('CardList setter', props.setter);

  return (
    <>
      <div className="row-wrapper-1">
        {sliceDataRow1(props.profiles).map(profileEach => (
          <Card
            key={profileEach.name}
            featured={false}
            profile={profileEach}
            cardState={props.state}
            setter={props.setter}
          />
        ))}
      </div>
      <div className="row-wrapper-2">
        {sliceDataRow2(props.profiles).map(profileEach => (
          <Card
            key={profileEach.name}
            featured={false}
            profile={profileEach}
            cardState={props.state}
            setter={props.setter}
          />
        ))}
      </div>
      <div className="player-container">
        <>
          <Card
            featured={true}
            profile={props.state.p1 != null ? props.state.p1 : emptyObj}
            cardState={props.state}
            setter={props.setter}
          />

          <Card
            featured={true}
            profile={props.state.p2 != null ? props.state.p2 : emptyObj}
            cardState={props.state}
            setter={props.setter}
          />
        </>
      </div>
    </>
  );
};

const emptyObj: ProfileType = {
  name: "",
  avatar_url: "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=",
};

export interface CardPropCard {
  profile: ProfileType;
  featured: boolean;
  cardState: ActivePlayer;
  setter: Function;
}

export interface state {
  p1: null | ProfileType;
  p2: null | ProfileType;
}

export interface StyleStyle {
  [key: string]: string;
}

function Card({ profile, featured, cardState, setter }: CardPropCard) {
  const [playerState, setPlayerState] = useState<string>("noStatus");

  const onClickFighter = () => {
    if (playerState === "playerOne") {
      setPlayerState("noStatus");
      // cardState.p1 = null;
      setter({ p1: null, p2: cardState.p2 });

      // setActivePlayer();
    } else if (playerState === "playerTwo") {
      setPlayerState("noStatus");
      setter({ p2: null, p1: cardState.p1 });
    } else {
      if (cardState.p1 == null) {
        setPlayerState("playerOne");
        setter({ p1: profile, p2: cardState.p2 });
      } else if (cardState.p2 == null) {
        setPlayerState("playerTwo");
        setter({ p2: profile, p1: cardState.p1 });
      } else {
      }
      // console.table(GLOBAL);
    }
  };

  const stateStyle: StyleStyle = {
    playerOne: "0 0 0 3px red",
    // playerOne:"3px solid red",
    playerTwo: "0 0 0 3px LawnGreen",
    noStatus: "",
  };
  return (
    <div
      className={featured ? "featured-github-profile" : "github-profile"}
      onClick={!featured ? onClickFighter : () => {}}
      style={{ boxShadow: stateStyle[playerState] }}
    >
      <img src={profile.avatar_url} alt="Fighter Avatar" />
      <div className="info">
        <div className="name">
          <p>{featured ? profile.name : ""}</p>
          <p>{featured ? profile.commits : ""}</p>
        </div>
        <div className="company"></div>
      </div>
    </div>
  );
}

// const PlayerContainer = (activePlayers:ActivePlayer, setter:Function) => (
//   <>
//   <Card featured={true} profile={(activePlayers.p1 != null) ? activePlayers.p1: emptyObj} cardState={activePlayers} setter={setter}/>
//   <Card featured={true} profile={(activePlayers.p2 != null) ? activePlayers.p2: emptyObj} cardState={activePlayers} setter={setter}/>
//   </>
// );

const Footer = () => {
  return (
    <footer onClick={(e: any) => console.table(e.target.value)}>
      <p>Commits: </p>
      <p>
        {} vs {}
      </p>
    </footer>
  );
};

export default App;
